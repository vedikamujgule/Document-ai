import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.sass']
})
export class AlertDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>, private router: Router, 
    @Inject(DOCUMENT) private document: Document) { 
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['login']);
  }

}
@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./alert-dialog.component.sass']
})
export class MessageDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>, 
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['dashboard']);
  }
}
@Component({
  selector: 'app-ns-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./alert-dialog.component.sass']
})
export class NSFormDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NSFormDialogComponent>, 
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['non-standard-forms']);
  }
}
@Component({
  selector: 'status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./alert-dialog.component.sass']
})
export class StatusDialogComponent implements OnInit {

  actionReason:string;
  constructor(public dialogRef: MatDialogRef<StatusDialogComponent>, 
    private _ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){ 
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;  
  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  close() {
    this.dialogRef.close();
    
  }

}

@Component({
  selector: 'hold-dialog',
  templateUrl: './hold-dialog.component.html',
  styleUrls: ['./alert-dialog.component.sass']
})
export class OnHoldDialogComponent implements OnInit {

  actionReason:string;
  constructor(public dialogRef: MatDialogRef<OnHoldDialogComponent>, 
    private _ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){ 
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;  
  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  close() {
    this.dialogRef.close(); 
  }
}

@Component({
  selector: 'history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./alert-dialog.component.sass']
})
export class HistoryDialogComponent implements OnInit {

  actionReason:string;
  constructor(public dialogRef: MatDialogRef<StatusDialogComponent>, 
    private loader: NgxUiLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any){ 
      this.loader.stop();
      dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();    
  }

}
@Component({
  selector: 'email-content-dialog',
  templateUrl: './email-content-dialog.component.html',
  styleUrls: ['./alert-dialog.component.sass']
})
export class EmailContentDialogComponent implements OnInit {

  emailSubject:string;
  constructor(public dialogRef: MatDialogRef<EmailContentDialogComponent>, 
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    ) { 
      dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.emailSubject = this.dataService.messageSource.getValue();
  }

  close() {
    this.dialogRef.close();
  }
}