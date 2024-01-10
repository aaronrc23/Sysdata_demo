// almacen.model.ts
export interface Stock {
    idstock: number;
    producto: Producto;
    almacenes: Almacen;
    stock: number;
    
  }
export interface UnidadDeMedida {
    id_umd: number;
    nombre: string;
    abreviacion: string;
  }
  
export interface Categoria {
    idcategoria: number;
    nombre: string;
    activo: boolean;
  }
  
  export interface Producto {
    idproducto: number;
    codigo_barra: string;
    nombre: string;
    precio_venta: number;
    precio_compra: number;
    precio_pormayor: number;
    stock: number;
    descripcion: string;
    almacen:String;
    imagen: string;
    activo: boolean;
    categoria: Categoria;
    unidadDeMedida: UnidadDeMedida;
  }
  
  export interface Almacen {
    id: number;
    nombreAlmacen: string;
    numeroAlmacen: string;
    direccion?: string;
    activo: boolean;
  }
  
  
  