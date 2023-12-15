import { ProductoDto } from "./Productodto";


export interface GEntradaRequest {
  fecha: Date;
  proveedorId: number;
  almacenId: number;
  productos: ProductoDto[]; // Ajusta según tu modelo de productos
}