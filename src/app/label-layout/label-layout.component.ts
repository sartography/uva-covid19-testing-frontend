import {formatDate} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {getSettings} from '../config/defaults';

@Component({
  selector: 'app-label-layout',
  templateUrl: './label-layout.component.html',
  styleUrls: ['./label-layout.component.scss']
})
export class LabelLayoutComponent implements OnInit {
  @Input() dateCreated: Date;
  @Input() barCode: string;
  @Input() initials: string;
  settings = getSettings();

  constructor() {
  }

  get qrCodeValue(): string {
    const valArray = [
      this.barCode,
      this.initials,
      formatDate(this.dateCreated, 'yyyyMMddHHmm', 'en-us'),
      this.settings.locationId,
    ];
    return valArray.join('-');
  }

  ngOnInit(): void {
  }

}
