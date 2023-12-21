import { Component, OnInit, Inject,PLATFORM_ID} from '@angular/core';
import {
  faGauge,
  faBoxes,
  faLayerGroup,
  faUnderline,
  faTruck,
  faAngleDown,
  faPersonCirclePlus,
  faCirclePlus,
  faFileCirclePlus,
  faBoxesPacking,
  faFilePen,
  faFileCircleExclamation,
  faFileCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faGauge = faGauge;
  faBoxes = faBoxes;
  faLayerGroup = faLayerGroup;
  faUnderline = faUnderline;
  faTruck = faTruck;
  faAngleDown = faAngleDown;
  faPersonCirclePlus = faPersonCirclePlus;
  faCirclePlus = faCirclePlus;
  faFileCirclePlus = faFileCirclePlus;
  faBoxesPacking = faBoxesPacking;
  faFilePen = faFilePen;
  faFileCircleExclamation = faFileCircleExclamation;
  faFileCircleCheck = faFileCircleCheck;
  dropdownStates: boolean[] = [false, false];


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
   
  }
}
