import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastLendingsComponent } from './past-lendings.component';

describe('PastLendingsComponent', () => {
  let component: PastLendingsComponent;
  let fixture: ComponentFixture<PastLendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastLendingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastLendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
