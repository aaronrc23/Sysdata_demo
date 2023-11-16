

export interface Productos {
    idproducto?: number;
    codigo_barra: string;
    nombre: string;
    precio_venta: number;
    precio_pormayor: number;
    stock: number;
    descripcion: string;
    imagen: string;
    activo: boolean;
    categoria: Categoria;
    marca: Marcas;

  }
  
export interface Categoria {
    idcategoria: number;
}

export interface Marcas {
  idmarca: number;
}