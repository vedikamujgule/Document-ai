import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild, NgZone, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../dashboard/PeriodicElement';
import { Data1 } from '../docDtails';
import { Console } from 'console';
// import {invoice} from '../../assets/pdf/'

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {


  addressTypes: string[] = ['Commercial', 'Residential'];
  uploadedDocs: string[];
  primaryDocs= {};
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

  pdfSrc = "../../assets/pdf/sample-invoice.pdf";
  columnsToDisplay: any = [ 'VendorName','VendorAddress'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  parsedFormsDataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel < PeriodicElement > (true, []);
  connectionIds: any = [];
  agents: any = [];
  pageSize:number = 10;
  FileName="INV-100"
  details= [];
  items= [];
  items2=[];
  docDetails: FormGroup;
  itemsTable: FormGroup;

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
    this.loader.stopAll();
    // this.isLoggedIn$ = this.authService.isLoggedIn;
    // this.apiUrl = APPCONFIG.appUrl;
    // this.accessToken = sessionStorage.getItem(APPCONFIG.token_key);
    // if(this.data.messageSource.getValue() != ''){
    //   sessionStorage.setItem(APPCONFIG.fileStorageId, this.data.messageSource.getValue())
    // }
    this.pageLoad= true;
          
    this.primaryDocs={
      fileType:'pdf',
      fileURL:'src\assets\pdf\sample-invoice.pdf'
    }

    this.fileNo = sessionStorage.getItem(APPCONFIG.fileStorageId);
    this.details.push(Data1[0]);
    this.items.push(this.details[0].InvoiceItems.Item)
    this.items2.push(this.details[0].InvoiceItems.Item2)


    this.loader.stop();
    this.initApplicationForm();
    this.getApplicationDetails();
    this.dataSource = new MatTableDataSource<PeriodicElement>(Data1);
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  message:string;
  subscription: Subscription;
  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  initApplicationForm(){
    this.docDetails = this.fb.group({
      VendorName: [''],VendorAddress: [''],
      BillingAddress: [''],BillingAddressRecipient: [''],

      CustomerName: [''],InvoiceId: [''],
      InvoiceDate: [''],

      Subtotal: [''], TotalTax: [''],

    });

    this.itemsTable = this.fb.group({
      Description: [''],Quantity: [''],
      UnitPrice: [''],Amount: [''],
    })
  }

  getApplicationDetails() {
    // this.loader.start()
          this.docDetails.patchValue({
            VendorName: this.details[0].VendorName.Label,
            VendorAddress: this.details[0].VendorAddress.Label,
            BillingAddress: this.details[0].BillingAddress.Label,
            BillingAddressRecipient: this.details[0].BillingAddressRecipient.Label,

            CustomerName: this.details[0].CustomerName.Label,
            InvoiceId: this.details[0].InvoiceId.Label,
            InvoiceDate: this.details[0].InvoiceDate.Label,

            Subtotal: this.details[0].Subtotal.Label,
            TotalTax: this.details[0].TotalTax.Label,
          });
          this.itemsTable.patchValue({
            Description: this.items[0].Description.Label,
            Quantity:  this.items[0].Quantity.Label,
            UnitPrice:  this.items[0].UnitPrice.Label,
            Amount:  this.items[0].Amount.Label,
          })
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

