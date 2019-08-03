import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLendingsComponent } from './current-lendings.component';

describe('CurrentLendingsComponent', () => {
  let component: CurrentLendingsComponent;
  let fixture: ComponentFixture<CurrentLendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLendingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
