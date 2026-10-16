import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบการเปลี่ยนสถานะปุ่ม Add to cart และ Remove รวมถึง Cart Badge',
  },
}, async ({ page }) => {
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

  await test.step('Login เข้าสู่ระบบ', async () => {
    // Login และตรวจสอบว่าอยู่หน้า Inventory
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });
  await test.step('ตรวจสอบสถานะเริ่มต้นของปุ่ม', async () => {
    // ปุ่มของ Backpack ต้องเป็น Add to cart
    await expect(addButton).toHaveText('Add to cart');
    await expect(cartBadge).toHaveCount(0);
  });
  await test.step('เพิ่มสินค้าลง Cart', async () => {
    // กดแล้วปุ่มต้องเป็น Remove และ Cart Badge = 1
    await addButton.click();
    await expect(removeButton).toHaveText('Remove');
    await expect(cartBadge).toHaveText('1');
  });
  await test.step('นำสินค้าออกจาก Cart', async () => {
    // กด Remove แล้วปุ่มต้องกลับเป็น Add to cart และ Cart Badge หายไป
    await removeButton.click();
    await expect(addButton).toHaveText('Add to cart');
    await expect(cartBadge).toHaveCount(0);
  });
});
