import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Params, Router} from '@angular/router';
import {AppDefaults} from '../models/appDefaults.interface';
import {SettingsService} from '../services/settings.service';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements AfterViewInit {
  settings: AppDefaults;
  barCodeFormControl: FormControl;
  initialsFormControl: FormControl;
  @ViewChild('barCodeInput') barCodeInput: MatInput;
  @ViewChild('initialsInput') initialsInput: MatInput;
  @ViewChild('nextButton') nextButton: MatButton;

  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private settingsService: SettingsService,
  ) {
    this.settings = this.settingsService.getSettings();
    this.barCodeFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.settings.barCodeRegExp),
    ]);
    this.initialsFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.settings.initialsRegExp),
    ]);
    this.barCodeFormControl.registerOnChange(() => this.checkBarCodeValue());
    this.initialsFormControl.registerOnChange(() => this.checkInitialsValue());
  }

  get queryParams(): Params {
    return {
      barCode: this.barCodeValue.slice(0, 9),
      initials: this.initialsValue,
    };
  }

  get barCodeValue(): string {
    return this.barCodeFormControl.value;
  }

  get initialsValue(): string {
    return this.initialsFormControl.value;
  }

  get hasBarCode(): boolean {
    return this.settings.barCodeRegExp.test(this.barCodeValue);
  }

  get hasInitials(): boolean {
    return this.settings.initialsRegExp.test(this.initialsValue);
  }

  get hasErrors(): boolean {
    return !(this.barCodeFormControl.valid && this.initialsFormControl.valid);
  }

  ngAfterViewInit() {
    this.barCodeInput.focus();
    this.changeDetector.detectChanges();
  }

  checkBarCodeValue() {
    if (this.hasBarCode) {
      this.initialsInput.focus();
      this.changeDetector.detectChanges();
    }
  }

  checkInitialsValue() {
    if (this.hasInitials && this.hasBarCode) {
      this.nextButton.focus();
      this.changeDetector.detectChanges();
    }
  }

  resetForm() {
    this.barCodeFormControl.patchValue('');
    this.initialsFormControl.patchValue('');
  }

  goPrint() {
    if (!this.hasErrors) {
      this.router.navigate(['/print'], {queryParams: this.queryParams});
    }
  }
}
