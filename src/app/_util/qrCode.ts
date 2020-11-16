import {formatDate} from '@angular/common';

export const createQrCodeValue = (
  barCode: string,
  initials: string,
  dateCreated: Date,
  locationId: string,
  delimiter = '-',
  barcodeType: string
): string => {
  const is1D = barcodeType === 'code128';
  const locId = is1D ? locationId.slice(2, 4) : locationId;
  const dateFormat = is1D ? 'yyMMdd' : 'yyyyMMddHHmm';

  const valArray = [
    barCode,
    initials.toUpperCase(),
    formatDate(dateCreated, dateFormat, 'en-us'),
    locId,
  ];
  return valArray.join(delimiter);
};
