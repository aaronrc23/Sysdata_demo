import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogearseComponent } from './logearse.component';

describe('LogearseComponent', () => {
  let component: LogearseComponent;
  let fixture: ComponentFixture<LogearseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogearseComponent]
    });
    fixture = TestBed.createComponent(LogearseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
