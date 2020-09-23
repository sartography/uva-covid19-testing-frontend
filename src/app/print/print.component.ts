import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {defaults} from '../config/defaults';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  barCode: string;
  initials: string;
  dateCreated: Date;

  get pagesToGridFractions(): string {
    const what = this.pages.map(() => '1fr').join(' ');
    console.log('what', what);
    return what;
  }

  get colsToGridFractions(): string {
    return this.columns.map(() => '1fr').join(' ');
  }

  get pageHeight(): string {
    return `${this.pages.length * 32}mm`;
  }

  get pageWidth(): string {
    return `${this.columns.length * 32}mm`;
  }

  constructor(private route: ActivatedRoute) {
    this.dateCreated = new Date();
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.barCode = queryParamMap.get('barCode');
      this.initials = queryParamMap.get('initials');
    });
  }

  get pages() {
    return Array(defaults.numCopies).fill('');
  }

  get columns() {
    return Array(defaults.labelLayout === 'round_32mm_2up' ? 2 : 1).fill('');
  }

  ngOnInit(): void {
  }

}
