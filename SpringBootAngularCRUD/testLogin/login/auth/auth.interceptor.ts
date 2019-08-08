import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpUserEvent} from '@angular/common/http';
import {Router} from '@angular/router';
// import {Observable} from 'rxjs/observable';
// import 'rxjs/add/operator/do';
import {Observable} from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') == 'true') {
      return next.handle(req.clone());
    }

    if (sessionStorage.getItem('userToken') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('userToken'))
      });

      return next.handle(clonedreq).pipe(
        tap(event => {

        }, error => {
          // this.router.navigateByUrl('\login');
        }));

    } else {
      this.router.navigateByUrl('\login');
      sessionStorage.clear();
    }
  }
}
