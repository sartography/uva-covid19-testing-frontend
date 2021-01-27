import { ComponentFixture, TestBed } from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {CacheService} from '../services/cache.service';
import {SettingsService} from '../services/settings.service';
import {MockEnvironment} from '../testing/environment.mock';

import { ImportedFilesComponent } from './imported-files.component';

describe('ImportedFilesComponent', () => {
  let component: ImportedFilesComponent;
  let fixture: ComponentFixture<ImportedFilesComponent>;
  const mockRouter = {navigate: jasmine.createSpy('navigate')};
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportedFilesComponent ],
      imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {provide: 'APP_ENVIRONMENT', useClass: MockEnvironment},
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: Router, useValue: mockRouter},
        ApiService,
        CacheService,
        SettingsService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ImportedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
