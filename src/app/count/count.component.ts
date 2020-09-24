import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements AfterViewInit {
  numPeopleFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(1000),
  ]);
  @ViewChild('numPeopleInput') numPeopleInput: MatInput;

  get hasErrors(): boolean {
    return !this.numPeopleFormControl.valid;
  }

  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.numPeopleInput.focus();
    this.changeDetector.detectChanges();
  }

  save() {
    if (!this.hasErrors) {
      // TODO: Upload new count to backend.
      this.router.navigate(['/']);
    }
  }

}
