import { Component } from '@angular/core';
import { Stock } from 'src/app/mantenimiento/Interface/ProductoStock';
import { ProductoStockService } from 'src/app/mantenimiento/service/productoStock/producto-stock.service';

@Component({
  selector: 'app-listar-stock',
  templateUrl: './listar-stock.component.html',
  styleUrls: ['./listar-stock.component.scss']
})
export class ListarStockComponent {

  stock: Stock[] = []
  constructor(private productoStock: ProductoStockService) {}

  ngOnInit(): void {
    this.getProductStock()
  }

  getProductStock(){
    this.productoStock.getProductoStock().subscribe((stock: Stock[]) => {
      this.stock = stock
    })
  }
  /*-------Pagination---------- */
  searchTerm: string = '';  // Inicializa el término de búsqueda
  filteredCategorias: Stock[] = []; 



  /*-------End Pagination---------- */

  obtenerStock() {
    this.productoStock.getProductoStock().subscribe(productos => {
      this.stock = productos;
      console.log('Stock obtenidas:', productos);
    }, (error) => {
      console.error('Error al cargar las categorías:', error);
    });
  }

  
  
}
