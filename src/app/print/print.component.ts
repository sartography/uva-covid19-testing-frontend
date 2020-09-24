import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute} from '@angular/router';
import {createQrCodeValue} from '../_util/qrCode';
import {AppDefaults} from '../models/appDefaults.interface';
import {Sample} from '../models/sample.interface';
import {ApiService} from '../services/api.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements AfterViewInit {
  barCode: string;
  initials: string;
  dateCreated: Date;
  settings: AppDefaults;
  @ViewChild('saveAndPrintButton') saveAndPrintButton: MatButton;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
    this.dateCreated = new Date();
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.barCode = queryParamMap.get('barCode');
      this.initials = queryParamMap.get('initials');
    });
    this.settings = this.settingsService.getSettings();
  }

  ngAfterViewInit() {
    this.saveAndPrintButton.focus();
    this.changeDetector.detectChanges();
  }

  saveAndPrint() {
    const id = createQrCodeValue(
      this.barCode,
      this.initials,
      this.dateCreated,
      this.settings.locationId
    );

    const newSample: Sample = {
      barcode: id,
      student_id: this.barCode,
      date: this.dateCreated,
      location: this.settings.locationId,
    };

    this.api.addSample(newSample).subscribe(() => window.print());
  }
}
