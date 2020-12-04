import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleDatamatrixRectangularComponent } from './rectangle-datamatrix-rectangular.component';

describe('RectangleDatamatrixRectangularComponent', () => {
  let component: RectangleDatamatrixRectangularComponent;
  let fixture: ComponentFixture<RectangleDatamatrixRectangularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleDatamatrixRectangularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleDatamatrixRectangularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
