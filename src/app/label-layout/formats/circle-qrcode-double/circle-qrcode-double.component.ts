import {Component, Input, OnInit} from '@angular/core';
import {AppDefaults} from '../../../models/appDefaults.interface';

@Component({
  selector: 'app-circle-qrcode-double',
  templateUrl: './circle-qrcode-double.component.svg',
  styleUrls: ['./circle-qrcode-double.component.scss']
})
export class CircleQRcodeDoubleComponent implements OnInit {
  @Input() value: string;
  @Input() settings: AppDefaults;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  constructor() { }

  ngOnInit(): void {
  }

}
