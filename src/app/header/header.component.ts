import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from './../app.service';
import {  BreakpointObserver,  Breakpoints,  BreakpointState,} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { APPCONFIG } from '../config/config';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
// showFiller = false;
@Output() SideNavToggle = new EventEmitter();  

openSidenav() {
 this.SideNavToggle.emit();
}
public selectedItem : string = '';
public isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(map((result: BreakpointState) => result.matches));
  userName:string;
  accessToken: String | undefined;
  apiUrl : String;

  constructor(private appService: AppService,
    private breakpointObserver: BreakpointObserver,
    private loader: NgxUiLoaderService,
    private http: HttpClient
    ) { 
      this.apiUrl = APPCONFIG.appUrl;
    }

  ngOnInit(): void {
    this.loader.start();
    this.userName = sessionStorage.getItem(APPCONFIG.user_full_name);
    // if(this.userName == null){
    //   this.accessToken = sessionStorage.getItem(APPCONFIG.token_key);
    //   this.getUserDetails();
    // }
    // send user to login page if this is undefined or null
  }

  // getUserDetails(){
  //   this.http.get(this.apiUrl+'user/info?access_token='+this.accessToken ).subscribe(
  //     data => {
  //       this.loader.stop();
  //       if(data['status'] == 200){
  //         var userInfo = data['userInfo'];
  //         this.userName = userInfo['fullName'];
  //         sessionStorage.setItem('cad_user',userInfo['fullName']);
  //         sessionStorage.setItem('cad_rol',userInfo['roleId']);
  //       }
  //     },
  //     error => {
  //       console.debug('error :- '+error) ;
  //       this.loader.stop();
  //   }
  //   );
  // }

}
