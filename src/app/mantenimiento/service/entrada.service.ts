import { Injectable } from '@angular/core';
import { DetalleEntrada } from '../Interface/DetalleEntrada';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/enviroment/environment.prod';
import { GEntradaRequest } from '../Interface/request/GentradaRequest';
import { Credentials } from '../Interface/Credentials';
import { EntradaRequest } from '../Interface/request/EntradaRequest';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private apiUrl = `${environment.apiUrl}/entradas`; // ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  listarEntradas(): Observable<EntradaRequest[]> {
    return this.http.get<EntradaRequest[]>(`${this.apiUrl}/listar`);
  }


  crearEntrada(entradaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl }/crear`, entradaData);
  }

  exportarPdfPorEntrada(id: number): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/detalleentrada/${id}/export-pdf`;

    return this.http.get(url, {
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }
}
