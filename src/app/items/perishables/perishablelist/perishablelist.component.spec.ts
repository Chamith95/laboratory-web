import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerishablelistComponent } from './perishablelist.component';

describe('PerishablelistComponent', () => {
  let component: PerishablelistComponent;
  let fixture: ComponentFixture<PerishablelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerishablelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerishablelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
