import { TestBed } from '@angular/core/testing';

import { HrService } from '../src/app/services/hr.service';

describe('HrService', () => {
  let service: HrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
