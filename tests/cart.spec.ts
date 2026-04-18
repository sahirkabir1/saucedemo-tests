import { test, expect } from '../fixtures/pages';

test.describe('Shopping Cart', () => {
  test('should add a single item to cart', { tag: '@smoke' }, async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByIndex(0);

    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
  });

  test('should add multiple items to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.addItemToCartByIndex(2);

    const count = await inventoryPage.getCartCount();
    expect(count).toBe(3);
  });

  test('should reflect correct item in cart page', async ({ inventoryPage, cartPage }) => {
    const firstName = await inventoryPage.getFirstItemName();

    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.cartLink.click();

    await cartPage.assertOnCartPage();
    await cartPage.assertItemInCart(firstName);
  });

  test('should remove item from cart via inventory button', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.removeItemFromCartByIndex(0);

    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('should remove item from cart via cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.cartLink.click();
    await cartPage.assertOnCartPage();

    await cartPage.removeItemByIndex(0);

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });

  test('cart should persist across navigation', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);

    await inventoryPage.cartLink.click();
    await cartPage.assertOnCartPage();

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
  });
});
