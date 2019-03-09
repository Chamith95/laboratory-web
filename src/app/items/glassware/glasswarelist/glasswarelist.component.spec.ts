import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlasswarelistComponent } from './glasswarelist.component';

describe('GlasswarelistComponent', () => {
  let component: GlasswarelistComponent;
  let fixture: ComponentFixture<GlasswarelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlasswarelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlasswarelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
