import {Component, Input, OnInit} from '@angular/core';
import {AppDefaults} from '../models/appDefaults.interface';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent implements OnInit {
  @Input() dateCreated: Date;
  @Input() barCode: string;
  @Input() initials: string;
  settings: AppDefaults;
  dimensions: {[key: string]: string};

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
    this.dimensions = this.settings.labelLayout.dimensions;
  }

  ngOnInit(): void {
  }

  get pagesToGridFractions(): string {
    return this.pages.map(() => '1fr').join(' ');
  }

  get colsToGridFractions(): string {
    return this.columns.map(() => '1fr').join(' ');
  }

  get pageHeight(): string {
    return this.dimensions && this.dimensions.pageHeight;
  }

  get pageWidth(): string {
    return this.dimensions && this.dimensions.pageWidth;
  }

  get pages() {
    return Array(this.settings.numCopies).fill('');
  }

  get columns() {
    return Array(this.settings.labelLayout.numCols).fill('');
  }

}
