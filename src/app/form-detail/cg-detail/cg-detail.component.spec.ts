import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgDetailComponent } from './cg-detail.component';

describe('CgDetailComponent', () => {
  let component: CgDetailComponent;
  let fixture: ComponentFixture<CgDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
