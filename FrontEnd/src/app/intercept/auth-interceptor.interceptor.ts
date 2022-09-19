import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let newReq = request;
    const token = this.loginService.getToken();

    if(token!=null)
    {
      console.log(token)
      newReq = newReq.clone({setHeaders:{"Authorization": "Bearer "+token}})
      console.log(newReq);
    }
    return next.handle(newReq);
  }
}
