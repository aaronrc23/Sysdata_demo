import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/app/mantenimiento/Interface/Categorias';
import {
  Productos,
  UnidadDeMedida,
} from 'src/app/mantenimiento/Interface/Productos';
import { UnidadMedida } from 'src/app/mantenimiento/Interface/UnidadMedida';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';
import { ProductoService } from 'src/app/mantenimiento/service/producto.service';
import { UnidaMedidaService } from 'src/app/mantenimiento/service/unida-medida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss'],
})
export class ListarProductosComponent implements OnInit {

  modalVisible: boolean = false;

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
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



  @ViewChild('categoriasForm') categoriasForm: NgForm | undefined;
  productos: Productos[] = [];
  unidadesMedida: UnidadDeMedida[] = [];
  categorias: Categoria[] = [];
  productosSinFiltrar: Productos[] = [];
  
  constructor(
    private productService: ProductoService,
    private categoriaService: CategoriaServiceService,
    private unidadMedidaService: UnidaMedidaService
  ) {}

  /*------ Variables para el formulario ------- */
  selectProducto: Productos = {
    codigo_barra: '',
    nombre: '',
    precio_venta: 0,
    precio_compra: 0,
    precio_pormayor: 0,
    stock: 0,
    descripcion: '',
    imagen: '',
    activo: true,
    unidadDeMedida: { id_umd: 1 },
    categoria: { idcategoria: 1 },
    // marca: { idmarca: 0 },
  };

  edicionProducto: Productos = {
    idproducto: 0,
    codigo_barra: '',
    nombre: '',
    precio_venta: 0,
    precio_compra: 0,
    precio_pormayor: 0,
    stock: 0,
    descripcion: '',
    imagen: '',
    activo: true,
    unidadDeMedida: { id_umd: 1 },
    categoria: { idcategoria: 1 },
    // marca: { idmarca: 0 },
  };
  ngOnInit(): void {
    this.obtenerCategorias();
    this.getCategorias();
    this.productService.products$.subscribe((products: Productos[]) => {
      this.productos = products;
      // Actualiza la lista de productos para la página actual después de recibir cambios
      this.applyFilter();
    });
  }
  getProductList() {
    this.productService.getProducts().subscribe((data) => {
      this.productos = data;
    });
  }
  getCategorias() {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }
  
  obtenerUnidad() {
    this.unidadMedidaService.getUnidadMedida().subscribe(
      (unidadesMedida) => {
        this.unidadesMedida = unidadesMedida;
        console.log('Unidad obtenidas:', unidadesMedida);
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
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
  }

  /*------end Pagination-------- */

  /*-------Pagination---------- */
  searchTerm: string = ''; // Inicializa el término de búsqueda
  filteredCategorias: Productos[] = [];

  onSearchTermChange(): void {
    this.applyFilter(); // Llama al método de filtrado
  }


  filter(producto: Productos): boolean {
    const nombre = producto.nombre || ''; // Si nombre es undefined, se establece como cadena vacía
    const codigoBarra = producto.codigo_barra || ''; // Si codigo_barra es undefined, se establece como cadena vacía
  
    return (
      (nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (codigoBarra.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  private applyFilter(): void {
    this.filteredCategorias = this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (producto.codigo_barra && producto.codigo_barra.toString().includes(this.searchTerm.toLowerCase()))
    );
  }
  /*-------End Pagination---------- */

  /*-----------------Metodos Categorias----------------*/

  obtenerCategorias() {
    this.productService.getProducts().subscribe(
      (productos) => {
        this.productos = productos;
        this.productosSinFiltrar = productos;
        this.filteredCategorias = productos;
        console.log('Productos obtenidas:', productos);
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }




  /*--------------Edicion de Productos---------------------- */
  mostrarModalEdicion = false;
  abrirModalEdicion(categoria: Productos): void {
    this.edicionProducto = { ...categoria };
    this.mostrarModalEdicion = true;
  }

  /*---------- Actualizar Categorias-----------*/
  actualizarUnidad(): void {
    // Verificar si categoriaEnEdicion está definido y si su propiedad nombre es válida antes de la actualización
    if (
      !this.edicionProducto ||
      !this.edicionProducto.nombre ||
      this.edicionProducto.nombre.trim() === ''
    ) {
      // Mostrar un mensaje de error o realizar la acción necesaria
      return;
    }
    // Ocultar el modal de edición antes de mostrar el Swal
    this.mostrarModalEdicion = false;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar esta categoría?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService
          .editarAlmacen(this.edicionProducto.idproducto??0, this.edicionProducto)
          .subscribe(
            () => {
              this.mostrarExitoActualizacionEditar();
              this.edicionProducto = {
                idproducto: 0,
                codigo_barra: '',
                nombre: '',
                precio_venta: 0,
                precio_compra: 0,
                precio_pormayor: 0,
                stock: 0,
                descripcion: '',
                imagen: '',
                activo: true,
                unidadDeMedida: { id_umd: 0 },
                categoria: { idcategoria: 0 },
              }; // Reinicializa la categoría en edición
              this.obtenerUnidad();
            },
            (error) => {
              console.error('Error al actualizar la categoría:', error);
            }
          );
      }
    });
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

  /*---------- Eliminar Categorias----------- */
  eliminarAlmacen(categoria: Productos): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la categoría "${categoria.nombre}"?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && categoria.idproducto !== undefined) {
        // Asegúrate de que idcategoria no sea undefined antes de pasarlo como argumento
        this.productService.eliminarProducto(categoria.idproducto).subscribe(
          () => {
            this.mostrarExitoEliminacion();
            this.obtenerUnidad();
          },
          (error) => {
            console.error('Error al eliminar la categoría:', error);
          }
        );
      }
    });
  }

  private mostrarExitoEliminacion(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Categoría eliminada con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
  }

}
