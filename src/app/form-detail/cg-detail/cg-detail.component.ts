import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild, NgZone, EventEmitter, Output, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatAccordion } from '@angular/material/expansion';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import $ from 'jquery';
import jQuery from 'jquery';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/shared/common.service';
import { AlertService } from 'src/app/alert-dialog/alert.service';
import { DataService } from 'src/app/shared/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { APPCONFIG } from 'src/app/config/config';
import lightGallery from 'lightgallery';
import { OnHoldDialogComponent, StatusDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-cg-detail',
  templateUrl: './cg-detail.component.html',
  styleUrls: ['./cg-detail.component.scss']
})
export class CgDetailComponent implements OnInit {

  addressTypes: string[] = ['Commercial', 'Residential'];
  uploadedDocs: string[];
  primaryDocs: string[];
  primaryDoc: any;
  step = 0;
  apiUrl: String;
  accessToken: String | undefined;
  applicationForm!: FormGroup;
  historyList:any = [];
  //items:any = [];
  itemArray: FormArray;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  fileNo: any;
  actionReason:string="";
  isLoggedIn$!: Observable<boolean>;
  fieldPredictObj:any;
  lightGallery: any;
  pageLoad: boolean = false;
 
  constructor(private _ngZone: NgZone,
    private authService: AuthService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private loader: NgxUiLoaderService,
    private http: HttpClient,
    private data: DataService,
    public dialog: MatDialog,
    private router: Router,
    private sanitizer:DomSanitizer,
    ) { }

