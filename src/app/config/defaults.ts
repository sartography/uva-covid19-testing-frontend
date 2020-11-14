import {AppDefaultsOptions} from '../models/appDefaults.interface';
import {LabelLayout} from '../models/labelLayout.interface';

export const labelLayouts = {
  round_32mm_1up: new LabelLayout({
    name: '32mm Round Label - 1up',
    barcodeType: 'qrcode',
    type: 'round_32mm_1up',
    numCols: 1,
    columnGap: 0,
    barcodeWidth: 28.6,
    barcodeHeight: 28.6,
    sideTextMargin: 0,
    topTextMargin: 0,
    bottomTextMargin: 0,
  }),
  round_32mm_2up: new LabelLayout({
    name: '32mm Round Label - 2up',
    barcodeType: 'qrcode',
    type: 'round_32mm_2up',
    numCols: 2,
    columnGap: 3.4,
    barcodeWidth: 28.6,
    barcodeHeight: 28.6,
    sideTextMargin: 0,
    topTextMargin: 0,
    bottomTextMargin: 0,
  }),
  rectangular_54x32: new LabelLayout({
    name: '2in x 1.25in Rectangular Label',
    barcodeType: 'datamatrix',
    type: 'rectangular_54x32',
    numCols: 1,
    columnGap: 0,
    columnWidth: 54,
    columnHeight: 34,
    barcodeWidth: 10,
    barcodeHeight: 10,
    sideTextMargin: 0,
    topTextMargin: 0,
    bottomTextMargin: 0,
  }),
  rectangular_sm: new LabelLayout({
    name: '96mm x 15mm Rectangular Label',
    barcodeType: 'datamatrix',
    type: 'rectangular_sm',
    numCols: 1,
    columnGap: 0,
    barcodeWidth: 32,
    barcodeHeight: 16,
    marginSize: 6,
    sideTextMargin: 2,
    topTextMargin: 3,
    bottomTextMargin: 3,
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
