import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePdfViewerComponent } from './google-pdf-viewer.component';

describe('GooglePdfViewerComponent', () => {
  let component: GooglePdfViewerComponent;
  let fixture: ComponentFixture<GooglePdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooglePdfViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
