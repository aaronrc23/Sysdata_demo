
import { ProductoDto } from "./Productodto";


export interface GEntradaRequest {
  fecha: Date;
  proveedorId: number| null;  // Cambiado a un número directo
  almacenId: number| null; 
  productos: ProductoDto[]; // Ajusta según tu modelo de productos
  cantidadtotal: number;
  preciototal: number;
  numeroserie  : string;
}


