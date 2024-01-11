import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntradaRequest } from 'src/app/mantenimiento/Interface/request/EntradaRequest';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class ImprimirDetalleService {

  constructor(private http: HttpClient) {}

  imprimirDetalles(entrada: EntradaRequest): void {
    const detalles: any[] = entrada.detallesAsJson.map((detalle) => [
      detalle.codigobarra,
      detalle.nombre,
      detalle.cantidad,
      detalle.preciocompra,
      detalle.abreviacion,
      detalle.cantidad * detalle.preciocompra,
    ]);

    /*----Convertir El total a letras--------- */
  
    /*end */
    const stackText = [
      {
        text: 'Direccion:' + ' ' + 'Av.Guillermo dansey NRO.1740' + ', ' + '\n',
        style: 'smallText1',
      },
      { text: ' Telf:' + '  ' + '3366310' + '    ', style: 'smallText1' },
      { text: 'email:' + '  ' + 'cobranza@gmail.com', style: 'smallText1' },
    ];

    // Cálculos para totales
    const totalCantidad = detalles.reduce(
      (total, detalle) => total + detalle[2],
      0
    ); // Índice 2 es la cantidad
    const totalSubtotal = detalles.reduce(
      (total, detalle) => total + detalle[5],
      0
    ); // Índice 5 es el subtotal

    const igvPorcentaje = 0.18; // Porcentaje de IGV (18%)
    const totalIGV = Number((totalSubtotal * igvPorcentaje).toFixed(3));
    const totalSinIGV = Number((totalSubtotal - totalIGV).toFixed(3));
    

   
    const concatenatedText = stackText.map((item) => item.text);

    this.http
      .get('assets/logosysdata.jpg', { responseType: 'blob' })
      .subscribe((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;

          const documentDefinition: any = {
            images: {
              mySuperImage: base64data,
            },
            content: [
              {
                columns: [
                  {
                    image: 'mySuperImage', // Aquí se hace referencia al nombre definido en 'images'
                    width: 120,
                  },

                  {
                    width: 'auto',
                    text: 'N° de serie:',
                    style: 'header',
                    margin: [190, 20, 0, 0],
                  },

                  {
                    width: 'auto',
                    stack: [{ text: entrada.numeroserie }],
                    margin: [10, 23, 0, 0],
                    style: {
                      fontSize: 13,
                    },
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
                  },
                ],
                absolutePosition: { x: 330, y: 50 }, // Ajusta la posición del rectángulo
              },
              {
                text: concatenatedText,
                style: 'smallText',
                margin: [45, -10, 0, 0],
              },
              {
                text: 'Datos del Proveedor:',
                style: 'header_emp',
                margin: [0, 15, 0, 0],
              },
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
                      {
                        text: entrada.proveedores.direccion,
                        style: 'smallText',
                      },
                      {
                        text: entrada.proveedores.telefono,
                        style: 'smallText',
                      },
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
                  widths: [95, 'auto', 'auto', 'auto', 'auto', 'auto'],
                  heights: [20, 0, 0, 0, 0, 0], // Establece la altura deseada para cada fila
                  body: [
                    ['Codigo', 'Nombre', 'Cantd.', 'P.C', 'U.M', 'Importe'],
                    ...detalles,
                  ],
                  styles: {
                    bold: true,
                  },
                },
                layout: {
                  fillColor: function (rowIndex: any, node: any) {
                    return rowIndex === 0 ? '#ddd' : null;
                  },
                  hLineColor: function (i: number, node: any) {
                    return i === 0 || i === node.table.body.length
                      ? 'black'
                      : 'gray';
                  },
                  vLineColor: function (i: number, node: any) {
                    return i === 0 || i === node.table.widths.length
                      ? 'black'
                      : 'gray';
                  },

                  hLineWidth: function (i: number, node: any) {
                    return i === 0 || i === node.table.widths.length ? 0.5 : 1;
                  },
                  vLineWidth: function (i: number, node: any) {
                    return i === 0 || i === node.table.body.length ? 0.5 : 1;
                  },

                  paddingTop: function (i: number, node: any) {
                    return 4;
                  },
                },
                margin: [0, 20, 0, 0],
                style: 'tablefont',
                body: detalles.map((row: any[]) =>
                  row.map((cell: any, index: number) => {
                    // Usa el nuevo estilo solo para la columna de subtotal
                    return {
                      text: cell,
                      style: index === 5 ? 'subtotalStyle' : 'cellStyle',
                    };
                  })
                ),
              },
             
              {
                table: {
                  widths: ['auto', 'auto'],
                  body: [
                    ['Cantidad total' + ' : ', totalCantidad],
                    ['Subtotal' + ' : ', totalSubtotal],
                    ['IGV (18%)' + ' : ', totalIGV],
                    ['Monto Total' + ' : ', totalSinIGV],
                  ],
                },
                margin: [320, 20, 0, 50],
                layout: 'noBorders',
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
              subtotalStyle: {
                fontSize: 10,
                align: 'right', // Alinea el subtotal a la derecha
              },
              footerLetras: {
                fontsize: 15,
                bold: true,
              },
            },
          };
          pdfMake.createPdf(documentDefinition).open();
        };
        reader.readAsDataURL(blob);
      });
  }
}
