import {Component, Input, OnInit} from '@angular/core';
import {Sample} from '../../../models/sample.interface';
import * as Encoder from 'code-128-encoder';
import {OutputMode} from 'code-128-encoder';
import {LabelLayout} from '../../../models/labelLayout.interface';

@Component({
  selector: 'app-rectangle-code128',
  templateUrl: './rectangle-code128.component.svg',
  styleUrls: ['./rectangle-code128.component.scss']
})
export class RectangleCode128Component implements OnInit {
  @Input() sample: Sample;
  @Input() labelLayout: LabelLayout;
  encoder: Encoder;
  marginHorizontal = 3.175 / 2;
  marginVertical = 3.175 / 2;

  constructor() {
    this.encoder = new Encoder();
  }

  get width() {
    return this.labelLayout.pageWidth;
  }

  get height() {
    return this.labelLayout.pageHeight;
  }

  get encodedCode128String(): string {
    return this.encoder.encode(this.sample.barcode, {output: OutputMode.ASCII, mapping: 0});
  }

  get heightMinusMargins(): number {
    return (this.height - (this.marginVertical * 2));
  }

  get widthMinusMargins(): number {
    return (this.width - (this.marginHorizontal * 2));
  }

  get labelCenterHorizontal(): number {
    return (this.widthMinusMargins / 2);
  }

  get labelCenterVertical(): number {
    return (this.heightMinusMargins / 2);
  }

  ngOnInit(): void {
    //  Replace "#barcode" element with svg of barcode
  }

}
