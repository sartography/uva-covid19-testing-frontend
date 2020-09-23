import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockEnvironment} from '../testing/environment.mock';
import {GoogleAnalyticsService} from './google-analytics.service';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  const mockEnvironment = new MockEnvironment();
  const mockRouter = {
    createUrlTree: jasmine.createSpy('createUrlTree'),
    navigate: jasmine.createSpy('navigate'),
    events: jasmine.createSpyObj('events', ['subscribe']),
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      GoogleAnalyticsService,
      {provide: 'APP_ENVIRONMENT', useValue: mockEnvironment},
      {provide: APP_BASE_HREF, useValue: '/'},
      {provide: Router, useValue: mockRouter},
      {provide: Location, useValue: location},
    ],
  }));

  beforeEach(() => {
    service = TestBed.inject(GoogleAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.analyticsKey).toBeTruthy();
  });

  it('should set a new analytics key', () => {
    service.init('new_key');
    expect(service.analyticsKey).toEqual('new_key');
  });
});
