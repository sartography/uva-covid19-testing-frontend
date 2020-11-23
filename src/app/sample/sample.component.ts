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
  cardNumFormControl: FormControl;
  initialsFormControl: FormControl;
  @ViewChild('cardNumInput') cardNumInput: MatInput;
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
    this.cardNumFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.settings.cardNumRegExp),
    ]);
    this.initialsFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.settings.initialsRegExp),
    ]);
    this.cardNumFormControl.registerOnChange(() => this.checkCardNumValue());
    this.initialsFormControl.registerOnChange(() => this.checkInitialsValue());
  }

  get queryParams(): Params {
    return {
      cardNum: this.cardNumValue.slice(0, 9),
      initials: this.initialsValue.toUpperCase(),
    };
  }

  get cardNumValue(): string {
    return this.cardNumFormControl.value;
  }

  get initialsValue(): string {
    return this.initialsFormControl.value.toUpperCase();
  }

  get hasCardNum(): boolean {
    return this.settings.cardNumRegExp.test(this.cardNumValue);
  }

  get hasInitials(): boolean {
    return this.settings.initialsRegExp.test(this.initialsValue.toUpperCase());
  }

  get hasErrors(): boolean {
    return !(this.cardNumFormControl.valid && this.initialsFormControl.valid);
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
    this.cardNumInput.focus();
    this.changeDetector.detectChanges();
  }

  checkCardNumValue() {
    if (this.hasCardNum) {
      this.initialsInput.focus();
      this.changeDetector.detectChanges();
    }
  }

  checkInitialsValue() {
    if (this.hasInitials && this.hasCardNum) {
      this.nextButton.focus();
      this.changeDetector.detectChanges();
    }
  }

  resetForm() {
    this.cardNumFormControl.patchValue('');
    this.initialsFormControl.patchValue('');
  }

  goPrint() {
    if (!this.hasErrors) {
      this.router.navigate(['/print'], {queryParams: this.queryParams});
    }
  }
}
