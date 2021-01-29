import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ApiError } from '../models/apiError.interface';
import { AppEnvironment } from '../models/appEnvironment.interface';
import { Sample } from '../models/sample.interface';
import { InventoryDeposit } from '../models/deposit.interface';
import { IvyFile } from '../models/ivyfile.interface';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiRoot: string;
  endpoints = {
    sample: '/sample',
    deposit: '/deposit',
    ivy_file: '/ivy_file',
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
      .get(url, { responseType: 'text' })
      .pipe(catchError(err => this._handleError(err)));
  }

  /**  */
  getDeposits(page: Number): Observable<InventoryDeposit[]> {
    let param = new HttpParams().set("page", String(page));

    const url = this.apiRoot + this.endpoints.deposit;
    return this.httpClient
      .get<InventoryDeposit[]>(url, { params: param })
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
      .pipe(catchError(err => this._handleError(err)));
  }

  /**  */
  addDeposit(deposit: InventoryDeposit): Observable<InventoryDeposit> {
    const url = this.apiRoot + this.endpoints.deposit;
    return this.httpClient
      .post<InventoryDeposit>(url, deposit)
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
      .pipe(catchError(err => this._handleError(err)));
  }


  /**  */
  getFilesInfo(page: Number): Observable<Array<Array<any>>> {
    let params = new HttpParams().set("page", String(page));
    const url = this.apiRoot + this.endpoints.ivy_file;
    return this.httpClient
      .get<Array<Array<any>>>(url, { params: params })
      .pipe(timeout(1000), catchError(err => this._handleError(err)))
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
