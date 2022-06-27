import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreUser } from './store/user';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private storeUser: StoreUser
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.storeUser.user) {
      const authorization = `bearer ${this.storeUser.user?.name.toLowerCase()}`
      request = request.clone({setHeaders: {authorization}});
    }
    return next.handle(request);
  }

}
