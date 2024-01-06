import { Component, OnInit } from '@angular/core';
import { Proveedores } from 'src/app/mantenimiento/Interface/Proveedores';
import { ProveedoresService } from 'src/app/mantenimiento/service/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.scss'],
})
export class ListarProveedoresComponent implements OnInit {
  proveedor: Proveedores[] = [];
  proveedoresSinFiltrar: Proveedores[] = [];

  edicionProveedor: Proveedores = {
    id_proveedores: 0,
    nombre_prov: '',
    numruc: '',
    direccion: '',
    telefono: 0,
    email: '',
    activo: true,
  };

  constructor(private proveedorService: ProveedoresService) {}

  obtenerProveedor() {
    this.proveedorService.getProveedores().subscribe(
      (proveedor) => {
        this.proveedor = proveedor;
        this.proveedoresSinFiltrar = proveedor;
        this.applyFilter(); 
        console.log('Proveedores obtenidos:', proveedor);
      },
      (error) => {
        console.error('Error al cargar las proveedores:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerProveedor();
    this.proveedorService.proveedor$.subscribe((almacenes: Proveedores[]) => {
      this.proveedor = almacenes;
      this.applyFilter();
    });
  }

  /*---------- Actualizar Categorias-----------*/
  mostrarModalEdicion = false;
  abrirModalEdicion(categoria: Proveedores): void {
    this.edicionProveedor = { ...categoria };
    this.mostrarModalEdicion = true;
  }

  actualizarUnidad(): void {
    // Verificar si categoriaEnEdicion está definido y si su propiedad nombre es válida antes de la actualización
    if (
      !this.edicionProveedor ||
      !this.edicionProveedor.nombre_prov ||
      this.edicionProveedor.nombre_prov.trim() === ''
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
        this.proveedorService
          .editarProveedores(
            this.edicionProveedor.id_proveedores,
            this.edicionProveedor
          )
          .subscribe(
            () => {
              this.mostrarExitoActualizacionEditar();
              this.edicionProveedor = {
                id_proveedores: 0,
                nombre_prov: '',
                numruc: '',
                direccion: '',
                telefono: 0,
                email: '',
                activo: true,
              }; // Reinicializa la categoría en edición
              this.obtenerProveedor();
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
  eliminarAlmacen(categoria: Proveedores): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el Proveedor "${categoria.nombre_prov}"?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && categoria.id_proveedores !== undefined) {
        this.proveedorService
          .eliminarProveedores(categoria.id_proveedores)
          .subscribe(
            () => {
              this.mostrarExitoEliminacion();
              this.obtenerProveedor();
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

  /*----pagination-------- */
  itemsPerPage = 10;
  currentPage = 1;
  itemsPerPageOptions = [5, 8, 10]; // Puedes agregar más opciones según tus necesidades

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reinicia la página actual al cambiar la cantidad de elementos por página
  }

  get totalPages(): number {
    return Math.ceil(this.proveedor.length / this.itemsPerPage);
  }

  // Método que devuelve las categorías para la página actual
  getCategoriasPaginadas(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.proveedor.slice(startIndex, endIndex);
  }

  // Método que maneja el cambio de página
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  /*------end Pagination-------- */

  /*-------Pagination---------- */
  searchTerm: string = '';
  filteredCategorias: Proveedores[] = [];

  onSearchTermChange(): void {
    this.applyFilter();
  }

  filter(proveedor: Proveedores): boolean {
    const nombre = proveedor.nombre_prov || ''; // Si nombre es undefined, se establece como cadena vacía
    const codigoBarra = proveedor.numruc || ''; // Si codigo_barra es undefined, se establece como cadena vacía

    return (
      nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      codigoBarra.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  private applyFilter(): void {
    this.filteredCategorias = this.proveedoresSinFiltrar.filter(
      (proveedor) =>
        proveedor.nombre_prov
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        (proveedor.numruc &&
          proveedor.numruc.toString().includes(this.searchTerm.toLowerCase()))
    );
  }
  /*-------End Pagination---------- */
}
