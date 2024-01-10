import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMovimientoAlmacenComponent } from './listar-movimiento-almacen.component';

describe('ListarMovimientoAlmacenComponent', () => {
  let component: ListarMovimientoAlmacenComponent;
  let fixture: ComponentFixture<ListarMovimientoAlmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarMovimientoAlmacenComponent]
    });
    fixture = TestBed.createComponent(ListarMovimientoAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
