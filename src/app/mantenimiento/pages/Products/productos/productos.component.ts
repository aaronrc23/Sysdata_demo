import { Component, OnInit } from '@angular/core';
import { Productos } from '../../../Interface/Productos';
import { ProductoService } from '../../../service/producto.service';
import { CategoriaServiceService } from '../../../service/categoria-service.service';
import { MarcasService } from '../../../service/marcas.service';
import { Categoria } from '../../../Interface/Categorias';
import { Marcas } from '../../../Interface/Marcas';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  showDialog() {
    this.displayEditModal = true;
  }
  visible = false;


  formGroup: FormGroup;
  products: Productos[] = [];
  displayAddModal = false;
  categorias: any[] = [];
  formEdit: FormGroup;


  
    /*-----Paginacion de la tabla-----*/

    first = 0;
    rows = 10;
    pageChange(event: { first: number; rows: number }) {
      this.first = event.first;
      this.rows = event.rows;
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
    activo: false,
    categoria: { idcategoria: 1 },
    // marca: { idmarca: 0 },
  };

  constructor(
    private fb: FormBuilder,
    
    private productService: ProductoService,
    private categoriaService: CategoriaServiceService,
  ) {
    this.formGroup = this.fb.group({
      categoria: ['']  // Puedes establecer un valor inicial si es necesario
    });
    this.formEdit= this.fb.group({
      // ... (configuración de los campos del formulario)
    });
  }

  
  /*------ METODOS -------- */
  ngOnInit(): void {
    this.getProductList();
    this.getCategorias();
    // this.obtenerMarcas();

    this.formGroup = this.fb.group({  // Cambia formBuilder a fb
      categoria: ['']  // Puedes establecer un valor inicial si es necesario
    });

    // Luego puedes cargar las categorías
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });

    //Editar
    this.formEdit = new FormGroup({
      codigo_barra: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      precio_venta: new FormControl(0, Validators.min(0)),
      precio_pormayor: new FormControl(0, Validators.min(0)),
      stock: new FormControl(0, Validators.min(0)),
      descripcion: new FormControl(''),
      imagen: new FormControl(''),
      activo: new FormControl(false),
      categoria: new FormControl(null), // Puedes establecer un valor inicial si es necesario
      marca: new FormControl(null), // Puedes establecer un valor inicial si es necesario
    });
  }

  /*------- Metodo para obtener la lista de productos y categorias ------- */
  getProductList() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }


  productoRegistrado() {
    // Cerrar y limpiar el modal
    this.visible = false;
    this.limpiarFormulario();
    // Mostrar notificación de éxito
    this.mostrarExitoActualizacion();
  }

  private limpiarFormulario(): void {
    // Limpiar los campos del formulario o restablecer el objeto selectProducto
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
  }
  /*---------------Editar-----------------*/

  editarProducto(producto: Productos): void {
    // Copia los valores del producto seleccionado a selectProducto
    this.selectProducto = { ...producto };
  
    // Muestra el modal de edición
    this.displayEditModal = true;
    console.log('Datos del producto seleccionado:', this.selectProducto);
  }
 
  // Método para actualizar el producto
  actualizarProducto(): void {
   // Obtén los valores del formulario
  const updatedProduct: Productos = this.formEdit.value;

  // Llama a un servicio para actualizar el producto (deberías implementar esto en tu servicio)
  this.productService.editarProducto(this.selectProducto).subscribe(
    () => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto actualizado con éxito',
        showConfirmButton: false,
        timer: 1500,
      });
      this.displayEditModal = false;  // Oculta el modal después de la actualización exitosa
      this.getProductList();  // Actualiza la lista de productos después de la actualización
    },
    (error) => {
      console.error('Error al actualizar el producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al actualizar el producto.',
        confirmButtonText: 'Aceptar',
      });
      // Puedes mostrar una alerta aquí si lo deseas
    }
  );

  }
  /*------------Modal de edición------------- */
  displayEditModal = false;

  
  private mostrarExitoActualizacion(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto creado con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
  }

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

  mostrarModalEdicion() {
    console.log('Producto seleccionado:', this.selectProducto);
    this.displayEditModal = true;
  }


  /*-------Eliminar----------*/
  eliminarProducto(idProducto: number): void {
    // Ejemplo:
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamada a tu servicio para eliminar el producto
        this.productService.eliminarProducto(idProducto).subscribe(() => {
          // Lógica adicional después de eliminar el producto, si es necesario
          // Puedes recargar la lista de productos, por ejemplo
          this.getProductList();
          Swal.fire('Producto eliminado con éxito', '', 'success');
        }, (error) => {
          console.error('Error al eliminar el producto:', error);
          Swal.fire('Error al eliminar el producto', '', 'error');
        });
      }
    });
  }



  
  // marcas: Marcas[] = [];
  // obtenerMarcas(): void {
  //   this.marcaService.getMarcas().subscribe(marcas => {
  //     this.marcas = marcas;
  //   });
  // }


  // /*---------Metodo para seleccionar imagen en el formulario--------*/
  // onImageSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log('Archivo seleccionado:', file);
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       console.log('Imagen leída:', e.target.result);
  //       this.selectProducto.imagen = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  /*---------- METODOS DE CODIGO DE BARRAS ------------------ */

  generateBarcode() {
    const randomNumber = Math.floor(Math.random() * 9999999999999);
    const randomNumberString = randomNumber.toString();
    this.selectProducto.codigo_barra = randomNumberString;
    JsBarcode('#barCode', randomNumberString);
    console.log(this.selectProducto.codigo_barra);
  }


  /*------------------- METODOS DE PDF ----------------------- */

  // downloadPDF() {
  //   const img = document.querySelector('img#barCode') as HTMLImageElement;

  //   if (img && img.complete) {
  //     this.generatePDF(img);
  //   } else {
  //     console.error('La imagen no se encontró o no se cargó correctamente.');
  //   }
  // }

  // private async generatePDF(img: HTMLImageElement) {
  //   const doc = new jsPDF();
  //   doc.text('Hola mundo', 10, 10);
  //   doc.addImage(img, 10, 20, 60, 40);
  //   doc.addImage(img, 10, 80, 60, 40);
  //   doc.addImage(img, 10, 120, 60, 40);

  //   const pdfName = 'prueba.pdf';
  //   doc.save(pdfName);
  //   console.log(`PDF "${pdfName}" generado exitosamente.`);
  // }

  // private showSuccessNotification(message: string) {
  //   Swal.fire('Éxito', message, 'success');
  // }

  // private handleError(message: string, error: any) {
  //   console.error(message, error);
  //   // Aquí puedes mostrar notificaciones de error si es necesario
  // }

  
}