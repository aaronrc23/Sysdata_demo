import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEmpresasComponent } from './agregar-empresas.component';

describe('AgregarEmpresasComponent', () => {
  let component: AgregarEmpresasComponent;
  let fixture: ComponentFixture<AgregarEmpresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEmpresasComponent]
    });
    fixture = TestBed.createComponent(AgregarEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
