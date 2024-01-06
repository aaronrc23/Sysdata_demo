import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Almacenes } from 'src/app/mantenimiento/Interface/Almacenes';
import { ProductoSimple } from 'src/app/mantenimiento/Interface/ProductoSimple';
import { Productos } from 'src/app/mantenimiento/Interface/Productos';
import { Proveedores } from 'src/app/mantenimiento/Interface/Proveedores';
import { GEntradaRequest } from 'src/app/mantenimiento/Interface/request/GentradaRequest';
import { ProductoDto } from 'src/app/mantenimiento/Interface/request/Productodto';
import { AlmacenesService } from 'src/app/mantenimiento/service/almacenes.service';
import { EntradaService } from 'src/app/mantenimiento/service/entrada.service';
import { ProveedoresService } from 'src/app/mantenimiento/service/proveedores.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-add-salida',
  templateUrl: './add-salida.component.html',
  styleUrls: ['./add-salida.component.scss'],
})
export class AddSalidaComponent implements OnInit {

  modalVisible: boolean = false;

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }


  proveedores: Proveedores[] = [];
  almacenes: Almacenes[] = [];
  productos: Productos[] = [];
  products: ProductoSimple[] = [];
  productosSeleccion: FormArray = this.fb.array([]);
  productosSeleccionados: ProductoDto[] = [];
  searchTerm: string = '';
  filteredProductos: Productos[] = [];
  productsSeleccionados: ProductoDto[] = [];
  cantidadSeleccionada: number = 1;

  /*------ Variables para el formulario ------- */
  selectEntrada: GEntradaRequest = {
    fecha: new Date(),
    proveedorId: 1,
    almacenId: 1,
    productos: [],
    cantidadtotal: 0,
    preciototal: 0,
    numeroserie: '',
  };

  /*--Array--*/
  entradaForm: FormGroup = this.fb.group({
    fecha: [null, Validators.required],
    proveedorId: [null, Validators.required],
    almacenId: [null, Validators.required],
    productos: this.fb.array([]),
    productosSeleccionados: this.fb.array([]),
    codigo_barra: [null], // Agrega el control 'codigo_barra'
    nombre: [null], // Agrega el control 'nombre'
    precio_venta: [null], // Agrega el control 'precio_venta'
    cantidad: [null],
  });

  ngOnInit(): void {
    this.obtenerProveedores();
    this.obtenerAlmacenes();
  }
  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedoresService,
    private almacenService: AlmacenesService,
    private entradaService: EntradaService
  ) {}

  obtenerProveedores() {
    this.proveedorService.getProveedores().subscribe((proveedor) => {
      this.proveedores = proveedor;
    });
  }
  obtenerAlmacenes() {
    this.almacenService.listarAlmacenes().subscribe((almacenes) => {
      this.almacenes = almacenes;
    });
  }

  filterProductos() {
    if (this.searchTerm.trim() === '') {
      this.filteredProductos = [];
    } else {
      this.filteredProductos = this.productos.filter(
        (producto) =>
          producto.nombre
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          producto.codigo_barra.includes(this.searchTerm)
      );
    }
  }

  limpiarModal() {
    this.modalVisible = false;
    this.searchTerm = '';
    this.filteredProductos = [];
    this.cantidadSeleccionada = 1;
  }

  guardarEntrada() {
    if (
      this.selectEntrada.proveedorId === null ||
      this.selectEntrada.almacenId === null
    ) {
     
      this.mostrarAlerta('error', 'Selecciona un proveedor y un almacén antes de guardar.');
      return;
    }

    // Continúa con el proceso de guardar la entrada.
    // Llama al servicio o realiza la lógica necesaria aquí.
    this.entradaService.crearEntrada(this.selectEntrada).subscribe(
      (response) => {
        // Éxito: realiza acciones adicionales si es necesario
        console.log('Entrada guardada exitosamente.', response);
      },
      (error) => {
        // Manejo de errores: muestra alertas o toma acciones específicas en caso de error
        console.error('Error al guardar la entrada.', error);
      }
    );
  }

  mostrarAlerta(icon: SweetAlertIcon, text: string) {
    Swal.fire({
      icon: icon,
      title: text,
      confirmButtonText: 'Entendido',
    });
  }

  agregarProducto() {
    if (this.filteredProductos.length > 0) {
      // Agrega el primer producto de la lista filtrada a la lista de productos seleccionados
      const productoSeleccionado: ProductoDto = {
        idproducto: this.filteredProductos[0].idproducto,
        nombre: this.filteredProductos[0].nombre,
        codigo_barra: this.filteredProductos[0].codigo_barra,
        cantidad: this.cantidadSeleccionada,
        imagen: this.filteredProductos[0].imagen,
        // cantidadprod: this.cantidadSeleccionada,
        preciocompra: this.filteredProductos[0].precio_compra
      };
  
      const index = this.productosSeleccionados.findIndex(
        (prod) => prod.idproducto === productoSeleccionado.idproducto
      );
  
      if (index !== -1) {
        // Verificar si la propiedad cantidad existe antes de actualizarla
        if ('cantidad' in this.productosSeleccionados[index]) {
          this.productosSeleccionados[index].cantidad += this.cantidadSeleccionada;
        } else {
          // Si la propiedad cantidad no existe, asignar la cantidadSeleccionada
          this.productosSeleccionados[index].cantidad = this.cantidadSeleccionada;
        }
      } else {
        // Si el producto no está en la lista, agrégalo
        this.productosSeleccionados.push(productoSeleccionado);
      }
  
      this.limpiarModal();
    } else {
      // Muestra la alerta con SweetAlert2
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Debes seleccionar un producto antes de agregarlo.',
        confirmButtonText: 'Entendido'
      });
    }
  }
  eliminarProducto(index: number) {
    // Elimina un producto de la lista de productos seleccionados
    // this.productosSeleccionados.splice(index, 1);
  }
}
