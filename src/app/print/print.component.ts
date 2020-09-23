import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  barCode: string;
  initials: string;
  dateCreated: Date;

  constructor(private route: ActivatedRoute) {
    this.dateCreated = new Date();
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.barCode = queryParamMap.get('barCode');
      this.initials = queryParamMap.get('initials');
    });
  }

  ngOnInit(): void {
  }

  saveAndPrint() {
    // TODO: Upload new count to backend.
    window.print();
  }
}
