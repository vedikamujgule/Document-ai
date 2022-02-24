import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, share, shareReplay } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';
import { MatSidenav } from '@angular/material/sidenav';
import { APPCONFIG } from './config/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme = false;
  title = 'Cadent-Dashboard';
  sidenav: boolean = false;
  header: boolean = false;
  showToggle: string | undefined;
  drawer: any;
  ngOnInit() {
    this.isDarkTheme = sessionStorage.getItem('theme') === "Dark" ? true : false;
  }
  _isLoginPage() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event['url'] == '/login' || event['url'] == '/' || event['url'] == '/change-password' || event['url'] == '/reset-password') {
          sessionStorage.removeItem(APPCONFIG.token_key);
          sessionStorage.removeItem(APPCONFIG.role_key);
          sessionStorage.removeItem(APPCONFIG.user_full_name);
          this.isLoginPage = true;
        } else {
          this.isLoginPage = false;
        }
      }
    });
  }
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1440px)')
    .pipe(
      map((result) => result.matches),
      shareReplay(1)
    );
  isLoginPage: boolean = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private appService: AppService
  ) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.sidenav = false;
        } else {
          this.header = true;
          this.sidenav = true;
        }
      }
    });
    this._isLoginPage();
  }
  closeSideNav() {
    if (this.drawer._mode=='over') {
      this.drawer.close();
    }
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
  storeThemeSelection() {
    sessionStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }
}
