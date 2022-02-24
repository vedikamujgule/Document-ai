import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FilePondOptions } from 'filepond';
import { HttpClient } from '@angular/common/http';
import { APPCONFIG } from '../config/config';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-dialog.component.sass']
})
export class FileUploadComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  apiUrl: String;
  accessToken: String | undefined;
  uploadedFiles: any=[];
  pondFiles: FilePondOptions["files"] = [];
  
  constructor(public dialogRef: MatDialogRef<FileUploadComponent>, private router: Router, 
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private loader: NgxUiLoaderService,
    private commonService: CommonService,
    private http: HttpClient
    ) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.apiUrl = APPCONFIG.appUrl;
    this.accessToken = sessionStorage.getItem(APPCONFIG.token_key);
  }

  @ViewChild('myPond') myPond: any;
  pondOptions: FilePondOptions = {
    allowMultiple: true,
    allowFileTypeValidation: true,
    maxFileSize: '7MB',
    labelIdle: 'Drag & Drop files OR Click to <span class="filepond--label-action primary-text"> browse </span>',
    labelInvalidField: 'Field contains invalid files',
    labelFileWaitingForSize: 'Waiting for size',
    labelFileSizeNotAvailable: 'Size not available',
    labelFileLoading: 'Loading',
    labelFileLoadError: 'Error during load',
    labelFileProcessing: 'Uploading',
    labelFileProcessingComplete: 'Upload complete',
    labelFileProcessingAborted: 'Upload cancelled',
    labelFileProcessingError: 'Error during upload',
    labelFileProcessingRevertError: 'Error during revert',
    labelFileRemoveError: 'Error during remove',
    labelTapToCancel: 'tap to cancel',
    labelTapToRetry: 'tap to retry',
    labelTapToUndo: 'tap to undo',
    labelButtonRemoveItem: 'Remove',
    labelButtonAbortItemLoad: 'Abort',
    labelButtonRetryItemLoad: 'Retry',
    labelButtonAbortItemProcessing: 'Cancel',
    labelButtonUndoItemProcessing: 'Undo',
    labelButtonRetryItemProcessing: 'Retry',
    labelButtonProcessItem: 'Upload',
    acceptedFileTypes: ['application/pdf'],
  }

  pondHandleInit() {
    console.debug('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.debug('A file was added', event);
    this.pondFiles.push(event);
    this.uploadedFiles.push(event.file.file);
  }

  pondHandleActivateFile(event: any) {
    console.debug('A file was activated', event)
  }

  close() {
    this.dialogRef.close();
  }

  uploadFiles(){
    this.loader.start();
    this.close(); 
    this.commonService.displayShortMessage("File uploaded successfully. Will reflect in the dashboard in a while", 3000);   
    const formData = new FormData();
    for(let i=0; i< this.uploadedFiles.length; i++){
      formData.append("files", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    formData.append("userId","test user")
    this.http.post(this.apiUrl+'form/upload?access_token='+this.accessToken, formData).subscribe(
      data => { },
      message => {
        if(message['status'] == 200){
          this.commonService.displayShortMessage("File uploaded successfully. Will reflect in the dashboard in a while", 3000);
        }else{
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        }
        this.loader.stop();
      }
    )
  }

}
