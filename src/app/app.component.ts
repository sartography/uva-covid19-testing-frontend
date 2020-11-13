import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AppEnvironment} from './models/appEnvironment.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loading: boolean;

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
