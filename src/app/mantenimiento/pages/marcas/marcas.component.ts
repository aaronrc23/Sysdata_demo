import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //recuperar los parametro
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcasService } from '../../service/marcas.service';
import { Marcas } from '../../Interface/Marcas';
import { AddEditCatMarComponent } from '../../components/add-edit-cat-mar/add-edit-cat-mar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent implements OnInit {
  
  /*------------------------------Table de marcas-----------------------------------*/
  /*Pagination*/
  first = 0;
  rows = 10;
  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  
  constructor(
    private marcasService: MarcasService
  ) {}

  /*----------Listar Marcas-------------*/
  obtenerMarcas() {
    this.marcasService.getMarcas().subscribe((marca) => {
      this.marcas = marca;
    });
  }
  marcas: Marcas[] = [];
  

  ngOnInit(): void {
    this.marcasService.getMarcas().subscribe((marcas) => {
      this.marcas = marcas;
      console.log('Marcas obtenidas:', marcas);
    });
  }

  /*------------------------------Registrar-----------------------------------*/
  nuevaMarca: Marcas = {
    idmarca: 0,
    nombre: '',
  };
  @ViewChild('nombreInput') nombreInput: any;

  
  /*---Modal-----*/
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  

  /*------------------------------Metodo para Registrar Marca-----------------------------------*/
  registrarMarca(): void {
    const marcaExistente = this.marcaYaRegistrada();

    if (marcaExistente) {
      this.mostrarErrorMarcaExistente();
    } else {
      this.mostrarConfirmacionRegistro();
    }
  }

  private marcaYaRegistrada(): boolean {
    return !!this.marcas.find((c) => c.nombre === this.nuevaMarca.nombre);
  }

  private mostrarErrorMarcaExistente(): void {
    this.visible = false;
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `La categoría "${this.nuevaMarca.nombre}" ya está registrada.`,
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
        this.enviarSolicitudRegistro();
      } else {
        this.nombreInput.nativeElement.value = '';
      }
    });
  }

  private enviarSolicitudRegistro(): void {
    this.marcasService.registrarMarca(this.nuevaMarca).subscribe(
      () => {
        this.mostrarExitoRegistro();
        this.restablecerInput();
        this.obtenerMarcas();
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

  private restablecerInput(): void {
    this.nombreInput.nativeElement.value = '';
  }

  /*----------------------------------------------------------------*/


  /*---------------------------Editar Marca-------------------------------------*/

  @ViewChild('nombreditInput') nombreditInput: any;
 // Nueva función para manejar la edición
 marcaSeleccionada: Marcas | null = null;
 handleEditClick(marca: Marcas) {
  this.marcaSeleccionada = { ...marca }; // Copia la marca para evitar cambios no deseados
  // Actualiza el valor del input con el nombre de la marca seleccionada
  this.nombreditInput.nativeElement.value = marca.nombre;
}

// editarMarca() {
//   if (this.marcaSeleccionada) {
//     const idMarca = this.marcaSeleccionada.idmarca || 0;

//     this.marcasService.editarMarca(idMarca, this.marcaSeleccionada).subscribe(
//       (respuesta: string) => {
//         console.log('Respuesta del servidor:', respuesta);
//         this.obtenerMarcas();
//         this.limpiarFormulario();
//       },
//       (error) => {
//         console.error('Error al editar la marca:', error);
//       }
//     );
//   }
// }

editarMarca() {
  if (this.marcaSeleccionada) {
    const idMarca = this.marcaSeleccionada.idmarca || 0;
    this.marcasService.editarMarca(idMarca, this.marcaSeleccionada).subscribe(
      () => {
        console.log('Marca editada con éxito');
        this.obtenerMarcas(); // Vuelve a cargar las marcas después de la edición
        this.limpiarFormulario(); // Limpia el formulario después de la edición
      },
      (error) => {
        console.error('Error al editar la marca:', error);
      }
    );
  }
}

// Nueva función para limpiar el formulario después de la edición
limpiarFormulario() {
  this.marcaSeleccionada = null;
  this.nombreInput.nativeElement.value = '';
}

  
  
  
}
