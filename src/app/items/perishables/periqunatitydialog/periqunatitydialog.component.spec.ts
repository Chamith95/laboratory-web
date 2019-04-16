import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriqunatitydialogComponent } from './periqunatitydialog.component';

describe('PeriqunatitydialogComponent', () => {
  let component: PeriqunatitydialogComponent;
  let fixture: ComponentFixture<PeriqunatitydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriqunatitydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriqunatitydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
