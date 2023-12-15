import { Component } from '@angular/core';
import { Empresas } from 'src/app/mantenimiento/Interface/Empresas';
import { EmpresasService } from 'src/app/mantenimiento/service/empresasService/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss'],
})
export class ListaEmpresasComponent {
  empresa: Empresas[] = [];

  constructor(private empresaservice: EmpresasService) {}

  /*------Metodos------ */
  obtenerListaEmpresas() {
    this.empresaservice.listarEmpresa().subscribe(
      (empresas) => {
        this.empresa = empresas;
        console.log('PEmpresas obtenidos:', empresas);
      },
      (error) => {
        console.error('Error al cargar los proveedores:', error);
      }
    );
  }

  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }
  /*Pagination*/
  first = 0;
  rows = 10;

  ngOnInit(): void {
    this.obtenerListaEmpresas();
  }

  

  edicionEmpresa: Empresas = {
    id_empresa: 0,
    ruc: 0,
    direccion: '',
    propietario: '',
    activo: true,
  };

  onSwitchChange(newStatus: boolean): void {
    console.log('Nuevo estado:', newStatus);

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

  editarUnidad(empresa: Empresas): void {
    console.log('ID de la unidad a editar:', empresa.id_empresa);
    this.edicionEmpresa = { ...empresa };
    this.mostrarModalEdicion = true;
  }

  mostrarModalEdicion = false;

  actualizarEmpresa(): void {
    if (
      !this.edicionEmpresa ||
      !this.edicionEmpresa.direccion ||
      this.edicionEmpresa.direccion.trim() === ''
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
        this.empresaservice
          .editarAlmacen(this.edicionEmpresa.id_empresa, this.edicionEmpresa)
          .subscribe(
            () => {
              this.mostrarExitoActualizacionEditar();
              this.edicionEmpresa = {
                id_empresa: 0,
                direccion: '',
                propietario: '',
                ruc: 0,
                activo: true,
              }; // Reinicializa la categoría en edición
              this.obtenerListaEmpresas();
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




  /*------------Eliminar-------------- */
  /*---------- Eliminar Unidades----------- */
  eliminarEmpresa(unidad: Empresas): void {
    if (unidad.activo) {
      // Si la unidad está activa, mostrar un mensaje indicando que no se puede eliminar
      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar',
        text: `La unidad "${unidad.direccion}" está activa. Desactívala antes de eliminar.`,
      });
    } else {
      // Si la unidad está desactivada, mostrar el mensaje de confirmación para eliminar
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la unidad "${unidad.direccion}"?`,
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed && unidad.id_empresa !== undefined) {
          this.empresaservice.eliminarAlmacen(unidad.id_empresa).subscribe(
            () => {
              this.mostrarExitoEliminacion();
              this.obtenerListaEmpresas();
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
