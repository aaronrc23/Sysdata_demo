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
export class ProductosComponent  {

 



  
}