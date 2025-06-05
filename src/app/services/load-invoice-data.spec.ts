import { TestBed } from '@angular/core/testing';

import { LoadInvoiceData } from './load-invoice-data';

describe('LoadInvoiceData', () => {
  let service: LoadInvoiceData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadInvoiceData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
