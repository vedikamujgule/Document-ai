import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-google-pdf-viewer',
  templateUrl: './google-pdf-viewer.component.html',
  styleUrls: ['./google-pdf-viewer.component.scss']
})
export class GooglePdfViewerComponent implements OnInit {

  uploadedDocs: string[];
  pdfURL:string;
  constructor(public dialogRef: MatDialogRef<GooglePdfViewerComponent>,private dataService: DataService) { }

  ngOnInit(): void {
    //this.uploadedDocs = 
    this.pdfURL = this.dataService.messageSource.getValue();
  }

  close() {
    this.dialogRef.close();
  }
}
