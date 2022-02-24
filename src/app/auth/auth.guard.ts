import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APPCONFIG } from '../config/config';
import { UserRole } from '../shared/auth.roles';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //       const currentUserRole: any = environment.defaultRole == UserRole.admin ? '0' : environment.defaultRole == UserRole.agent ? '1' : '2';

  //   return this.authService.isLoggedIn.pipe(
  //     take(1),
  //     map((isLoggedIn: boolean) => {
  //       console.log(isLoggedIn);
  //       let accessToken = sessionStorage.getItem('access_token');
  //       if (!isLoggedIn || accessToken == '') {
  //         this.router.navigate(['/login']);
  //         return false;
  //       }
  //       return true;
  //     })
  //   );
  // }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const currentUserRole: any = environment.defaultRole == UserRole.admin ? 1 : environment.defaultRole == UserRole.agent ? 3 : 2;
    console.log('user role set as', currentUserRole)

    // check the token exist, or not
    if (sessionStorage.getItem('access_token')?.length>0 && sessionStorage.getItem('access_token')?.length>0 && currentUserRole !=='') {
      console.log(sessionStorage.getItem('access_token')?.length>0 , sessionStorage.getItem('access_token')?.length>0 , currentUserRole)
      if (route.data && route.data.roles) { // find which role is assigned
        console.log('actual role set as', route.data, route.data.roles)
        if (route.data.roles.includes(parseInt(currentUserRole))) {
          return true;
        } else { // if no role assigned then redirect to login
          console.log(" no role assigned then redirect to login")
          this.router.navigate(['/login']);
          return false;
        }
      } else { // redirect to previous screen
        return true;
      }
    } else { // redirect to login if the token and role not exist, 
      console.log(" no role assigned then redirect to login 2" )
      this.router.navigate(['/login']);
      return false;
    }
  }
}