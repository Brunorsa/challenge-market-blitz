class FillInfoPage {
  constructor(page) {
    this.page = page;
  }

  async selectGender(gender) {
    await this.page.locator('div').filter({ hasText: /^Choose gender$/ }).nth(2).click();
    await this.page.getByRole('option', { name: gender }).click();
  }

  async selectTopics() {
    await this.page.locator('div').filter({ hasText: /^Choose topics$/ }).nth(2).click();
    await this.page.getByText('Sports').click();
    await this.page.getByText('Movies and TV Shows').click();
    await this.page.getByText('Music').click();
    await this.page.getByText('Others').click();
    await this.page.getByText('Humor and Jokes').click();
    await this.page.locator('div').filter({ hasText: /^Choose topics$/ }).first().click();
  }

  async selectActivities() {
    await this.page.locator('div').filter({ hasText: /^Choose activities$/ }).nth(2).click();
    await this.page.getByText('Listen to music').click();
    await this.page.getByText('Chat about anything').click();
    await this.page.getByText('Go to the cinema').click();
    await this.page.getByText('Go on a date').click();
    await this.page.locator('div').filter({ hasText: /^Choose activities$/ }).first().click();
  }

  async selectLanguages() {
    await this.page.locator('div').filter({ hasText: /^Choose your spoken languages$/ }).nth(2).click();
    await this.page.getByText('Portuguese').click();
    await this.page.locator('div').filter({ hasText: /^Choose your spoken languages$/ }).first().click();
  }

  async selectGoals() {
    await this.page.locator('div').filter({ hasText: /^Choose one answer only$/ }).nth(2).click();
    await this.page.getByText('Intimate connection').click();
  }

  async completeProfile() {
    await this.selectGender('Cis Male');
    await this.selectTopics();
    await this.selectActivities();
    await this.selectLanguages();
    await this.selectGoals();
    await this.page.getByRole('button', { name: 'Continue to Morgis' }).click();
  }
}

module.exports = FillInfoPage;