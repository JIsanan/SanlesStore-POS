import { TestBed, inject } from '@angular/core/testing';

import { IsManagerGuardService } from './is-manager-guard.service';

describe('IsManagerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsManagerGuardService]
    });
  });

  it('should be created', inject([IsManagerGuardService], (service: IsManagerGuardService) => {
    expect(service).toBeTruthy();
  }));
});
