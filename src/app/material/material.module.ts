import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatRadioModule,
    CdkAccordionModule,
    MatExpansionModule,
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    TextFieldModule,
    FormsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule
  ],
  exports:[
    MatDialogModule,
    MatRadioModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    TextFieldModule,
    FormsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
