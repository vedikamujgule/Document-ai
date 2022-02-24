import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { APPCONFIG } from '../config/config';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    let accessToken = sessionStorage.getItem(APPCONFIG.token_key);
    if(accessToken == 'undefined'|| accessToken == '' || accessToken == null){
      return this.loggedIn.asObservable();
    }
    return of(true);
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.emailId !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }
}

