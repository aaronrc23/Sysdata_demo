import { Almacenes } from "../Almacenes";
import { Producto } from "../ProductoStock";
import { MovimientoAlmacenes } from "./MovimientoAlmacenes";


export interface DetalleMovimiento {
  dtmovientoId: number;
  movientoalmacenes: MovimientoAlmacenes;
  producto: Producto;
  cantidad: number;
  almacenOrigen: Almacenes;
  almacenDestino: Almacenes;
}
