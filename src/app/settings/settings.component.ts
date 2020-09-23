import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {getSettings, labelLayouts, saveSettings} from '../config/defaults';
import {AppDefaults} from '../interfaces/appDefaults.interface';
import {LabelLayout} from '../interfaces/labelLayout.interface';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: AppDefaults = getSettings();
  numCopiesFormControl = new FormControl(this.settings.numCopies, [
    Validators.required,
  ]);
  labelLayoutFormControl = new FormControl(this.settings.labelLayout.type, [
    Validators.required,
  ]);
  locationIdFormControl = new FormControl(this.settings.locationId, [
    Validators.required,
    Validators.pattern(this.settings.locationIdRegExp),
  ]);

  labelLayouts: LabelLayout[] = Object.values(labelLayouts);

  constructor() {
  }

  get hasInfo(): boolean {
    return this.numCopiesFormControl.valid && this.locationIdFormControl.valid;
  }

  ngOnInit(): void {
  }

  save() {
    saveSettings({

    });
  }
}
