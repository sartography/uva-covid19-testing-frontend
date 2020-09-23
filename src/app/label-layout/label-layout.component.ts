import {formatDate} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {AppDefaults} from '../interfaces/appDefaults.interface';
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
