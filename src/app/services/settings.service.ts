import {Injectable} from '@angular/core';
import createClone from 'rfdc';
import serializeJs from 'serialize-javascript';
import {defaultOptions} from '../config/defaults';
import {AppDefaults, AppDefaultsOptions} from '../models/appDefaults.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Default form field and data values
  defaults: AppDefaults = new AppDefaults(defaultOptions);

  // Deserializes settings from local storage and returns AppDefaults instance
  getStoredSettings(): AppDefaults {
    // tslint:disable-next-line:no-eval
    return new AppDefaults(eval(`(${localStorage.getItem('settings')})`));
  }

  // Returns true if settings are found in local storage
  hasStoredSettings(): boolean {
    return !!localStorage.getItem('settings');
  }

  // Returns settings from local storage, or defaults if none have been saved yet.
  getSettings(): AppDefaults {
    if (this.hasStoredSettings()) {
      return this.getStoredSettings();
    } else {
      return this.saveSettings(this.defaults);
    }
  }

  // Serializes given settings and stores them in local storage
  saveSettings(newSettings: AppDefaultsOptions): AppDefaults {
    const settings: AppDefaults = createClone({circles: true})(this.defaults);

    Object.keys(newSettings).forEach(k => {
      settings[k] = newSettings[k];
    });

    localStorage.setItem('settings', serializeJs(settings));
    return settings;
  }

}


