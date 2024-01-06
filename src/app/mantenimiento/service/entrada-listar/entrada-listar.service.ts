import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaListarService {

  private proveedorIdSource = new BehaviorSubject<number | null>(null);
  proveedorId$ = this.proveedorIdSource.asObservable();

  private almacenIdSource = new BehaviorSubject<number | null>(null);
  almacenId$ = this.almacenIdSource.asObservable();

  setProveedorId(proveedorId: number) {
    this.proveedorIdSource.next(proveedorId);
  }

  setAlmacenId(almacenId: number) {
    this.almacenIdSource.next(almacenId);
  }
}
