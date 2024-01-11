import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/mantenimiento/Interface/ProductoStock';
import { ProductoStockService } from 'src/app/mantenimiento/service/productoStock/producto-stock.service';

@Component({
  selector: 'app-listar-stock',
  templateUrl: './listar-stock.component.html',
  styleUrls: ['./listar-stock.component.scss'],
})
export class ListarStockComponent implements OnInit {

  
  stock: Stock[] = [];
  productosSinFiltrar: Stock[] = [];
  rangeInfoMessage: string = '';
  constructor(private productoStock: ProductoStockService) {}

  ngOnInit(): void {
    this.getProductStock();
    this.applyFilter();
    this.onRangeInfo('');
  }

  getProductStock() {
    this.productoStock.getProductoStock().subscribe((stock) => {
      this.stock = stock;
      this.productosSinFiltrar = stock;
      this.filteredCategorias = stock;
     
    });
  }
  /*-------Pagination---------- */
  searchTerm: string = ''; // Inicializa el término de búsqueda
  filteredCategorias: Stock[] = [];

 /*----pagination-------- */
 itemsPerPage = 5;
 currentPage = 1;
 itemsPerPageOptions = [5, 8, 10]; // Puedes agregar más opciones según tus necesidades

 setItemsPerPage(itemsPerPage: number): void {
   this.itemsPerPage = itemsPerPage;
   this.currentPage = 1; // Reinicia la página actual al cambiar la cantidad de elementos por página
 }

 get totalPages(): number {
   return Math.ceil(this.stock.length / this.itemsPerPage);
 }

 // Método que devuelve las categorías para la página actual
 getCategoriasPaginadas(): any[] {
   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
   const endIndex = startIndex + this.itemsPerPage;
   return this.stock.slice(startIndex, endIndex);
 }

 // Método que maneja el cambio de página
 onPageChange(pageNumber: number): void {
   this.currentPage = pageNumber;
 }

 
 onRangeInfo(rangeInfo: string): void {
  this.rangeInfoMessage = rangeInfo;
  console.log('Range Info:', rangeInfo);
}






   /*-------Filtrar--------- */

  
 
   onSearchTermChange(): void {
     this.applyFilter(); // Llama al método de filtrado
   }
 
 
   filter(stock: Stock): boolean {
     const nombre = stock.producto.nombre || ''; // Si nombre es undefined, se establece como cadena vacía
     const codigoBarra = stock.producto.codigo_barra || ''; // Si codigo_barra es undefined, se establece como cadena vacía
   
     return (
       (nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
       (codigoBarra.toLowerCase().includes(this.searchTerm.toLowerCase()))
     );
   }
 
   private applyFilter(): void {
     this.filteredCategorias = this.stock.filter((stocks) =>
     stocks.producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       (stocks.producto.codigo_barra && stocks.producto.codigo_barra.toString().includes(this.searchTerm.toLowerCase()))
     );
   }
 
 
   /*-------End Filtrar---------- */
 


  
}
