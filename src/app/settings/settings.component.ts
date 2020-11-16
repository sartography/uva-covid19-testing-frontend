import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';
import {createQrCodeValue} from '../_util/qrCode';
import {labelLayouts} from '../config/defaults';
import {AppDefaults} from '../models/appDefaults.interface';
import {LabelLayout} from '../models/labelLayout.interface';
import {Sample} from '../models/sample.interface';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {
  settings: AppDefaults;
  numCopiesFormControl: FormControl;
  labelLayoutFormControl: FormControl;
  locationIdFormControl: FormControl;
  labelLayouts: LabelLayout[];
  fakeSample: Sample;
  fakeBarcodeValue: string;

  @ViewChild('locationIdInput') locationIdInput: MatInput;

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.settings = this.settingsService.getSettings();
    this.numCopiesFormControl = new FormControl(this.settings.numCopies, [
      Validators.required,
    ]);

    this.labelLayoutFormControl = new FormControl(this.settings.labelLayout.type, [
      Validators.required,
    ]);

    this.locationIdFormControl = new FormControl(this.settings.locationId, [
      Validators.required,
      Validators.pattern(this.settings.locationIdRegExp),
    ]);

    this.labelLayouts = Object.values(labelLayouts);

    this._loadFakeData();
  }

  get hasInfo(): boolean {
    return this.numCopiesFormControl.valid && this.locationIdFormControl.valid;
  }

  ngAfterViewInit(): void {
    this.locationIdInput.focus();
    this.changeDetector.detectChanges();
  }

  save() {
    if (this.hasInfo) {
      this.settingsService.saveSettings({
        labelLayout: labelLayouts[this.labelLayoutFormControl.value],
        numCopies: this.numCopiesFormControl.value,
        locationId: this.locationIdFormControl.value,
      });
      this.router.navigate(['/']);
    }
  }

  // Make some fake data for sample barcodes
  private _loadFakeData() {
    this.fakeSample = {
      barcode: '',
      student_id: '123456789',
      initials: 'ABCDE',
      date: new Date(),
      location: this.settings.locationId,
    };

    this.fakeBarcodeValue = createQrCodeValue(
      this.fakeSample.student_id,
      this.fakeSample.initials,
      this.fakeSample.date,
      this.fakeSample.location
    );

    this.fakeSample.barcode = this.fakeBarcodeValue;
  }
}
