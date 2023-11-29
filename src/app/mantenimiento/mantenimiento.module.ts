import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ProductosComponent } from './pages/Products/productos/productos.component';
import { MarcasComponent } from './pages/marcas/marcas.component';

import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { PlantillasComponent } from './components/plantillas/plantillas.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AddEditCatMarComponent } from './components/add-edit-cat-mar/add-edit-cat-mar.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import{ ChartModule} from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FileUploadModule } from 'primeng/fileupload';
import { MovimientoAlmacenComponent } from './pages/Almacen/movimiento-almacen/movimiento-almacen.component';
import { CardModule } from 'primeng/card';
import { TreeTableModule } from 'primeng/treetable';
import { CalendarModule } from 'primeng/calendar';
import { AddproductsComponent } from './pages/Products/addproducts/addproducts.component';
import { ImageModule } from 'primeng/image';
import { AddunidadmedidaComponent } from './pages/UnidadMedida/addunidadmedida/addunidadmedida.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InputSwitchModule } from 'primeng/inputswitch';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';

@NgModule({
  declarations: [
    CategoriaComponent,
    ProductosComponent,
    MarcasComponent,
    AlmacenesComponent,
    PlantillasComponent,
    AddEditCatMarComponent,
    DashboardComponent,
    MovimientoAlmacenComponent,
    AddproductsComponent,
    AddunidadmedidaComponent,
    ProveedoresComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    SharedModule,
    TableModule ,
    ButtonModule,
    DialogModule,
    HttpClientModule,
    FormsModule ,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule ,
    ChartModule,
    CascadeSelectModule,
    FileUploadModule,
    CardModule,
    TreeTableModule,
    CalendarModule,
    ImageModule,
    InputSwitchModule,
    FontAwesomeModule

  ]
})
export class MantenimientoModule { }
