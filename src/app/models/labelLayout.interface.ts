export interface LayoutOptions {
  barcodeType?: string;
  type?: string;
  name?: string;
  units?: string;
  pointsPerUnit?: number;
  barcodeWidth?: number;
  barcodeHeight?: number;
  columnHeight?: number;
  columnWidth?: number;
  marginSize?: number;
  numCols?: number;
  columnGap?: number;
  sideTextWidth?: number;
  sideTextTop?: number;
  sideTextMargin?: number;
  topTextMargin?: number;
  bottomTextMargin?: number;
  fontSizePt?: number;
  numCopies?: number;
}

export class LabelLayout {
  name = '32mm Round Label - QR Code (1up)';
  barcodeType = 'qrcode';
  type = 'circle_1up_32mm_x_32mm_qrcode';
  units = 'mm';
  pointsPerUnit = 0.3528;
  barcodeHeight = 28.6;
  barcodeWidth = 28.6;
  columnHeight = 32;
  columnWidth = 32;
  marginSize = 1.7;
  numCols = 1;
  columnGap = 0;
  sideTextWidth = 4;
  sideTextTop = 11;
  sideTextMargin = 0;
  topTextMargin = 0;
  bottomTextMargin = 0;
  fontSizePt = 6;
  numCopies = 1;

  constructor(private options: LayoutOptions) {
    const keys = Object.keys(options);
    keys.forEach(k => {
      this[k] = options[k];
    });
  }

  get dimensions() {
    return {
      bottomTextMargin: this._toUnits(this.bottomTextMargin),
      columnGap: this._toUnits(this.columnGap),
      fontSize: this._toUnits(this.fontSize),
      columnWidth: this._toUnits(this.columnWidth),
      columnHeight: this._toUnits(this.columnHeight),
      barcodeWidth: this._toUnits(this.barcodeWidth),
      barcodeWidthWithMargins: this._toUnits(this.barcodeWidthWithMargins),
      barcodeHeight: this._toUnits(this.barcodeHeight),
      barcodeHeightWithMargins: this._toUnits(this.barcodeHeightWithMargins),
      marginWidth: this._toUnits(this.marginSize),
      pageHeight: this._toUnits(this.pageHeight),
      pageWidth: this._toUnits(this.pageWidth),
      sideTextMargin: this._toUnits(this.sideTextMargin),
      sideTextTop: this._toUnits(this.sideTextTop),
      sideTextWidth: this._toUnits(this.sideTextWidth),
      topTextMargin: this._toUnits(this.topTextMargin),
    };
  }

  get barcodeWidthWithMargins(): number {
    return (
      this.barcodeWidth +
      (this.marginSize * 2) +
      (this.sideTextMargin * 2)
    );
  }

  get barcodeHeightWithMargins(): number {
    return (
      this.barcodeHeight +
      (this.marginSize * 2) +
      this.topTextMargin +
      this.bottomTextMargin
    );
  }

  get pageWidth(): number {
    return (this.barcodeWidthWithMargins * this.numCols);
  }

  get pageHeight(): number {
    return (this.barcodeHeightWithMargins * this.numCopies);
  }

  get fontSize(): number {
    return this.fontSizePt * this.pointsPerUnit;
  }

  private _toUnits(num: number) {
    return `${num}${this.units}`;
  }
}
