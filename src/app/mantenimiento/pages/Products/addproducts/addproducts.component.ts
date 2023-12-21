import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import { Productos } from 'src/app/mantenimiento/Interface/Productos';
import Swal from 'sweetalert2';
import { CategoriaServiceService } from '../../../service/categoria-service.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/mantenimiento/service/producto.service';
import { Categoria } from 'src/app/mantenimiento/Interface/Categorias';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss'],
})
export class AddproductsComponent implements OnInit{
  checked: boolean = true;
  visible = false;
  position: string = 'center';

  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }

  /*------ Variables para el formulario ------- */
  selectProducto: Productos = {
    codigo_barra: '',
    nombre: '',
    precio_venta: 0,
    precio_pormayor: 0,
    stock: 0,
    descripcion: '',
    imagen: '',
    activo: true,
    categoria: { idcategoria: 1 },
    // marca: { idmarca: 0 },
  };

  /*--Array--*/
  products: Productos[] = [];
  displayAddModal = false;
  categorias: any[] = [];


  constructor(private  productService: ProductoService,private categoriaService: CategoriaServiceService,) {}

  ngOnInit(): void {
    this.obtenerUnidad();
    this.getCategorias();
    this.productService.products$.subscribe((categorias: Productos[]) => {
      this.categorias = categorias;
    });
    this.categoriaService.categorias$.subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }

  /*------Agregar----- */

  /*---Metodos------ */
  /*-----Metodo listar----- */
  obtenerUnidad() {
    this.productService.getProducts().subscribe(
      (almacenes) => {
        this.products = almacenes;
        console.log('Unidad obtenidas:', almacenes);
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  getProductList() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  @ViewChild('nombreInput') nombreInput: any;

  crearUnidad(): void {
    const unidadExistente = this.products.find(
      (c) => c.nombre === this.selectProducto.nombre
    );
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
      text: `Este Producto  "${this.selectProducto.nombre}" ya está registrado.`,
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
        this.mostrarExitoRegistro();
        this.resetearFormulario();
      } else {
        this.nombreInput.nativeElement.value = '';
      }
    });
  }
  unidadForm: any;
  @ViewChild('unidadForm') unidadForms: any;

  private registrarCategoria(): void {
    
    
    this.productService.registrarProducto(this.selectProducto).subscribe(
      () => {
        this.mostrarExitoRegistro();
       
        this.obtenerUnidad();
      },
      (error) => {
        console.error('Error al crear la categoría:', error);
      }
    );
  }
  private resetearFormulario(): void {
    
      this.selectProducto = {
        codigo_barra: '',
        nombre: '',
        precio_venta: 0,
        precio_pormayor: 0,
        stock: 0,
        descripcion: '',
        imagen: '',
        activo: false,
        categoria: { idcategoria: 1 },
        // marca: { idmarca: 0 },
      };
       // Reiniciar el estado de validación del formulario
    if (this.unidadForm) {
      this.unidadForm.resetForm();
  
       // Opcionalmente, puedes reiniciar el estado de validación de campos individuales si es necesario
      
      // Repite este bloque para otros campos si es necesario
    }
    
  }

  private mostrarExitoRegistro(): void {
   
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Categoría creada con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
    this.getProductList();
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

  @ViewChild('numrucInput') numrucInput: any;

    /*---------Metodo para seleccionar imagen en el formulario--------*/
    onImageSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        console.log('Archivo seleccionado:', file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log('Imagen leída:', e.target.result);
          this.selectProducto.imagen = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
    /*---------- METODOS DE CODIGO DE BARRAS ------------------ */
  
    generateBarcode() {
      const randomNumber = Math.floor(Math.random() * 9999999999999);
      const randomNumberString = randomNumber.toString();
      this.selectProducto.codigo_barra = randomNumberString;
   
      // Asegúrate de que el elemento con ID 'barCode' es un canvas.
      const canvasElement = document.getElementById('barCode') as HTMLCanvasElement;
   
      if (canvasElement) {
         JsBarcode(canvasElement, randomNumberString);
      } else {
         console.error('Elemento con ID "barCode" no encontrado o no es un canvas.');
      }
   
      console.log(this.selectProducto.codigo_barra);
   }
   
   
  
    /*------------------- METODOS DE PDF ----------------------- */
  
    downloadPDF() {
      const img = document.querySelector('img#barCode') as HTMLImageElement;
  
      if (img && img.complete) {
        this.generatePDF(img);
      } else {
        console.error('La imagen no se encontró o no se cargó correctamente.');
      }
    }
  
    private async generatePDF(img: HTMLImageElement) {
      const doc = new jsPDF();
      doc.text('Hola mundo', 10, 10);
      doc.addImage(img, 10, 20, 60, 40);
      doc.addImage(img, 10, 80, 60, 40);
      doc.addImage(img, 10, 120, 60, 40);
  
      const pdfName = 'prueba.pdf';
      doc.save(pdfName);
      console.log(`PDF "${pdfName}" generado exitosamente.`);
    }
  
    private showSuccessNotification(message: string) {
      Swal.fire('Éxito', message, 'success');
    }
  
    private handleError(message: string, error: any) {
      console.error(message, error);
      // Aquí puedes mostrar notificaciones de error si es necesario
    }
  
}
