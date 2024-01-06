import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroment/environment.prod';
import { Comprasdetalle } from '../../Interface/Comprasdetalle';


@Injectable({
  providedIn: 'root'
})
export class DetallecompraService {

  private apiUrl = `${environment.apiUrl}/detalleentrada`; // ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  listardetalle(): Observable<Comprasdetalle[]> {
    return this.http.get<Comprasdetalle[]>(`${this.apiUrl}/listardetalle`);
  }
  
  

}
