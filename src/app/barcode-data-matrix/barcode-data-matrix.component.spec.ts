import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeDataMatrixComponent } from './barcode-data-matrix.component';

describe('BarcodeDataMatrixComponent', () => {
  let component: BarcodeDataMatrixComponent;
  let fixture: ComponentFixture<BarcodeDataMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeDataMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeDataMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
