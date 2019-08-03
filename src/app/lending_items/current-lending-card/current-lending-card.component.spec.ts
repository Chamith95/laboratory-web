import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLendingCardComponent } from './current-lending-card.component';

describe('CurrentLendingCardComponent', () => {
  let component: CurrentLendingCardComponent;
  let fixture: ComponentFixture<CurrentLendingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLendingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLendingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
