import {Component, Input, OnInit} from '@angular/core';
import {getSettings} from '../config/defaults';
import {TestingLocation} from '../interfaces/testingLocation.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() testingLocation: TestingLocation;
  locationId: string;

  constructor() {
    const settings = getSettings();
    this.locationId = settings.locationId;
  }

  ngOnInit(): void {
  }

}
