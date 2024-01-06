import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarproducComponent } from './listarproduc.component';

describe('ListarproducComponent', () => {
  let component: ListarproducComponent;
  let fixture: ComponentFixture<ListarproducComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarproducComponent]
    });
    fixture = TestBed.createComponent(ListarproducComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
