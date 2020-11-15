import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleDatamatrixComponent } from './rectangle-datamatrix.component';

describe('RectangleDatamatrixComponent', () => {
  let component: RectangleDatamatrixComponent;
  let fixture: ComponentFixture<RectangleDatamatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleDatamatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleDatamatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
