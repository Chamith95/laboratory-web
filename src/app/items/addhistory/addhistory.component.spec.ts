import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhistoryComponent } from './addhistory.component';

describe('AddhistoryComponent', () => {
  let component: AddhistoryComponent;
  let fixture: ComponentFixture<AddhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
