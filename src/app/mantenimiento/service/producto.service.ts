import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productos } from '../Interface/Productos';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/app/enviroment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = `${environment.apiUrl}/producto`;
 
  constructor(private http: HttpClient) { }
  /*-------Metodo para guardar los productos en la base de datos--------*/ 
  getProducts(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.apiUrl}/listar`);
  }

    /*------------Registrar Categorias----------------*/
    private categoriasSubject = new Subject<Productos[]>();
    products$ = this.categoriasSubject.asObservable();
    registrarProducto(categoria: Productos): Observable<Productos> {
      return this.http.post<Productos>(`${this.apiUrl}/registrar`, categoria).pipe( 
        tap(() => {
        // Después de crear la categoría, actualizamos la lista de categorías
        this.getProducts().subscribe((categorias) => {
          this.categoriasSubject.next(categorias);
        });
      }));
    }

  editarProducto(producto: Productos): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${producto.idproducto}`, producto);
  }

  eliminarProducto(idproducto: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${idproducto}`);
  }
}
