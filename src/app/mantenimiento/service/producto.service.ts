import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productos } from '../Interface/Productos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  rutaGlobal = 'http://localhost:8090/api/producto'; 
  constructor(private http: HttpClient) { }
  /*-------Metodo para guardar los productos en la base de datos--------*/ 
  getProducts(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.rutaGlobal}/listar`);
  }

  registrarProducto(producto: Productos): Observable<any> {
    return this.http.post(`${this.rutaGlobal}/registrar`, producto);
  }
  editarProducto(producto: Productos): Observable<any> {
    return this.http.put(`${this.rutaGlobal}/editar/${producto.idproducto}`, producto);
  }

  eliminarProducto(idproducto: number): Observable<any> {
    return this.http.delete(`${this.rutaGlobal}/delete/${idproducto}`);
  }
}
