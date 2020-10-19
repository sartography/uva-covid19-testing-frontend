import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ApiService} from '../services/api.service';
import {CacheService} from '../services/cache.service';
import {MockEnvironment} from '../testing/environment.mock';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ApiService,
        CacheService,
        {provide: 'APP_ENVIRONMENT', useClass: MockEnvironment},
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
