import {LabelLayoutType} from './labelLayout';

export interface AppDefaults {
  countsCollection: string;
  samplesCollection: string;
  dateEncodedFormat: string;
  dateDisplayFormat: string;
  numCopies: number;
  labelLayout: LabelLayoutType;
  locationId: string;
  lineCountRegex: RegExp;
  qrCodeRegex: RegExp;
  barCodeRegex: RegExp;
  barCodeNumLength: number;
  initialsRegex: RegExp;
  initialsLength: number;
}
