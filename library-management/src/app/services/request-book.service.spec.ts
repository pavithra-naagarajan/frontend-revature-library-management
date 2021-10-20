import { TestBed } from '@angular/core/testing';

import { RequestBookService } from './request-book.service';

describe('RequestBookService', () => {
  let service: RequestBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
