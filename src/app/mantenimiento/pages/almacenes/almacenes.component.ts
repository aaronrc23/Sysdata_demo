import { Component, OnInit, ViewChild  } from '@angular/core';
import { Almacenes } from '../../Interface/Almacenes';
import { AlmacenesService } from '../../service/almacenes.service';
import Swal from 'sweetalert2';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.scss']
})
export class AlmacenesComponent   implements OnInit{

  checked: boolean = true;
  visible = false;
  position: string = 'center';
  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }

  /*---Variables------ */
  nuevaAlmacen: Almacenes = {
    id: 0,
    nombreAlmacen: '',
    direccion: '',
    numeroAlmacen: 0,
    activo: true,
  };

  edicionAlmacen: Almacenes = {
    id: 0,
    nombreAlmacen: '',
    direccion: '',
    numeroAlmacen: 0,
    activo: true,
  };
  
  

  /*--Array--*/
  almacen:Almacenes[] = [];


  
  
  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }
  /*Pagination*/
  first = 0;
  rows = 10;
 
  constructor(private almacenesService: AlmacenesService) {}



  ngOnInit(): void {
    this.obtenerUnidad();
  }

  /*------Agregar----- */


  /*---Metodos------ */
  /*-----Metodo listar----- */
  obtenerUnidad() {
    this.almacenesService.listarAlmacenes().subscribe(
      (almacenes) => {
        this.almacen = almacenes;
        console.log('Unidad obtenidas:', almacenes);
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  @ViewChild('nombreInput') nombreInput: any;

  crearUnidad(): void {
    const unidadExistente = this.almacen.find(c => c.nombreAlmacen === this.nuevaAlmacen.nombreAlmacen);
    if (unidadExistente) {
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
      text: `La categoría "${this.nuevaAlmacen.nombreAlmacen}" ya está registrada.`,
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
    this.almacenesService.registrarAlmacen(this.nuevaAlmacen).subscribe(
      () => {
        this.mostrarExitoRegistro();
        this.nombreInput.nativeElement.value = '';
        this.obtenerUnidad();
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




  editarUnidad(unidad: Almacenes): void {
    console.log('ID de la unidad a editar:', unidad.id);
    this.edicionAlmacen = { ...unidad };
    this.mostrarModalEdicion = true;
  }
  mostrarModalEdicion = false;

  actualizarUnidad(): void {
    // Verificar si categoriaEnEdicion está definido y si su propiedad nombre es válida antes de la actualización
    if (!this.edicionAlmacen || !this.edicionAlmacen.nombreAlmacen || this.edicionAlmacen.nombreAlmacen.trim() === '') {
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
        this.almacenesService.editarAlmacen(this.edicionAlmacen.id, this.edicionAlmacen).subscribe(
          () => {
            this.mostrarExitoActualizacionEditar();
            this.edicionAlmacen = { id: 0,nombreAlmacen: '', direccion: '', numeroAlmacen: 0, activo: true };  // Reinicializa la categoría en edición
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

  onSwitchChange(newStatus: boolean): void {
    // `newStatus` contendrá el nuevo estado (true o false) del switch
    console.log('Nuevo estado:', newStatus);

    // Aquí puedes realizar acciones adicionales según sea necesario
    // Por ejemplo, puedes llamar a tu función para desactivar/activar la unidad
    if (newStatus) {
        this.activarUnidad(); // Supongamos que tienes una función para activar la unidad
    } else {
        this.desactivarUnidad(); // Supongamos que tienes una función para desactivar la unidad
    }
}

activarUnidad(): void {
    // Lógica para activar la unidad
}

desactivarUnidad(): void {
    // Lógica para desactivar la unidad
}

  /*---------- Eliminar Unidades----------- */
  eliminarUnidad(unidad: Almacenes): void {
    if (unidad.activo) {
      // Si la unidad está activa, mostrar un mensaje indicando que no se puede eliminar
      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar',
        text: `La unidad "${unidad.nombreAlmacen}" está activa. Desactívala antes de eliminar.`,
      });
    } else {
      // Si la unidad está desactivada, mostrar el mensaje de confirmación para eliminar
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la unidad "${unidad.nombreAlmacen}"?`,
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed && unidad.id !== undefined) {
          this.almacenesService.eliminarAlmacen(unidad.id).subscribe(
            () => {
              this.mostrarExitoEliminacion();
              this.obtenerUnidad();
            },
            (error) => {
              console.error('Error al eliminar la unidad:', error);
            }
          );
        }
      });
    }
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
