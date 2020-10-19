import {Injectable} from '@angular/core';
import serializeJs from 'serialize-javascript';
import {Sample} from '../models/sample.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  // Default form field and data values
  records: Sample[] = [];

  // localStorage key
  private localStorageKey = 'cachedRecords';

  // Deserializes settings from local storage and returns AppDefaults instance
  getStoredRecords(): Sample[] {
    // tslint:disable-next-line:no-eval
    return (eval(`(${localStorage.getItem(this.localStorageKey)})`) || []) as Sample[];
  }

  // Returns true if settings are found in local storage
  hasStoredRecords(): boolean {
    return this.getStoredRecords().length > 0;
  }

  // Returns records from local storage, or [] if none have been saved yet.
  getRecords(): Sample[] {
    if (this.hasStoredRecords()) {
      return this.getStoredRecords();
    } else {
      return this.saveRecords(this.records);
    }
  }

  // Serializes given record and adds it to cache in local storage
  saveRecord(newRecord: Sample): Sample[] {
    const records = this.getRecords();
    records.push(newRecord);
    return this.saveRecords(records);
  }

  // Serializes multiple given records and stores them in local storage
  saveRecords(newRecords: Sample[]): Sample[] {
    localStorage.setItem(this.localStorageKey, serializeJs(newRecords));
    return newRecords;
  }

  // Clears cached records.
  clearCache(): Sample[] {
    return this.saveRecords([]);
  }
}


