import {_has, environment} from './environment.runtime';

declare var ENV;

describe('Environments', () => {
  it('should have default values for all the environments', () => {
    expect(environment).toBeDefined();
    expect(environment.production).toEqual(false);
    expect(environment.api).toEqual('apiRoot');
    expect(environment.title).toEqual('Research Ramp-Up Toolkit');
    expect(environment.googleAnalyticsKey).toEqual('UA-168203235-5');
  });

  it('should check if environment variables are defined', () => {
    const env = {
      production: '$PRODUCTION',
      api: '$API_URL',
      title: '$TITLE',
      googleAnalyticsKey: '$GOOGLE_ANALYTICS_KEY',
    };

    expect(_has(env, 'production', '$PRODUCTION')).toBeFalse();
    expect(_has(env, 'api', '$API_URL')).toBeFalse();
    expect(_has(env, 'title', '$TITLE')).toBeFalse();
    expect(_has(env, 'googleAnalyticsKey', '$GOOGLE_ANALYTICS_KEY')).toBeFalse();

    env.production = undefined;
    env.api = undefined;
    env.title = undefined;
    env.googleAnalyticsKey = undefined;

    expect(_has(env, 'production', '$PRODUCTION')).toBeFalse();
    expect(_has(env, 'api', '$API_URL')).toBeFalse();
    expect(_has(env, 'title', '$TITLE')).toBeFalse();
    expect(_has(env, 'googleAnalyticsKey', '$GOOGLE_ANALYTICS_KEY')).toBeFalse();

    env.production = 'something';
    env.api = 'something';
    env.title = 'something';
    env.googleAnalyticsKey = 'something';

    expect(_has(env, 'production', '$PRODUCTION')).toBeTrue();
    expect(_has(env, 'api', '$API_URL')).toBeTrue();
    expect(_has(env, 'title', '$TITLE')).toBeTrue();
    expect(_has(env, 'googleAnalyticsKey', '$GOOGLE_ANALYTICS_KEY')).toBeTrue();
  });
});
