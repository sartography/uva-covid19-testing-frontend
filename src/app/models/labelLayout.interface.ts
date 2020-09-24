export interface LayoutOptions {
  type?: string;
  name?: string;
  units?: string;
  pointsPerUnit?: number;
  labelSize?: number;
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
  type = 'round_32mm_1up';
  name = '32mm Round Label - 1up';
  units = 'mm';
  pointsPerUnit = 0.3528;
  labelSize = 28.6;
  marginSize = 1.7;
  numCols = 1;
  columnGap = 4;
  sideTextWidth = 4;
  sideTextTop = 11;
  sideTextMargin = 1.5;
  topTextMargin = 3;
  bottomTextMargin = 2.5;
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
      columnGapWidth: this._toUnits(this.columnGapWidth),
      fontSize: this._toUnits(this.fontSize),
      labelSize: this._toUnits(this.labelSize),
      labelSizeWithMargins: this._toUnits(this.labelSizeWithMargins),
      marginWidth: this._toUnits(this.marginSize),
      pageHeight: this._toUnits(this.pageHeight),
      pageWidth: this._toUnits(this.pageWidth),
      sideTextMargin: this._toUnits(this.sideTextMargin),
      sideTextTop: this._toUnits(this.sideTextTop),
      sideTextWidth: this._toUnits(this.sideTextWidth),
      topTextMargin: this._toUnits(this.topTextMargin),
    };
  }

  get columnGapWidth(): number {
    return this.columnGap;
  }

  get labelSizeWithMargins(): number {
    return (this.labelSize + (this.marginSize * 2));
  }

  get pageWidth(): number {
    return (this.labelSizeWithMargins * this.numCols) + (this.columnGap * this.numCols - 1);
  }

  get pageHeight(): number {
    return (this.labelSizeWithMargins * this.numCopies);
  }

  get fontSize(): number {
    return this.fontSizePt * this.pointsPerUnit;
  }

  private _toUnits(num: number) {
    return `${num}${this.units}`;
  }
}
