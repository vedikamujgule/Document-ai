import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/shared/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/alert-dialog/alert.service';
import { APPCONFIG } from 'src/app/config/config';

@Component({
  selector: 'assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {



  isLoggedIn$!: Observable<boolean>;
  apiUrl: String;
  accessToken: String | undefined;
  addUserForm!: FormGroup;
  private formSubmitAttempt!: boolean;
  agentId: any;
  public connectionIds: any = [];
  agents: any = [];


  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private dialogService: AlertService,
    private loader: NgxUiLoaderService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AssignTaskComponent>,
    private alertService: AlertService,
  ) {
    dialogRef.disableClose = true;
    this.addUserForm = this.formBuilder.group({
      connectionIds:[''],
      agentId: '',
    });
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.apiUrl = APPCONFIG.appUrl;
    this.accessToken = sessionStorage.getItem(APPCONFIG.token_key);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.addUserForm.get(field)?.valid && this.addUserForm.get(field)?.touched) ||
      (this.addUserForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  setAgent(){
    this.addUserForm.value.connectionIds = this.connectionIds;
    let data = JSON.stringify(this.addUserForm.value);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.apiUrl + '/form/assign/agent?access_token=' + this.accessToken, data, { headers: headers }).subscribe(
            data => {
              if (data['status'] == 200) {
                this.commonService.displayShortMessage("Agent assigned successfully .", 3000);
              }else {
                this.commonService.displayShortMessage("Failed to assign agent.", 3000);
              }
              this.loader.stop();
            },
            error => {
              debugger;
              if (error['status'] == 403) {
                this.alertService.openDialogBox();
              }else {
                this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
              }
              this.loader.stop();
            }
          );
  }
  close() {
    this.dialogRef.close();
  }

}