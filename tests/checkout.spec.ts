import { test, expect } from '../fixtures/pages';
import { SHIPPING } from '../fixtures/testData';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.cartLink.click();
    await cartPage.assertOnCartPage();
    await cartPage.proceedToCheckout();
  });

  test('should complete checkout end-to-end', { tag: '@smoke' }, async ({ page, checkoutPage }) => {
    await expect(page).toHaveURL('/checkout-step-one.html');

    await checkoutPage.fillShippingInfo(
      SHIPPING.valid.firstName,
      SHIPPING.valid.lastName,
      SHIPPING.valid.postalCode
    );

    await expect(page).toHaveURL('/checkout-step-two.html');

    await checkoutPage.finish();

    await checkoutPage.assertOrderConfirmed();
  });

  test('should show error when first name is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillShippingInfo('', SHIPPING.valid.lastName, SHIPPING.valid.postalCode);

    await checkoutPage.assertErrorMessage('First Name is required');
  });

  test('should show error when last name is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillShippingInfo(SHIPPING.valid.firstName, '', SHIPPING.valid.postalCode);

    await checkoutPage.assertErrorMessage('Last Name is required');
  });

  test('should show error when postal code is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillShippingInfo(SHIPPING.valid.firstName, SHIPPING.valid.lastName, '');

    await checkoutPage.assertErrorMessage('Postal Code is required');
  });

  test('should display correct item total on order summary', async ({ checkoutPage }) => {
    await checkoutPage.fillShippingInfo(
      SHIPPING.valid.firstName,
      SHIPPING.valid.lastName,
      SHIPPING.valid.postalCode
    );

    const subtotal = await checkoutPage.getItemSubtotal();
    const total = await checkoutPage.getTotalPrice();

    expect(subtotal).toBeGreaterThan(0);
    expect(total).toBeGreaterThan(subtotal); // total includes tax
  });
});
