import { Component, OnInit } from '@angular/core';
import { MovimientoAlmacenes } from 'src/app/mantenimiento/Interface/movimiento-almacen/MovimientoAlmacenes';
import { MovimientoAlmacenService } from 'src/app/mantenimiento/service/MovimientoAlmacen/movimiento-almacen.service';

@Component({
  selector: 'app-listar-movimiento-almacen',
  templateUrl: './listar-movimiento-almacen.component.html',
  styleUrls: ['./listar-movimiento-almacen.component.scss']
})
export class ListarMovimientoAlmacenComponent implements OnInit{

  mostrarSelectorFecha = false;
  activarFiltroPersonalizado() {
    this.mostrarSelectorFecha = true;
  }

  movimientos: MovimientoAlmacenes[] = [];
  selectedAlmacen: string | null = null; // Cambiado a string
  selectedFecha: string | null = null;

  constructor(private  movimientoservice : MovimientoAlmacenService) {}


  ngOnInit(): void {
    this.listarMovimientos() 
  }

  

  listarMovimientos() {
    this.movimientoservice.listarMovimiento().subscribe(
      (almacenes) => {
        this.movimientos = almacenes;
        console.log('Almacenes obtenidos:', almacenes);
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  
  /*----pagination-------- */
  itemsPerPage = 10;
  currentPage = 1;
  itemsPerPageOptions = [5, 8, 10]; // Puedes agregar más opciones según tus necesidades

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reinicia la página actual al cambiar la cantidad de elementos por página
  }

  get totalPages(): number {
    return Math.ceil(this.movimientos.length / this.itemsPerPage);
  }

  // Método que devuelve las categorías para la página actual
  getCategoriasPaginadas(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.movimientos.slice(startIndex, endIndex);
  }

  // Método que maneja el cambio de página
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  /*------end Pagination-------- */

  
  obtenerDetalle() {
    this.movimientoservice.listarMovimiento().subscribe(
      (detalles) => {
        const filtros = {
          idAlmacen: this.selectedAlmacen, // Ahora usamos el ID del almacén
          fecha: this.selectedFecha,
        };

  

      },
      (error) => {
        console.error('Error al cargar los detalles:', error);
      }
    );
  }

  filtrar() {
    console.log('Filtrar');
    this.obtenerDetalle();
  }
  limpiarFiltro() {
    this.selectedAlmacen = null;
    this.selectedFecha = null;
    this.mostrarSelectorFecha = false;
    this.obtenerDetalle(); // Recargar la tabla
  }
 



}
