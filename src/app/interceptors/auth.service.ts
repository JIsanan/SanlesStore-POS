import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders:{
          Authorization:'${localStorage.get("token")}'
      }
    });
    return next.handle(req);
  }

  constructor() { }
}
