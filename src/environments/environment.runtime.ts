import {AppEnvironment} from '../app/models/appEnvironment.interface';

declare var ENV;

export const hasEnv = (env, key, temp): boolean => env && ![null, undefined, temp, ''].includes(env[key]);

export const environment: AppEnvironment = {
  production: hasEnv(ENV, 'production', '$PRODUCTION') ? (ENV.production === 'true') : false,
  api: hasEnv(ENV, 'api', '$API_URL') ? ENV.api : 'http://localhost:5000/v1.0',
  title: hasEnv(ENV, 'title', '$TITLE') ? ENV.title : 'COVID19 Testing Kiosk',
  googleAnalyticsKey: hasEnv(ENV, 'googleAnalyticsKey', '$GOOGLE_ANALYTICS_KEY') ? ENV.googleAnalyticsKey : 'UA-168203235-5',
};
