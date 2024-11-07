const { expect } = require('@playwright/test');

class DeletePage {
  constructor(page) {
    this.page = page;
  }

  async deleteAccount() {
    await this.page.waitForTimeout(1000);
    await this.page.locator('svg').first().click();
    await this.page.waitForSelector('text=Account', { timeout: 10000 });
    await this.page.getByText('Account', { exact: true }).click();
    await this.page.getByRole('link', { name: 'Delete my account' }).click();
    await this.page.getByText('Delete My Account', { exact: true }).click();
    await this.page.getByText('Yes, Delete My Account').click();
    await this.page.waitForTimeout(1000);
    const isVisible = await this.page.locator('div').filter({ hasText: /^Email\*$/ }).locator('div').isVisible();
    if (isVisible) {
      console.log('User deleted successfully');
    } else {
      throw new Error('Failed to delete user');
    }
  }
}

module.exports = DeletePage;