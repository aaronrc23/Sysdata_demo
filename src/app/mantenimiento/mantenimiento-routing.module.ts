import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './pages/Products/productos/productos.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { PlantillasComponent } from './components/plantillas/plantillas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MovimientoAlmacenComponent } from './pages/Almacen/movimiento-almacen/movimiento-almacen.component';
import { AddunidadmedidaComponent } from './pages/UnidadMedida/addunidadmedida/addunidadmedida.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { AddproductsComponent } from './pages/Products/addproducts/addproducts.component';
import { EntradaproductsComponent } from './pages/compras/entradaproducts/entradaproducts.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { AddAlamacenesComponent } from './components/almacen/add-alamacenes/add-alamacenes.component';
import { ProductoStockComponent } from './pages/producto-stock/producto-stock.component';
import { AddFacturasComponent } from './components/facturas/add-facturas/add-facturas.component';
import { AddSalidaComponent } from './components/salida-productos/add-salida/add-salida.component';
import { ListarSalidaComponent } from './components/salida-productos/listar-salida/listar-salida.component';
import { ListarproducComponent } from './components/salida-productos/listarproduc/listarproduc.component';
import { AddComprasComponent } from './components/compras/add-compras/add-compras.component';
import { ListarComprasComponent } from './components/compras/listar-compras/listar-compras.component';
import { HistorialComprasComponent } from './components/compras/historial-compras/historial-compras.component';
import { ConsultaRucComponent } from './components/Consultas/consulta-ruc/consulta-ruc.component';
import { AddMovimientoAlmacenComponent } from './components/MovimientoAlmacen/add-movimiento-almacen/add-movimiento-almacen.component';


const routes: Routes = [


  {
    path: '',
    component: PlantillasComponent, // o algún componente contenedor
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'productos', component: ProductosComponent },
      { path: 'categoria', component: CategoriaComponent },
      { path: 'marcas', component: MarcasComponent },
      { path: 'almacenes', component: AlmacenesComponent },
      { path: 'almacen', component: AddAlamacenesComponent },
      { path: 'moviento-almacen', component: MovimientoAlmacenComponent },
      {path: 'addunidadmedida', component: AddunidadmedidaComponent},
      {path: 'proveedores', component: ProveedoresComponent},
      {path: 'addedit', component: AddproductsComponent},
      {path: 'entradaproducts', component: EntradaproductsComponent},
      {path: 'empresas', component: EmpresaComponent},
      {path: 'stock', component: ProductoStockComponent},
      {path: 'facturas', component: AddFacturasComponent},
      {path: 'salidaproducts',component: ListarproducComponent},
      {path: 'addcompras',component: AddComprasComponent},
      {path:'listadocompra',component:ListarComprasComponent},
      {path:'historialcompra',component:HistorialComprasComponent},
      //Consultas
      {path:'consultaruc',component:ConsultaRucComponent},
      {path:'movimientoproducts',component:AddMovimientoAlmacenComponent}

      // ... otras rutas del mantenimiento ...
    ],
  },

  /*-------Cuando es otra pagina---*/ 

 
  
 



//   { path: 'marcas', component: MarcasComponent,
//     children:[
//       { path: 'productos', component: MarcasComponent},
//     ]
// },
  // { path: 'marcas/:courses', component: MarcasComponent},
  // { path: 'almacenes', component: AlmacenesComponent},
  // // { path: '',redirectTo: '/productos',pathMatch: 'full'},
 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
