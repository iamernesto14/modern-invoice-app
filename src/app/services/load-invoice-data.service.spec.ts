import { TestBed } from '@angular/core/testing';

import { LoadInvoiceDataService } from './load-invoice-data.service';

describe('LoadInvoiceDataService', () => {
  let service: LoadInvoiceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadInvoiceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
