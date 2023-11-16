import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCatMarComponent } from './add-edit-cat-mar.component';

describe('AddEditCatMarComponent', () => {
  let component: AddEditCatMarComponent;
  let fixture: ComponentFixture<AddEditCatMarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCatMarComponent]
    });
    fixture = TestBed.createComponent(AddEditCatMarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
