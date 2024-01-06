import { TestBed } from '@angular/core/testing';

import { EntradaListarService } from './entrada-listar.service';

describe('EntradaListarService', () => {
  let service: EntradaListarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaListarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
