import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Almacenes } from '../Interface/Almacenes';
@Injectable({
  providedIn: 'root',
})
export class AlmacenesService {
  private apiUrl = 'http://localhost:8090/api/almacen';

  constructor(private http: HttpClient) {}

  listarAlmacenes(): Observable<Almacenes[]> {
    return this.http.get<Almacenes[]>(`${this.apiUrl}/listar`);
  }

  registrarAlmacen(almacen: Almacenes): Observable<Almacenes> {
    return this.http.post<Almacenes>(`${this.apiUrl}/registrar`, almacen);
  }

  editarAlmacen(almacen: Almacenes): Observable<Almacenes> {
    return this.http.put<Almacenes>(
      `${this.apiUrl}/editar/${almacen.id}`,
      almacen
    );
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
