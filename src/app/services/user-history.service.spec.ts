import { TestBed } from '@angular/core/testing';

import { UserHistoryService } from './user-history.service';

describe('UserHitoryService', () => {
  let service: UserHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
