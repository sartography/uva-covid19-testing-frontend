import {Component, OnInit} from '@angular/core';
import {AppDefaults} from '../models/appDefaults.interface';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  settings: AppDefaults;
  locationId: string;

  constructor(private settingsService: SettingsService) {
    this.settingsService.settings.subscribe(settings => {
      this.settings = settings;
      this.locationId = !this.hasDefaultId ? this.settings.locationId : '0000';
    });
  }

  get hasDefaultId(): boolean {
    return (!this.settings || this.settings.locationId === '0000');
  }

  ngOnInit(): void {
  }
}
