import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module'; 
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { AlertDialogComponent, EmailContentDialogComponent, HistoryDialogComponent, MessageDialogComponent, NSFormDialogComponent, OnHoldDialogComponent, StatusDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MatChipsModule} from '@angular/material/chips';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginFileValidateType);
import * as FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview);
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import the plugin code
import * as FilePondPluginFileMetadata from 'filepond-plugin-file-metadata';
registerPlugin(FilePondPluginFileMetadata);
import * as FilePondPluginFilePoster from 'filepond-plugin-file-poster';
// Import the plugin styles
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';
// Register the plugin
registerPlugin(FilePondPluginFilePoster);
// Import the plugin code
import * as FilePondPluginFileRename from 'filepond-plugin-file-rename';
// Register the plugin
registerPlugin(FilePondPluginFileRename);
// Import the plugin code
import * as FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
// Register the plugin
registerPlugin(FilePondPluginFileValidateSize);
// Import the plugin code
import * as FilePondPluginImageCrop from 'filepond-plugin-image-crop';
// Register the plugin
registerPlugin(FilePondPluginImageCrop);
// Import the plugin code
import * as FilePondPluginImageEdit from 'filepond-plugin-image-edit';
// Import the plugin styles
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
// Register the plugin
registerPlugin(FilePondPluginImageEdit);
// Import the plugin code
import * as FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// Register the plugin
registerPlugin(FilePondPluginImageExifOrientation);
// Import the plugin code
import * as FilePondPluginImageFilter from 'filepond-plugin-image-filter';
// Register the plugin
registerPlugin(FilePondPluginImageFilter);
import * as FilePondPluginImageResize from 'filepond-plugin-image-resize';
// Register the plugin
registerPlugin(FilePondPluginImageResize);
import * as FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
// Register the plugin
registerPlugin(FilePondPluginImageValidateSize);
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogsComponent } from './dashboard/dialogs/dialogs.component';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpecialCharPipe } from './shared/special-char.pipe';
import { PaginateComponent } from './paginate/paginate.component';
import { CgDetailComponent } from './form-detail/cg-detail/cg-detail.component';
import { GooglePdfViewerComponent } from './google-pdf-viewer/google-pdf-viewer.component';

import { AssignTaskComponent } from './dashboard/assign-task/assign-task.component';

import { LightgalleryModule } from 'lightgallery/angular/10';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardComponent,
    AlertDialogComponent,
    MessageDialogComponent,
    NSFormDialogComponent,
    StatusDialogComponent,

    HistoryDialogComponent,
    DialogsComponent,

    FormDetailComponent,
    FileUploadComponent,
    OnHoldDialogComponent,
    EmailContentDialogComponent,
    SpecialCharPipe,
    PaginateComponent,
    CgDetailComponent,
    GooglePdfViewerComponent,

    AssignTaskComponent,

  ],
  imports: [
    PdfViewerModule,
    FilePondModule,
    BrowserModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxUiLoaderModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    LightgalleryModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},{provide: MatDialogRef, useValue:{}, },
    CgDetailComponent,

  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertDialogComponent, MessageDialogComponent, NSFormDialogComponent,
    DialogsComponent, FileUploadComponent, StatusDialogComponent, HistoryDialogComponent,
     , OnHoldDialogComponent, CgDetailComponent,
    EmailContentDialogComponent, GooglePdfViewerComponent, AssignTaskComponent]
})
export class AppModule { }