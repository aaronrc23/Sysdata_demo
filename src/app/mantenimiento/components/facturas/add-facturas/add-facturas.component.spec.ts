import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacturasComponent } from './add-facturas.component';

describe('AddFacturasComponent', () => {
  let component: AddFacturasComponent;
  let fixture: ComponentFixture<AddFacturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFacturasComponent]
    });
    fixture = TestBed.createComponent(AddFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
