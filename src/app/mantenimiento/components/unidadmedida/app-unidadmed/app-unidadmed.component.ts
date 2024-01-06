import { Component, ViewChild } from '@angular/core';
import { UnidadMedida } from 'src/app/mantenimiento/Interface/UnidadMedida';
import { UnidaMedidaService } from 'src/app/mantenimiento/service/unida-medida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-unidadmed',
  templateUrl: './app-unidadmed.component.html',
  styleUrls: ['./app-unidadmed.component.scss']
})
export class AppUnidadmedComponent {

  modalVisible: boolean = false;

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  
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


  
  /*--Array--*/
  unidad:UnidadMedida[] = [];


  
  
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
      (unidades) => {
        this.unidad = unidades;
        console.log('Unidad obtenidas:', unidades);
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  @ViewChild('nombreInput') nombreInput: any;

  crearUnidad(): void {
    const unidadExistente = this.unidad.find(c => c.nombre === this.nuevaUnidad.nombre);
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
      text: `La Unidad de Medida "${this.nuevaUnidad.nombre}" ya está registrada.`,
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
      text: '¿Deseas registrar esta Unidad?',
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
        this.closeModal();
        this.borrarInputs();
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
      title: 'Almacen creada con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
  }


  private borrarInputs(): void {
    this.nuevaUnidad = {
      id_umd: 0,
      nombre: '',
      abreviacion: '',
      valor: 0,
      activo: true,
    };
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

}
