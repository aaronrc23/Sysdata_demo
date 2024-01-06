import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalidaComponent } from './add-salida.component';

describe('AddSalidaComponent', () => {
  let component: AddSalidaComponent;
  let fixture: ComponentFixture<AddSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSalidaComponent]
    });
    fixture = TestBed.createComponent(AddSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
