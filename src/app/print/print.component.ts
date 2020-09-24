import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements AfterViewInit {
  barCode: string;
  initials: string;
  dateCreated: Date;
  @ViewChild('saveAndPrintButton') saveAndPrintButton: MatButton;

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.dateCreated = new Date();
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.barCode = queryParamMap.get('barCode');
      this.initials = queryParamMap.get('initials');
    });
  }

  ngAfterViewInit() {
    this.saveAndPrintButton.focus();
    this.changeDetector.detectChanges();
  }

  saveAndPrint() {
    // TODO: Upload new count to backend.
    window.print();
  }
}
