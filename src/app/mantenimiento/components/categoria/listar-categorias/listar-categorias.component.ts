import { Component, ViewChild,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/app/mantenimiento/Interface/Categorias';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';
import Swal from 'sweetalert2';
import { RangePipe } from 'src/app/mantenimiento/pipe/categoriapipe';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit {

  @ViewChild('categoriasForm') categoriasForm: NgForm | undefined;

  categoriaEnEdicion: Categoria = {idcategoria: 0, nombre: '', activo: true }; 

  categorias: Categoria[] = [];
  /*----pagination-------- */
  itemsPerPage = 10;
  currentPage = 1;
  itemsPerPageOptions = [5, 8, 10]; // Puedes agregar más opciones según tus necesidades

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reinicia la página actual al cambiar la cantidad de elementos por página
  }
  
  get totalPages(): number {
    return Math.ceil(this.categorias.length / this.itemsPerPage);
  }

  // Método que devuelve las categorías para la página actual
  getCategoriasPaginadas(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.categorias.slice(startIndex, endIndex);
  }

  // Método que maneja el cambio de página
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    // ...otras acciones que puedan ser necesarias
  }

  /*------end Pagination-------- */

/*-------Pagination---------- */
  searchTerm: string = '';  // Inicializa el término de búsqueda
  filteredCategorias: Categoria[] = []; 


  onSearchTermChange(): void {
    this.filteredCategorias = this.filterCategorias(); 
  }

  private filterCategorias(): Categoria[] {
    return this.categorias.filter(categoria =>
      categoria.nombre && categoria.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /*-------End Pagination---------- */

  constructor(private categoriaService: CategoriaServiceService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.categoriaService.categorias$.subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }

  abrirModalEdicion(categoria: Categoria): void {
    this.categoriaEnEdicion = { ...categoria };
    this.mostrarModalEdicion = true;
  }
  

  /*-----------------Metodos Categorias----------------*/ 

  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      console.log('Categorías obtenidas:', categorias);
    }, (error) => {
      console.error('Error al cargar las categorías:', error);
    });
  }
/*-----------*/
mostrarModalEdicion = false;

  
  /*---------- Actualizar Categorias-----------*/
  actualizarCategoria(): void {
    if (!this.categoriaEnEdicion || !this.categoriaEnEdicion.nombre || this.categoriaEnEdicion.nombre.trim() === '') {
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
        this.categoriaService.editarCategoria(this.categoriaEnEdicion).subscribe(
          () => {
            this.mostrarExitoActualizacionEditar();
            this.categoriaEnEdicion = {idcategoria: 0,    nombre: '', activo: true };  // Reinicializa la categoría en edición
            this.obtenerCategorias();
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
eliminarCategoria(categoria: Categoria): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar la categoría "${categoria.nombre}"?`,
    icon: "error",
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed && categoria.idcategoria !== undefined) {
      // Asegúrate de que idcategoria no sea undefined antes de pasarlo como argumento
      this.categoriaService.eliminarCategoria(categoria.idcategoria).subscribe(
        () => {
          this.mostrarExitoEliminacion();
          this.obtenerCategorias();
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
