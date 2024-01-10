import { TestBed } from '@angular/core/testing';

import { MovimientoAlmacenService } from './movimiento-almacen.service';

describe('MovimientoAlmacenService', () => {
  let service: MovimientoAlmacenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientoAlmacenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
