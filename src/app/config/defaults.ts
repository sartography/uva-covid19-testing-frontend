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

// Default form field and data values
export const defaults: AppDefaults = new AppDefaults({
  barCodeNumLength: 9,                                  // Number of digits in Bar Code.
  barCodeRegExp: /^[\d]{14}$|^[\d]{9}$/,                 // Pattern for Bar Code data. Scanned barcodes will be either 9 or 14 digits long. Manually-entered ID numbers will be exactly 9 digits long.
  countsCollection: 'counts',                           // Name of collection for Line Counts in Firebase.
  dateDisplayFormat: 'MM/dd/yyyy, hh:mm aa',            // Format for dates when displayed to user.
  dateEncodedFormat: 'yyyyMMddHHmm',                    // Format for dates when encoded in IDs for database records.
  initialsLength: 5,
  initialsRegExp: /^[a-zA-Z]{2,5}$/,
  labelLayout: labelLayouts.round_32mm_1up,             // Which label layout to use for printing. Can be overridden by user setting.
  lineCountRegExp: /^[\d]{4}-[\d]{12}$/,                 // ID format for Line Count records.
  locationId: '0000',                                   // Default location ID. Can be overridden by user setting.
  locationIdRegExp: /^[\d]{4}$/,                         // ID format for Line Count records.
  numCopies: 1,                                         // Default number of copies of labels to print. Can be overridden by user setting.
  qrCodeRegExp: /^[\d]{9}-[a-zA-Z]+-[\d]{12}-[\d]{4}$/,  // ID format for QR Code records.
  samplesCollection: 'samples',                         // Name of collection for Line Counts in Firebase.
});

export const getSettings = (): AppDefaults => {
  const storedSettings = localStorage.getItem('settings');

  if (storedSettings) {
    // tslint:disable-next-line:no-eval
    return new AppDefaults(eval(`(${storedSettings})`));
  } else {
    localStorage.setItem('settings', serializeJs(defaults));
    return defaults;
  }
};

export const saveSettings = (newSettings: AppDefaultsOptions): AppDefaults => {
  const settings: AppDefaults = createClone()(getSettings());

  Object.keys(newSettings).forEach(k => {
    settings[k] = newSettings[k];
  });

  localStorage.setItem('settings', serializeJs(settings));
  return getSettings();
};
