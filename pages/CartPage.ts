import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.pageTitle = page.locator('.title');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async assertOnCartPage() {
    await expect(this.page).toHaveURL('/cart.html');
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  async assertItemInCart(name: string) {
    await expect(this.cartItems.locator('.inventory_item_name').getByText(name)).toBeVisible();
  }

  async removeItemByIndex(index: number) {
    await this.cartItems.locator('[data-test^="remove"]').nth(index).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
