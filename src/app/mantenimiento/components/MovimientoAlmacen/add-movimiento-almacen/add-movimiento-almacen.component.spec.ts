import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovimientoAlmacenComponent } from './add-movimiento-almacen.component';

describe('AddMovimientoAlmacenComponent', () => {
  let component: AddMovimientoAlmacenComponent;
  let fixture: ComponentFixture<AddMovimientoAlmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMovimientoAlmacenComponent]
    });
    fixture = TestBed.createComponent(AddMovimientoAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
