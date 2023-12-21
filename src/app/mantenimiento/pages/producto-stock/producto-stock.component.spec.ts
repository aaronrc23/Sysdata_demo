import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoStockComponent } from './producto-stock.component';

describe('ProductoStockComponent', () => {
  let component: ProductoStockComponent;
  let fixture: ComponentFixture<ProductoStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoStockComponent]
    });
    fixture = TestBed.createComponent(ProductoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
