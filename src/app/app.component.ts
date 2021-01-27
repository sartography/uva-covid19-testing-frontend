import { Component, Inject, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppEnvironment } from './models/appEnvironment.interface';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  loading: boolean;

  constructor(
    @Inject('APP_ENVIRONMENT') private environment: AppEnvironment,
    private titleService: Title,
  ) {
    this.titleService.setTitle(this.environment.title);
  }

  ngOnInit() {
    (function ($) {
      $("#menu-toggle").click(function () {
        $("#wrapper").toggleClass("toggled");
      });
    })(jQuery);
  }
  reload() {
    this.loading = true;
    setTimeout(() => this.loading = false, 300);
  }
}
