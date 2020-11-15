import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import bwipjs from 'bwip-js';
import {AppDefaults} from '../models/appDefaults.interface';
import DrawingSVG from './draw-svg.js';

@Component({
  selector: 'app-barcode-data-matrix',
  templateUrl: './barcode-data-matrix.component.svg',
  styleUrls: ['./barcode-data-matrix.component.scss']
})
export class BarcodeDataMatrixComponent implements OnInit {
  @Input() format: string;
  @Input() value: string;
  @Input() settings: AppDefaults;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @ViewChild('barcodeContainer') barcodeContainer: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.renderBarcode();
  }

  renderBarcode(): void {
    if (!!(bwipjs && bwipjs.toCanvas && this.settings && this.format)) {
      const opts: { [key: string]: any } = {
        bcid: this.format,
        text: this.value,
        scale: 1,
        width: this.settings.labelLayout.barcodeWidth,
        height: this.settings.labelLayout.barcodeHeight,
        // includetext: false,
        // textalign: 'center',
        // version: '12x64',
        // padding: this.settings.labelLayout.marginSize,
      };

      if (this.format === 'qrcode') {
        opts.eclevel = 'H';
      }
      const barcodeSVG = bwipjs.render(opts, DrawingSVG(opts), bwipjs.FontLib);
      this.barcodeContainer.nativeElement.innerHTML = barcodeSVG;
      // bwipjs.toCanvas('barcodeCanvas', );
    }
  }
}
