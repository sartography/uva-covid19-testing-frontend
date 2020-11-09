import {Component, Input, OnInit} from '@angular/core';
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
    bwipjs.toCanvas('barcodeCanvas', {
      bcid: this.format,
      text: this.value,
      scale: 2,
      width: this.settings.labelLayout.labelWidth,
      height: this.settings.labelLayout.labelHeight,
      includetext: false,
      textalign: 'center',
      version: '8x96',
      padding: this.settings.labelLayout.marginSize,
    });
  }
}
