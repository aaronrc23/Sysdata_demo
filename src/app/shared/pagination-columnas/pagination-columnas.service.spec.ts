import { TestBed } from '@angular/core/testing';

import { PaginationColumnasService } from './pagination-columnas.service';

describe('PaginationColumnasService', () => {
  let service: PaginationColumnasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationColumnasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
