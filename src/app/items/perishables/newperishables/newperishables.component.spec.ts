import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewperishablesComponent } from './newperishables.component';

describe('NewperishablesComponent', () => {
  let component: NewperishablesComponent;
  let fixture: ComponentFixture<NewperishablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewperishablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewperishablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
