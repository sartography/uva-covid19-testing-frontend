export interface LayoutOptions {
  barcodeType?: string;
  type?: string;
  name?: string;
  units?: string;
  pointsPerUnit?: number;
  labelWidth?: number;
  labelHeight?: number;
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
  barcodeType = 'qrcode';
  type = 'round_32mm_1up';
  name = '32mm Round Label - 1up';
  units = 'mm';
  pointsPerUnit = 0.3528;
  labelHeight = 28.6;
  labelWidth = 28.6;
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
      labelWidth: this._toUnits(this.labelWidth),
      labelWidthWithMargins: this._toUnits(this.labelWidthWithMargins),
      labelHeight: this._toUnits(this.labelHeight),
      labelHeightWithMargins: this._toUnits(this.labelHeightWithMargins),
      marginWidth: this._toUnits(this.marginSize),
      pageHeight: this._toUnits(this.pageHeight),
      pageWidth: this._toUnits(this.pageWidth),
      sideTextMargin: this._toUnits(this.sideTextMargin),
      sideTextTop: this._toUnits(this.sideTextTop),
      sideTextWidth: this._toUnits(this.sideTextWidth),
      topTextMargin: this._toUnits(this.topTextMargin),
    };
  }

  get labelWidthWithMargins(): number {
    return (
      this.labelWidth +
      (this.marginSize * 2) +
      (this.sideTextMargin * 2)
    );
  }

  get labelHeightWithMargins(): number {
    return (
      this.labelHeight +
      (this.marginSize * 2) +
      this.topTextMargin +
      this.bottomTextMargin
    );
  }

  get pageWidth(): number {
    return (this.labelWidthWithMargins * this.numCols);
  }

  get pageHeight(): number {
    return (this.labelHeightWithMargins * this.numCopies);
  }

  get fontSize(): number {
    return this.fontSizePt * this.pointsPerUnit;
  }

  private _toUnits(num: number) {
    return `${num}${this.units}`;
  }
}
