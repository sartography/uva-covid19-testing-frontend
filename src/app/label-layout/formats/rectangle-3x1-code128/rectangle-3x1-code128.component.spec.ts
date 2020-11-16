import {ComponentFixture, TestBed} from '@angular/core/testing';
import {mockSample} from '../../../testing/sample.mock';

import {Rectangle3x1Code128Component} from './rectangle-3x1-code128.component';

describe('Rectangle3x1Code128Component', () => {
  let component: Rectangle3x1Code128Component;
  let fixture: ComponentFixture<Rectangle3x1Code128Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Rectangle3x1Code128Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Rectangle3x1Code128Component);
    component = fixture.componentInstance;
    component.sample = mockSample;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
