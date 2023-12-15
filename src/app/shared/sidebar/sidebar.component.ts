import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faBox,
  faBoxesStacked,
  faDolly,
  faArchive,
  faGauge,
  faDollyBox,
  faBoxesPacking,
  faPeopleCarryBox,
  faUnderline,
  faShoppingBag,
  faCirclePlus,
  faFilePen,
  faTruck,
  
} from '@fortawesome/free-solid-svg-icons';
import { CommunicationService } from '../service/communication.service';
import { Subscription } from 'rxjs';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  faBox = faBox;
  faBoxesStacked = faBoxesStacked;
  faDolly = faDolly;
  faArchive = faArchive;
  faGauge = faGauge;
  faDollyBox = faDollyBox;
  faBoxesPacking = faBoxesPacking;
  faPeopleCarryBox = faPeopleCarryBox;
  faUnderline = faUnderline;

  faShoppingBag = faShoppingBag;
  faCirclePlus = faCirclePlus;
  faFilePen = faFilePen;
  faTruck = faTruck;

  private subscription: Subscription = new Subscription();
  isActive: boolean = true;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.subscription = this.communicationService.sidebarToggle$.subscribe(
      (value: boolean) => {
        this.isActive = value;
      }
    );
    /*----*/
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /*--------*/
  private submenuOpen: { [key: string]: boolean } = {};

  toggleSubmenu(key: string): void {
    this.submenuOpen[key] = !this.submenuOpen[key];
  }

  isSubmenuOpen(key: string): boolean {
    return this.submenuOpen[key];
  }
}
