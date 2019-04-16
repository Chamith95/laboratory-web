import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermQuantitydialogComponent } from './perm-quantitydialog.component';

describe('PermQuantitydialogComponent', () => {
  let component: PermQuantitydialogComponent;
  let fixture: ComponentFixture<PermQuantitydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermQuantitydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermQuantitydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