    ngOnInit(): void {
    this.loader.start();
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.apiUrl = APPCONFIG.appUrl;
    this.accessToken = sessionStorage.getItem(APPCONFIG.token_key);
    if(this.data.messageSource.getValue() != ''){
      sessionStorage.setItem(APPCONFIG.fileStorageId, this.data.messageSource.getValue())
    }
    this.fileNo = sessionStorage.getItem(APPCONFIG.fileStorageId);
    this.initApplicationForm();
    this.getApplicationDetails();
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  message:string;
  subscription: Subscription;
  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  initApplicationForm(){
    this.applicationForm = this.fb.group({
      actingCapacity: [''],companyName: [''],requesterName: [''],requesterEmail: [''],requesterContact: [''],
      requesterAddress: [''],contactType: [''],isAnotherPersonApplied: [''], 
      payeeDetails: [''],typeOfService: [''],newConnections: [''],totalConnections: [''],
      actualCost: [''],quotationChargePayer: [''],siteContact: [''],
      siteAddress: [''], siteType: [''],developmentStage: [''],gasUsage: [''], annualUsage: [''], 
      isMeterInsideProperty: [''],
      isMeterInstallByCadent: [''], meterType: [''], concreteBaseProvider: [''], isOnsiteExcavationReq: [''],
      isElevatedPressureRequired:[''], componentsRequired: [''], additionalInfo: [''],isConfirmed: [''],
      
      //propertyType:['']
     items: this.fb.array([])
      //items: this.fb.group 
    });
  }

  getApplicationDetails() {
    this.loader.start();
    $('#lightgallery').unbind().removeData();
    this.http.get(this.apiUrl + 'form/get/cgf/' + this.fileNo + '?access_token=' + this.accessToken).subscribe(
      data => {
        if (data['status'] == 200) {
          let userDetails = data['obj'];
          this.pageLoad= true;
          
          this.applicationForm.patchValue({
            actingCapacity: userDetails.actingCapacity,companyName: userDetails.companyName, requesterName: userDetails.requesterName,requesterEmail: userDetails.requesterEmail,
            requesterContact: userDetails.requesterContact,requesterAddress: userDetails.requesterAddress,contactType: userDetails.contactType,
            isAnotherPersonApplied: userDetails.isAnotherPersonApplied, payeeDetails: userDetails.payeeDetails,
            typeOfService: userDetails.typeOfService,newConnections: userDetails.newConnections, totalConnections: userDetails.totalConnections,
            actualCost: userDetails.actualCost,quotationChargePayer: userDetails.quotationChargePayer,
            siteContact: userDetails.siteContact, siteAddress: userDetails.siteAddress, siteType: userDetails.siteType,
            developmentStage: userDetails.developmentStage,gasUsage: userDetails.gasUsage, annualUsage: userDetails.annualUsage, 
            isMeterInsideProperty: userDetails.isMeterInsideProperty, isMeterInstallByCadent: userDetails.isMeterInstallByCadent, 
            meterType: userDetails.meterType, concreteBaseProvider: userDetails.concreteBaseProvider, isOnsiteExcavationReq: userDetails.isOnsiteExcavationReq,
            isElevatedPressureRequired:userDetails.isElevatedPressureRequired,
            componentsRequired: userDetails.componentsRequired, additionalInfo: userDetails.additionalInfo, isConfirmed: userDetails.isConfirmed
          });
          
          userDetails.items.forEach((x) => {
            this.formArr.push(this.fb.group(x))
          });
          this.uploadedDocs = userDetails.uploadedDocs;          
          this.loader.stop();
          setTimeout(function () {
            lightGallery(document.getElementById('lightgallery'));
          }, 100);    
        } else {
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        }
        this.loader.stop();
      },
      error => {
        console.debug('error :- ' + error);
        if(error['status'] == 403){
          this.alertService.openDialogBox();
        }  
        this.loader.stop();
      }
    );
  }

  get formArr() {
    return this.applicationForm.get('items') as FormArray;
  }

  replaceExtraChars(val){
    if(val == '' || val == undefined){
      return val;
    }
    return val.replace('\n', '');
  }

  fetchHistory() {
    this.loader.start();
    this.http.get(this.apiUrl + 'form/history/' + this.fileNo + '?access_token=' + this.accessToken).subscribe(
      data => {
        this.loader.stop();
        if (data['status'] == 200) {        
          this.historyList = data['obj'];
          this.alertService.openHistoryDialogBox(this.historyList);
        } else {
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        }
        
      },
      error => {
        console.debug('error :- ' + error);
        this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        this.loader.stop();
      }
    );
  }

  updateStatus(status:number) {


    const dialogRef = this.dialog.open(StatusDialogComponent, {
      data: {actionReason: this.actionReason}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.actionReason = result;  
      if(this.actionReason == '' || this.actionReason == undefined ){
        this.commonService.displayShortMessage("No action performed..", 2000);
        return ;
      }else{
        this.loader.start();
        let data = JSON.stringify(this.applicationForm.value)
        let paramdata = '?appId='+this.fileNo+'&status='+status+ '&reason='+this.actionReason;
          const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
          this.http.post(this.apiUrl+'/form/update/cgf'+ paramdata + '&access_token='+this.accessToken, data, { headers: headers }).subscribe( 
            data => {},
            request => {
              if (request['status'] == 403) {
                this.alertService.openDialogBox();
              }else if (request['status'] == 200) {
                this.alertService.openMessageDialogBox("Application form updated successfully");
              } else {
                this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
              }
              this.loader.stop();
            }
          ); 
      }   
    });
   
  }


  updateHoldStatus(status:number) {
    const dialogRef = this.dialog.open(OnHoldDialogComponent, {
      data: {actionReason: this.actionReason}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.actionReason = result;  
      if(this.actionReason == '' || this.actionReason == undefined ){
        return ;
      }else{
        this.loader.start();
        let data = JSON.stringify(this.applicationForm.value)
        let paramdata = '?appId='+this.fileNo+'&status='+status+ '&reason='+this.actionReason;
          console.log('paramdata :- '+paramdata);
          const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
          this.http.post(this.apiUrl+'/form/update/cgf'+ paramdata + '&access_token='+this.accessToken, data, { headers: headers }).subscribe( 
            data => {},
            request => {
              if (request['status'] == 403) {
                this.alertService.openDialogBox();
              }else if (request['status'] == 200) {
                this.alertService.openMessageDialogBox("Application form updated successfully");
              } else {
                this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
              }
              this.loader.stop();
            }
          ); 
      }   
    });
   
  }

  draftSave(){
    this.loader.start();
        let data = JSON.stringify(this.applicationForm.value)
        this.actionReason = 'draft';
        let paramdata = '?appId='+this.fileNo+'&status='+5+ '&reason='+this.actionReason;
          console.log('paramdata :- '+paramdata);
          const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
          this.http.post(this.apiUrl+'/form/update/cgf'+ paramdata + '&access_token='+this.accessToken, data, { headers: headers }).subscribe( 
            data => {},
            request => {
              if (request['status'] == 403) {
                this.alertService.openDialogBox();
              }else if (request['status'] == 200) {
                this.alertService.openMessageDialogBox("Application form updated successfully");
              } else {
                this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
              }
              this.loader.stop();
            }
          ); 
  }

  uploadNewFile(){
    // this.data.changeMessage(this.fileNo);
    // const dialogRef = this.dialog.open(ManualUploadComponent, {
    //   data: {actionReason: this.actionReason}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   setTimeout(()=>{     
    //     this.loader.start()                      
    //     this.getApplicationDetails();
    // }, 2000);  
  //   });
   }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  downloadProductReport(){
      var apiUrl = (APPCONFIG.appUrl + 'file/cg/report?fileId='+this.fileNo).toString();
      window.open(apiUrl, "_blank");
  }

  backToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  openPDFViewer(url:string){
    this.data.changeMessage(url);
    this.alertService.openPDFViewer();
  }
  
  transform(fileUrl){
    //debugger;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
  }

  isEmpty(field:string){
    var val = this.applicationForm.get(field).value;
    if(val == null || val == undefined || val == ""){
      return true;
    }
    return false;
  }


}
