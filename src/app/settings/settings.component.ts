import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';
import {labelLayouts} from '../config/defaults';
import {AppDefaults} from '../models/appDefaults.interface';
import {LabelLayout} from '../models/labelLayout.interface';
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

  @ViewChild('locationIdInput') locationIdInput: MatInput;

  constructor(
    private router: Router,
    private settingsService: SettingsService
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
  }

  get hasInfo(): boolean {
    return this.numCopiesFormControl.valid && this.locationIdFormControl.valid;
  }

  ngAfterViewInit(): void {
    this.locationIdInput.focus();
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
}
