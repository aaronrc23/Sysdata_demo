import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marcas } from '../Interface/Marcas';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  rutaGlobal = 'http://localhost:8090/api/marcas';
  constructor(private http: HttpClient) {}

  /*-----------Listar Categorias-------------*/
  getMarcas(): Observable<Marcas[]> {
    return this.http.get<Marcas[]>(`${this.rutaGlobal}/listar`);
  }
  /*-----------Registrar Marca-------------*/
  registrarMarca(marca: Marcas): Observable<Marcas> {
    return this.http.post<Marcas>(`${this.rutaGlobal}/registrar`, marca);
  }
   /*-----------Editar Marca-------------*/
   editarMarca(idmarca: number, marca: Marcas): Observable<any> {
    return this.http.put(`${this.rutaGlobal}/editar/${idmarca}`, marca);
  }
  
  
  
}
