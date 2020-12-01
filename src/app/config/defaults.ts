import {AppDefaultsOptions} from '../models/appDefaults.interface';
import {LabelLayout} from '../models/labelLayout.interface';

export const labelLayouts = {
  circle_qrcode_single: new LabelLayout({
    name: '32mm Round Label - QR Code (1up)',
    barcodeType: 'qrcode',
    id: 'circle_qrcode_single',
    pageWidth: 32,
    pageHeight: 32,
  }),
  circle_qrcode_double: new LabelLayout({
    name: '32mm Round Label - QR Code (2up)',
    barcodeType: 'qrcode',
    id: 'circle_qrcode_double',
    pageWidth: 64,
    pageHeight: 32,
  }),
  rectangle_3x1_code128: new LabelLayout({
    name: '3in x 1in Rectangular Label - CODE128',
    barcodeType: 'code128',
    id: 'rectangle_3x1_code128',
    pageWidth: 79.375,
    pageHeight: 28.575,
    delimiter: '',
  }),
  rectangle_code128: new LabelLayout({
    name: '2.63in x 1.125in Rectangular Label - CODE128',
    barcodeType: 'code128',
    id: 'rectangle_code128',
    pageWidth: 66.8,
    pageHeight: 28.6,
    delimiter: '',
  }),
  rectangle_datamatrix: new LabelLayout({
    name: '2in x 1.25in Rectangular Label - DataMatrix',
    barcodeType: 'datamatrix',
    id: 'rectangle_datamatrix',
    pageWidth: 54,
    pageHeight: 34,
  }),
};

export const defaultOptions: AppDefaultsOptions = {
  barCodeNumLength: 9,                                      // Number of digits in Bar Code.
  cardNumRegExp: /^[\d]{14}$|^[\d]{9}$/,                    // Pattern for Bar Code data.
                                                            // Scanned barcodes will be either 9 or 14 digits long.
                                                            // Manually-entered ID numbers will be exactly 9 digits long.
  countsCollection: 'counts',                               // Name of collection for Line Counts in Firebase.
  dateDisplayFormat: 'MM/dd/yyyy, hh:mm aa',                // Format for dates when displayed to user.
  dateEncodedFormat: 'yyyyMMddHHmm',                        // Format for dates when encoded in IDs for database records.
  initialsLength: 6,
  initialsRegExp: /^[a-zA-Z0-9]{2,6}$/,
  labelLayout: labelLayouts.circle_qrcode_single,           // Which label layout to use for printing. Can be overridden by user setting.
  lineCountRegExp: /^[\d]{4}-[\d]{12}$/,                    // ID format for Line Count records.
  locationId: '0000',                                       // Default location ID. Can be overridden by user setting.
  locationIdRegExp: /^[\d]{1,4}$/,                          // ID format for Line Count records.
  numCopies: 1,                                             // Default number of copies of labels to print.
                                                            // Can be overridden by user setting.
  qrCodeRegExp: /^[\d]{9}-[a-zA-Z]+-[\d]{12}-[\d]{4}$/,     // ID format for QR Code records.
  samplesCollection: 'samples',                             // Name of collection for Line Counts in Firebase.
};
