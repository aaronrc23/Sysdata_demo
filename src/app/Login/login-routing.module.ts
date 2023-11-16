import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogearseComponent } from './logearse/logearse.component';


const routes: Routes = [
 
  { path: 'login', component: LogearseComponent },

  {
    path: 'plantillas',
    loadChildren: () =>
      import('../mantenimiento/mantenimiento.module').then(
        (m) => m.MantenimientoModule
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { 

  
}
