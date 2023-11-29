import { Component , OnInit} from '@angular/core';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';
import { Observable } from 'rxjs';
import { Categoria } from '../../Interface/Categorias';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit{

  /*-----Visualizar Categorias-----------*/
  /*Pagination*/
  first = 0;
  rows = 10;
  categorias: Categoria[] = [];
  
  /*---------- Crear Categorias-----------*/ 
  nuevaCategoria: Categoria = { nombre: '', activo: true };
  categoriaEnEdicion: Categoria = { nombre: '', activo: true }; 
  visible = false;

  @ViewChild('nombreInput') nombreInput: any;

  constructor(private categoriaService: CategoriaServiceService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.categoriaService.categorias$.subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
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

  editarCategoria(categoria: Categoria): void {
    this.categoriaEnEdicion = { ...categoria };
    this.mostrarModalEdicion = true;
  }
  




  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  showDialog() {
    this.visible = true;
  }

  crearCategoria(): void {
    const categoriaExistente = this.categorias.find(c => c.nombre === this.nuevaCategoria.nombre);
    if (categoriaExistente) {
      this.mostrarErrorExistente();
    } else {
      this.mostrarConfirmacionRegistro();
    }
  }

  private mostrarErrorExistente(): void {
    this.visible = false;
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `La categoría "${this.nuevaCategoria.nombre}" ya está registrada.`,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.visible = true;
      }
    });
  }

  private mostrarConfirmacionRegistro(): void {
    this.visible = false;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas registrar esta categoría?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.registrarCategoria();
      } else {
        this.nombreInput.nativeElement.value = '';
      }
    });
  }

  private registrarCategoria(): void {
    this.categoriaService.registrarCategoria(this.nuevaCategoria).subscribe(
      () => {
        this.mostrarExitoRegistro();
        this.nombreInput.nativeElement.value = '';
        this.obtenerCategorias();
      },
      (error) => {
        console.error('Error al crear la categoría:', error);
      }
    );
  }

  private mostrarExitoRegistro(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Categoría creada con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  private limpiarFormulario(): void {
    this.nuevaCategoria = { nombre: '', activo: true };
  }

  /*---------- Actualizar Categorias-----------*/
  actualizarCategoria(): void {
    // Verificar si categoriaEnEdicion está definido y si su propiedad nombre es válida antes de la actualización
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
            this.categoriaEnEdicion = { nombre: '', activo: true };  // Reinicializa la categoría en edición
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
  

  private mostrarExitoActualizacion(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Categoría actualizada con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
  }



  /*-----------*/
  mostrarModalEdicion = false;


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

