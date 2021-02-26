import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment.runtime';

@Injectable()
export class DevHeaderInterceptorInterceptor implements HttpInterceptor {
  // This adds a uid header to all requests in development mode to mimic the data that is added
  // automatically by the shibboleth single-sign-on service that the production system sits behind.

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone the request to add the new header
    if (!environment.production) {
      const clonedRequest = request.clone({ headers: request.headers.append('X-Remote-Uid', 'devuser') });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
