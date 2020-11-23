import {browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions, protractor} from 'protractor';

export class AppPage {
  browser = browser;

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  clickAndExpectRoute(clickSelector: string, expectedRoute: string | RegExp) {
    this.waitForClickable(clickSelector);
    this.clickElement(clickSelector);
    if (typeof expectedRoute === 'string') {
      expect(this.getRoute()).toEqual(expectedRoute);
    } else {
      expect(this.getRoute()).toMatch(expectedRoute);
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

  getUrl() {
    return browser.getCurrentUrl();
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
        if (i === tabIndex) { return browser.switchTo().window(h); }
      });
    });
  }

  async switchFocusToPrintDialog() {
    const browserWindowHandles = await browser.getAllWindowHandles();
    console.log('browserWindowHandles', browserWindowHandles);

    const driver = browser.driver;
    const windowHandles = await driver.getAllWindowHandles();
    console.log('windowHandles', windowHandles);
    return driver.switchTo().window(windowHandles[0]);
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

  waitForNotVisible(selector: string) {
    const e = this.getElement(selector);
    return browser.wait(ExpectedConditions.invisibilityOf(e), 5000);
  }


  // If given CSS selector is found on the page, waits 5 seconds for the element to become visible. If it's not found
  // on the page, recursively calls itself maxLoops number of times, waiting 1 second between each call, until the
  // element becomes present.
  async waitForVisible(selector: string, maxLoops = 5) {
    const numElements = await this.getElements(selector).count();
    if (numElements > 0) {
      const e = await this.getElement(selector);
      return browser.wait(
        ExpectedConditions.visibilityOf(e),
        5000,
        `Element "${selector}" is still not visible after waiting for 5 seconds.`
      );
    } else if (maxLoops > 0) {
      await this.waitFor(1000);
      await this.waitForVisible(selector, maxLoops - 1);
    } else {
      expect(numElements).toBeGreaterThan(0, `Element "${selector}" is not present on the page.`);
    }
  }

  inputText(selector: string, textToEnter: string, clearFirst?: boolean) {
    expect(this.getElements(selector).count()).toEqual(1);
    const field = this.getElement(selector);
    this.waitForAngularEnabled(true);
    this.waitForVisible(selector, 100);

    if (clearFirst) {
      field.clear();
      expect(field.getAttribute('value')).toEqual('');
    }

    field.sendKeys(textToEnter);
    expect(field.getAttribute('value')).toEqual(textToEnter);
  }

  async pressTabKey100Times() {
    for (let i = 0; i < 100; i++) {
      await browser.actions().sendKeys(protractor.Key.TAB).perform();
    }
  }
}
