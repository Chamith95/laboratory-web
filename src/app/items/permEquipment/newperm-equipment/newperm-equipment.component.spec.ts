import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpermEquipmentComponent } from './newperm-equipment.component';

describe('NewpermEquipmentComponent', () => {
  let component: NewpermEquipmentComponent;
  let fixture: ComponentFixture<NewpermEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpermEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpermEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
