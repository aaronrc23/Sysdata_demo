import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-movimiento',
  templateUrl: './register-movimiento.component.html',
  styleUrls: ['./register-movimiento.component.scss']
})
export class RegisterMovimientoComponent {
  faPlus = faPlus;
  modalVisible: boolean = false;
  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
}
