import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcartComponent } from './addnewcart.component';

describe('AddnewcartComponent', () => {
  let component: AddnewcartComponent;
  let fixture: ComponentFixture<AddnewcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
