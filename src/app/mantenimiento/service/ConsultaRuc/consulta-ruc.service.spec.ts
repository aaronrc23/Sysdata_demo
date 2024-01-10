import { TestBed } from '@angular/core/testing';

import { ConsultaRucService } from './consulta-ruc.service';

describe('ConsultaRucService', () => {
  let service: ConsultaRucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaRucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
