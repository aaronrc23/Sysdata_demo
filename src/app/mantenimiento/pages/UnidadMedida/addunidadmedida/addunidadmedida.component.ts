  import { Component, OnInit, ViewChild } from '@angular/core';
  import { UnidadMedida } from 'src/app/mantenimiento/Interface/UnidadMedida';
  import { UnidaMedidaService } from 'src/app/mantenimiento/service/unida-medida.service';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-addunidadmedida',
    templateUrl: './addunidadmedida.component.html',
    styleUrls: ['./addunidadmedida.component.scss'],
  })
  export class AddunidadmedidaComponent implements OnInit {
    checked: boolean = true;
    visible = false;
    position: string = 'center';
    showDialog(position: string) {
      this.position = position;
      this.visible = true;
    }

    /*---Variables------ */
    nuevaUnidad: UnidadMedida = {
      id_umd: 0,
      nombre: '',
      abreviacion: '',
      valor: 0,
      activo: true,
    };

    edicionUnidad: UnidadMedida = {
      id_umd: 0,
      nombre: '',
      abreviacion: '',
      valor: 0,
      activo: true,
    };
    
    

    /*--Array--*/
    unidadesMedida: UnidadMedida[] = [];


    
    
    pageChange(event: { first: number; rows: number }) {
      this.first = event.first;
      this.rows = event.rows;
    }
    /*Pagination*/
    first = 0;
    rows = 10;
  
    constructor(private unidadMedidaService: UnidaMedidaService) {}



    ngOnInit(): void {
      this.obtenerUnidad();
    }

    /*------Agregar----- */


    /*---Metodos------ */
    /*-----Metodo listar----- */
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

    @ViewChild('nombreInput') nombreInput: any;

    crearUnidad(): void {
      const unidadExistente = this.unidadesMedida.find(c => c.nombre === this.nuevaUnidad.nombre);
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
        text: `La categoría "${this.nuevaUnidad.nombre}" ya está registrada.`,
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
      this.unidadMedidaService.registrarUnidadMedida(this.nuevaUnidad).subscribe(
        () => {
          this.mostrarExitoRegistro();
          this.nombreInput.nativeElement.value = '';
          this.obtenerUnidad();
          this.BorrarFormulario()
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




    editarUnidad(unidad: UnidadMedida): void {
      console.log('ID de la unidad a editar:', unidad.id_umd);
      this.edicionUnidad = { ...unidad };
      this.mostrarModalEdicion = true;
    }
    mostrarModalEdicion = false;

    actualizarUnidad(): void {
      // Verificar si categoriaEnEdicion está definido y si su propiedad nombre es válida antes de la actualización
      if (!this.edicionUnidad || !this.edicionUnidad.nombre || this.edicionUnidad.nombre.trim() === '') {
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
          this.unidadMedidaService.editarUnidadMedida(this.edicionUnidad.id_umd, this.edicionUnidad).subscribe(
            () => {
              this.mostrarExitoActualizacionEditar();
              this.edicionUnidad = { id_umd: 0,nombre: '', abreviacion: '', valor: 0, activo: true };  // Reinicializa la categoría en edición
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
    eliminarUnidad(unidad: UnidadMedida): void {
      if (unidad.activo) {
        // Si la unidad está activa, mostrar un mensaje indicando que no se puede eliminar
        Swal.fire({
          icon: 'error',
          title: 'No se puede eliminar',
          text: `La unidad "${unidad.nombre}" está activa. Desactívala antes de eliminar.`,
        });
      } else {
        // Si la unidad está desactivada, mostrar el mensaje de confirmación para eliminar
        Swal.fire({
          title: '¿Estás seguro?',
          text: `¿Deseas eliminar la unidad "${unidad.nombre}"?`,
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed && unidad.id_umd !== undefined) {
            this.unidadMedidaService.eliminarUnidadMedida(unidad.id_umd).subscribe(
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
    private BorrarFormulario(): void {
      this.nuevaUnidad = {
          id_umd: 0,
        nombre: '',
        abreviacion: '',
        valor: 0,
        activo: true,
      };
    }
  }
