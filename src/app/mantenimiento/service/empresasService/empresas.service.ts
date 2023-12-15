import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from '../../Interface/Empresas';
import { Observable, Subject, map, tap } from 'rxjs';
import { Credentials } from '../../Interface/Credentials';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private apiUrl = 'http://localhost:8090/api/empresa';

  constructor(private http: HttpClient) {}

  listarEmpresa(): Observable<Empresas[]> {
    return this.http.get<Empresas[]>(`${this.apiUrl}/listar`);
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

  private unidadSubject = new Subject<Empresas[]>();
  unidades$ = this.unidadSubject.asObservable();
  registrarUnidadMedida(unidades: Empresas): Observable<Empresas> {
    return this.http.post<Empresas>(`${this.apiUrl}/registrar`, unidades).pipe( 
      tap(() => {
      this.listarEmpresa().subscribe((unidades) => {
        this.unidadSubject.next(unidades);
      });
    }));
  }



  editarAlmacen(id: number, almacen: Empresas): Observable<Empresas> {
    return this.http.put<Empresas>(`${this.apiUrl}/actualizar/${id}`, almacen);
}


  eliminarAlmacen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // almacen.service.ts

  desactivarAlmacenPorId(id: number): Observable<void> {
    const url = `${this.apiUrl}/desactivar/${id}`;
    return this.http.put<void>(url, {});
  }
}
