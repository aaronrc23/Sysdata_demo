import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntradaService } from 'src/app/mantenimiento/service/entrada.service';
import {
  faClinicMedical,
  faTruck,
  faBarcode,
} from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/mantenimiento/Interface/Categorias';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';
import { Proveedores } from 'src/app/mantenimiento/Interface/Proveedores';
import { ProveedoresService } from 'src/app/mantenimiento/service/proveedores.service';
import { Productos } from 'src/app/mantenimiento/Interface/Productos';
import { CarritoService } from 'src/app/mantenimiento/service/carrito.service';
import { ProductoService } from 'src/app/mantenimiento/service/producto.service';
import { GEntradaRequest } from 'src/app/mantenimiento/Interface/request/GentradaRequest';
import { ProductoSimple } from 'src/app/mantenimiento/Interface/ProductoSimple';
import { Almacenes } from 'src/app/mantenimiento/Interface/Almacenes';
import { AlmacenesService } from 'src/app/mantenimiento/service/almacenes.service';

@Component({
  selector: 'app-entradaproducts',
  templateUrl: './entradaproducts.component.html',
  styleUrls: ['./entradaproducts.component.scss'],
})
export class EntradaproductsComponent implements OnInit {
  faClinicMedical = faClinicMedical;
  faTruck = faTruck;
  faBarcode = faBarcode;

  @ViewChild('tuInput') tuInput!: ElementRef;

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

  productosSeleccionados: FormArray = this.fb.array([]);

  proveedores: Proveedores[] = [];
  almacen: Almacenes[] = [];
  productos: Productos[] = [];
  products: ProductoSimple[] = [];

  ngOnInit(): void {
    this.initForm();
    console.log('Iniciando ngOnInit');
    this.obtenerProveedores();
    this.obtenerProductList();
    this.obtenerProductList1();
    this.obtenerAlmacenes();
    this.proveedoresService.getProveedores().subscribe((proveedores) => {
      this.proveedores = proveedores;
    });
  }

