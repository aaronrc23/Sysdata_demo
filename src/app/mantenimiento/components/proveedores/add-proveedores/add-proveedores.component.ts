import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedores } from 'src/app/mantenimiento/Interface/Proveedores';
import { ProveedoresService } from 'src/app/mantenimiento/service/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-proveedores',
  templateUrl: './add-proveedores.component.html',
  styleUrls: ['./add-proveedores.component.scss']
})
export class AddProveedoresComponent implements OnInit {

  modalVisible: boolean = false;
  visible = false;

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }



  proveedor: Proveedores[] = [];

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

  constructor(private proveedorService: ProveedoresService) {}

  ngOnInit(): void {
    this.obtenerProveedor();
  }

   /*-----Metodo listar----- */
   obtenerProveedor() {
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
      text: `El Proveedor "${this.nuevaProveedor.nombre_prov}" ya está registrado.`,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.visible = true;
      }
    });
  }

  @ViewChild('nombreInput') nombreInput: any;


  private mostrarConfirmacionRegistro(): void {
    this.visible = false;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas registrar este Proveedor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.registrarProveedores();
        
      } else {
        this.nombreInput.nativeElement.value = '';
      }
    });
  }


  private registrarProveedores(): void {
    this.proveedorService.registrarProveedores(this.nuevaProveedor).subscribe(
      () => {
        this.mostrarExitoRegistro();
        this.nombreInput.nativeElement.value = '';
        this.obtenerProveedor();
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
    this.nuevaProveedor = {
      id_proveedores: 0,
      nombre_prov: '',
      numruc: '',
      direccion: '',
      telefono: 0,
      email: '',
      activo: true,
    };
  }


}
