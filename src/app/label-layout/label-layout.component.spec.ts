import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelLayoutComponent } from './label-layout.component';

describe('LabelLayoutComponent', () => {
  let component: LabelLayoutComponent;
  let fixture: ComponentFixture<LabelLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
