import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {
  numPeopleFormControl = new FormControl(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(1000),
  ]);

  get hasErrors(): boolean {
    return !this.numPeopleFormControl.valid;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  save() {
    // TODO: Upload new count to backend.
    this.router.navigate(['/']);
  }

}
