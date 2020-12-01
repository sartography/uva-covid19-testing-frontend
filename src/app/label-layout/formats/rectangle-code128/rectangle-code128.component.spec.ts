import {ComponentFixture, TestBed} from '@angular/core/testing';
import {mockSample} from '../../../testing/sample.mock';
import {RectangleCode128Component} from './rectangle-code128.component';
import {LabelLayout} from '../../../models/labelLayout.interface';
import {labelLayouts} from '../../../config/defaults';


describe('RectangleCode128Component', () => {
  let component: RectangleCode128Component;
  let fixture: ComponentFixture<RectangleCode128Component>;
  const layout: LabelLayout = labelLayouts.rectangle_3x1_code128;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RectangleCode128Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleCode128Component);
    component = fixture.componentInstance;
    component.sample = mockSample;
    component.labelLayout = layout;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
