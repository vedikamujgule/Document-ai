import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild, NgZone, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { APPCONFIG } from '../config/config';
import { CommonService } from '../shared/common.service';
import { AuthService } from './../auth/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatAccordion } from '@angular/material/expansion';
import { take } from 'rxjs/operators';
import { AlertService } from '../alert-dialog/alert.service';
import { OnHoldDialogComponent, StatusDialogComponent } from '../alert-dialog/alert-dialog.component';
import { DataService } from '../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../shared/dialog.service';
import $ from 'jquery';
import jQuery from 'jquery';
import lightGallery from 'lightgallery';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {


  addressTypes: string[] = ['Commercial', 'Residential'];
  uploadedDocs: string[];
  primaryDocs: string[];
  primaryDoc: any;
  step = 0;
  apiUrl: String;
  accessToken: String | undefined;
  applicationForm!: FormGroup;
  historyList:any = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  fileNo: any;
  actionReason:string="";
  isLoggedIn$!: Observable<boolean>;
  fieldPredictObj:any;
  lightGallery: any;
  pageLoad: boolean = false;
  emailContent: string;
  emailSubject:string;
  applicationStatus: any;
 
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
      requesterName: [''],houseNoAndName: [''],street: [''],town: [''],
      county: [''],postCode: [''],requesterContactName: [''],
      requesterContact: [''],requesterEmailId: [''],siteHouseNoAndName: [''],siteStreet: [''],
      siteTown: [''],siteCounty: [''],sitePostCode: [''],siteContactName: [''],
      siteContact: [''], siteEmailId: [''],upgradeRequired: [''],existPropertyConnection: [''],
      newPropertyConnection: [''], noOfConnections: [''], hourlyUsage: [''],
      annualUsage: [''], propertyListed: [''], gradeType: [''], workAboveGroundFloor: [''],
      streetHaveGas: [''], trenchDiggingRequired: [''], extraDiggingRequired: [''],
      gasMeterRequired: [''], meterHeight: [''], meterWidth: [''], meterDepth: [''],
      supplyUsage: [''], pressureAmount: [''], boosterComponentRequired: [''], compressorComponentRequired: [''],
      heatingComponentRequired: [''], compressorType: [''], loadStartUpTime: [''], propertyType: [''],

      gasMeterSurfaceMounted: [''], gasMeterFreeStanding: [''], gasMeterMountedKiosk: [''], gasMeterSemiConcealed: [''],
      gasMeterSurfaceMountedCount: [''], gasMeterFreeStandingCount: [''], gasMeterMountedKioskCount: [''], gasMeterSemiConcealedCount: ['']
    });
  }

  getApplicationDetails() {
    
    this.loader.start();
    $('#lightgallery').unbind().removeData();
    this.http.get(this.apiUrl + 'form/get/' + this.fileNo + '?access_token=' + this.accessToken).subscribe(
      data => {
        if (data['status'] == 200) {
          let userDetails = data['obj'];
          this.pageLoad= true;
          
          this.applicationForm.patchValue({
            requesterName: userDetails.requesterName, houseNoAndName: userDetails.houseNoAndName,
            street: userDetails.street, town: userDetails.town, county: userDetails.county,
            postCode: userDetails.postCode, requesterContactName: userDetails.requesterContactName, 
            requesterContact: userDetails.requesterContact,requesterEmailId: userDetails.requesterEmailId, 
            siteHouseNoAndName: userDetails.siteHouseNoAndName, siteStreet: userDetails.siteStreet, 
            siteTown: userDetails.siteTown, siteCounty: userDetails.siteCounty, sitePostCode: userDetails.sitePostCode, 
            siteContactName: userDetails.siteContactName, siteContact: userDetails.siteContact, siteEmailId: userDetails.siteEmailId,
            noOfConnections: userDetails.noOfConnections,
            hourlyUsage: userDetails.hourlyUsage, annualUsage: userDetails.annualUsage,
            meterHeight: this.replaceExtraChars(userDetails.meterHeight), meterWidth: this.replaceExtraChars(userDetails.meterWidth), meterDepth: this.replaceExtraChars(userDetails.meterDepth),
            supplyUsage: userDetails.supplyUsage, pressureAmount: userDetails.pressureAmount, loadStartUpTime: userDetails.loadStartUpTime,

            // edit after form update
            upgradeRequired: userDetails.upgradeRequired,
            existPropertyConnection: userDetails.existPropertyConnection,
            newPropertyConnection: userDetails.newPropertyConnection,
            propertyListed: String(userDetails.propertyListed),
            workAboveGroundFloor: String(userDetails.workAboveGroundFloor),
            streetHaveGas: String(userDetails.streetHaveGas),
            gradeType: String(userDetails.gradeType),
            propertyType: String(userDetails.propertyType),

            trenchDiggingRequired:String(userDetails.trenchDiggingRequired),
            extraDiggingRequired:String(userDetails.extraDiggingRequired),
            gasMeterRequired:String(userDetails.gasMeterRequired),
            compressorType:String(userDetails.compressorType),

            boosterComponentRequired: userDetails.boosterComponentRequired,
            compressorComponentRequired: userDetails.compressorComponentRequired,
            heatingComponentRequired: userDetails.heatingComponentRequired,

            gasMeterSurfaceMounted: userDetails.gasMeterSurfaceMounted,
            gasMeterFreeStanding: userDetails.gasMeterFreeStanding,
            gasMeterMountedKiosk: userDetails.gasMeterMountedKiosk,
            gasMeterSemiConcealed: userDetails.gasMeterSemiConcealed,
            gasMeterSurfaceMountedCount: userDetails.gasMeterSurfaceMountedCount, 
            gasMeterFreeStandingCount: userDetails.gasMeterFreeStandingCount,
            gasMeterMountedKioskCount: userDetails.gasMeterMountedKioskCount, 
            gasMeterSemiConcealedCount: userDetails.gasMeterSemiConcealedCount
          });
          this.uploadedDocs = userDetails.uploadedDocs;
          this.primaryDocs = userDetails.primaryDocs;
          this.fieldPredictObj = userDetails.fieldPrediction;
          this.emailContent = userDetails.emailContent;
          this.emailSubject = userDetails.emailSubject;
          this.applicationStatus =  userDetails.applicationStatus;
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
          this.http.post(this.apiUrl+'/form/update'+ paramdata + '&access_token='+this.accessToken, data, { headers: headers }).subscribe( 
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
          this.http.post(this.apiUrl+'/form/update'+ paramdata + '&access_token='+this.accessToken, data, { headers: headers }).subscribe( 
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
          this.http.post(this.apiUrl+'/form/update'+ paramdata + '&access_token='+this.accessToken, data, { headers: headers }).subscribe( 
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

  // uploadNewFile(){
  //   this.data.changeMessage(this.fileNo);
  //   const dialogRef = this.dialog.open(ManualUploadComponent, {
  //     data: {actionReason: this.actionReason}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     setTimeout(()=>{     
  //       this.loader.start()                      
  //       this.getApplicationDetails();
  //   }, 2000);  
  //   });
    
  //   //this.dialogService.openManualFileUploadDialogBox();

  // }

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
      var apiUrl = (APPCONFIG.appUrl + 'file/report?fileId='+this.fileNo).toString();
      window.open(apiUrl, "_blank");
  }

  backToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  openEmailContent(){
    this.data.changeMessage(this.emailSubject);
    this.alertService.openEmailContentDialogBox(this.emailContent);
  }

  openPDFViewer(url:string){
    this.data.changeMessage(url);
    this.alertService.openPDFViewer();
  }
  
  transform(fileUrl){
    //debugger;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
  }

}

