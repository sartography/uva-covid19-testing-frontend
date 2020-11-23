export interface LayoutOptions {
  barcodeType?: string;
  id?: string;
  name?: string;
  units?: string;
  pageHeight?: number;
  pageWidth?: number;
  numCols?: number;
  numCopies?: number;
  delimiter?: string;
}

export class LabelLayout {
  name = '32mm Round Label - QR Code (1up)';
  barcodeType = 'qrcode';
  id = 'circle_qrcode_double';
  units = 'mm';
  pageHeight = 32;
  pageWidth = 32;
  numCols = 1;
  numCopies = 1;
  delimiter = '-';

  constructor(private options: LayoutOptions) {
    if (options) {
      const keys = Object.keys(options);
      keys.forEach(k => {
        this[k] = options[k];
      });
    } else {
      console.error('options is empty:', options);
    }
  }

  get dimensions() {
    return {
      pageWidth: this._toUnits(this.pageWidth),
      pageHeight: this._toUnits(this.pageHeight * this.numCopies),
    };
  }

  private _toUnits(num: number) {
    return `${num}${this.units}`;
  }
}
