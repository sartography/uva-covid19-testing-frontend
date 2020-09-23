import {HttpClient} from 'protractor-http-client';
import {AppPage} from './app.po';

describe('COVID19 Testing Kiosk App', () => {
  let page: AppPage;
  let http: HttpClient;

  beforeEach(() => {
    page = new AppPage();
    http = new HttpClient('http://localhost:5001');
  });

  it('should automatically sign-in and redirect to home screen', () => {
    page.navigateTo();
    expect(page.getRoute()).toEqual('/');
  });

  it('should navigate to settings screen', () => {
    page.clickAndExpectRoute('#nav_settings', '/settings');
  });

  it('should navigate to home screen', () => {
    page.clickAndExpectRoute('#nav_home', '/');
  });

  it('should navigate to occupancy count input screen', () => {
    page.clickAndExpectRoute('#nav_count', '/count');
  });

  it('should navigate back to home screen', () => {
    page.clickAndExpectRoute('#nav_home', '/');
  });

  it('should navigate to sample input screen', () => {
    page.clickAndExpectRoute('#nav_sample', '/sample');
  });
});
