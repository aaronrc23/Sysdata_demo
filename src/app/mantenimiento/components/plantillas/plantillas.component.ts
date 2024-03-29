import { Component ,OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/shared/service/communication.service';
import { Router } from '@angular/router';
import { faBars,faHome } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.scss']
})
export class PlantillasComponent implements OnInit,OnDestroy {

  constructor(private communicationService: CommunicationService,private router: Router) {}
  private subscription: Subscription = new Subscription(); 
 
  isActive = false;

  ngOnInit() {
    this.subscription = this.communicationService.sidebarToggle$.subscribe((value: boolean) => {
      this.isActive = value;
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  faBars = faBars;
  
  isSidebarOpen = true;

  faHome = faHome;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
