import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { APPCONFIG } from '../config/config';
import { AuthService } from './../auth/auth.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  constructor(private authService: AuthService) { }
  isLoggedIn$!: Observable<boolean>;
  isAdmin:boolean| false;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    let role = sessionStorage.getItem(APPCONFIG.role_key);
    if(role == 'admin'){
      this.isAdmin = true;
    }
  }
  onLogout() {
    this.authService.logout();
  }
  
}
