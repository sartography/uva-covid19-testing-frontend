import { TestBed } from '@angular/core/testing';

import { DevHeaderInterceptorInterceptor } from './dev-header-interceptor.interceptor';

describe('DevHeaderInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DevHeaderInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DevHeaderInterceptorInterceptor = TestBed.inject(DevHeaderInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
