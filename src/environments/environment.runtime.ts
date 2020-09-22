import {AppEnvironment} from '../app/interfaces/appEnvironment.interface';

declare var ENV;

export const _has = (env, key, temp): boolean => env && ![null, undefined, temp, ''].includes(env[key]);

export const environment: AppEnvironment = {
  production: _has(ENV, 'production', '$PRODUCTION') ? (ENV.production === 'true') : false,
  api: _has(ENV, 'api', '$API_URL') ? ENV.api : 'http://localhost:5000/v1.0',
  title: _has(ENV, 'title', '$TITLE') ? ENV.title : 'COVID19 Testing Kiosk',
  googleAnalyticsKey: _has(ENV, 'googleAnalyticsKey', '$GOOGLE_ANALYTICS_KEY') ? ENV.googleAnalyticsKey : 'UA-168203235-5',
};
