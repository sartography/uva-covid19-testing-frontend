import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import bwipjs from 'bwip-js';
import {AppDefaults} from '../models/appDefaults.interface';

@Component({
  selector: 'app-barcode-data-matrix',
  templateUrl: './barcode-data-matrix.component.html',
  styleUrls: ['./barcode-data-matrix.component.scss']
})
export class BarcodeDataMatrixComponent implements OnInit {
  @Input() format: string;
  @Input() value: string;
  @Input() settings: AppDefaults;

  constructor() {
  }

  ngOnInit() {
    this.renderBarcode();
  }

  renderBarcode(): void {
    if (!!(bwipjs && bwipjs.toCanvas && this.settings && this.format)) {
      bwipjs.toCanvas('barcodeCanvas', {
        bcid: this.format,
        text: this.value,
        scale: 1,
        width: this.settings.labelLayout.barcodeWidth,
        height: this.settings.labelLayout.barcodeHeight,
        // includetext: false,
        // textalign: 'center',
        // version: '12x64',
        // padding: this.settings.labelLayout.marginSize,
      });
    }
  }
}
