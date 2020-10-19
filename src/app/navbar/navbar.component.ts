import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {TestingLocation} from '../models/testingLocation.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() testingLocation: TestingLocation;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
  }

  get locationId(): string {
    const settings = this.settingsService.getSettings();
    return settings.locationId;
  }
}
