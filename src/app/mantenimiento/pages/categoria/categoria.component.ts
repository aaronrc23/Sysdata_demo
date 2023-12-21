import { Component , OnInit} from '@angular/core';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';
import { Observable } from 'rxjs';
import { Categoria } from '../../Interface/Categorias';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

}

