import {Component, Inject} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AppEnvironment} from './models/appEnvironment.interface';
import {TestingLocation} from './models/testingLocation.interface';
import {GoogleAnalyticsService} from './services/google-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean;
  testingLocation: TestingLocation = {
    id: '0000',
    name: 'Click here to set location',
  };

  constructor(
    @Inject('APP_ENVIRONMENT') private environment: AppEnvironment,
    private titleService: Title,
  ) {
    this.titleService.setTitle(this.environment.title);
  }

  reload() {
    this.loading = true;
    setTimeout(() => this.loading = false, 300);
  }
}
