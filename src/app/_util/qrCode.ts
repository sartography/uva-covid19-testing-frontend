import {formatDate} from '@angular/common';

export const createQrCodeValue = (
  barCode: string,
  initials: string,
  dateCreated: Date,
  locationId: string,
  delimiter = '-',
  barcodeType: string
): string => {
  const valArray = [
    barCode,
    initials.toUpperCase(),
    formatDate(dateCreated, 'yyyyMMddHHmm', 'en-us'),
    locationId,
  ];
  return valArray.join(delimiter);
};
