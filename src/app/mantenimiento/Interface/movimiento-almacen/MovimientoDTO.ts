import { DetalleMovimientoDto } from "./DetalleMovimientoDTO";

export interface MovimientoDTO {
    idMovimiento?: number;
    dirPartida: string;
    dirLlegada: string;
    motivoTraslado: string;
    idAlmacenOrigen: number | null;
    idAlmacenDestino: number | null;
    detalles: DetalleMovimientoDto[];
    fecha: Date;
  }
  
  
 
  