

export interface Productos {
    idproducto?: number;
    codigo_barra: string;
    nombre: string;
    precio_compra: number;
    precio_venta: number;
    precio_pormayor: number;
    stock: number;
    cantidad?: number;
    descripcion: string;
    imagen: string;
    activo: boolean;
    categoria: Categoria;
    unidadDeMedida: UnidadDeMedida;
    // marca: Marcas;
  }
  
export interface Categoria {
    idcategoria: number;
}

export interface UnidadDeMedida {
  id_umd: number;
}

// export interface Marcas {
//   idmarca: number;
// }