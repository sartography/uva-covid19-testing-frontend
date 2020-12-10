import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RectangleDatamatrixRectangularComponent} from './rectangle-datamatrix-rectangular.component';
import {labelLayouts} from '../../../config/defaults';
import {mockSample} from '../../../testing/sample.mock';

describe('RectangleDatamatrixRectangularComponent', () => {
  let component: RectangleDatamatrixRectangularComponent;
  let fixture: ComponentFixture<RectangleDatamatrixRectangularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RectangleDatamatrixRectangularComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleDatamatrixRectangularComponent);
    component = fixture.componentInstance;
    component.sample = mockSample;
    component.labelLayout = labelLayouts.rectangle_datamatrixrectangular;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
