import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productos } from '../Interface/Productos';
import { EMPTY, Observable, Subject, catchError, map, tap } from 'rxjs';
import { environment } from 'src/app/enviroment/environment.prod';
import { Credentials } from '../Interface/Credentials';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = `${environment.apiUrl}/producto`;
  private productosSubject = new Subject<Productos[]>();

  // Cambié el nombre del Subject para que sea más representativo
  products$ = this.productosSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.apiUrl}/listar`);
  }

  registrarProducto(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(`${this.apiUrl}/registrar`, producto).pipe(
      catchError((error: any) => {
        console.error('Error al registrar el producto:', error);
        return EMPTY;
      }),
      tap(() => {
        // Después de crear el producto, actualizamos la lista de productos
        this.getProducts().subscribe((productos) => {
          // Agregamos algunos console.log para depuración
          console.log('Productos obtenidos después de registrar:', productos);
          this.productosSubject.next(productos);
        });
      })
    );
  }

  editarAlmacen(idproducto: number, almacen: Productos): Observable<Productos> {
    return this.http.put<Productos>(`${this.apiUrl}/actualizar/${idproducto}`, almacen).pipe(
      catchError((error: any) => {
        console.error('Error al editar el producto:', error);
        throw error; // Re-lanza el error para que el componente pueda manejarlo
      }),
      tap(() => {
        // Después de editar el producto, actualizamos la lista de productos
        this.obtenerProductos();
      })
    );
  }

  eliminarProducto(idproducto: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${idproducto}`).pipe(
      catchError((error: any) => {
        console.error('Error al eliminar el producto:', error);
        throw error; // Re-lanza el error para que el componente pueda manejarlo
      }),
      tap(() => {
        // Después de eliminar el producto, actualizamos la lista de productos
        this.obtenerProductos();
      })
    );
  }

  private obtenerProductos(): void {
    this.getProducts().subscribe((productos) => {
      // Agregamos algunos console.log para depuración
      console.log('Productos obtenidos después de operación:', productos);
      this.productosSubject.next(productos);
    });
  }
}
