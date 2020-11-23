import { ComponentFixture, TestBed } from '@angular/core/testing';
import {QRCodeSVGModule} from 'ngx-qrcode-svg';

import { LabelLayoutComponent } from './label-layout.component';

describe('LabelLayoutComponent', () => {
  let component: LabelLayoutComponent;
  let fixture: ComponentFixture<LabelLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelLayoutComponent ],
      imports: [
        QRCodeSVGModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelLayoutComponent);
    component = fixture.componentInstance;
    component.dateCreated = new Date();
    component.cardNum = '123456789';
    component.initials = 'abc';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
