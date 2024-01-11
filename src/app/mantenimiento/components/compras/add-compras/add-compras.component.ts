import { Component, OnInit } from '@angular/core';
import { Almacenes } from 'src/app/mantenimiento/Interface/Almacenes';
import { Productos } from 'src/app/mantenimiento/Interface/Productos';
import { Proveedores } from 'src/app/mantenimiento/Interface/Proveedores';
import { GEntradaRequest } from 'src/app/mantenimiento/Interface/request/GentradaRequest';
import { ProductoDto } from 'src/app/mantenimiento/Interface/request/Productodto';
import { AlmacenesService } from 'src/app/mantenimiento/service/almacenes.service';
import { EntradaService } from 'src/app/mantenimiento/service/entrada.service';
import { ProductoService } from 'src/app/mantenimiento/service/producto.service';
import { ProveedoresService } from 'src/app/mantenimiento/service/proveedores.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import {MatIconModule} from '@angular/material/icon';
import { faPlus } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-add-compras',
  templateUrl: './add-compras.component.html',
  styleUrls: ['./add-compras.component.scss'],
})
export class AddComprasComponent implements OnInit {
  faPlus = faPlus;
  modalVisible: boolean = false;

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  productos: Productos[] = [];
  proveedores: Proveedores[] = [];
  almacenes: Almacenes[] = [];
  searchTerm: string = '';
  filteredProductos: Productos[] = [];
  productosSeleccionados: ProductoDto[] = [];
  cantidadSeleccionada: number = 1;

  precioCompraSeleccionado: number = 0; // Inicialízalo con el valor que desees


  constructor(
    private productoService: ProductoService,
    private entradaService: EntradaService,
    private proveedorService: ProveedoresService,
    private almacenService: AlmacenesService
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.obtenerProveedores();
    this.obtenerAlmacenes();
    this.productoService.products$.subscribe((products: Productos[]) => {
      this.productos = products;
      // Actualiza la lista de productos para la página actual después de recibir cambios
    });
  }

  getProductList() {
    this.productoService.getProducts().subscribe((data) => {
      this.productos = data;
      this.filterProductos();
    });
  }
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
    this.precioCompraSeleccionado = 0;

  }

  agregarProducto() {
    if (this.filteredProductos.length > 0) {

      const productoSeleccionado: ProductoDto = {
        idproducto: this.filteredProductos[0].idproducto,
        nombre: this.filteredProductos[0].nombre,
        codigo_barra: this.filteredProductos[0].codigo_barra,
        cantidad: this.cantidadSeleccionada, // <-- Utiliza la variable correcta aquí
        imagen: this.filteredProductos[0].imagen,
        // cantidadprod: this.cantidadSeleccionada,
        preciocompra: this.precioCompraSeleccionado,
      };

      const index = this.productosSeleccionados.findIndex(
        (prod) => prod.idproducto === productoSeleccionado.idproducto
      );
      // Actualiza el proveedor y el almacén en el objeto de entrada
      this.entrada.proveedorId = this.selectedProveedorId;
      this.entrada.almacenId = this.selectedAlmacenId;

      if (index !== -1) {
       // Si el producto ya está en la lista, actualiza la cantidad
       this.productosSeleccionados[index].cantidad = this.cantidadSeleccionada;
      } else {
         // Si el producto no está en la lista, agrégalo
         this.productosSeleccionados.push(productoSeleccionado);
      }
  
      // Actualiza la referencia al array de productos en el objeto entrada
      this.entrada.productos = [...this.productosSeleccionados]; // Utiliza el spread operator para copiar el array
  
      // Calcula la cantidad total antes de guardar la entrada
      this.entrada.cantidadtotal = this.calcularCantidadTotal();
  
      this.limpiarModal();
    } else {
      // Muestra la alerta con SweetAlert2
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Debes seleccionar un producto antes de agregarlo.',
        confirmButtonText: 'Entendido',
      });
    }
  }
  selectedProveedorId: number | null = null;
  selectedAlmacenId: number | null = null;
  entrada: GEntradaRequest = {
    fecha: new Date(),
    proveedorId: null, // o cualquier otro valor inicial que desees
    almacenId: null, // o cualquier otro valor inicial que desees
    productos: this.productosSeleccionados,
    cantidadtotal: this.calcularCantidadTotal(),
    preciototal: 0,
    numeroserie  : "",
  };

  guardarEntrada() {
    if (this.selectedProveedorId === null || this.selectedAlmacenId === null) {
      this.mostrarAlerta(
        'error',
        'Selecciona un proveedor y un almacén antes de guardar.'
      );
      return;
    }

    // Actualiza el proveedor y el almacén en el objeto de entrada
    this.entrada.proveedorId = this.selectedProveedorId;
    this.entrada.almacenId = this.selectedAlmacenId;

    // // Calcula la cantidad total antes de guardar la entrada
    // this.entrada.cantidadtotal = this.calcularCantidadTotal();

    // Continúa con el proceso de guardar la entrada.
    // Llama al servicio o realiza la lógica necesaria aquí.
    this.entradaService.crearEntrada(this.entrada).subscribe(
      (response) => {
        // Éxito: realiza acciones adicionales si es necesario
        console.log('Entrada guardada exitosamente.', response);
      },
      (error) => {
        // Manejo de errores: muestra alertas o toma acciones específicas en caso de error
        console.error('Error al guardar la entrada.', error);
      }
    );

    this.limpiarFormulario();
  }

  mostrarAlerta(icon: SweetAlertIcon, text: string) {
    Swal.fire({
      icon: icon,
      title: text,
      confirmButtonText: 'Entendido',
    });
  }
  eliminarProducto(index: number) {
    // Elimina un producto de la lista de productos seleccionados
    this.productosSeleccionados.splice(index, 1);
  }
  limpiarFormulario() {
    this.selectedProveedorId = null;
    this.selectedAlmacenId = null;
    this.productosSeleccionados = [];
    this.searchTerm = '';
    this.filteredProductos = [];
    this.cantidadSeleccionada = 1;
    
  }

  // Nueva función para calcular la cantidad total
  calcularCantidadTotal(): number {
    return this.productosSeleccionados.reduce((total, producto) => total + producto.cantidad, 0);
  }
  calcularPrecioTotal(): number {
    return this.productosSeleccionados.reduce((total, producto) => {
      return total + producto.cantidad * producto.preciocompra;
    }, 0);
  }
}
