import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {createQrCodeValue} from '../_util/qrCode';
import {AppDefaults} from '../models/appDefaults.interface';
import {LabelLayout} from '../models/labelLayout.interface';
import {Sample} from '../models/sample.interface';
import {ApiService} from '../services/api.service';
import {CacheService} from '../services/cache.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements AfterViewInit {
  cardNum: string;
  initials: string;
  dateCreated: Date;
  settings: AppDefaults;
  @ViewChild('saveAndPrintButton') saveAndPrintButton: MatButton;
  @ViewChild('doneButton') doneButton: MatButton;
  isSaved: boolean;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private settingsService: SettingsService,
    private cacheService: CacheService,
  ) {
    this.dateCreated = new Date();
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.cardNum = queryParamMap.get('cardNum');
      this.initials = queryParamMap.get('initials').toUpperCase();
    });
    this.settings = this.settingsService.getSettings();
    this.isSaved = false;

    this.save(s => {
      this.isSaved = true;
      this.changeDetector.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.saveAndPrintButton.focus();
    this.changeDetector.detectChanges();
    const layout = new LabelLayout(this.settings.labelLayout);
    layout.numCopies = this.settings.numCopies;

    // Inject the print CSS, with dynamic layout settings, into the DOM.
    const printCss = `
      @media print {
        @page {
          size: ${layout.dimensions.pageWidth} ${layout.dimensions.pageHeight};
        }

        html,
        body {
          width: ${layout.dimensions.pageWidth} !important;
          height: ${layout.dimensions.pageHeight} !important;
        }
      }
    `;
    const headEl = document.getElementsByTagName('head')[0];
    const styleEl = document.createElement('style');
    styleEl.setAttribute('type', 'text/css');
    styleEl.appendChild(document.createTextNode(printCss));
    headEl.appendChild(styleEl);
    this.changeDetector.detectChanges();
  }

  get pageHeight() {
    return `${this.settings.labelLayout.pageHeight * 1.5}${this.settings.labelLayout.units}`;
  }

  save(callback: (s: Sample) => void) {
    const id = createQrCodeValue(
      this.cardNum,
      this.initials,
      this.dateCreated,
      this.settings.locationId,
      this.settings.labelLayout.delimiter,
      this.settings.labelLayout.barcodeType,
    );

    const newSample: Sample = {
      barcode: id,
      student_id: this.cardNum,
      date: this.dateCreated,
      location: this.settings.locationId,
    };

    this.api.addSample(newSample).subscribe((result) => {
      console.log('addSample subscribe callback');
      callback(result);
    }, err => {
      if (err) {
        console.error(err);
      }

      const cachedRecords = this.cacheService.saveRecord(newSample);
      console.log('cachedRecords', cachedRecords);
      callback(newSample);
    });
  }

  saveAndPrint() {
    this.save(s => {
      window.print();
      this.router.navigate(['/']);
    });
  }
}
