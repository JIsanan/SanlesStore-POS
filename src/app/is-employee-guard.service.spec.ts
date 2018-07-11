import { TestBed, inject } from '@angular/core/testing';

import { IsEmployeeGuardService } from './is-employee-guard.service';

describe('IsEmployeeGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsEmployeeGuardService]
    });
  });

  it('should be created', inject([IsEmployeeGuardService], (service: IsEmployeeGuardService) => {
    expect(service).toBeTruthy();
  }));
});
