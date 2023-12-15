import { Component, ViewChild } from '@angular/core';
import { Empresas } from 'src/app/mantenimiento/Interface/Empresas';
import { EmpresasService } from 'src/app/mantenimiento/service/empresasService/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-empresas',
  templateUrl: './agregar-empresas.component.html',
  styleUrls: ['./agregar-empresas.component.scss'],
})
export class AgregarEmpresasComponent {
  checked: boolean = true;
  visible = false;
  position: string = 'center';
  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }

  empresa: Empresas[] = [];

  constructor(private empresaservice: EmpresasService) {}
  nuevaEmpresa: Empresas = {
    id_empresa: 0,
    ruc: 0,
    direccion: '',
    propietario: '',
    activo: true,
  };

  @ViewChild('nombreInput') nombreInput: any;

  crearUnidad(): void {
    const unidadExistente = this.empresa.find(c => c.ruc=== this.nuevaEmpresa.ruc);
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
      text: `La categoría "${this.nuevaEmpresa.direccion}" ya está registrada.`,
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


  private registrarCategoria(): void {
    this.empresaservice.registrarUnidadMedida(this.nuevaEmpresa).subscribe(
      () => {
        this.mostrarExitoRegistro();
        this.nombreInput.nativeElement.value = '';
        this.obtenerListaEmpresas();
        this.BorrarFormulario();
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
  private BorrarFormulario(): void {
    this.nuevaEmpresa = {
      id_empresa: 0,
      direccion: '',
      propietario: '',
      ruc: 0,
      activo: true,
    };
  }
}
