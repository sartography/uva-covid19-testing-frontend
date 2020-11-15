import {Component, Input, OnInit} from '@angular/core';
import {AppDefaults} from '../../../models/appDefaults.interface';

@Component({
  selector: 'app-circle-qrcode-single',
  templateUrl: './circle-qrcode-single.component.svg',
  styleUrls: ['./circle-qrcode-single.component.scss']
})
export class CircleQRcodeSingleComponent implements OnInit {
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
