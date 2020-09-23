import createClone from 'rfdc';
import serializeJs from 'serialize-javascript';
import {AppDefaults, AppDefaultsOptions} from '../interfaces/appDefaults.interface';
import {LabelLayout} from '../interfaces/labelLayout.interface';

export const labelLayouts = {
  round_32mm_1up: new LabelLayout({
    name: '32mm Round Label - 1up',
    type: 'round_32mm_1up',
    numCols: 1,
    columnGap: 0,
  }),
  round_32mm_2up: new LabelLayout({
    name: '32mm Round Label - 2up',
    type: 'round_32mm_2up',
    numCols: 2,
    columnGap: 1.3,
  }),
};

export const defaultOptions: AppDefaultsOptions = {
  barCodeNumLength: 9,                                  // Number of digits in Bar Code.
  barCodeRegExp: /^[\d]{14}$|^[\d]{9}$/,                // Pattern for Bar Code data. Scanned barcodes will be either 9 or 14 digits long.
                                                        // Manually-entered ID numbers will be exactly 9 digits long.
  countsCollection: 'counts',                           // Name of collection for Line Counts in Firebase.
  dateDisplayFormat: 'MM/dd/yyyy, hh:mm aa',            // Format for dates when displayed to user.
  dateEncodedFormat: 'yyyyMMddHHmm',                    // Format for dates when encoded in IDs for database records.
  initialsLength: 5,
  initialsRegExp: /^[a-zA-Z]{2,5}$/,
  labelLayout: labelLayouts.round_32mm_1up,             // Which label layout to use for printing. Can be overridden by user setting.
  lineCountRegExp: /^[\d]{4}-[\d]{12}$/,                // ID format for Line Count records.
  locationId: '0000',                                   // Default location ID. Can be overridden by user setting.
  locationIdRegExp: /^[\d]{4}$/,                        // ID format for Line Count records.
  numCopies: 1,                                         // Default number of copies of labels to print. Can be overridden by user setting.
  qrCodeRegExp: /^[\d]{9}-[a-zA-Z]+-[\d]{12}-[\d]{4}$/, // ID format for QR Code records.
  samplesCollection: 'samples',                         // Name of collection for Line Counts in Firebase.
};

// Default form field and data values
export const defaults: AppDefaults = new AppDefaults(defaultOptions);

// Deserializes settings from local storage and returns AppDefaults instance
export const getStoredSettings = (): AppDefaults => {
  // tslint:disable-next-line:no-eval
  return new AppDefaults(eval(`(${localStorage.getItem('settings')})`));
};

// Returns true if settings are found in local storage
export const hasStoredSettings = (): boolean => {
  return !!localStorage.getItem('settings');
};

// Returns settings from local storage, or defaults if none have been saved yet.
export const getSettings = (): AppDefaults => {
  if (hasStoredSettings()) {
    return getStoredSettings();
  } else {
    return saveSettings(defaults);
  }
};

// Serializes given settings and stores them in local storage
export const saveSettings = (newSettings: AppDefaultsOptions): AppDefaults => {
  const settings: AppDefaults = createClone({circles: true})(defaults);

  Object.keys(newSettings).forEach(k => {
    console.log(`${k}:`, newSettings[k]);
    settings[k] = newSettings[k];
  });

  localStorage.setItem('settings', serializeJs(settings));
  return settings;
};
