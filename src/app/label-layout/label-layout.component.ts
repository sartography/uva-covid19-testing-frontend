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
  labelStyle: CssStyle;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
    const d = this.settings.labelLayout.dimensions;

    this.pageStyle = {
      width: d.pageWidth,
      height: d.pageHeight
    };

    this.labelStyle = {
      width: d.labelWidth,
      height: d.labelHeight,
      marginTop: `-${this.settings.labelLayout.labelHeight / 2}mm`,
      marginLeft: `-${this.settings.labelLayout.labelWidth / 2}mm`,
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
