import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/app/enviroment/environment.prod';
import { MovimientoAlmacenes } from '../../Interface/movimiento-almacen/MovimientoAlmacenes';
import { MovimientoDTO } from '../../Interface/movimiento-almacen/MovimientoDTO';
import { Credentials } from '../../Interface/Credentials';

@Injectable({
  providedIn: 'root'
})
export class MovimientoAlmacenService {
  private apiUrl = `${environment.apiUrl}/movimiento-almacenes`;

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
  registrarMovimiento(movimiento: MovimientoDTO): Observable<MovimientoDTO> {
    return this.http.post<MovimientoDTO>(`${this.apiUrl}/realizar`, movimiento).pipe(
      tap(() => this.listarMovimiento())
    );
  }

  getMovimientoporId(id: number): Observable<MovimientoDTO> {
    return this.http.get<MovimientoDTO>(`${this.apiUrl}/listar/${id}`);
  }
  listarMovimiento(): Observable<MovimientoDTO[]> {
    return this.http.get<MovimientoDTO[]>(`${this.apiUrl}/listar`);
  }

   /*------------Registrar Categorias----------------*/

   
  //  private categoriasSubject = new Subject<MovimientoDTO[]>();
  //  movimiento$ = this.categoriasSubject.asObservable();
  //  registrarMovimiento(categoria: MovimientoDTO): Observable<MovimientoDTO> {
  //    return this.http.post<MovimientoDTO>(`${this.apiUrl}/realizar`, categoria).pipe( 
  //      tap(() => {

  //       this.listarMovimiento().subscribe((categorias) => {
  //         this.categoriasSubject.next(categorias);
  //       });
  //    }));
  //  }

}
