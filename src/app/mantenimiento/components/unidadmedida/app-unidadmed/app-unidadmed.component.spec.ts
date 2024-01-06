import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUnidadmedComponent } from './app-unidadmed.component';

describe('AppUnidadmedComponent', () => {
  let component: AppUnidadmedComponent;
  let fixture: ComponentFixture<AppUnidadmedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppUnidadmedComponent]
    });
    fixture = TestBed.createComponent(AppUnidadmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
