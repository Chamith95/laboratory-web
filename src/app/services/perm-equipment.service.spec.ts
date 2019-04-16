import { TestBed } from '@angular/core/testing';

import { PermEquipmentService } from './perm-equipment.service';

describe('PermEquipmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermEquipmentService = TestBed.get(PermEquipmentService);
    expect(service).toBeTruthy();
  });
});
