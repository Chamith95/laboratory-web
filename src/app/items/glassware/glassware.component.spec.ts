import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlasswareComponent } from './glassware.component';

describe('GlasswareComponent', () => {
  let component: GlasswareComponent;
  let fixture: ComponentFixture<GlasswareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlasswareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlasswareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
