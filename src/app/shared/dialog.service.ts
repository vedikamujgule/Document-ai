import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  message : string;
  dialogRef;
  constructor(private matDialog: MatDialog) { 
  }

  refreshDialogref(){
    this.dialogRef = null;
  }

  openFileUploadDialogBox() {
    this.dialogRef=null;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.matDialog.open(FileUploadComponent, dialogConfig);
  }

  
}
