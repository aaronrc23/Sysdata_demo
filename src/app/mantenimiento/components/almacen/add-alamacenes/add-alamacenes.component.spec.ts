import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlamacenesComponent } from './add-alamacenes.component';

describe('AddAlamacenesComponent', () => {
  let component: AddAlamacenesComponent;
  let fixture: ComponentFixture<AddAlamacenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAlamacenesComponent]
    });
    fixture = TestBed.createComponent(AddAlamacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
