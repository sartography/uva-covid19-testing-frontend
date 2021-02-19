
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'changed_date' })
export class ChangeDatePipe implements PipeTransform {
  // adding a default value in case you don't want to pass the format then 'yyyy-MM-dd' will be used
  transform(date: Date | string, day: number, format: string = 'yyyy-MM-dd'): string {
    date = new Date(date);  // if orginal type was a string
    date.setDate(date.getDate() - day);
    return new DatePipe('en-US').transform(date, format);
  }
}

// @Pipe({ name: 'date' })
// @Injectable()
// export class CustomDateAdapter extends NativeDateAdapter implements PipeTransform  {
//   transform(value: any, ...args: any[]) {
//     throw new Error('Method not implemented.');
//   }

//   getFirstDayOfWeek(): number {
//    return 1;
//   }

// }
