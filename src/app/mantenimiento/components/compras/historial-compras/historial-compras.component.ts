import { Component, OnInit } from '@angular/core';
import { Almacenes } from 'src/app/mantenimiento/Interface/Almacenes';
import { Comprasdetalle } from 'src/app/mantenimiento/Interface/Comprasdetalle';
import { Proveedores } from 'src/app/mantenimiento/Interface/Proveedores';
import { AlmacenesService } from 'src/app/mantenimiento/service/almacenes.service';
import { DetallecompraService } from 'src/app/mantenimiento/service/detallecompra/detallecompra.service';
import { ProveedoresService } from 'src/app/mantenimiento/service/proveedores.service';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.scss']
})
export class HistorialComprasComponent implements OnInit{
  mostrarSelectorFecha = false;
  activarFiltroPersonalizado() {
    this.mostrarSelectorFecha = true;
  }

  detallecompra: Comprasdetalle[] = [];
  almacen: Almacenes[] = [];
  proveedores: Proveedores[] = [];
  selectedAlmacen: string | null = null; // Cambiado a string
  selectedFecha: string | null = null;

  constructor(
    private proveedoresService: ProveedoresService,
    private almacenesService: AlmacenesService,
    private detallecompraService: DetallecompraService
  ) {}

  ngOnInit(): void {
    this.obtenerProveedores();
    this.obtenerAlmacenes();
    this.obtenerDetalle();
  }

  obtenerProveedores() {
    this.proveedoresService.getProveedores().subscribe(
      (proveedores) => {
        this.proveedores = proveedores;
        console.log('Proveedores obtenidos:', proveedores);
      },
      (error) => {
        console.error('Error al cargar los proveedores:', error);
      }
    );
  }
  obtenerAlmacenes() {
    this.almacenesService.listarAlmacenes().subscribe(
      (almacenes) => {
        this.almacen = almacenes;
        console.log('Almacenes obtenidos:', almacenes);
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }
  obtenerDetalle() {
    this.detallecompraService.listardetalle().subscribe(
      (detalles) => {
        const filtros = {
          idAlmacen: this.selectedAlmacen, // Ahora usamos el ID del almacén
          fecha: this.selectedFecha,
        };

        // Filtrar localmente los detalles
        this.detallecompra = detalles.filter((detalle) => {
          console.log('Tipo de idAlmacen:', typeof detalle.entradas.almacen.id);
          console.log('Valor de idAlmacen:', detalle.entradas.almacen.id);

          return (
            (!filtros.idAlmacen ||
              detalle.entradas.almacen.id.toString() === filtros.idAlmacen) &&
            (!filtros.fecha || detalle.entradas.fecha === filtros.fecha)
          );
        });

        console.log('Detalles obtenidos con filtros:', this.detallecompra);
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
   /*----pagination-------- */
   itemsPerPage = 10;
   currentPage = 1;
   itemsPerPageOptions = [5, 8, 10]; // Puedes agregar más opciones según tus necesidades
 
   setItemsPerPage(itemsPerPage: number): void {
     this.itemsPerPage = itemsPerPage;
     this.currentPage = 1; // Reinicia la página actual al cambiar la cantidad de elementos por página
   }
 
   get totalPages(): number {
     return Math.ceil(this.detallecompra.length / this.itemsPerPage);
   }
 
   // Método que devuelve las categorías para la página actual
   getCategoriasPaginadas(): any[] {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return this.detallecompra.slice(startIndex, endIndex);
   }
 
   // Método que maneja el cambio de página
   onPageChange(pageNumber: number): void {
     this.currentPage = pageNumber;
   }
 
   /*------end Pagination-------- */

}
