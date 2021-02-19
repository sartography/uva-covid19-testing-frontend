import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsComponent } from './graphs.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiService} from '../services/api.service';
import {APP_BASE_HREF} from '@angular/common';
import {Router} from '@angular/router';
import {MockEnvironment} from '../testing/environment.mock';
import { ChangeDatePipe } from '../change_date.pipe';

describe('GraphsComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;
  let httpMock: HttpTestingController;
  const mockEnvironment = new MockEnvironment();
  const mockRouter = {
    createUrlTree: jasmine.createSpy('createUrlTree'),
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangeDatePipe
      ],
      imports: [
        HttpClientTestingModule,
        MatBottomSheetModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        ApiService,
        {provide: 'APP_ENVIRONMENT', useValue: mockEnvironment},
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: Router, useValue: mockRouter},
        {provide: Location, useValue: location},
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(GraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
