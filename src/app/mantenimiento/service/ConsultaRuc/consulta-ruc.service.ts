import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaRucService {

  private apiUrl = 'https://dniruc.apisperu.com/api/v1/ruc/';
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFhcm9ucmMyMDIyQGdtYWlsLmNvbSJ9.E6a2TM1w8cIgb4PoT7hxBDoFDXFwFtkLs5Z8EfSfedI';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'  
    })
  };
  constructor(private http: HttpClient) { }

  
  private handleError(error: any) {
    console.error('Hubo un error:', error);
    return throwError('Error al realizar la consulta. Por favor, inténtelo de nuevo.');
  }

  consultarRUC(ruc: string): Observable<any> {
    const url = `${this.apiUrl}${ruc}?token=${this.token}`;

    return this.http.get(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
