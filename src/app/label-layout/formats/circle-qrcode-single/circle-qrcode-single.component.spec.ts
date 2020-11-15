import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleQRcodeSingleComponent } from './circle-qrcode-single.component';

describe('CircleQRcodeSingleComponent', () => {
  let component: CircleQRcodeSingleComponent;
  let fixture: ComponentFixture<CircleQRcodeSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleQRcodeSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleQRcodeSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
