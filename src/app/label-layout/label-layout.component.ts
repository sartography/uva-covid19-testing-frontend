import {Component, Input, OnInit} from '@angular/core';
import {createQrCodeValue} from '../_util/qrCode';
import {AppDefaults} from '../models/appDefaults.interface';
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

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
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
