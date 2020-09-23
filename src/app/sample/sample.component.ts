import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {Params} from '@angular/router';
import {defaults} from '../config/defaults';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements AfterViewInit {
  barCodeErrorMessage = '';
  initialsErrorMessage = '';
  barCodeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(defaults.barCodeRegex),
  ]);
  initialsFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(defaults.initialsRegex),
  ]);
  @ViewChild('barCodeInput') barCodeInput: MatInput;
  @ViewChild('initialsInput') initialsInput: MatInput;

  get queryParams(): Params {
    return {
      barCode: this.barCodeValue,
      initials: this.initialsValue,
    };
  }

  constructor(private changeDetector: ChangeDetectorRef) {
    this.barCodeFormControl.registerOnChange(() => {
      this.checkBarCodeValue();
    });
    this.initialsFormControl.registerOnChange(() => this.checkInitialsValue());
  }

  get barCodeValue(): string {
    return this.barCodeFormControl.value;
  }

  get initialsValue(): string {
    return this.initialsFormControl.value;
  }

  get hasBarCode(): boolean {
    return defaults.barCodeRegex.test(this.barCodeValue);
  }

  get hasInitials(): boolean {
    return defaults.initialsRegex.test(this.initialsValue);
  }

  get hasInfo(): boolean {
    return this.hasBarCode && this.hasInitials;
  }

  ngAfterViewInit() {
    this.barCodeInput.focus();
    this.changeDetector.detectChanges();
  }

  checkBarCodeValue() {
    console.log('--- checkBarCodeValue ---');
    if (this.hasBarCode) {
      this.barCodeErrorMessage = '';
      this.initialsInput.focus();
      this.changeDetector.detectChanges();
    } else {
      this.barCodeErrorMessage = 'Wrong barcode.';
    }
  }

  checkInitialsValue() {
    if (this.hasInitials) {
      this.initialsErrorMessage = '';
    } else {
      this.initialsErrorMessage = 'Wrong barcode.';
    }
  }
}
