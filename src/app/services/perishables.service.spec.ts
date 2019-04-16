import { TestBed } from '@angular/core/testing';

import { PerishablesService } from './perishables.service';

describe('PerishablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerishablesService = TestBed.get(PerishablesService);
    expect(service).toBeTruthy();
  });
});
