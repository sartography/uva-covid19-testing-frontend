import { ComponentFixture, TestBed } from '@angular/core/testing';
import {defaultOptions, labelLayouts} from '../config/defaults';
import {AppDefaults} from '../models/appDefaults.interface';
import {LabelLayout} from '../models/labelLayout.interface';

import { BarcodeDataMatrixComponent } from './barcode-data-matrix.component';

describe('BarcodeDataMatrixComponent', () => {
  let component: BarcodeDataMatrixComponent;
  let fixture: ComponentFixture<BarcodeDataMatrixComponent>;
  const settings = new AppDefaults(defaultOptions);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeDataMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeDataMatrixComponent);
    component = fixture.componentInstance;
    settings.labelLayout = labelLayouts.rectangular_lg;
    component.settings = settings;
    component.format = settings.labelLayout.barcodeType;
    component.value = '987654321-202101231122-ABCDE-0123';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
