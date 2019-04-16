import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermEquiplistComponent } from './perm-equiplist.component';

describe('PermEquiplistComponent', () => {
  let component: PermEquiplistComponent;
  let fixture: ComponentFixture<PermEquiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermEquiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermEquiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
