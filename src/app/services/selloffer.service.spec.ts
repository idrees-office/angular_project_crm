import { TestBed } from '@angular/core/testing';

import { SellofferService } from './selloffer.service';

describe('SellofferService', () => {
  let service: SellofferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellofferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
