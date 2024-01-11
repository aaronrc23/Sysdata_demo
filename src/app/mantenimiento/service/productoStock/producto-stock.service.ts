import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/environment.prod';
import { Credentials } from '../../Interface/Credentials';
import { Observable, map } from 'rxjs';
import { Stock } from '../../Interface/ProductoStock';

@Injectable({
  providedIn: 'root'
})
export class ProductoStockService {

  private apiUrl = `${environment.apiUrl}/productostock`;


  constructor(private http: HttpClient) {}
  login(creds: Credentials) {
    return this.http.post(`${environment.loginUrl}/login`, creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer', '');
      localStorage.setItem('token', token);
      
      return body;
    }))
  }
  
  getToken(){
    return localStorage.getItem('token');
  }


   /*-----------Listar Categorias-------------*/
   getProductoStock(): Observable<Stock[]> {
    console.log('Llamando a getUnidadMedida');
    return this.http.get<Stock[]>(`${this.apiUrl}/listar`);
  }


  
  
}
