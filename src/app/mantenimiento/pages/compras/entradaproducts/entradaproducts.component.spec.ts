import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaproductsComponent } from './entradaproducts.component';

describe('EntradaproductsComponent', () => {
  let component: EntradaproductsComponent;
  let fixture: ComponentFixture<EntradaproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaproductsComponent]
    });
    fixture = TestBed.createComponent(EntradaproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
