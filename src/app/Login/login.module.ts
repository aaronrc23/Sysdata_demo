import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { LoginRoutingModule } from './login-routing.module';
import { LogearseComponent } from './logearse/logearse.component';

import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';

@NgModule({
  declarations: [
    LogearseComponent,


  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule ,
    HttpClientModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    FormsModule
    
  ],
  exports:[
    LogearseComponent,
  ],

  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
    }
  ],
})
export class LoginModule { }
