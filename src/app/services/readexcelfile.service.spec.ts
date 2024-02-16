import { TestBed } from '@angular/core/testing';

import { ReadexcelfileService } from './readexcelfile.service';

describe('ReadexcelfileService', () => {
  let service: ReadexcelfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadexcelfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
