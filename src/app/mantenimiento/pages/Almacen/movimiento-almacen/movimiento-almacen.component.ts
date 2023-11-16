import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-movimiento-almacen',
  templateUrl: './movimiento-almacen.component.html',
  styleUrls: ['./movimiento-almacen.component.scss']
})
export class MovimientoAlmacenComponent  {
  categorias = [
    { id: 1, nombre: 'Categoría 1' },
    { id: 2, nombre: 'Categoría 2' },
    { id: 3, nombre: 'Categoría 3' },
  ];
}