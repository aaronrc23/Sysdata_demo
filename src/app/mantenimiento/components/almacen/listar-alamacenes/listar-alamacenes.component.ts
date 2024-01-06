import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Almacenes } from 'src/app/mantenimiento/Interface/Almacenes';
import { AlmacenesService } from 'src/app/mantenimiento/service/almacenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-alamacenes',
  templateUrl: './listar-alamacenes.component.html',
  styleUrls: ['./listar-alamacenes.component.scss'],
})
export class ListarAlamacenesComponent implements OnInit {
  @ViewChild('categoriasForm') categoriasForm: NgForm | undefined;

  edicionAlmacen: Almacenes = {
    id: 0,
    nombreAlmacen: '',
    direccion: '',
    numeroAlmacen: 0,
    activo: true,
  };

  /*--Array--*/
  almacen: Almacenes[] = [];

  constructor(private almacenesService: AlmacenesService) {}
  ngOnInit(): void {
    this.obtenerUnidad();
    this.almacenesService.almacenes$.subscribe((almacenes: Almacenes[]) => {
      this.almacen = almacenes;
    });
  }
  

  obtenerUnidad() {
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

  /*----pagination-------- */
  itemsPerPage = 10;
  currentPage = 1;
  itemsPerPageOptions = [5, 8, 10]; // Puedes agregar más opciones según tus necesidades

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reinicia la página actual al cambiar la cantidad de elementos por página
  }

  get totalPages(): number {
    return Math.ceil(this.almacen.length / this.itemsPerPage);
  }

  // Método que devuelve las categorías para la página actual
  getCategoriasPaginadas(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.almacen.slice(startIndex, endIndex);
  }

  // Método que maneja el cambio de página
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  /*------end Pagination-------- */

  /*-------Filtrar--------- */
  searchTerm: string = ''; // Inicializa el término de búsqueda
  filteredCategorias: Almacenes[] = [];

  onSearchTermChange(): void {
    this.filteredCategorias = this.filterCategorias(); // Llama al método de filtrado
  }

  private filterCategorias(): Almacenes[] {
    return this.almacen.filter(
      (almacen) =>
        almacen.nombreAlmacen &&
        almacen.nombreAlmacen
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }



  /*-------End Filtrar---------- */

  mostrarModalEdicion = false;
  abrirModalEdicion(categoria: Almacenes): void {
    this.edicionAlmacen = { ...categoria };
    this.mostrarModalEdicion = true;
  }










  
  /*---------- Actualizar Categorias-----------*/
  actualizarUnidad(): void {
    // Verificar si categoriaEnEdicion está definido y si su propiedad nombre es válida antes de la actualización
    if (
      !this.edicionAlmacen ||
      !this.edicionAlmacen.nombreAlmacen ||
      this.edicionAlmacen.nombreAlmacen.trim() === ''
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
        this.almacenesService
          .editarAlmacen(this.edicionAlmacen.id, this.edicionAlmacen)
          .subscribe(
            () => {
              this.mostrarExitoActualizacionEditar();
              this.edicionAlmacen = {
                id: 0,
                nombreAlmacen: '',
                direccion: '',
                numeroAlmacen: 0,
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
  eliminarAlmacen(categoria: Almacenes): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la categoría "${categoria.nombreAlmacen}"?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && categoria.id !== undefined) {
        // Asegúrate de que idcategoria no sea undefined antes de pasarlo como argumento
        this.almacenesService.eliminarAlmacen(categoria.id).subscribe(
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
