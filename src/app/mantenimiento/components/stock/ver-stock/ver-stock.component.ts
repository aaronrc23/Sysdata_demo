import { Component } from '@angular/core';
import { faPlus ,faEye } from "@fortawesome/free-solid-svg-icons"
@Component({
  selector: 'app-ver-stock',
  templateUrl: './ver-stock.component.html',
  styleUrls: ['./ver-stock.component.scss']
})
export class VerStockComponent {
  faEye = faEye;
  modalVisible: boolean = false;
  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
}
