import bwipjs from 'bwip-js';
import DrawingSVG from './draw-svg.js';
import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appBarcodeSvg]'
})
export class BarcodeSvgDirective implements OnInit {
  @Input() format: string;
  @Input() value: string;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  constructor(private barcodeContainer: ElementRef) {
  }

  ngOnInit() {
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

      if (this.format === 'datamatrixrectangularextension') {
        opts.version = '8x64';
      }

      if (this.format === 'qrcode') {
        opts.eclevel = 'H';
      }
      this.barcodeContainer.nativeElement.innerHTML = bwipjs.render(opts, DrawingSVG(opts, bwipjs.FontLib));
    }
  }

}
