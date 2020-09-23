import {Component, Input, OnInit} from '@angular/core';
import {TestingLocation} from '../interfaces/testingLocation.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() testingLocation: TestingLocation;

  constructor() { }

  ngOnInit(): void {
  }

}
