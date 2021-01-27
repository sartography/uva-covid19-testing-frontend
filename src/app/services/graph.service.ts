import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ApiError } from '../models/apiError.interface';
import { AppEnvironment } from '../models/appEnvironment.interface';
import { HttpParams } from '@angular/common/http';
import { Sample } from '../models/sample.interface';

import { SearchForm } from '../models/search_form';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  apiRoot: string;
  constructor(@Inject('APP_ENVIRONMENT') private environment: AppEnvironment,
    @Inject(APP_BASE_HREF) public baseHref: string,
    private httpClient: HttpClient,
  ) {
    this.apiRoot = environment.api;
  }
  getRawSearchData(form: SearchForm, page: Number): Observable<Sample[]> {
    var params = this.createParams(form);
    params = params.set("page", String(page));

    return this.httpClient
      .get<Sample[]>(this.apiRoot + `/dashboard/search`, { params: params })
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
      .pipe(catchError(err => this._handleError(err)));
  }

  getTopBarData(form: SearchForm): Observable<number[]> {
    // let params = new HttpParams().set("start_date", form.start_date).set("end_date", form.end_date);
    return this.httpClient
      .get<number[]>(this.apiRoot + '/dashboard/tob_bar', { params: this.createParams(form)  })
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
      .pipe(catchError(err => this._handleError(err)));

  }

  getDayData(form: SearchForm): Observable<JSON> {
    return this.httpClient
      .get<JSON>(this.apiRoot + "/dashboard/day", { params: this.createParams(form) })
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
      .pipe(catchError(err => this._handleError(err)));
  }

  getWeekdayData(form: SearchForm): Observable<JSON> {
    return this.httpClient
      .get<JSON>(this.apiRoot + "/dashboard/weekday", { params: this.createParams(form) })
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
      .pipe(catchError(err => this._handleError(err)));

  }

  getHourData(form: SearchForm): Observable<JSON> {
    return this.httpClient
      .get<JSON>(this.apiRoot + "/dashboard/hour", { params: this.createParams(form) })
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
      .pipe(catchError(err => this._handleError(err)));
  }

  createParams(form: SearchForm): HttpParams {
    let params = new HttpParams()
      .set("start_date", form.start_date)
      .set("end_date", form.end_date)
      .set("student_id", form.student_id)
      .set("compute_id", form.compute_id)
      .set("location", form.location)
    return params;
  }

  private _handleError(error: ApiError): Observable<never> {
    return throwError(error.message || 'Could not complete your request; please try again later.');
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}


