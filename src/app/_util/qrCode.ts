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
  const longDate = formatDate(dateCreated, 'yyyyMMddHHmm', 'en-us');
  const dateString = is1D ? longDate.slice(3, 10) : longDate;
  const locId = is1D ? '' : locationId;

  const valArray = [
    cardNum,
    compId,
    dateString,
    locId,
  ];
  return valArray.join(delimiter);
};
