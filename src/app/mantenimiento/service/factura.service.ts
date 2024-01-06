import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../Interface/Productos';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private baseUrl = 'http://localhost:8090/api/producto';

  constructor(private http: HttpClient) { }

  getAllProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.baseUrl}/listar`);
  }

  getProductById(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.baseUrl}/listar/${id}`);
  }

  addProducto(producto: Productos): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, producto);
  }

  updateProducto(id: number, producto: Productos): Observable<Productos> {
    return this.http.put<Productos>(`${this.baseUrl}/editar/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  searchProducto(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.baseUrl}/buscar/${id}`);
  }
}
