import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSalidaComponent } from './listar-salida.component';

describe('ListarSalidaComponent', () => {
  let component: ListarSalidaComponent;
  let fixture: ComponentFixture<ListarSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarSalidaComponent]
    });
    fixture = TestBed.createComponent(ListarSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
