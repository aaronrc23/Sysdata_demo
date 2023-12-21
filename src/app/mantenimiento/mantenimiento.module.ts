import { NgModule,Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ProductosComponent } from './pages/Products/productos/productos.component';
import { MarcasComponent } from './pages/marcas/marcas.component';


import { ToastModule } from 'primeng/toast';
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

import { EntradaproductsComponent } from './pages/compras/entradaproducts/entradaproducts.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { ListaEmpresasComponent } from './components/empresas/lista-empresas/lista-empresas.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { AgregarEmpresasComponent } from './components/empresas/agregar-empresas/agregar-empresas.component';
import { ListarCategoriasComponent } from './components/categoria/listar-categorias/listar-categorias.component';
import { AddCategoriasComponent } from './components/categoria/add-categorias/add-categorias.component';
import { ListarAlamacenesComponent } from './components/almacen/listar-alamacenes/listar-alamacenes.component';
import { AddAlamacenesComponent } from './components/almacen/add-alamacenes/add-alamacenes.component';
import { ListarProductosComponent } from './components/productos/listar-productos/listar-productos.component';
import { ListarStockComponent } from './components/stock/listar-stock/listar-stock.component';
import { ProductoStockComponent } from './pages/producto-stock/producto-stock.component';




@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, propertyName: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const propertyValue = item[propertyName];
      if (propertyValue !== undefined && propertyValue !== null) {
        return propertyValue.toLowerCase().includes(searchText);
      }
      return false;
    });
  }
}


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
    ProveedoresComponent,
    FilterPipe,
    EntradaproductsComponent,
    ListaEmpresasComponent,
    EmpresaComponent,
    AgregarEmpresasComponent,
    ListarCategoriasComponent,
    AddCategoriasComponent,
    ListarAlamacenesComponent,
    AddAlamacenesComponent,
    ListarProductosComponent,
    ListarStockComponent,
    ProductoStockComponent,

  ],
  imports: [
    FormsModule,
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
    FontAwesomeModule,
    AutoCompleteModule,
    PanelModule,
    ToastModule

  ]
})
export class MantenimientoModule { }
