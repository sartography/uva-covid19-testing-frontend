import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AppDefaults} from '../../../models/appDefaults.interface';
import {Sample} from '../../../models/sample.interface';

@Component({
  selector: 'app-circle-qrcode-single',
  templateUrl: './circle-qrcode-single.component.svg',
  styleUrls: ['./circle-qrcode-single.component.scss']
})
export class CircleQRcodeSingleComponent implements OnInit {
  @Input() sample: Sample;
  @Input() settings: AppDefaults;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  constructor(private changeDetector: ChangeDetectorRef) {
    console.log('CircleQRcodeSingleComponent constructor this.sample', this.sample);
  }

  ngOnInit(): void {
    console.log('CircleQRcodeSingleComponent ngOnInit this.sample', this.sample);
    if (this.sample) {
      this.changeDetector.detectChanges();
    }
  }

}
