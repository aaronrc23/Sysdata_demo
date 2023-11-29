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
      { path: 'moviento-almacen', component: MovimientoAlmacenComponent },
      {path: 'addunidadmedida', component: AddunidadmedidaComponent},
      {path: 'proveedores', component: ProveedoresComponent},
      {path: 'addedit', component: AddproductsComponent},
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
