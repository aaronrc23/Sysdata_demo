
import { Proveedores } from "../Proveedores";
import { ProductoDto } from "./Productodto";

export interface EntradaRequest {
  gentradasId: number;
  fecha: string;
  numeroserie: string;
  almacen: Almacen;
  cantidadtotal: number;
  preciototal: number;
  proveedores: Proveedor;
  empresas: Empresas;
  detallesAsJson: DetalleCompra[];
  }
  

export interface DetalleCompra {
  idproducto: number;
  nombre: string;
  cantidad: number;
  codigobarra: string;
  preciocompra: number;
  abreviacion: string;
}

export interface Proveedor {
  id_proveedores: number;
  nombre_prov: string;
  numruc: string;
  direccion: string;
  telefono: string;
  email: string;
  activo: boolean;
}

export interface Almacen {
  id: number;
  nombreAlmacen: string;
  numeroAlmacen: string;
  direccion: string;
  activo: boolean;
}

export interface Empresas{

  id_empresa: number
  direccion: string
  propietario: string
  ruc: number
  activo: boolean

}