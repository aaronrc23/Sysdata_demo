import { TestBed } from '@angular/core/testing';

import { DetallecompraService } from './detallecompra.service';

describe('DetallecompraService', () => {
  let service: DetallecompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallecompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
