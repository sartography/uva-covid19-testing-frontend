import {hasEnv, environment} from './environment.runtime';

declare var ENV;

describe('Environments', () => {
  it('should have default values for all the environments', () => {
    expect(environment).toBeDefined();
    expect(environment.production).toEqual(false);
    expect(environment.api).toEqual('apiRoot');
    expect(environment.title).toEqual('COVID19 Testing Kiosk');
    expect(environment.googleAnalyticsKey).toEqual('UA-168203235-5');
  });

  it('should check if environment variables are defined', () => {
    const env = {
      production: '$PRODUCTION',
      api: '$API_URL',
      title: '$TITLE',
      googleAnalyticsKey: '$GOOGLE_ANALYTICS_KEY',
    };

    expect(hasEnv(env, 'production', '$PRODUCTION')).toBeFalse();
    expect(hasEnv(env, 'api', '$API_URL')).toBeFalse();
    expect(hasEnv(env, 'title', '$TITLE')).toBeFalse();
    expect(hasEnv(env, 'googleAnalyticsKey', '$GOOGLE_ANALYTICS_KEY')).toBeFalse();

    env.production = undefined;
    env.api = undefined;
    env.title = undefined;
    env.googleAnalyticsKey = undefined;

    expect(hasEnv(env, 'production', '$PRODUCTION')).toBeFalse();
    expect(hasEnv(env, 'api', '$API_URL')).toBeFalse();
    expect(hasEnv(env, 'title', '$TITLE')).toBeFalse();
    expect(hasEnv(env, 'googleAnalyticsKey', '$GOOGLE_ANALYTICS_KEY')).toBeFalse();

    env.production = 'something';
    env.api = 'something';
    env.title = 'something';
    env.googleAnalyticsKey = 'something';

    expect(hasEnv(env, 'production', '$PRODUCTION')).toBeTrue();
    expect(hasEnv(env, 'api', '$API_URL')).toBeTrue();
    expect(hasEnv(env, 'title', '$TITLE')).toBeTrue();
    expect(hasEnv(env, 'googleAnalyticsKey', '$GOOGLE_ANALYTICS_KEY')).toBeTrue();
  });
});
