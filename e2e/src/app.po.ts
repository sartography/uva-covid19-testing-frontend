import {browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions} from 'protractor';

export class AppPage {
  browser = browser;

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  async clickAndExpectRoute(clickSelector: string, expectedRoute: string | RegExp) {
    await this.waitForClickable(clickSelector);
    await this.clickElement(clickSelector);

    if (typeof expectedRoute === 'string') {
      await expect(this.getRoute()).toEqual(expectedRoute);
    } else {
      const actualRoute = await this.getRoute();
      await expect(actualRoute).toMatch(expectedRoute);
    }
  }

  clickElement(selector: string) {
    this.waitForClickable(selector);
    this.scrollTo(selector);
    this.focus(selector);
    return this.getElement(selector).click();
  }

  closeTab() {
    return browser.close();
  }

  focus(selector: string) {
    return browser.controlFlow().execute(() => {
      return browser.executeScript('arguments[0].focus()', this.getElement(selector).getWebElement());
    });
  }

  getElement(selector: string): ElementFinder {
    return element.all(by.css(selector)).first();
  }

  getElements(selector: string): ElementArrayFinder {
    return element.all(by.css(selector));
  }

  getLocalStorageVar(name: string) {
    return browser.executeScript(`return window.localStorage.getItem('${name}');`);
  }

  getNumTabs() {
    return browser.getAllWindowHandles().then(wh => {
      return wh.length;
    });
  }

  async getRoute() {
    const url = await this.getUrl();
    return '/' + url.split(browser.baseUrl)[1];
  }

  getText(selector: string) {
    return element(by.css(selector)).getText() as Promise<string>;
  }

  async getUrl(): Promise<string> {
    return await browser.executeScript('return location.href') as string;
  }

  scrollTo(selector: string) {
    browser.controlFlow().execute(() => {
      browser.executeScript('arguments[0].scrollIntoView(false)', this.getElement(selector).getWebElement());
    });
  }

  setLocalStorageVar(name: string, value: string) {
    return browser.executeScript(`return window.localStorage.setItem('${name}','${value}');`);
  }

  switchFocusToTab(tabIndex: number) {
    return browser.getAllWindowHandles().then(wh => {
      return wh.forEach((h, i) => {
        if (i === tabIndex) {
          return browser.switchTo().window(h);
        }
      });
    });
  }

  waitFor(t: number) {
    return browser.sleep(t);
  }

  waitForAngularEnabled(enabled: boolean) {
    return browser.waitForAngularEnabled(enabled);
  }

  waitForClickable(selector: string) {
    const e = this.getElement(selector);
    return browser.wait(ExpectedConditions.elementToBeClickable(e), 5000);
  }

  // Waits up to 5 seconds for the element to become invisible.
  waitForNotVisible(selector: string) {
    return browser.wait(
      ExpectedConditions.invisibilityOf(this.getElement(selector)),
      5000,
      `Element "${selector}" is still visible after waiting for 5 seconds.`
    );
  }

  // Waits up to 5 seconds for the element to become present.
  waitForPresent(selector: string) {
    return browser.wait(
      ExpectedConditions.presenceOf(this.getElement(selector)),
      5000,
      `Element "${selector}" is still not present after waiting for 5 seconds.`
    );
  }

  // Waits up to 5 seconds for the element to become visible.
  waitForVisible(selector: string) {
    this.waitForAngularEnabled(false);
    return browser.wait(
      ExpectedConditions.visibilityOf(element(by.css(selector))),
      5000,
      `Element "${selector}" is still not visible after waiting for 5 seconds.`
    );
  }

  async inputText(selector: string, textToEnter: string, clearFirst?: boolean) {
    expect(this.getElements(selector).count()).toEqual(1);
    const field = this.getElement(selector);
    // await this.waitForAngularEnabled(true);
    await this.waitForVisible(selector);

    if (clearFirst) {
      await field.clear();
      await expect(field.getAttribute('value')).toEqual('');
    }

    await field.sendKeys(textToEnter);
    await expect(field.getAttribute('value')).toEqual(textToEnter);
  }

}
