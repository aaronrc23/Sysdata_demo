import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Almacenes } from 'src/app/mantenimiento/Interface/Almacenes';
import { Stock } from 'src/app/mantenimiento/Interface/ProductoStock';
import { Productos } from 'src/app/mantenimiento/Interface/Productos';
import { DetalleMovimientoDto } from 'src/app/mantenimiento/Interface/movimiento-almacen/DetalleMovimientoDTO';
import { MovimientoDTO } from 'src/app/mantenimiento/Interface/movimiento-almacen/MovimientoDTO';
import { ProductoDto } from 'src/app/mantenimiento/Interface/request/Productodto';
import { MovimientoAlmacenService } from 'src/app/mantenimiento/service/MovimientoAlmacen/movimiento-almacen.service';
import { AlmacenesService } from 'src/app/mantenimiento/service/almacenes.service';
import { ProductoService } from 'src/app/mantenimiento/service/producto.service';
import { ProductoStockService } from 'src/app/mantenimiento/service/productoStock/producto-stock.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-add-movimiento-almacen',
  templateUrl: './add-movimiento-almacen.component.html',
  styleUrls: ['./add-movimiento-almacen.component.scss'],
})
export class AddMovimientoAlmacenComponent implements OnInit {
  modalVisible: boolean = false;

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  productos: Productos[] = [];
  almacenes: Almacenes[] = [];
  searchTerm: string = '';
  filteredProductos: Productos[] = [];
  productosSeleccionados: ProductoDto[] = [];
  cantidadSeleccionada: number = 1;
  productosSeleccionados1: DetalleMovimientoDto[] = [];
  stocks: Stock[] = [];
  precioCompraSeleccionado: number = 0;

  detallemovimiento:DetalleMovimientoDto[] = [];
  filteredProductos1: DetalleMovimientoDto[] = [];


  constructor(
    private productoService: ProductoService,
    private movimientoService: MovimientoAlmacenService,
    private productoStock: ProductoStockService,
    private almacenService: AlmacenesService
  ) {}

  ngOnInit(): void {
    this.getProductList();
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
 
  getProductStock() {
    this.productoStock.getProductoStock().subscribe((stocks) => {
      this.stocks = stocks;
    });
  }
  obtenerAlmacenes() {
    this.almacenService.listarAlmacenes().subscribe((almacenes) => {
      this.almacenes = almacenes;
    });
  }

  actualizarAlmacenOrigen() {
    this.movimiento.idAlmacenOrigen = this.selectedAlmacenOrigenId;
  }

  // Nueva función para actualizar el almacén de destino
  actualizarAlmacenDestino() {
    this.movimiento.idAlmacenDestino = this.selectedAlmacenDestinoId;
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

  agregarProducto() {
    if (this.filteredProductos.length > 0) {

      const productoSeleccionado: DetalleMovimientoDto = {
        idProducto: this.filteredProductos[0].idproducto,
        nombre: this.filteredProductos[0].nombre,
        codigo_barra: this.filteredProductos[0].codigo_barra,
        cantidad: this.cantidadSeleccionada, // <-- Utiliza la variable correcta aquí
        imagen: this.filteredProductos[0].imagen,
        // cantidadprod: this.cantidadSeleccionada,
        preciocompra: this.precioCompraSeleccionado, 
      };

      const index = this.productosSeleccionados.findIndex(
        (prod) => prod.idproducto === productoSeleccionado.idProducto
      );
      // Actualiza el proveedor y el almacén en el objeto de entrada
      this. movimiento.idAlmacenOrigen = this.selectedAlmacenOrigenId;
      this. movimiento.idAlmacenDestino = this.selectedAlmacenDestinoId;

      if (index !== -1) {
       // Si el producto ya está en la lista, actualiza la cantidad
       this.productosSeleccionados[index].cantidad = this.cantidadSeleccionada;
      } else {
         // Si el producto no está en la lista, agrégalo
         this.productosSeleccionados.push(productoSeleccionado);
      }
  
      // Actualiza la referencia al array de productos en el objeto entrada
      this.movimiento.detalles = [...this.productosSeleccionados]; // Utiliza el spread operator para copiar el array
  
    
  
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
  selectedAlmacenOrigenId: number | null = null;
  selectedAlmacenDestinoId: number | null = null;

  movimiento: MovimientoDTO = {
    fecha: new Date(),
    dirPartida: '',
    dirLlegada: '',
    motivoTraslado: '',
    idAlmacenOrigen: null,
    idAlmacenDestino: null,
    detalles: this.productosSeleccionados1,
  };

  

  guardarEntrada() {
    

    // Actualiza el proveedor y el almacén en el objeto de entrada
    this.movimiento.idAlmacenOrigen = this.selectedAlmacenOrigenId;
    this.movimiento.idAlmacenDestino = this.selectedAlmacenDestinoId;

    // // Calcula la cantidad total antes de guardar la entrada
    // this.entrada.cantidadtotal = this.calcularCantidadTotal();

    // Continúa con el proceso de guardar la entrada.
    // Llama al servicio o realiza la lógica necesaria aquí.
    this.movimientoService.registrarMovimiento(this.movimiento).subscribe(
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
    this.selectedAlmacenOrigenId = null;
    this.selectedAlmacenDestinoId = null;
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
