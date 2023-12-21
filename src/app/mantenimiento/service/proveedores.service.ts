import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedores } from '../Interface/Proveedores';
import { Observable, Subject, map, tap } from 'rxjs';
import { Credentials } from '../Interface/Credentials';
import { environment } from 'src/app/enviroment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private apiUrl = `${environment.apiUrl}/proveedores`;	 


  constructor(private http: HttpClient) { }


  /*-----------Listar Categorias-------------*/
  getProveedores(): Observable<Proveedores[]> {
    console.log('Llamando a getUnidadMedida');
    return this.http.get<Proveedores[]>(`${this.apiUrl}/listar`);
  }

  
  login(creds: Credentials) {
    return this.http.post(`https://sysdataapi.uc.r.appspot.com/login`, creds, {
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

  private unidadSubject = new Subject<Proveedores[]>();
  unidades$ = this.unidadSubject.asObservable();
  registrarProveedores(unidades: Proveedores): Observable<Proveedores> {
    return this.http.post<Proveedores>(`${this.apiUrl}/registrar`, unidades).pipe( 
      tap(() => {
      this.getProveedores().subscribe((unidades) => {
        this.unidadSubject.next(unidades);
      });
    }));
  }



  editarProveedores(id: number, unidad: Proveedores): Observable<Proveedores> {
    return this.http.put<Proveedores>(`${this.apiUrl}/actualizar/${id}`, unidad);
}

  eliminarProveedores(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
