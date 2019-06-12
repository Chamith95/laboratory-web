import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCardsComponent } from './teacher-cards.component';

describe('TeacherCardsComponent', () => {
  let component: TeacherCardsComponent;
  let fixture: ComponentFixture<TeacherCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
