import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

import { NavbarComponent } from './navbar.component';
import {HttpClient} from '@angular/common/http';
import {FakeMatIconRegistry} from '@angular/material/icon/testing';
import {ApiService} from '../services/api.service';
import {APP_BASE_HREF} from '@angular/common';
import {MockEnvironment} from '../testing/environment.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const mockEnvironment = new MockEnvironment();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
      ],
      providers: [
        HttpClient,
        FakeMatIconRegistry,
        ApiService,
        {provide: 'APP_ENVIRONMENT', useValue: mockEnvironment},
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
