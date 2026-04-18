import { test, expect } from '../fixtures/pages';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../fixtures/testData';

test.describe('Authentication', () => {
  test('should log in successfully with valid credentials', { tag: '@smoke' }, async ({ loginPage }) => {
    const inventoryPage = new InventoryPage(loginPage.page);

    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await inventoryPage.assertOnInventoryPage();
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);

    await loginPage.assertErrorMessage('Sorry, this user has been locked out');
  });

  test('should show error for incorrect password', async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, 'wrong_password');

    await loginPage.assertErrorMessage('Username and password do not match');
  });

  test('should show error when username is missing', async ({ loginPage }) => {
    await loginPage.login('', USERS.standard.password);

    await loginPage.assertErrorMessage('Username is required');
  });

  test('should show error when password is missing', async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, '');

    await loginPage.assertErrorMessage('Password is required');
  });

  test('should redirect to login page after logout', async ({ loginPage }) => {
    const inventoryPage = new InventoryPage(loginPage.page);

    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.logout();

    await expect(loginPage.page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});
