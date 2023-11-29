import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommunicationService } from './service/communication.service';
import { SidebarModule } from 'primeng/sidebar';
import { HttpClientModule } from '@angular/common/http';


//btn imagen
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { TreeModule } from 'primeng/tree';
import { SideNavComponent } from './side-nav/side-nav.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SplitButtonModule,
    MenuModule ,
    SidebarModule,
    TreeModule,
    HttpClientModule
  ],
  exports:[
    SidebarComponent,
    NavbarComponent,
    SideNavComponent 
  ],
  providers: [CommunicationService],
})
export class SharedModule { 

  
}
