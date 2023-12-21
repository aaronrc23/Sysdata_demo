import { Component, ElementRef, ViewChild } from '@angular/core';
import { Almacenes } from 'src/app/mantenimiento/Interface/Almacenes';
import { AlmacenesService } from 'src/app/mantenimiento/service/almacenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-alamacenes',
  templateUrl: './add-alamacenes.component.html',
  styleUrls: ['./add-alamacenes.component.scss']
})
export class AddAlamacenesComponent {

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
    this.nuevaAlmacen = {
      id: 0,
      nombreAlmacen: '',
      direccion: '',
      numeroAlmacen: 0,
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


