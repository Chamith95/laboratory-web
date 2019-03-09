import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewglasswareComponent } from './newglassware.component';

describe('NewglasswareComponent', () => {
  let component: NewglasswareComponent;
  let fixture: ComponentFixture<NewglasswareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewglasswareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewglasswareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
