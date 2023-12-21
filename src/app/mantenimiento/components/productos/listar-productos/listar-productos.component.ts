import { Component } from '@angular/core';
import { Productos } from 'src/app/mantenimiento/Interface/Productos';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';
import { ProductoService } from 'src/app/mantenimiento/service/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss'],
})
export class ListarProductosComponent {
  productos: Productos[] = [];
  constructor( private productService: ProductoService,private categoriaService: CategoriaServiceService,) {}

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
  ngOnInit(): void {
    this.getProductList();
  }
  getProductList() {
    this.productService.getProducts().subscribe((data) => {
      this.productos = data;
    });
  }


  /*----pagination-------- */
  itemsPerPage = 10;
  currentPage = 1;
  itemsPerPageOptions = [5, 8, 10]; // Puedes agregar más opciones según tus necesidades

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reinicia la página actual al cambiar la cantidad de elementos por página
  }
  
  get totalPages(): number {
    return Math.ceil(this.productos.length / this.itemsPerPage);
  }

  // Método que devuelve las categorías para la página actual
  getCategoriasPaginadas(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productos.slice(startIndex, endIndex);
  }

  // Método que maneja el cambio de página
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    // ...otras acciones que puedan ser necesarias
  }

  /*------end Pagination-------- */

/*-------Pagination---------- */
  searchTerm: string = '';  // Inicializa el término de búsqueda
  filteredCategorias: Productos[] = []; 


  onSearchTermChange(): void {
    this.filteredCategorias = this.filterCategorias();  // Llama al método de filtrado
  }

  private filterCategorias(): Productos[] {
    return this.productos.filter(categoria =>
      categoria.nombre && categoria.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /*-------End Pagination---------- */

 /*-----------------Metodos Categorias----------------*/ 

 obtenerCategorias() {
  this.productService.getProducts().subscribe(productos => {
    this.productos = productos;
    console.log('Categorías obtenidas:', productos);
  }, (error) => {
    console.error('Error al cargar las categorías:', error);
  });
}




}
