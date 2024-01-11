//para listar movimientos
export interface MovimientoAlmacenes {
  idmoviento: number;
  fechaemision: string; 
  fechainciotraslado: Date; 
  dir_partida: string;
  dir_llegada: string;
  motivotraslado: string;
  almacenOrigen: Almacenes;
  almacenDestino: Almacenes;
  detalles: DetalleMoviento[];
}

export interface Almacenes {
  id: number;
  nombreAlmacen: string;
  
}

// La interfaz DetalleMoviento probablemente se ve así (ajusta según sea necesario)
export interface DetalleMoviento {
  dtmovientoId: number;
  movientoalmacenes: MovimientoAlmacenes;
  producto: Producto;
  cantidad: number;
  almacenOrigen: Almacenes;
  almacenDestino: Almacenes;
}
export interface Producto {
  
}



