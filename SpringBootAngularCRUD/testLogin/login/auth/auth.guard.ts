import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private permissionsService: NgxPermissionsService) {
  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   let currentUser: any = JSON.parse(sessionStorage.getItem('currentUser'));
  //   // if (sessionStorage.getItem('currentUser') != null) {
  //   //   let currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
  //   //   let check: Array<any> = [];
  //   //   if (next.data.roles != undefined) {
  //   //     for (let i = 0; i < next.data.roles.length; i++) {
  //   //       check = currentUser.authorities.filter(role => role.authority === next.data.roles[i]);
  //   //     }
  //   //   }
  //   //   console.log('check', check);
  //   //   if (next.data.roles && check.length == 0) {
  //   //     this.router.navigate(['/']);
  //   //     return false;
  //   //   }
  //   //
  //   //   return true;
  //   // }
  //   if (currentUser != null) {
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('userToken') != null) {
      let currentUser: any = JSON.parse(sessionStorage.getItem('currentUser'));
      let check: Array<any> = [];
      if (next.data.roles != undefined) {
        for (let i = 0; i < next.data.roles.length; i++) {
          for (let j = 0; j < currentUser.authorities.length; j++) {
            if (currentUser.authorities[j].authority === next.data.roles[i]) {
              check.push(currentUser.authorities[j]);
            }
          }
        }
      }
      // console.log('check', check);
      if (next.data.roles && check.length == 0) {
        this.router.navigate(['/']);
        sessionStorage.clear();
        return false;
      }

      //permisions load
      let roles: Array<any> = [];
      for (let ob of currentUser.authorities) {
        roles.push(ob.authority);
      }
      this.permissionsService.loadPermissions(roles);

      return true;
    }
    this.router.navigate(['\login']);
    sessionStorage.clear();
    this.permissionsService.flushPermissions();
    return false;
  }
}
