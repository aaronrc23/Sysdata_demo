import { Injectable } from '@angular/core';
import { DetalleEntrada } from '../Interface/DetalleEntrada';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private apiUrl = `${environment.apiUrl}/entradas`; // ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

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
