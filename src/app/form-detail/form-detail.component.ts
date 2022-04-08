import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild, NgZone, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { APPCONFIG } from '../config/config';
import { CommonService } from '../shared/common.service';
import { AuthService } from './../auth/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatAccordion } from '@angular/material/expansion';
import { findIndex, take } from 'rxjs/operators';
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
import { documentDetailsEle, PeriodicElement } from '../dashboard/PeriodicElement';
import { Data1 } from '../docDtails';
import { Console } from 'console';
import {fields} from './../data'
@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {
  dynamicFields = fields;
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
  dynamicForm: FormGroup;
  pdfSrc = "../../assets/pdf/fancy-sports.pdf";
  columnsToDisplay: any = [ 'VendorName','VendorAddress'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  docDetailsSource = new MatTableDataSource<documentDetailsEle>([]);
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
  invoiceDetails: any;
  documentID: any;
  
   APIFields= [];
   APIItemFields = [];

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
    private route: ActivatedRoute
    ) {
     }

    ngOnInit(): void {
    this.loader.start();
    this.initApplicationForm();
    // this.isLoggedIn$ = this.authService.isLoggedIn;
    // this.apiUrl = APPCONFIG.appUrl;
    // this.accessToken = sessionStorage.getItem(APPCONFIG.token_key);
    // if(this.data.messageSource.getValue() != ''){
    //   sessionStorage.setItem(APPCONFIG.fileStorageId, this.data.messageSource.getValue())
    // }
    this.route.params.subscribe(params => {
      this.getDetailsFromAPI(params.id);
      this.documentID = params.id;
      // this.details.push(Data1[0]);
      // this.items.push(this.details[0].InvoiceItems.Item)
      // this.items2.push(this.details[0].InvoiceItems.Item2)
      // this.initApplicationForm();
      // this.getApplicationDetails();
    })

    
    this.pageLoad= true;
       
    this.primaryDocs={
      fileType:'pdf',
      fileURL:'src\assets\pdf\sample-invoice.pdf'
    }
 
    this.loader.stop();
    // console.log(Data1)
    // this.dataSource = new MatTableDataSource<PeriodicElement>(Data1);

  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  message:string;
  subscription: Subscription;
  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  initApplicationForm(){
    this.docDetails = this.fb.group({
      Vendor_Name: [''],Vendor_Address: [''],
      Billing_Address: [''],Billing_address_Recipient: [''],
      Customer_Name: [''],Invoice_Id: [''],
      Invoice_Date: [''],
      Subtotal: [''], Total_Tax: [''],
    });

    this.itemsTable = this.fb.group({
      Description: [''],Quantity: [''],
      UnitPrice: [''],Amount: [''],
    })
  }
  // Billing_Address: { Label: String, Confidence: Number }
  // Billing_address_Recipient: { Label: String, Confidence: Number }
  // Customer_Name: { Label: String, Confidence: Number }
  // Invoice_Date: { Label: String, Confidence: Number }
  // Invoice_Id: { Label: String, Confidence: Number }
  // Invoice_items: {}
  // Subtotal: { Label: Number, Confidence: Number }
  // Total_Tax: { Label: Number, Confidence: Number }
  // Vendor_Name: { Label: String, Con
  getApplicationDetails() {
    // this.loader.start()
          this.docDetails.patchValue({
            Vendor_Name: this.details[0].Vendor_Name.Label,
            Vendor_Address: this.details[0].Vendor_Address.Label,
            Billing_Address: this.details[0].Billing_Address.Label,
            Billing_address_Recipient: this.details[0].Billing_address_Recipient.Label,

            Customer_Name: this.details[0].Customer_Name.Label,
            Invoice_Id: this.details[0].Invoice_Id.Label,
            Invoice_Date: this.details[0].Invoice_Date.Label,

            Subtotal: this.details[0].Subtotal.Label,
            Total_Tax: this.details[0].Total_Tax.Label,
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

  getData(){
   console.log(this.dynamicForm.valid, this.dynamicForm.value)
  }

  getDetailsFromAPI(documentID){
    try {
      this.loader.start();
      this.http.get('https://msdocs-python-webapp-quickstart-xyztctest.azurewebsites.net/hello_azure/backendurl/?Invoice_Id='+ documentID).subscribe((data: any) => {
          this.invoiceDetails = data;

          console.log("doc data",  this.invoiceDetails)
          this.setDynamicData(this.invoiceDetails?.Documents[0])
          this.details.push( this.invoiceDetails?.Documents[0]);
          // console.log('heer',this.details[0]);
          this.items.push(this.details[0].Invoice_items.Item1)
          // this.items.push(this.details[0].Invoice_items.Item2)
          // this.items.push(this.details[0].Invoice_items.Item3)
          console.log('data', this.items)
          this.getApplicationDetails();
          this.loader.stop();
      
      },
        error => {
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
          this.loader.stop();
        })
    } catch (error) {
      console.log('exception', error)
      this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);

    }
  }
  setDynamicData(data){
    try {
      let items =[];
      console.log("inside", data)
      for (var key in data) {
        if(key !== 'Invoice_items'){
          this.APIFields.push(
            {
              type: "input",
              name: key,
              label: key,
              value: data[key]['Label'],
              required: true,
          })
        }
        else {
        items = data[key];
        }
      }
      for (var key in items) {
          this.APIItemFields.push(
            {
              type: "input",
              name: key,
              label: key,
              value: data[key]['Label'],
              required: true,
          })
          console.log

      }
      console.log("dynamic fields", this.APIFields,this.APIItemFields)
    } catch (error) {
      
    }
  }

}

