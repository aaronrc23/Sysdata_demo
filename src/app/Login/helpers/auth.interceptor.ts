import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaServiceService } from 'src/app/mantenimiento/service/categoria-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private categoriaServiceService: CategoriaServiceService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.categoriaServiceService.getToken();
    if (token){
      const cloned = request.clone({
        headers:request.headers.set('Authorization',`Bearer ${token}`)
      })
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
