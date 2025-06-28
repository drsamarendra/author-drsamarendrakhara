import { TestBed } from '@angular/core/testing';

import { ApiDetailsService } from './api-details.service';

describe('ApiDetailsService', () => {
  let service: ApiDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
