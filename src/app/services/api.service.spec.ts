import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockEnvironment} from '../testing/environment.mock';
import {ApiService} from './api.service';

describe('ApiService', () => {
  let httpMock: HttpTestingController;
  let location: Location;
  let service: ApiService;
  const mockEnvironment = new MockEnvironment();
  const mockRouter = {
    createUrlTree: jasmine.createSpy('createUrlTree'),
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    service = TestBed.inject(ApiService);
    location = TestBed.inject(Location);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
