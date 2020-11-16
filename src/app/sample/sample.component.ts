import {APP_BASE_HREF} from '@angular/common';
import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Params, Router} from '@angular/router';
import {AppDefaults} from '../models/appDefaults.interface';
import {AppEnvironment} from '../models/appEnvironment.interface';
import {ApiService} from '../services/api.service';
import {CacheService} from '../services/cache.service';
import {SettingsService} from '../services/settings.service';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit, AfterViewInit {
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
    private cacheService: CacheService,
    private apiService: ApiService
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
      initials: this.initialsValue.toUpperCase(),
    };
  }

  get barCodeValue(): string {
    return this.barCodeFormControl.value;
  }

  get initialsValue(): string {
    return this.initialsFormControl.value.toUpperCase();
  }

  get hasBarCode(): boolean {
    return this.settings.barCodeRegExp.test(this.barCodeValue);
  }

  get hasInitials(): boolean {
    return this.settings.initialsRegExp.test(this.initialsValue.toUpperCase());
  }

  get hasErrors(): boolean {
    return !(this.barCodeFormControl.valid && this.initialsFormControl.valid);
  }

  ngOnInit(): void {
    const cachedRecords = this.cacheService.getRecords();
    let numSuccess = 0;
    if (cachedRecords && cachedRecords.length > 0) {
      cachedRecords.forEach(r => {
        this.apiService.addSample(r).subscribe(() => {
          numSuccess++;
          console.log('cachedRecords', cachedRecords);
          console.log('numSuccess', numSuccess);

          if (numSuccess === cachedRecords.length) {
            console.log('Cache cleared.');
            this.cacheService.clearCache();
          }
        }, error => {
          console.log('Cannot connect to server. Cache not cleared.');
        });
      });
    } else {
      console.log('No cached records to upload.');
    }
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
