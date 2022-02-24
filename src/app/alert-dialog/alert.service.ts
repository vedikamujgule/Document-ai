import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertDialogComponent, EmailContentDialogComponent, HistoryDialogComponent, MessageDialogComponent, NSFormDialogComponent, StatusDialogComponent} from '../alert-dialog/alert-dialog.component';
import { GooglePdfViewerComponent } from '../google-pdf-viewer/google-pdf-viewer.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  message : string;
  dialogRef;
  constructor(private matDialog: MatDialog) { 
  }

refreshDialogref(){
  this.dialogRef = null;
}
  openDialogBox() {
    this.dialogRef=null;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.matDialog.open(AlertDialogComponent, dialogConfig);
  }
  
  openMessageDialogBox(message) {
    this.dialogRef=null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this.dialogRef = this.matDialog.open(MessageDialogComponent, dialogConfig);
  }

  openNSFormMessageDialogBox(message) {
    this.dialogRef=null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this.dialogRef = this.matDialog.open(NSFormDialogComponent, dialogConfig);
  }

  openEmailContentDialogBox(message) {
    this.dialogRef=null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this.dialogRef = this.matDialog.open(EmailContentDialogComponent, dialogConfig);
  }

  openPDFViewer() {
    this.dialogRef=null;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.matDialog.open(GooglePdfViewerComponent, dialogConfig);
  }

  openHistoryDialogBox(message) {
    this.dialogRef=null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this.dialogRef = this.matDialog.open(HistoryDialogComponent, dialogConfig);
  }

  openStatusDialogBox() {
    this.dialogRef=null;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.matDialog.open(StatusDialogComponent, dialogConfig).afterClosed()
    .subscribe(response => {
      console.log('response:- '+response);
      return response;
    });
  }

  

}
