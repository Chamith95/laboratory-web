import { TestBed } from '@angular/core/testing';

import { ItemAdditionService } from './item-addition.service';

describe('ItemAdditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemAdditionService = TestBed.get(ItemAdditionService);
    expect(service).toBeTruthy();
  });
});
