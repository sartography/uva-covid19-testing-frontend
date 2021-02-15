import {Component, OnInit} from '@angular/core';
import {AppDefaults} from '../models/appDefaults.interface';
import {SettingsService} from '../services/settings.service';
import {ApiService} from '../services/api.service';
import {User} from '../models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  settings: AppDefaults;
  locationId: string;
  user: User;

  constructor(private settingsService: SettingsService,
              private apiService: ApiService) {
    this.settingsService.settings.subscribe(settings => {
      this.settings = settings;
      this.locationId = !this.hasDefaultId ? this.settings.locationId : '0000';
    });
    this.apiService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  get hasDefaultId(): boolean {
    return (!this.settings || this.settings.locationId === '0000');
  }

  ngOnInit(): void {
  }
}
