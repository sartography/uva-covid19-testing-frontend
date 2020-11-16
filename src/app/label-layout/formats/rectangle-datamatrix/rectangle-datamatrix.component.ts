import {Component, Input, OnInit} from '@angular/core';
import {AppDefaults} from '../../../models/appDefaults.interface';
import {Sample} from '../../../models/sample.interface';

@Component({
  selector: 'app-rectangle-datamatrix',
  templateUrl: './rectangle-datamatrix.component.svg',
  styleUrls: ['./rectangle-datamatrix.component.scss']
})
export class RectangleDatamatrixComponent implements OnInit {
  @Input() sample: Sample;
  @Input() settings: AppDefaults;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  constructor() { }

  ngOnInit(): void {
  }

}
