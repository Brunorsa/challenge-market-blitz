class EmailVerificationPage {
  constructor(page) {
    this.page = page;
  }

  async verifyAccount() {
    await this.page.getByText("Activate your Morgis' account!").click();
    await this.page.getByRole('link', { name: 'Verify your email' }).click();
  }
}

module.exports = EmailVerificationPage;