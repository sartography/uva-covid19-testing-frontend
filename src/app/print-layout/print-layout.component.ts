import {AfterViewInit, Component, Input} from '@angular/core';
import {AppDefaults} from '../models/appDefaults.interface';
import {LabelLayout} from '../models/labelLayout.interface';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent implements AfterViewInit {
  @Input() dateCreated: Date;
  @Input() barCode: string;
  @Input() initials: string;
  settings: AppDefaults;
  layout: LabelLayout;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
    this.layout = new LabelLayout(this.settings.labelLayout);
    this.layout.numCopies = this.settings.numCopies;
  }

  get pagesToGridFractions(): string {
    return this.pages.map(() => '1fr').join(' ');
  }

  get colsToGridFractions(): string {
    return this.columns.map(() => '1fr').join(' ');
  }

  get pageHeight(): string {
    return this.layout.dimensions.pageHeight;
  }

  get pageWidth(): string {
    return this.layout.dimensions.pageWidth;
  }

  get pages() {
    return Array(this.layout.numCopies).fill('');
  }

  get columns() {
    return Array(this.layout.numCols).fill('');
  }

  ngAfterViewInit(): void {
  }

}
