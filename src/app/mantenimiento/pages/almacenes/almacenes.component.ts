import { Component, OnInit  } from '@angular/core';
import { Almacenes } from '../../Interface/Almacenes';
import { AlmacenesService } from '../../service/almacenes.service';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.scss']
})
export class AlmacenesComponent   implements OnInit{
  almacenes: Almacenes[] = [];
  selectedAlmacen: Almacenes = {};

  constructor(private almacenService: AlmacenesService) {}

  ngOnInit(): void {
    this.cargarAlmacenes();
  }

  cargarAlmacenes() {
    this.almacenService.listarAlmacenes().subscribe((data) => {
      this.almacenes = data;
    });
  }

  editarAlmacen(almacen: Almacenes) {
    this.selectedAlmacen = { ...almacen };
  }

  guardarCambios() {
    if (this.selectedAlmacen.id) {
      // Si tiene un ID, entonces es una edición
      this.almacenService.editarAlmacen(this.selectedAlmacen).subscribe(() => {
        this.cargarAlmacenes();
      });
    } else {
      // Si no tiene un ID, entonces es un nuevo registro
      this.almacenService.registrarAlmacen(this.selectedAlmacen).subscribe(() => {
        this.cargarAlmacenes();
      });
    }

    // Limpiar el formulario después de editar o registrar
    this.selectedAlmacen = {};
  }

  registrarNuevo() {
    // Limpiar el formulario antes de registrar un nuevo almacén
    this.selectedAlmacen = {};
  }

  


  eliminarAlmacen(id: number | undefined) {
    if (id !== undefined) {
      this.almacenService.eliminarAlmacen(id).subscribe(
        () => {
          console.log('Almacén eliminado con éxito.');
          this.almacenes = this.almacenes.filter(almacen => almacen.id !== id);
        },
        error => console.error('Error al eliminar almacén:', error)
      );
    }
  }
// app.component.ts

// app.component.ts

eliminarAlmacenPorId(id: number | undefined) {
  if (id !== undefined) {
    this.almacenService.desactivarAlmacenPorId(id).subscribe(
      () => {
        console.log(`Almacén con ID ${id} desactivado correctamente.`);
        // Actualiza la lista local sin necesidad de recargar
        this.almacenes = this.almacenes.map((almacen) =>
          almacen.id === id ? { ...almacen, activo: false } : almacen
        );
      },
      (error) => console.error(`Error al desactivar almacén con ID ${id}:`, error)
    );
  }
}

  



  
  
}
