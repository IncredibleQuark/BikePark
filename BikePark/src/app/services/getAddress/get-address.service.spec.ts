import { TestBed, inject } from '@angular/core/testing';

import { GetAddressService } from './get-address.service';

describe('GetAddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAddressService]
    });
  });

  it('should be created', inject([GetAddressService], (service: GetAddressService) => {
    expect(service).toBeTruthy();
  }));
});
