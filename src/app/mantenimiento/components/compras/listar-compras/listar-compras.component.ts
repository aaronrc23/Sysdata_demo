import { Component, OnInit } from '@angular/core';
import { Almacenes } from 'src/app/mantenimiento/Interface/Almacenes';
import { Comprasdetalle } from 'src/app/mantenimiento/Interface/Comprasdetalle';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import { Proveedores } from 'src/app/mantenimiento/Interface/Proveedores';
import { EntradaRequest } from 'src/app/mantenimiento/Interface/request/EntradaRequest';
import { GEntradaRequest } from 'src/app/mantenimiento/Interface/request/GentradaRequest';
import { AlmacenesService } from 'src/app/mantenimiento/service/almacenes.service';
import { DetallecompraService } from 'src/app/mantenimiento/service/detallecompra/detallecompra.service';
import { EntradaService } from 'src/app/mantenimiento/service/entrada.service';
import { ProveedoresService } from 'src/app/mantenimiento/service/proveedores.service';
import { Empresas } from 'src/app/mantenimiento/Interface/Empresas';
import { EmpresasService } from 'src/app/mantenimiento/service/empresasService/empresas.service';
import { style } from '@angular/animations';
import { SafeHtmlPipe } from 'primeng/menu';
import { HttpClient } from '@angular/common/http';
import { ImprimirDetalleService } from '../reportes/imprimir-detalle.service';
import { PaginationColumnasService } from 'src/app/shared/pagination-columnas/pagination-columnas.service';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.scss'],
})
export class ListarComprasComponent {
  mostrarSelectorFecha = false;
  activarFiltroPersonalizado() {
    this.mostrarSelectorFecha = true;
  }

  entradas: EntradaRequest[] = [];
  almacenes: Almacenes[] = [];
  proveedores: Proveedores[] = [];
  empresas: Empresas[] = [];
  selectedAlmacen: string | null = null; // Cambiado a string
  selectedFecha: string | null = null;
  constructor(
    private entradaService: EntradaService,
    private proveedorService: ProveedoresService,
    private imprimirDetalleService: ImprimirDetalleService,
    private almacenService: AlmacenesService,
    private empresaService: EmpresasService,
    private http: HttpClient,
    private paginationService: PaginationColumnasService<EntradaRequest>
  ) {}

  ngOnInit(): void {
    this.getCompras();
    this.obtenerAlmacenes();
    this.obtenerProveedores();
    this.obtenerDetalle();
    this.obtenerEmpresas();
  }

  getCompras() {
    this.entradaService.listarEntradas().subscribe((entradas) => {
      this.entradas = entradas;
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

  obtenerEmpresas() {
    this.empresaService.listarEmpresa().subscribe((empresas) => {
      this.empresas = empresas;
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
    return Math.ceil(this.entradas.length / this.itemsPerPage);
  }

  // Método que devuelve las categorías para la página actual
  getCategoriasPaginadas(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.entradas.slice(startIndex, endIndex);
  }

  // Método que maneja el cambio de página
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  /*------end Pagination-------- */

  obtenerDetalle() {
    this.entradaService.listarEntradas().subscribe(
      (detalles) => {
        const filtros = {
          idAlmacen: this.selectedAlmacen, // Ahora usamos el ID del almacén
          fecha: this.selectedFecha,
        };

        // Filtrar localmente los detalles
        this.entradas = detalles.filter((detalle) => {
          console.log('Tipo de idAlmacen:', typeof detalle.almacen.id);
          console.log('Valor de idAlmacen:', detalle.almacen.id);

          return (
            (!filtros.idAlmacen ||
              detalle.almacen.id.toString() === filtros.idAlmacen) &&
            (!filtros.fecha || detalle.fecha === filtros.fecha)
          );
        });

        console.log('Detalles obtenidos con filtros:', this.entradas);
      },
      (error) => {
        console.error('Error al cargar los detalles:', error);
      }
    );
  }

  filtrar() {
    console.log('Filtrar');
    this.obtenerDetalle();
  }
  limpiarFiltro() {
    this.selectedAlmacen = null;
    this.selectedFecha = null;
    this.mostrarSelectorFecha = false;
    this.obtenerDetalle(); // Recargar la tabla
  }
  imprimirDetalles(detallecompra: any): void {
    this.imprimirDetalleService.imprimirDetalles(detallecompra);
  }

 
}
