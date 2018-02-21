import { TestBed, inject } from '@angular/core/testing';

import { GetBikeDataService } from './get-bike-data.service';

describe('GetBikeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBikeDataService]
    });
  });

  it('should be created', inject([GetBikeDataService], (service: GetBikeDataService) => {
    expect(service).toBeTruthy();
  }));
});
