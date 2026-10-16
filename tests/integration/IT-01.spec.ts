import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริง แล้วแทนที่หน้า Inventory ด้วย Stub ผ่าน page.setContent()',
  },
}, async ({ page }) => {
  await test.step('Login ด้วยระบบจริง', async () => {
    // Login จริงและตรวจสอบ URL inventory.html
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });
  await test.step('แทนที่หน้า Inventory ด้วย Stub', async () => {
    // ใช้ page.setContent() สร้าง Mock Inventory Ready และสินค้า 2 รายการ
    await page.setContent(`
      <main>
        <h1 data-test="stub-title">Mock Inventory Ready</h1>
        <ul data-test="stub-inventory">
          <li class="stub-item">Mock Backpack</li>
          <li class="stub-item">Mock Bike Light</li>
        </ul>
      </main>
    `);
  });
  await test.step('ตรวจสอบผลลัพธ์จาก Stub', async () => {
    // ตรวจสอบหัวข้อ จำนวนสินค้า และชื่อสินค้า
    await expect(page.locator('[data-test="stub-title"]')).toHaveText('Mock Inventory Ready');
    await expect(page.locator('.stub-item')).toHaveCount(2);
    await expect(page.locator('.stub-item')).toHaveText(['Mock Backpack', 'Mock Bike Light']);
  });
});
