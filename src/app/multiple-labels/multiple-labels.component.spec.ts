import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLabelsComponent } from './multiple-labels.component';

describe('MultipleLabelsComponent', () => {
  let component: MultipleLabelsComponent;
  let fixture: ComponentFixture<MultipleLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
