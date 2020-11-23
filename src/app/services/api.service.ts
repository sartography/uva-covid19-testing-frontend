import {APP_BASE_HREF} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, timeout} from 'rxjs/operators';
import {ApiError} from '../models/apiError.interface';
import {AppEnvironment} from '../models/appEnvironment.interface';
import {Sample} from '../models/sample.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiRoot: string;
  endpoints = {
    sample: '/sample',
  };

  constructor(
    @Inject('APP_ENVIRONMENT') private environment: AppEnvironment,
    @Inject(APP_BASE_HREF) public baseHref: string,
    private httpClient: HttpClient,
  ) {
    this.apiRoot = environment.api;
  }

  /** Get the string value from a given URL */
  getStringFromUrl(url: string): Observable<string> {
    return this.httpClient
      .get(url, {responseType: 'text'})
      .pipe(catchError(err => this._handleError(err)));
  }

  /** Add new sample */
  addSample(sample: Sample): Observable<null> {
    const url = this.apiRoot + this.endpoints.sample;

    return this.httpClient
      .post<null>(url, sample)
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
      .pipe(catchError(err => this._handleError(err)));
  }

  private _handleError(error: ApiError): Observable<never> {
    return throwError(error.message || 'Could not complete your request; please try again later.');
  }
}
