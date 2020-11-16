import {Component, Input, OnInit} from '@angular/core';
import {createQrCodeValue} from '../_util/qrCode';
import {AppDefaults} from '../models/appDefaults.interface';
import {CssStyle} from '../models/cssStyle.interface';
import {Sample} from '../models/sample.interface';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-label-layout',
  templateUrl: './label-layout.component.html',
  styleUrls: ['./label-layout.component.scss']
})
export class LabelLayoutComponent implements OnInit {
  @Input() dateCreated: Date;
  @Input() barCode: string;
  @Input() initials: string;
  settings: AppDefaults;
  sample: Sample;
  barcodeValue: string;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
  }

  ngOnInit() {
    this.sample = {
      barcode: '',
      student_id: this.barCode,
      initials: this.initials,
      date: new Date(),
      location: this.settings.locationId,
    };

    this.barcodeValue = createQrCodeValue(
      this.sample.student_id,
      this.sample.initials,
      this.sample.date,
      this.sample.location,
      this.settings.labelLayout.delimiter,
      this.settings.labelLayout.barcodeType,
    );

    this.sample.barcode = this.barcodeValue;
  }

  isLayout(layoutId: string) {
    return this.settings.labelLayout.id === layoutId;
  }
}
