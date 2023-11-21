import { TestBed } from '@angular/core/testing';

import { UnidaMedidaService } from './unida-medida.service';

describe('UnidaMedidaService', () => {
  let service: UnidaMedidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidaMedidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
