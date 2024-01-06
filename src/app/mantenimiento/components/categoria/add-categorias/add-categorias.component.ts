import { Component, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/mantenimiento/Interface/Categorias';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-categorias',
  templateUrl: './add-categorias.component.html',
  styleUrls: ['./add-categorias.component.scss']
})
export class AddCategoriasComponent {
  Faflush = faPlus


  
  modalVisible: boolean = false;
  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
  
  categorias: Categoria[] = [];
  constructor(private categoriaService: CategoriaServiceService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.categoriaService.categorias$.subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }
  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      console.log('Categorías ob add:', categorias);
    }, (error) => {
      console.error('Error al cargar las categorías:', error);
    });
  }
  /*---------- Crear Categorias-----------*/ 
  nuevaCategoria: Categoria = {idcategoria: 0, nombre: '', activo: true };

  @ViewChild('nombreInput') nombreInput: any;
  private registrarCategoria(): void {
    this.categoriaService.registrarCategoria(this.nuevaCategoria).subscribe(
      () => {
        this.mostrarExitoRegistro();
        this.nombreInput.nativeElement.value = '';
        this.obtenerCategorias();
        this.closeModal()
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

  crearCategoria(): void {
    const categoriaExistente = this.categorias.find(c => c.nombre === this.nuevaCategoria.nombre);
    if (categoriaExistente) {
      this.mostrarErrorExistente();
    } else {
      this.mostrarConfirmacionRegistro();
    }
  }

  private mostrarErrorExistente(): void {
    this.modalVisible = false;
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `La categoría "${this.nuevaCategoria.nombre}" ya está registrada.`,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalVisible = true;
      }
    });
  }

  private mostrarConfirmacionRegistro(): void {
    this.modalVisible = false;
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


}
