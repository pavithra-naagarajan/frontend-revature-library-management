import { TestBed } from '@angular/core/testing';

import { IssueBookService } from './issue-book.service';

describe('IssueBookService', () => {
  let service: IssueBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
