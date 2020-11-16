import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import bwipjs from 'bwip-js';
import {AppDefaults} from '../models/appDefaults.interface';
import DrawingSVG from './draw-svg.js';

@Component({
  selector: 'app-barcode-svg',
  templateUrl: './barcode-svg.component.svg',
  styleUrls: ['./barcode-svg.component.scss']
})
export class BarcodeSvgComponent implements AfterViewInit {
  @Input() format: string;
  @Input() value: string;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @ViewChild('barcodeContainer') barcodeContainer: ElementRef;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (this.value && this.barcodeContainer) {
      this.renderBarcode();
      this.changeDetector.detectChanges();
    }
  }

  renderBarcode(): void {
    if (!!(bwipjs && bwipjs.render && this.format)) {
      const opts: { [key: string]: any } = {
        bcid: this.format,
        text: this.value,
        scale: 1,
        width: this.width,
        height: this.height,
        // includetext: false,
        // textalign: 'center',
        // version: '12x64',
        // padding: this.settings.labelLayout.marginSize,
      };

      if (this.format === 'qrcode') {
        opts.eclevel = 'H';
      }
      this.barcodeContainer.nativeElement.innerHTML = bwipjs.render(opts, DrawingSVG(opts, bwipjs.FontLib));
    }
  }
}
