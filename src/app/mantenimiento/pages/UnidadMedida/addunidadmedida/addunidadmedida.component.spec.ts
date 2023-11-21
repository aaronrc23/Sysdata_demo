import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddunidadmedidaComponent } from './addunidadmedida.component';

describe('AddunidadmedidaComponent', () => {
  let component: AddunidadmedidaComponent;
  let fixture: ComponentFixture<AddunidadmedidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddunidadmedidaComponent]
    });
    fixture = TestBed.createComponent(AddunidadmedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
