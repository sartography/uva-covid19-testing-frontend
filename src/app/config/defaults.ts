import {AppDefaults} from '../interfaces/appDefaults.interface';
import {LabelLayout, LabelLayoutType} from '../interfaces/labelLayout';

// Default form field and data values
export const defaults: AppDefaults = {
  countsCollection: 'counts',                           // Name of collection for Line Counts in Firebase.
  samplesCollection: 'samples',                         // Name of collection for Line Counts in Firebase.
  dateEncodedFormat: 'yyyyMMddHHmm',                    // Format for dates when encoded in IDs for database records.
  dateDisplayFormat: 'MM/dd/yyyy, hh:mm aa',            // Format for dates when displayed to user.
  numCopies: 3,                                         // Default number of copies of labels to print. Can be overridden by user setting.
  labelLayout: 'round_32mm_1up' as LabelLayoutType,     // Which label layout to use for printing. Can be overridden by user setting.
  locationId: '0000',                                   // Default location ID. Can be overridden by user setting.
  lineCountRegex: /^[\d]{4}-[\d]{12}$/,                 // ID format for Line Count records.
  qrCodeRegex: /^[\d]{9}-[a-zA-Z]+-[\d]{12}-[\d]{4}$/,  // ID format for QR Code records.
  barCodeNumLength: 9,                                  // Number of digits in Bar Code.
  barCodeRegex: /^[\d]{14}$|^[\d]{9}$/,                 // Pattern for Bar Code data. Scanned barcodes will be either 9 or 14 digits long.
                                                        // Manually-entered ID numbers will be exactly 9 digits long.
  initialsLength: 5,
  initialsRegex: /^[a-zA-Z]{2,5}$/,
};

export const labelLayouts = {
  round_32mm_1up: new LabelLayout({
    numCols: 1,
    columnGap: 0,
  }),
  round_32mm_2up: new LabelLayout({
    numCols: 2,
    columnGap: 1.3,
  }),
};
