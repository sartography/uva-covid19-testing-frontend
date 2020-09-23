import {Injectable} from '@angular/core';
import {AppEnvironment} from '../interfaces/appEnvironment.interface';

@Injectable()
export class MockEnvironment implements AppEnvironment {
  production = false;
  api = 'apiRoot';
  title = 'Mock Title';
  googleAnalyticsKey = 'SOME_KEY';
}
