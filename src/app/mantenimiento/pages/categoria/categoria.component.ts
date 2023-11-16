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
  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  constructor(private categoriaService: CategoriaServiceService) {
    
  }
  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      console.log('Categorías obtenidas:', categorias);
    }, (error) => {
      console.error('Error al cargar las categorías:', error);
    });


     this.categoriaService.categorias$.subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }





  /*--------Registro de Categorías----------*/
  showDialog() {
    this.visible = true;
  }
  nuevaCategoria: Categoria = {
    nombre: '',
    activo: true,
  };
  @ViewChild('nombreInput') nombreInput: any;

  visible: boolean = false;

  crearCategoria(): void {
    // Verifica si la categoría ya existe en la lista actual de categorías
    const categoriaExistente = this.categorias.find(
      (c) => c.nombre === this.nuevaCategoria.nombre
    );

    if (categoriaExistente) {
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
    } else {
      this.visible = false;
      // Muestra el SweetAlert2 de confirmación
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas registrar esta categoría?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, registrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Sí, registrar", por lo que enviamos la solicitud al servidor

          this.categoriaService.registrarCategoria(this.nuevaCategoria).subscribe(
            () => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Categoría creada con éxito',
                showConfirmButton: false,
                timer: 1500,
              });
              // Restablece el valor del input a una cadena vacía
              this.nombreInput.nativeElement.value = '';
              this.obtenerCategorias();
            },
            (error) => {
              console.error('Error al crear la categoría:', error);
              // Maneja el error, si es necesario
            }
          );
        } else {
          this.nombreInput.nativeElement.value = '';
        }
      });
    }
  }

}
