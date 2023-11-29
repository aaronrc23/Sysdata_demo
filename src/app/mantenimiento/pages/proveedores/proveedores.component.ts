import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedores } from '../../Interface/Proveedores';
import { ProveedoresService } from '../../service/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  checked: boolean = true;
  visible = false;
  position: string = 'center';
  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }

  /*---Variables------ */
  nuevaProveedor: Proveedores = {
    id_proveedores: 0,
    nombre_prov: '',
    numruc: '',
    direccion: '',
    telefono: 0,
    email: '',
    activo: true,
  };

  edicionProveedor: Proveedores = {
    id_proveedores: 0,
    nombre_prov: '',
    numruc: '',
    direccion: '',
    telefono: 0,
    email: '',
    activo: true,
  };
  
  

  /*--Array--*/
  proveedor:Proveedores[] = [];


  
  
  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }
  /*Pagination*/
  first = 0;
  rows = 10;
 
  constructor(private proveedorService: ProveedoresService) {}



  ngOnInit(): void {
    this.obtenerUnidad();
  }

  /*------Agregar----- */


  /*---Metodos------ */
  /*-----Metodo listar----- */
  obtenerUnidad() {
    this.proveedorService.getProveedores().subscribe(
      (almacenes) => {
        this.proveedor = almacenes;
        console.log('Unidad obtenidas:', almacenes);
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  @ViewChild('nombreInput') nombreInput: any;

  crearUnidad(): void {
    const unidadExistente = this.proveedor.find(c => c.nombre_prov === this.nuevaProveedor.nombre_prov);
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
      text: `La categoría "${this.nuevaProveedor.nombre_prov}" ya está registrada.`,
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
  unidadForm: any;

  private registrarCategoria(): void {
    this.proveedorService.registrarProveedores(this.nuevaProveedor).subscribe(
      () => {
        this.mostrarExitoRegistro();
        this.nombreInput.nativeElement.value = '';
          // Resetear el formulario después de la creación exitosa
        if (this.unidadForm) {
          this.unidadForm.resetForm();
        }

        // Utilizar el método para reiniciar nuevaProveedor
        this.reiniciarNuevaProveedor();

        this.obtenerUnidad();
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




  editarUnidad(unidad: Proveedores): void {
    console.log('ID de la unidad a editar:', unidad.id_proveedores);
    this.edicionProveedor = { ...unidad };
    this.mostrarModalEdicion = true;
  }
  mostrarModalEdicion = false;

  actualizarUnidad(): void {
    // Verificar si categoriaEnEdicion está definido y si su propiedad nombre es válida antes de la actualización
    if (!this.edicionProveedor || !this.edicionProveedor.nombre_prov || this.edicionProveedor.nombre_prov.trim() === '') {
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
        this.proveedorService.editarProveedores(this.edicionProveedor.id_proveedores, this.edicionProveedor).subscribe(
          () => {
            this.mostrarExitoActualizacionEditar();
            this.edicionProveedor = { id_proveedores: 0,nombre_prov: '',numruc:'', direccion: '', telefono  : 0,email: '', activo: true };  // Reinicializa la categoría en edición
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
  eliminarUnidad(unidad: Proveedores): void {
    if (unidad.activo) {
      // Si la unidad está activa, mostrar un mensaje indicando que no se puede eliminar
      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar',
        text: `La unidad "${unidad.nombre_prov}" está activa. Desactívala antes de eliminar.`,
      });
    } else {
      // Si la unidad está desactivada, mostrar el mensaje de confirmación para eliminar
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la unidad "${unidad.nombre_prov}"?`,
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed && unidad.id_proveedores !== undefined) {
          this.proveedorService.eliminarProveedores(unidad.id_proveedores).subscribe(
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

  
  @ViewChild('numrucInput') numrucInput: any;

  private reiniciarNuevaProveedor(): void {
    this.nuevaProveedor = {
      id_proveedores: 0,
      nombre_prov: '',
      numruc: '',
      direccion: '',
      telefono: 0,
      email: '',
      activo: true,
    };
     // Reiniciar el estado de validación del formulario
  if (this.unidadForm) {
    this.unidadForm.resetForm();

     // Opcionalmente, puedes reiniciar el estado de validación de campos individuales si es necesario
     if (this.numrucInput) {
      this.numrucInput.control.reset();
    }
    // Repite este bloque para otros campos si es necesario
  }
  }
}
