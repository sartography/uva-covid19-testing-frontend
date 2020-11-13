import {HttpClient} from 'protractor-http-client';
import {AppPage} from './app.po';

describe('COVID19 Testing Kiosk App', () => {
  let page: AppPage;
  let http: HttpClient;

  beforeEach(() => {
    page = new AppPage();
    http = new HttpClient('http://localhost:5001');
  });

  it('should automatically sign-in and redirect to sample input screen', () => {
    page.navigateTo();
    expect(page.getRoute()).toEqual('/');

  });

  it('should navigate to settings screen', () => {
    page.clickAndExpectRoute('#nav_settings', '/settings');
  });

  it('should navigate to home screen', () => {
    page.clickAndExpectRoute('#nav_home', '/');
  });

  it('should navigate back to sample input screen', () => {
    page.clickAndExpectRoute('#nav_home', '/');
  });
});
