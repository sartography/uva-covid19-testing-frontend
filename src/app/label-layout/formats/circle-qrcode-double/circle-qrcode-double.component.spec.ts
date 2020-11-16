import { ComponentFixture, TestBed } from '@angular/core/testing';
import {mockSample} from '../../../testing/sample.mock';

import { CircleQRcodeDoubleComponent } from './circle-qrcode-double.component';

describe('CircleQRcodeDoubleComponent', () => {
  let component: CircleQRcodeDoubleComponent;
  let fixture: ComponentFixture<CircleQRcodeDoubleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleQRcodeDoubleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleQRcodeDoubleComponent);
    component = fixture.componentInstance;
    component.sample = mockSample;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
