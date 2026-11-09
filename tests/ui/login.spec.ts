import 'dotenv/config';
import { expect, test } from '../../src/fixtures/test';

test('user logs in with demo credentials', async ({ loginPage, page }) => {
  const email = process.env.DEMO_USER_EMAIL;
  const password = process.env.DEMO_USER_PASSWORD;

  if (!email || !password) {
    throw new Error('Set DEMO_USER_EMAIL and DEMO_USER_PASSWORD in the local .env file.');
  }

  await loginPage.open();
  await loginPage.login(email, password);

  await expect(page).toHaveURL(/\/account$/);
  await expect(page).toHaveTitle(/Overview/);
});
