import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommunicationService } from './service/communication.service';
import { SidebarModule } from 'primeng/sidebar';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


//btn imagen
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { TreeModule } from 'primeng/tree';
import { PaginationComponent } from './pagination/pagination.component';
import { RangePipe } from '../mantenimiento/pipe/categoriapipe';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent,
    PaginationComponent,
    RangePipe

  ],
  imports: [

    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SplitButtonModule,
    MenuModule ,
    SidebarModule,
    TreeModule,
    HttpClientModule,
  
  ],
  exports:[
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent,
    PaginationComponent
  
  ],
  providers: [CommunicationService],
})
export class SharedModule { 

  
}
