import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleCode128Component } from './rectangle-code128.component';

describe('RectangleCode128Component', () => {
  let component: RectangleCode128Component;
  let fixture: ComponentFixture<RectangleCode128Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleCode128Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleCode128Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
