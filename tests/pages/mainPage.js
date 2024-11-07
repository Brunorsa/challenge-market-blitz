const { expect } = require('@playwright/test');

class MainPage {
  constructor(page) {
    this.page = page;
    this.navigationToggle = page.getByLabel('Toggle navigation').first();
    this.languageIcon = page.locator('.arrowIcon-0-3-24');
    this.joinGuestLink = page.getByRole('link', { name: 'Join as a Guest' });
  }

  async goToHomePage(url) {
    await this.page.goto(url);
  }

  async openNavigationMenu() {
    await this.navigationToggle.click();
  }

  async changeLanguageToEnglish() {
    await this.languageIcon.click();
    await this.page.locator('p').filter({ hasText: 'EN' }).nth(0).click();
  }

  async goToGuestRegistration() {
    await this.joinGuestLink.click();
  }
}

module.exports = MainPage;