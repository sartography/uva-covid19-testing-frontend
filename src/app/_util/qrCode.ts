import {formatDate} from '@angular/common';

export const createQrCodeValue = (
  cardNum: string,
  initials: string,
  dateCreated: Date,
  locationId: string,
  delimiter = '-',
  barcodeType: string
): string => {
  const is1D = (barcodeType === 'code128');
  const compId = is1D ? '' : initials.toUpperCase();
  const dateFormat = is1D ? 'yyMMddHH' : 'yyyyMMddHHmm';
  const dateString = formatDate(dateCreated, dateFormat, 'en-us');

  const valArray = [
    cardNum,
    compId,
    dateString,
    locationId,
  ];
  return valArray.join(delimiter);
};
