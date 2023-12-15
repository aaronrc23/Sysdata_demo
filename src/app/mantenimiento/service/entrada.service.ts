import { Injectable } from '@angular/core';
import { DetalleEntrada } from '../Interface/DetalleEntrada';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private baseUrl = 'http://localhost:8090/api/entradas'; // ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  crearEntrada(entradaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, entradaData);
  }

  





  
}
