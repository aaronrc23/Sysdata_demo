import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Categoria } from '../Interface/Categorias';
import { Credentials } from '../Interface/Credentials';

import { map,tap } from 'rxjs/operators';
import { environment } from 'src/app/enviroment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {
  private apiUrl = `${environment.apiUrl}/categoria`;
  constructor(private http: HttpClient) { }

  
  /*-----------Listar Categorias-------------*/
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/listar`);
  }

  login(creds: Credentials) {
    return this.http.post(`${environment.loginUrl}/login`, creds, {
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
    return this.http.post<Categoria>(`${this.apiUrl}/registrar`, categoria).pipe( 
      tap(() => {
      // Después de crear la categoría, actualizamos la lista de categorías
      this.getCategorias().subscribe((categorias) => {
        this.categoriasSubject.next(categorias);
      });
    }));
  }



  editarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      `${this.apiUrl}/actualizar/${categoria.idcategoria}`,
      categoria
    );
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
