import { TestBed } from '@angular/core/testing';

import { ParkManagementService } from './park-management.service';

describe('ParkManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkManagementService = TestBed.get(ParkManagementService);
    expect(service).toBeTruthy();
  });
});
