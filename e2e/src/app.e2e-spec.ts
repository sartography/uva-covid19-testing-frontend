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

  it('should navigate back to sample input screen', () => {
    page.clickAndExpectRoute('#nav_home', '/');
  });

  it('should return to settings screen', async () => {
    page.clickAndExpectRoute('#nav_settings', '/settings');
  });

  it('should change location', () => {
    page.inputText('.location-input input', '9999', true);
  });

  it('should change label layout', async () => {
    const dropdownSelector = 'mat-select-trigger.selected-label-layout';
    const optionSelector = '.mat-select-panel .mat-option:nth-child(3) .label-layout-name';
    page.waitForVisible(dropdownSelector);

    const selectedTextBefore = await page.getElement(dropdownSelector).getText();
    page.clickElement(dropdownSelector);
    page.waitForVisible(optionSelector);

    const optionText = await page.getElement(optionSelector).getText();
    expect(selectedTextBefore).not.toEqual(optionText);

    page.clickElement(optionSelector);
    const selectedText = await page.getElement(dropdownSelector).getText();
    expect(selectedText).toEqual(optionText);
  });

  it('should save settings changes', async () => {
    const locSelector = '.location-input input';
    const dropdownSelector = 'mat-select-trigger.selected-label-layout';
    const locIdBefore = await page.getElement(locSelector).getAttribute('value');
    const layoutBefore = await page.getElement(dropdownSelector).getText();

    await page.clickAndExpectRoute('#btn_save', '/');
    const navLocation = await page.getElement('#nav_location').getText();
    expect(navLocation).toContain(locIdBefore);

    await page.clickAndExpectRoute('#nav_settings', '/settings');
    await page.waitForVisible(locSelector);
    await page.waitForVisible(dropdownSelector);
    const locIdAfter = await page.getElement(locSelector).getAttribute('value');
    expect(locIdBefore).toEqual(locIdAfter);
    const layoutAfter = await page.getElement(dropdownSelector).getText();
    expect(layoutBefore).toEqual(layoutAfter);

    await page.clickAndExpectRoute('#btn_save', '/');
  });

  it('should enter a sample', async () => {
    const studentId = '987654321';
    const computingId = 'ABC123';
    const idFieldSelector = '.cardnum-input input';
    const initialsFieldSelector = '.initials-input input';

    await page.inputText(idFieldSelector, studentId);
    await page.inputText(initialsFieldSelector, computingId);
    await page.clickAndExpectRoute('#btn_next', /print/);
    await page.waitForVisible('#btn_print');
    const labelText = await page.getElement('app-print-layout').getText();
    expect(labelText).toContain(studentId);
    expect(labelText).toContain(computingId);
  });
});
