import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  //menu hambuerguesa
  private sidebarToggleSource = new BehaviorSubject<boolean>(true);

  sidebarToggle$ = this.sidebarToggleSource.asObservable();

  toggleSidebar() {
    this.sidebarToggleSource.next(!this.sidebarToggleSource.value);
  }
}
