import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerStockComponent } from './ver-stock.component';

describe('VerStockComponent', () => {
  let component: VerStockComponent;
  let fixture: ComponentFixture<VerStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerStockComponent]
    });
    fixture = TestBed.createComponent(VerStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
