import { Component } from '@angular/core';
import { ConsultaRucService } from 'src/app/mantenimiento/service/ConsultaRuc/consulta-ruc.service';

@Component({
  selector: 'app-consulta-ruc',
  templateUrl: './consulta-ruc.component.html',
  styleUrls: ['./consulta-ruc.component.scss']
})
export class ConsultaRucComponent {

  rucInput: string='';
  resultado: any;
  error: string='';

  constructor(private consultaRucService : ConsultaRucService) {
    
   }
  consultarRUC() {
    this.error = ''; 

    this.consultaRucService.consultarRUC(this.rucInput).subscribe(
      (data) => {
        this.resultado = data;
        console.log(data);
      },
      (error) => {
        this.error = error; 
      }
    );
  }
}
