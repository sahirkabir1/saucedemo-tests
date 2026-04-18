import { test, expect } from '../fixtures/pages';
import { ProductDetailPage } from '../pages/ProductDetailPage';

test.describe('Product Inventory', () => {
  test('should display all 6 products', { tag: '@smoke' }, async ({ inventoryPage }) => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('should sort products A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');

    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('should sort products Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');

    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('should sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');

    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('should navigate to product detail page', async ({ inventoryPage }) => {
    const firstItemName = await inventoryPage.getFirstItemName();
    await inventoryPage.clickItemByIndex(0);

    const detailPage = new ProductDetailPage(inventoryPage.page);
    await detailPage.assertOnDetailPage();
    await detailPage.assertItemName(firstItemName);
  });
});
