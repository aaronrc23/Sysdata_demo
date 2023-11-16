import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/mantenimiento/Interface/Credentials';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';

@Component({
  selector: 'app-logearse',
  templateUrl: './logearse.component.html',
  styleUrls: ['./logearse.component.scss']
})
export class LogearseComponent {

  creds: Credentials = {
    username: '',
    password: ''
  };

  constructor(
    private CategoriaServiceService: CategoriaServiceService,
    private router: Router) {
    
    
  }
  login(form:NgForm){
    console.log("form value",form.value);
    this.CategoriaServiceService.login(this.creds).subscribe(response => {
      this.router.navigate(['/plantillas']);
    })
  }
}
