import { NativeDateAdapter } from '@angular/material/core';
import {Injectable} from '@angular/core';

// @Pipe({ name: 'date' })
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'dated' })
export class CustomDatePipe implements PipeTransform {
  // adding a default value in case you don't want to pass the format then 'yyyy-MM-dd' will be used
  transform(date: Date | string, day: number, format: string = 'yyyy-MM-dd'): string {
    date = new Date(date);  // if orginal type was a string
    date.setDate(date.getDate() - day);
    return new DatePipe('en-US').transform(date, format);
  }
}
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {

  getFirstDayOfWeek(): number {
   return 1;
  }

}
