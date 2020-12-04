import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Sample} from '../models/sample.interface';
import {LabelLayout} from '../models/labelLayout.interface';
import {SettingsService} from '../services/settings.service';
import {AppDefaults} from '../models/appDefaults.interface';
import {createQrCodeValue} from '../_util/qrCode';

@Component({
  selector: 'app-multiple-labels',
  templateUrl: './multiple-labels.component.html',
  styleUrls: ['./multiple-labels.component.scss']
})
export class MultipleLabelsComponent implements OnInit, AfterViewInit {
  samples: Sample[];
  layout: LabelLayout;
  settings: AppDefaults;
  numLabels = 10;

  constructor(private settingsService: SettingsService) {
    const startingId = 1;
    this.settings = this.settingsService.getSettings();
    this.layout = new LabelLayout(this.settings.labelLayout);
    this.layout.numCopies = this.numLabels;

    this.samples = Array(this.numLabels).fill('').map((x, i) => {
      const idBase = (startingId + i).toString(10).padStart(3, '0');
      const studentId = idBase + idBase + idBase;
      const compId = Array(3)
        .fill('')
        .map((y, j) => this.randomChar(j))
        .join('') + idBase;
      const sample: Sample = {
        barcode: '',
        student_id: studentId,
        initials: compId,
        location: this.settings.locationId,
        date: new Date(),
      };

      sample.barcode = createQrCodeValue(
        sample.student_id,
        sample.initials,
        sample.date,
        sample.location,
        this.layout.delimiter,
        this.layout.barcodeType
      );

      return sample;
    });

    console.log('samples', this.samples);
  }

  get pagesToGridFractions(): string {
    return this.samples.map(() => '1fr').join(' ');
  }

  get pageHeight(): string {
    return `${this.layout.pageHeight * this.numLabels}${this.layout.units}`;
  }

  get pageWidth(): string {
    return this.layout.dimensions.pageWidth;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Inject the print CSS, with dynamic layout settings, into the DOM.
    const printCss = `
      @media print {
        @page {
          size: ${this.layout.dimensions.pageWidth} ${this.layout.pageHeight}${this.layout.units};
        }

        html,
        body {
          width: ${this.layout.dimensions.pageWidth} !important;
          height: ${this.layout.dimensions.pageHeight} !important;
        }
      }
    `;
    const headEl = document.getElementsByTagName('head')[0];
    const styleEl = document.createElement('style');
    styleEl.setAttribute('type', 'text/css');
    styleEl.appendChild(document.createTextNode(printCss));
    headEl.appendChild(styleEl);
  }

  private randomChar(i) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '1234567890';

    // If it's the first character, return letters only.
    const from = (i === 0) ? letters : letters.concat(numbers);
    return from.charAt(Math.floor(Math.random() * from.length));
  }
}
