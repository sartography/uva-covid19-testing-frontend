import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of} from 'rxjs';

import { PrintComponent } from './print.component';

describe('PrintComponent', () => {
  let component: PrintComponent;
  let fixture: ComponentFixture<PrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintComponent ],
      imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {queryParamMap: of(convertToParamMap({barCode: '123456789', initials: 'abc'}))}
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
