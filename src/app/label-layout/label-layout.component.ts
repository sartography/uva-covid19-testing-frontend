import {Component, Input, OnInit} from '@angular/core';
import {createQrCodeValue} from '../_util/qrCode';
import {AppDefaults} from '../models/appDefaults.interface';
import {CssStyle} from '../models/cssStyle.interface';
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
  pageStyle: CssStyle;
  barcodeStyle: CssStyle;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
    const d = this.settings.labelLayout.dimensions;

    this.pageStyle = {
      width: d.columnWidth,
      height: d.columnHeight,
      padding: d.marginWidth,
    };

    this.barcodeStyle = {
      width: d.barcodeWidth,
      height: d.barcodeHeight,
      marginTop: `-${this.settings.labelLayout.barcodeHeight / 2}mm`,
      marginLeft: `-${this.settings.labelLayout.barcodeWidth / 2}mm`,
    };
  }

  get qrCodeValue(): string {
    return createQrCodeValue(
      this.barCode,
      this.initials,
      this.dateCreated,
      this.settings.locationId
    );
  }

  ngOnInit(): void {
  }

}
