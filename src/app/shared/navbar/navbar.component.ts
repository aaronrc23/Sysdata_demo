import { Component } from '@angular/core';
import { CommunicationService } from '../service/communication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  sidebarVisible: boolean = false;

  /*------------------Menumburguesa----------------*/
  constructor(private communicationService: CommunicationService) {
    
  }
  toggleSidebar() {
    // Lógica para abrir o cerrar el sidebar
    this.communicationService.toggleSidebar();
  }

  /*----------Menu options-----------*/
  showOptions = false;
  toggleOptions() {
    const profileDropdownList = document.querySelector(".profile-dropdown-list") as HTMLElement;
    if (profileDropdownList) {
      profileDropdownList.classList.toggle("active");
      this.showOptions = profileDropdownList.classList.contains("active");
    }
  }
  optionSelected(option: string) {
    // Lógica para manejar la opción seleccionada
    console.log(`Opción seleccionada: ${option}`);
  }


  
}
