import { Component, OnInit } from '@angular/core';
import { UnidadDeMedida } from 'src/app/mantenimiento/Interface/ProductoStock';
import { UnidaMedidaService } from 'src/app/mantenimiento/service/unida-medida.service';
import { NgForm } from '@angular/forms';
import { UnidadMedida } from 'src/app/mantenimiento/Interface/UnidadMedida';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-unidad',
  templateUrl: './listar-unidad.component.html',
  styleUrls: ['./listar-unidad.component.scss'],
})
export class ListarUnidadComponent  implements OnInit{
  unidadesMedida: UnidadMedida[] = [];
  constructor(private unidadMedidaService: UnidaMedidaService) {}

  edicionUnidad: UnidadMedida = {
    id_umd: 0,
    nombre: '',
    abreviacion: '',
    valor: 0,
    activo: true,
  };

  ngOnInit(): void {
    this.obtenerUnidad();
    this.unidadMedidaService.unidades$.subscribe((categorias: UnidadMedida[]) => {
      this.unidadesMedida = categorias;
    });
  
  }

  // Metodo para listar
  obtenerUnidad() {
    this.unidadMedidaService.getUnidadMedida().subscribe(
      (unidadesMedida) => {
        this.unidadesMedida = unidadesMedida;
        console.log('Unidad obtenidas:', unidadesMedida);
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
     return Math.ceil(this.unidadesMedida.length / this.itemsPerPage);
   }
 
   // Método que devuelve las categorías para la página actual
   getCategoriasPaginadas(): any[] {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return this.unidadesMedida.slice(startIndex, endIndex);
   }
 
   // Método que maneja el cambio de página
   onPageChange(pageNumber: number): void {
     this.currentPage = pageNumber;
     // ...otras acciones que puedan ser necesarias
   }
 
   /*------end Pagination-------- */
 
 /*-------Pagination---------- */
   searchTerm: string = '';  // Inicializa el término de búsqueda
   filteredUnidades: UnidadMedida[] = []; 
 
 
   onSearchTermChange(): void {
     this.filteredUnidades = this.filterCategorias(); 
   }
 

   private filterCategorias(): UnidadMedida[] {
     return this.unidadesMedida.filter(categoria =>
       categoria.nombre && categoria.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
     );
   }
 
   /*-------End Pagination---------- */



   mostrarModalEdicion = false;
   abrirModalEdicion(categoria: UnidadMedida): void {
     this.edicionUnidad = { ...categoria };
     this.mostrarModalEdicion = true;
   }
 
   /*---------- Actualizar Categorias-----------*/
   actualizarUnidad(): void {
     // Verificar si categoriaEnEdicion está definido y si su propiedad nombre es válida antes de la actualización
     if (
       !this.edicionUnidad ||
       !this.edicionUnidad.nombre ||
       this.edicionUnidad.nombre.trim() === ''
     ) {
       // Mostrar un mensaje de error o realizar la acción necesaria
       return;
     }
     // Ocultar el modal de edición antes de mostrar el Swal
     this.mostrarModalEdicion = false;
     Swal.fire({
       title: '¿Estás seguro?',
       text: '¿Deseas actualizar esta categoría?',
       icon: 'question',
       showCancelButton: true,
       confirmButtonText: 'Sí, actualizar',
       cancelButtonText: 'Cancelar',
     }).then((result) => {
       if (result.isConfirmed) {
         this.unidadMedidaService
           .editarUnidadMedida(this.edicionUnidad.id_umd, this.edicionUnidad)
           .subscribe(
             () => {
               this.mostrarExitoActualizacionEditar();
               this.edicionUnidad = {
                id_umd: 0,
                nombre: '',
                abreviacion: '',
                valor: 0,
                activo: true,
               }; // Reinicializa la categoría en edición
               this.obtenerUnidad();
             },
             (error) => {
               console.error('Error al actualizar la categoría:', error);
             }
           );
       }
     });
   }
 
   private mostrarExitoActualizacionEditar(): void {
     Swal.fire({
       position: 'top-end',
       icon: 'success',
       title: 'Categoría actualizada con éxito',
       showConfirmButton: false,
       timer: 1500,
     });
   }
 
   /*---------- Eliminar Categorias----------- */
   eliminarAlmacen(categoria: UnidadDeMedida): void {
     Swal.fire({
       title: '¿Estás seguro?',
       text: `¿Deseas eliminar la categoría "${categoria.nombre}"?`,
       icon: 'error',
       showCancelButton: true,
       confirmButtonText: 'Sí, eliminar',
       cancelButtonText: 'Cancelar',
     }).then((result) => {
       if (result.isConfirmed && categoria.id_umd !== undefined) {
         // Asegúrate de que idcategoria no sea undefined antes de pasarlo como argumento
         this.unidadMedidaService.eliminarUnidadMedida(categoria.id_umd).subscribe(
           () => {
             this.mostrarExitoEliminacion();
             this.obtenerUnidad();
           },
           (error) => {
             console.error('Error al eliminar la categoría:', error);
           }
         );
       }
     });
   }
 
   private mostrarExitoEliminacion(): void {
     Swal.fire({
       position: 'top-end',
       icon: 'success',
       title: 'Categoría eliminada con éxito',
       showConfirmButton: false,
       timer: 1500,
     });
   }




   
}
