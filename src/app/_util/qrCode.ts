import {formatDate} from '@angular/common';

export const createQrCodeValue = (
  barCode: string,
  initials: string,
  dateCreated: Date,
  locationId: string,
  delimiter = '-',
  barcodeType: string
): string => {
  const is1D = (barcodeType === 'code128');
  const dateFormat = is1D ? 'yyMMdd' : 'yyyyMMddHHmm';
  const locId = is1D ? locationId.slice(3, 4) : locationId;

  const valArray = [
    barCode,
    initials.toUpperCase(),
    formatDate(dateCreated, dateFormat, 'en-us'),
    locId,
  ];
  return valArray.join(delimiter);
};
