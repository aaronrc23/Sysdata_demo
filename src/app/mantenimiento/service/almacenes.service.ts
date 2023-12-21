import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Almacenes } from '../Interface/Almacenes';
import { environment } from 'src/app/enviroment/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class AlmacenesService {
  private apiUrl = `${environment.apiUrl}/almacen`;


  constructor(private http: HttpClient) {}

  listarAlmacenes(): Observable<Almacenes[]> {
    return this.http.get<Almacenes[]>(`${this.apiUrl}/listar`);
  }

 

  
  /*------------Registrar Categorias----------------*/
  private categoriasSubject = new Subject<Almacenes[]>();
  almacenes$ = this.categoriasSubject.asObservable();
  registrarAlmacen(categoria: Almacenes): Observable<Almacenes> {
    return this.http.post<Almacenes>(`${this.apiUrl}/registrar`, categoria).pipe( 
      tap(() => {
      // Después de crear la categoría, actualizamos la lista de categorías
      this.listarAlmacenes().subscribe((categorias) => {
        this.categoriasSubject.next(categorias);
      });
    }));
  }






  editarAlmacen(id: number, almacen: Almacenes): Observable<Almacenes> {
    return this.http.put<Almacenes>(`${this.apiUrl}/actualizar/${id}`, almacen);
}


  eliminarAlmacen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // almacen.service.ts

  desactivarAlmacenPorId(id: number): Observable<void> {
    const url = `${this.apiUrl}/desactivar/${id}`;
    return this.http.put<void>(url, {});
  }


  exportarPdfPorEntrada(gentradasId: number): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/${gentradasId}/export-pdf`;

    return this.http.get(url, {
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }
}
