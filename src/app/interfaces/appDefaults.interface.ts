import {LabelLayout} from './labelLayout.interface';

export interface AppDefaultsOptions {
  barCodeNumLength?: number;
  barCodeRegExp?: RegExp | string;
  countsCollection?: string;
  dateDisplayFormat?: string;
  dateEncodedFormat?: string;
  initialsLength?: number;
  initialsRegExp?: RegExp | string;
  labelLayout?: LabelLayout;
  lineCountRegExp?: RegExp | string;
  locationId?: string;
  locationIdRegExp?: RegExp | string;
  numCopies?: number;
  qrCodeRegExp?: RegExp | string;
  samplesCollection?: string;
}

export class AppDefaults {
  barCodeNumLength: number;
  barCodeRegExp: RegExp;
  countsCollection: string;
  dateDisplayFormat: string;
  dateEncodedFormat: string;
  initialsLength: number;
  initialsRegExp: RegExp;
  labelLayout: LabelLayout;
  lineCountRegExp: RegExp;
  locationId: string;
  locationIdRegExp: RegExp;
  numCopies: number;
  qrCodeRegExp: RegExp;
  samplesCollection: string;

  constructor(options: AppDefaultsOptions) {
    console.log('options', options);
    const keys = Object.keys(options);
    keys.forEach(k => {
      if (k.includes('RegExp')) {
        if (typeof options[k] === 'string') {
          this[k] = new RegExp(options[k]);
        } else {
          this[k] = options[k];
        }
      } else {
        this[k] = options[k];
      }
    });
  }
}
