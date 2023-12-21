import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAlamacenesComponent } from './listar-alamacenes.component';

describe('ListarAlamacenesComponent', () => {
  let component: ListarAlamacenesComponent;
  let fixture: ComponentFixture<ListarAlamacenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAlamacenesComponent]
    });
    fixture = TestBed.createComponent(ListarAlamacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
