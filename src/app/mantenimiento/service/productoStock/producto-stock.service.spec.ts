import { TestBed } from '@angular/core/testing';

import { ProductoStockService } from './producto-stock.service';

describe('ProductoStockService', () => {
  let service: ProductoStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
