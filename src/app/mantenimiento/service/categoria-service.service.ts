import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Categoria } from '../Interface/Categorias';
import { Credentials } from '../Interface/Credentials';

import { map,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {
  rutaGlobal = 'http://localhost:8090/api/categoria'; 
  constructor(private http: HttpClient) { }


  /*-----------Listar Categorias-------------*/
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.rutaGlobal}/listar`);
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
  private categoriasSubject = new Subject<Categoria[]>();
  categorias$ = this.categoriasSubject.asObservable();
  registrarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.rutaGlobal}/registrar`, categoria).pipe( 
      tap(() => {
      // Después de crear la categoría, actualizamos la lista de categorías
      this.getCategorias().subscribe((categorias) => {
        this.categoriasSubject.next(categorias);
      });
    }));
  }
}
