export interface Comprasdetalle {
    detalleId: number;
    entradas: {
      gentriesId: number;
      fecha: string;
      numeroserie: string;
      almacen: {
        id: number;
        nombreAlmacen: string;
        numeroAlmacen: string;
        direccion: string;
        activo: boolean;
      };
      proveedores: {
        id_proveedores: number;
        nombre_prov: string;
        numruc: string;
        direccion: string;
        telefono: string;
        email: string;
        activo: boolean;
      };
      detallesAsString: string;
    };
    cantidad: number;
    unidad: string;
    identrada: number;
    nombreprod: string;
    codigobarra: string;
    numserie: string;
}