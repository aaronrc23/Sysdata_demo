import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRucComponent } from './consulta-ruc.component';

describe('ConsultaRucComponent', () => {
  let component: ConsultaRucComponent;
  let fixture: ComponentFixture<ConsultaRucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaRucComponent]
    });
    fixture = TestBed.createComponent(ConsultaRucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
