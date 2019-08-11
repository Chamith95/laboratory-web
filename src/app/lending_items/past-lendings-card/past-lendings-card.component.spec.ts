import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastLendingsCardComponent } from './past-lendings-card.component';

describe('PastLendingsCardComponent', () => {
  let component: PastLendingsCardComponent;
  let fixture: ComponentFixture<PastLendingsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastLendingsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastLendingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
