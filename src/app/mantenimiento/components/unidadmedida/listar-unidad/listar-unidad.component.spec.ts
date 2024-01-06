import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUnidadComponent } from './listar-unidad.component';

describe('ListarUnidadComponent', () => {
  let component: ListarUnidadComponent;
  let fixture: ComponentFixture<ListarUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarUnidadComponent]
    });
    fixture = TestBed.createComponent(ListarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