  cantidadControl: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private proveedoresService: ProveedoresService,
    private productoService: ProductoService,
    private entradaService: EntradaService,
    private almacenesService: AlmacenesService
  ) {}

  /*------Metodos------ */
  obtenerProveedores() {
    this.proveedoresService.getProveedores().subscribe(
      (proveedores) => {
        this.proveedores = proveedores;
        console.log('Proveedores obtenidos:', proveedores);
      },
      (error) => {
        console.error('Error al cargar los proveedores:', error);
      }
    );
  }

  obtenerProductList1() {
    this.productoService.getProducts().subscribe(
      (productos) => {
        this.productos = productos;
        console.log('Productos obtenidos:', productos);
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  obtenerProductList(): void {
    this.productoService.getProducts().subscribe(
      (productos) => {
        this.products = productos.map((producto) => ({
          idproducto: producto.idproducto,
          nombre: producto.nombre,
        }));
        console.log('Productos obtenidos:', this.productos);
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  productoFiltrado: Productos | null = null;

  obtenerAlmacenes() {
    this.almacenesService.listarAlmacenes().subscribe(
      (almacenes) => {
        this.almacen = almacenes;
        console.log('Almacenes obtenidos:', almacenes);
      },
      (error) => {
        console.error('Error al cargar los almacenes:', error);
      }
    );
  }

  initForm(): void {
    this.entradaForm = this.fb.group({
      fecha: [null, Validators.required],
      proveedorId: [null, Validators.required],
      almacenId: [null, Validators.required],
      filtroBusqueda: [null],
      productosSeleccionados: this.fb.array([]),
      codigo_barra: [null], // Agrega el control 'codigo_barra'
      nombre: [null], // Agrega el control 'nombre'
      precio_venta: [null], // Agrega el control 'precio_venta'
      cantidad: [null],
    });
  }

  get productosSeleccionadosArray(): FormArray {
    return this.entradaForm.get('productosSeleccionados') as FormArray;
  }

  agregarProducto(): void {
    const productosSeleccionadosArray = this.entradaForm.get(
      'productosSeleccionados'
    ) as FormArray;

    if (
      this.productoFiltrado?.idproducto !== undefined &&
      this.productoFiltrado.idproducto !== null
    ) {
      const indexProductoExistente =
        productosSeleccionadosArray.controls.findIndex(
          (control) =>
            control.get('idproducto')?.value ===
            this.productoFiltrado?.idproducto
        );

      if (indexProductoExistente !== -1) {
        const cantidadSeleccionadaControl =
          productosSeleccionadosArray.controls[indexProductoExistente].get(
            'cantidad'
          ) as FormControl;
        // Obtener la cantidad actual
        const cantidadActual = cantidadSeleccionadaControl.value || 0;

        // Obtener la cantidad ingresada en el formulario y asegurarse de que sea un número
        const cantidadIngresada = +this.entradaForm.get('cantidad')?.value || 1;

        // Sumar la cantidad actual con la cantidad ingresada en el formulario
        const nuevaCantidad = cantidadActual + cantidadIngresada;

        // Imprimir en la consola para depuración
        console.log('Cantidad actual:', cantidadActual);
        console.log('Cantidad ingresada:', cantidadIngresada);
        console.log('Nueva cantidad:', nuevaCantidad);

        // Actualizar la cantidad en el control
        cantidadSeleccionadaControl.setValue(nuevaCantidad);
      } else {
        // Si el producto no existe, crear un nuevo control y agregarlo al FormArray
        const nuevoProducto = this.fb.group({
          idproducto: [this.productoFiltrado?.idproducto],
          nombre: [this.productoFiltrado?.nombre],
          cantidad: [
            +this.entradaForm.get('cantidad')?.value || 1,
            Validators.required,
          ], // Asegurarse de que la cantidad sea un número
          precio_venta: [this.productoFiltrado?.precio_venta],
          // Otros campos según sea necesario
        });

        // Imprimir en la consola para depuración
        console.log('Nuevo producto:', nuevoProducto);

        productosSeleccionadosArray.push(nuevoProducto);
      
        // Limpiar solo el campo de filtrado
        this.entradaForm.get('filtroBusqueda')?.setValue('');
        this.entradaForm.get('codigo_barra')?.setValue('');
        this.entradaForm.get('nombre')?.setValue(null);
        this.entradaForm.get('precio_venta')?.setValue(null);
        this.entradaForm.get('cantidad')?.setValue(null);
      }
    } else {
      // Si no hay un producto filtrado, podrías mostrar un mensaje de error o simplemente no hacer nada.
      console.warn('No se ha seleccionado ningún producto para agregar.');
    }
  }

  buscarProducto(event: any): void {
    const searchText = event.target.value.toLowerCase();
    const productoEncontrado = this.productos.find(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchText) ||
        producto.codigo_barra.toLowerCase().includes(searchText)
    );

    if (productoEncontrado) {
      // Asignar productoFiltrado
      this.productoFiltrado = productoEncontrado;

      // Actualizar valores de los controles del formulario
      this.entradaForm.patchValue({
        codigo_barra: productoEncontrado.codigo_barra,
        nombre: productoEncontrado.nombre,
        precio_venta: productoEncontrado.precio_venta,
        cantidad: 1,
      });
    } else {
      this.productoFiltrado = null;
    }
  }

  actualizarCantidad(event: any, index: number): void {
    const nuevaCantidad = event.target.value;
    const productosSeleccionadosArray = this.entradaForm.get(
      'productosSeleccionados'
    ) as FormArray;
    const cantidadSeleccionadaControl = productosSeleccionadosArray.controls[
      index
    ].get('cantidad') as FormControl;
    cantidadSeleccionadaControl.setValue(Number(nuevaCantidad));
  }

  eliminarProducto(index: number): void {
    const productosSeleccionadosArray = this.entradaForm.get(
      'productosSeleccionados'
    ) as FormArray;
    productosSeleccionadosArray.removeAt(index);
  }

  submitEntrada(): void {
    console.log('Formulario:', this.entradaForm.value);
    if (this.entradaForm.valid) {
      const entradaRequest: GEntradaRequest = {
        fecha: this.entradaForm.value.fecha,
        proveedorId: this.entradaForm.value.proveedorId,
        almacenId: this.entradaForm.value.almacenId,
        productos: this.entradaForm.value.productosSeleccionados,
        cantidadtotal: this.entradaForm.value.cantidadtotal,
        preciototal:0,
        numeroserie:""
        // cantidadtotal: 0,
      };

      this.entradaService.crearEntrada(entradaRequest).subscribe(
        (response) => {
          console.log('Entrada creada con éxito', response);
          // Resetear el formulario para limpiar los campos
          this.entradaForm.reset();
          // Puedes redirigir a otra página o realizar acciones adicionales después de crear la entrada
        },
        (error) => {
          console.error('Error al crear la entrada', error);
        }
      );
    }
  }


  exportarPdf(gentradasId: number): void {
    this.entradaService.exportarPdfPorEntrada(gentradasId).subscribe((response) => {
      const blob = new Blob([response.body], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  
}
