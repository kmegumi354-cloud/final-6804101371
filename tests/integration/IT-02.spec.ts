import { test, expect, type Browser, type BrowserContext, type Page } from '@playwright/test';

// Driver: สร้างสถานะ Login ด้วย Cookie แทนการใช้ Login Form จริง
async function driverOpenInventory(browser: Browser): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext({ baseURL: 'https://www.saucedemo.com' });
  await context.addCookies([
    { name: 'session-username', value: 'standard_user', domain: 'www.saucedemo.com', path: '/' },
  ]);
  const page = await context.newPage();
  await page.goto('/inventory.html');
  return { context, page };
}

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver จำลองสถานะ Login แล้วทดสอบหน้า Inventory และ Cart จริง',
  },
}, async ({ browser }) => {
  const { context, page } = await driverOpenInventory(browser);
  try {
    await test.step('ใช้ Driver เปิดหน้า Inventory', async () => {
      // สร้าง BrowserContext และใช้ driverOpenInventory() ตั้งค่า Cookie
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('[data-test="login-button"]')).toHaveCount(0);
    });
    await test.step('ตรวจสอบหน้า Inventory จริง', async () => {
      // ต้องมีสินค้า 6 รายการ
      await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    });
    await test.step('เพิ่มสินค้า 2 รายการ', async () => {
      // เพิ่ม Backpack และ Bike Light แล้ว Cart Badge = 2
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    });
    await test.step('ตรวจสอบ Cart', async () => {
      // เปิด Cart และตรวจสอบรายการสินค้า
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/cart\.html/);
      await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
      ]);
    });
  } finally {
    // ปิด BrowserContext หลังทดสอบเสร็จ
    await context.close();
  }
});
