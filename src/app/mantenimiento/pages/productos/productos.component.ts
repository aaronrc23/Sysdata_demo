import { Component, OnInit } from '@angular/core';
import { Productos } from '../../Interface/Productos';
import { ProductoService } from '../../service/producto.service';
import { CategoriaServiceService } from '../../service/categoria-service.service';
import { MarcasService } from '../../service/marcas.service';
import { Categoria } from '../../Interface/Categorias';
import { Marcas } from '../../Interface/Marcas';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  formGroup: FormGroup;
  products: Productos[] = [];
  displayAddModal = false;
  categorias: any[] = [];
  
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
    categoria: { idcategoria: 0 },
    marca: { idmarca: 0 },
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductoService,
    private categoriaService: CategoriaServiceService,
    private marcaService: MarcasService
  ) {
    this.formGroup = this.fb.group({
      categoria: ['']  // Puedes establecer un valor inicial si es necesario
    });
  }

  
  /*------ METODOS -------- */
  ngOnInit(): void {
    this.getProductList();
    this.getCategorias();
    this.obtenerMarcas();

    this.formGroup = this.fb.group({  // Cambia formBuilder a fb
      categoria: ['']  // Puedes establecer un valor inicial si es necesario
    });

    // Luego puedes cargar las categorías
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
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

  marcas: Marcas[] = [];
  obtenerMarcas(): void {
    this.marcaService.getMarcas().subscribe(marcas => {
      this.marcas = marcas;
    });
  }

  /*-----------------Registro de Productos------------------ */
  registrarProducto(event: Event) {
    event.preventDefault();

    this.productService.registrarProducto(this.selectProducto).subscribe(
      (response) => {
        console.log('Producto registrado:', response);

        if (response === '¡Producto creado!') {
          this.showSuccessNotification('Producto creado exitosamente');
        } else {
          // Manejar otros posibles casos de respuesta del servidor
        }
      },
      (error) => {
        this.handleError('Error al registrar el producto:', error);
      }
    );
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

  /*---------- METODOS DE CODIGO DE BARRAS ------------------ */

  generateBarcode() {
    const randomNumber = Math.floor(Math.random() * 9999999999999);
    const randomNumberString = randomNumber.toString();
    this.selectProducto.codigo_barra = randomNumberString;
    JsBarcode('#barCode', randomNumberString);
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