import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator('.inventory_details_name');
    this.itemDescription = page.locator('.inventory_details_desc');
    this.itemPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async assertOnDetailPage() {
    await expect(this.page).toHaveURL(/inventory-item\.html/);
    await expect(this.itemName).toBeVisible();
  }

  async assertItemName(name: string) {
    await expect(this.itemName).toHaveText(name);
  }

  async goBack() {
    await this.backButton.click();
  }
}
