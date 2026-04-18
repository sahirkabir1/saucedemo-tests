import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.pageTitle = page.locator('.title');
  }

  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  async addItemToCartByIndex(index: number) {
    const addButtons = this.page.locator('[data-test^="add-to-cart"]');
    await addButtons.nth(index).click();
  }

  async removeItemFromCartByIndex(index: number) {
    const removeButtons = this.page.locator('[data-test^="remove"]');
    await removeButtons.nth(index).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return this.inventoryItems.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItems
      .locator('.inventory_item_price')
      .allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }

  async getCartCount(): Promise<number> {
    const badge = await this.cartBadge.textContent();
    return badge ? parseInt(badge) : 0;
  }

  async getFirstItemName(): Promise<string> {
    return (await this.inventoryItems.first().locator('.inventory_item_name').textContent()) ?? '';
  }

  async clickItemByIndex(index: number) {
    await this.inventoryItems.nth(index).locator('.inventory_item_name').click();
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
