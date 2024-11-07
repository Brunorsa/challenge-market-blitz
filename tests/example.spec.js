const { test, expect } = require('@playwright/test');
const MainPage = require('../tests/pages/mainPage')
const RegisterPage = require('../tests/pages/registerPage')
const EmailVerificationPage = require('../tests/pages/emailVerificationPage')
const DeletePage = require('../tests/pages/deletePage')
// const FillInfoPage = require('../tests/pages/fillInfoPage')

const environment = "https://morgis.com";
test.setTimeout(60000);

test.describe('Register new Guest', () => {
  test('Should register, login and verify subtitle', async ({ page, context }) => {

    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const myuser = `testesevaisagora${randomNumber}`;
    const myuserEmail = `${myuser}@tuamaeaquelaursa.com`;

    const homePage = new MainPage(page);
    const registrationPage = new RegisterPage(page);
    let morgisPage;

    await test.step('Given I am on the "Join as a Guest" page', async () => {
      await homePage.goToHomePage(environment);
      await homePage.openNavigationMenu();
      await homePage.changeLanguageToEnglish();
      await homePage.goToGuestRegistration();
    });

    await test.step('When I fill out the registration form', async () => {
      await registrationPage.continueWithEmail();
      await registrationPage.fillEmail(myuserEmail);

      const emailPage = await context.newPage();
      await emailPage.goto(`https://www.tuamaeaquelaursa.com/${myuser}`);

      await registrationPage.verifyEmail();

      const emailVerificationPage = new EmailVerificationPage(emailPage);
      await emailVerificationPage.verifyAccount();

      morgisPage = await emailPage.waitForEvent('popup');

      const profilePage = new RegisterPage(morgisPage);
      await profilePage.completeProfile();
    });

    await test.step('Then I should see the correct subtitle', async () => {
      await morgisPage.waitForLoadState('load');
      await expect(morgisPage.getByRole('button', { name: 'Guest' })).toBeVisible();
    });

    await test.step('And I delete the guest user', async () => {
      const accountPage = new DeletePage(morgisPage);
      await accountPage.deleteAccount();
    });
  });
});