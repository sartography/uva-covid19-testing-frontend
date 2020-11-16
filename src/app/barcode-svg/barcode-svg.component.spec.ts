import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BarcodeSvgComponent} from './barcode-svg.component';

describe('BarcodeDataMatrixComponent', () => {
  let component: BarcodeSvgComponent;
  let fixture: ComponentFixture<BarcodeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarcodeSvgComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeSvgComponent);
    component = fixture.componentInstance;
    component.format = 'qrcode';
    component.value = '987654321-202101231122-ABCDE-0123';
    component.x = 0;
    component.y = 0;
    component.width = 1000;
    component.height = 1000;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
