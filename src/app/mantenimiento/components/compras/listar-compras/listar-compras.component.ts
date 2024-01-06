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
    private almacenService: AlmacenesService,
    private empresaService: EmpresasService,
    private http: HttpClient
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


  imprimirDetalles(entrada: EntradaRequest): void {
    const detalles: any[] = entrada.detallesAsJson.map((detalle) => [
      detalle.codigobarra,
      detalle.nombre,
      detalle.cantidad,
      detalle.preciocompra,
    ]);
    const stackText = [
      { text:'Direccion:'+' '+ 'Av.Guillermo dansey NRO.1740'+ ', '+'\n', style: 'smallText1' },
      { text:' Telf:'+'  '+'3366310'+'    ', style: 'smallText1' },
      { text:'email:'+'  '+ 'cobranza@gmail.com', style: 'smallText1' },
    ];
    
    const concatenatedText = stackText.map(item => item.text);
    
    
       this.http.get('assets/log1.jpg', { responseType: 'blob' }).subscribe((blob) => {
         const reader = new FileReader();
         reader.onloadend = () => {
           const base64data = reader.result as string;
     
           const documentDefinition: any = {
             images: {
               mySuperImage: base64data
             },
             content: [
             {
              columns:[
                {
                  image: 'mySuperImage', // Aquí se hace referencia al nombre definido en 'images'
                  width: 120 
                },
                

                {
                  width: 'auto',
                  text: 'N° de serie:',
                  style: 'header',
                  margin: [190, 20, 0, 0],
                },
                
                {
                  width: 'auto',
                  stack: [
                    { text: entrada.numeroserie,  },
                  ],
                  margin: [10, 23, 0, 0],
                  style:{
                    fontSize:13,
                  }
                },
              ],
              
             },
            
             {
              canvas: [
                  {
                      type: 'rect',
                      x: 0,
                      y: 0,
                      w: 200,
                      h: 40,
                      r: 5,
                      lineWidth: 1,
                      lineColor: '#000000',
                      // No es necesario fillColor
                  }
              ],
              absolutePosition: { x: 330, y: 50 } // Ajusta la posición del rectángulo
          },
          {
            text: concatenatedText,
            style: 'smallText',
            margin: [45, -10, 0, 0],
          },
           
        
          { text: 'Datos del Proveedor:', style: 'header_emp',margin: [0, 15, 0, 0], },
            

              {
                columns: [
                  {
                    width: 'auto',
                    stack: [
                      
                      { text: 'Dirección  :', style: 'header_emp' },
                      { text: 'Teléfono   :', style: 'header_emp' },
                      { text: 'Correo       :', style: 'header_emp' },
                    ],
                    margin: [15, 5, 0, 0],
                  },
                  
                  {
                    width: '*',
                    stack: [
                      { text: entrada.proveedores.direccion, style: 'smallText' },
                      { text: entrada.proveedores.telefono, style: 'smallText' },
                      { text: entrada.proveedores.email, style: 'smallText' },
                    ],
                    margin: [0, 5, 0, 0],
                  },
                  {
                    width: 'auto',
                    stack: [
                      { text: `Fecha de Emision :`, style: 'header_emp' },
                      { text: 'Ruc     :', style: 'header_emp' },
                      { text: 'Nª de serie  :', style: 'header_emp' },
                    ],
                    margin: [130, 5, 0, 0],
                  },
                  {
                    width: '*',
                    stack: [
                      { text: `${entrada.fecha}`, style: 'smallText' },
      
                      { text: entrada.proveedores.numruc, style: 'smallText' },
                      { text: entrada.numeroserie, style: 'smallText' },
                    ],
                    margin: [0, 5, 0, 0],
                  },
                ],
              },
      
              
              {
                table: {
                  headerRows: 1,
                  widths: [95, 300, 'auto', 30],
                  heights: ['auto', 25, 25, 25], // Establece la altura deseada para cada fila
                  body: [['Codigo', 'Nombre', 'Cantd.', 'P.C'], ...detalles ],
                  styles: {
                    bold:true
                  }
                },
                layout: {
                  fillColor: function (rowIndex: any, node: any) {
                    return rowIndex === 0 ? '#ddd' : null;
                  },
                  hLineColor: function (i:number, node:any) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                  },
                  vLineColor: function (i:number, node:any) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                  },
                  
                  hLineWidth: function (i:number, node:any) {
                    return (i === 0 || i === node.table.widths.length) ? 0.5 : 1;
                  },
                  vLineWidth: function (i:number, node:any) {
                    return (i === 0 || i === node.table.body.length) ? 0.5 : 1;
                  },
                  
                  paddingTop: function(i:number, node:any) { return 4; }
                },
                margin: [0, 20, 0, 0],
                style: 'tablefont',
                body: detalles.map((row: any[]) => row.map((cell: any) => ({ text: cell, style: 'cellStyle' }))),
              
              },
      
              
      
              
              
            
            ],
            styles: {
              header_emp: {
                fontSize: 8,
                bold: true,
                margin: [0, 2, 10, 5] as [number, number, number, number],
              },
              header: {
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 10] as [number, number, number, number],
              },
              subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 5, 0, 10] as [number, number, number, number],
              },
              tablefont: {
                fontSize: 10,
                align: 'center',
              },
              smallText1: {
                fontSize: 7,
                margin: [0, 3, 10, 5] as [number, number, number, number],
              },  
              smallText: {
                fontSize: 9,
                margin: [0, 1, 10, 5] as [number, number, number, number],
              },
            },
           };
     
           pdfMake.createPdf(documentDefinition).open();
         };
     
         reader.readAsDataURL(blob);
       });
    }
  

}
