import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { UnidadMedida } from '../Interface/UnidadMedida';
import { Credentials } from '../Interface/Credentials';

@Injectable({
  providedIn: 'root'
})
export class UnidaMedidaService {
  rutaGlobal = 'http://localhost:8090/api/undmedida'; 


  constructor(private http: HttpClient) { }


  /*-----------Listar Categorias-------------*/
  getUnidadMedida(): Observable<UnidadMedida[]> {
    console.log('Llamando a getUnidadMedida');
    return this.http.get<UnidadMedida[]>(`${this.rutaGlobal}/listar`);
  }

  login(creds: Credentials) {
    return this.http.post(`http://localhost:8090/login`, creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer', '');
      localStorage.setItem('token', token);
      
      return body;
    }))
  }
  
  getToken(){
    return localStorage.getItem('token');
  }

  /*------------Registrar Categorias----------------*/
  private unidadSubject = new Subject<UnidadMedida[]>();
  unidades$ = this.unidadSubject.asObservable();
  registrarUnidadMedida(unidades: UnidadMedida): Observable<UnidadMedida> {
    return this.http.post<UnidadMedida>(`${this.rutaGlobal}/registrar`, unidades).pipe( 
      tap(() => {
      this.getUnidadMedida().subscribe((unidades) => {
        this.unidadSubject.next(unidades);
      });
    }));
  }



  editarUnidadMedida(id: number, unidad: UnidadMedida): Observable<UnidadMedida> {
    return this.http.put<UnidadMedida>(`${this.rutaGlobal}/actualizar/${id}`, unidad);
}

  eliminarUnidadMedida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.rutaGlobal}/delete/${id}`);
  }
}
