import { Injectable } from '@angular/core';
import { Productos } from '../Interface/Productos';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productosEnCarrito: Productos[] = [];

  agregarAlCarrito(producto: Productos): void {
    const productoExistente = this.productosEnCarrito.find(p => p.idproducto === producto.idproducto);
  
    if (productoExistente) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      productoExistente.stock += 1; // Ajusta según tus necesidades
    } else {
      // Si el producto no está en el carrito, agrégalo
      this.productosEnCarrito.push({ ...producto, stock: 1 });
    }
  }

  eliminarDelCarrito(producto: Productos): void {
    const index = this.productosEnCarrito.indexOf(producto);
    if (index !== -1) {
      this.productosEnCarrito.splice(index, 1);
    }
  }

  obtenerProductosEnCarrito(): Productos[] {
    return this.productosEnCarrito;
  }

  limpiarCarrito(): void {
    this.productosEnCarrito = [];
  }




  constructor() { }
}
