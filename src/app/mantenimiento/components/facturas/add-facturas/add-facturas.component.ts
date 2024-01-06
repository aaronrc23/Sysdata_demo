import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/mantenimiento/Interface/Productos';
import { FacturaService } from 'src/app/mantenimiento/service/factura.service';

@Component({
  selector: 'app-add-facturas',
  templateUrl: './add-facturas.component.html',
  styleUrls: ['./add-facturas.component.scss']
})
export class AddFacturasComponent implements OnInit {
  productos: Productos[] = [];

  constructor(private productoService: FacturaService) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos() {
    this.productoService.getAllProductos().subscribe(data => {
      this.productos = data;
    });
  }

  agregarProducto(producto: Productos) {
    this.productoService.addProducto(producto).subscribe(() => {
      this.loadProductos(); // Actualizar la lista después de agregar
    });
  }

}
