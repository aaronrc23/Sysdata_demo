import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMovimientoComponent } from './register-movimiento.component';

describe('RegisterMovimientoComponent', () => {
  let component: RegisterMovimientoComponent;
  let fixture: ComponentFixture<RegisterMovimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMovimientoComponent]
    });
    fixture = TestBed.createComponent(RegisterMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
