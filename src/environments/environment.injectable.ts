import {Injectable} from '@angular/core';
import {AppEnvironment} from '../app/interfaces/appEnvironment.interface';
import {environment} from './environment.runtime';

@Injectable()
export class ThisEnvironment implements AppEnvironment {
  production = environment.production;
  api = environment.api;
  title = environment.title;
  googleAnalyticsKey = environment.googleAnalyticsKey;
}
