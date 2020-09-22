import {APP_BASE_HREF} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ApiError} from '../interfaces/apiError.interface';
import {AppEnvironment} from '../interfaces/appEnvironment.interface';
import {Sample} from '../interfaces/sample.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiRoot: string;

  constructor(
    @Inject('APP_ENVIRONMENT') private environment: AppEnvironment,
    @Inject(APP_BASE_HREF) public baseHref: string,
    private httpClient: HttpClient,
    private router: Router,
    private location: Location,
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
  addSample(sample: Sample): Observable<Sample> {
    const url = this.apiRoot;

    return this.httpClient
      .put<Sample>(url, sample)
      .pipe(catchError(err => this._handleError(err)));
  }

  private _handleError(error: ApiError): Observable<never> {
    return throwError(error.message || 'Could not complete your request; please try again later.');
  }
}
