import {Component, Input, OnInit} from '@angular/core';
import {AppDefaults} from '../../../models/appDefaults.interface';
import {Sample} from '../../../models/sample.interface';

@Component({
  selector: 'app-rectangle-code128',
  templateUrl: './rectangle-code128.component.svg',
  styleUrls: ['./rectangle-code128.component.scss']
})
export class RectangleCode128Component implements OnInit {
  @Input() sample: Sample;
  @Input() settings: AppDefaults;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  constructor() { }

  ngOnInit(): void {
    //  Replace "#barcode" element with svg of barcode

  }

}
