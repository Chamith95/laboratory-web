import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveLendingDialogComponent } from './resolve-lending-dialog.component';

describe('ResolveLendingDialogComponent', () => {
  let component: ResolveLendingDialogComponent;
  let fixture: ComponentFixture<ResolveLendingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLendingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLendingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
