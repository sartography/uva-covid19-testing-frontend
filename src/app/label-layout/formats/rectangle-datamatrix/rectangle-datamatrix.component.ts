import {Component, Input, OnInit} from '@angular/core';
import {AppDefaults} from '../../../models/appDefaults.interface';
import {LabelLayout} from '../../../models/labelLayout.interface';
import {Sample} from '../../../models/sample.interface';

@Component({
  selector: 'app-rectangle-datamatrix',
  templateUrl: './rectangle-datamatrix.component.svg',
  styleUrls: ['./rectangle-datamatrix.component.scss']
})
export class RectangleDatamatrixComponent implements OnInit {
  @Input() sample: Sample;
  @Input() labelLayout: LabelLayout;
  marginHorizontal = 3.175 / 2;
  marginVertical = 3.175 / 2;

  constructor() { }

  get width() {
    return this.labelLayout.pageWidth;
  }

  get height() {
    return this.labelLayout.pageHeight;
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
  }

}
