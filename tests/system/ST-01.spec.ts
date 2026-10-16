import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', {
  annotation: {
    type: 'description',
    description: 'ทดสอบการสั่งซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ',
  },
}, async ({ page }) => {
  await test.step('Login และเข้าสู่ Inventory', async () => {
    // Login เข้าสู่ SauceDemo
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
  await test.step('เพิ่มสินค้า', async () => {
    // เพิ่ม Backpack และ Bike Light และตรวจสอบ Badge = 2
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
  });
  await test.step('ตรวจสอบ Cart', async () => {
    // ตรวจสอบรายการสินค้าในตะกร้า
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
  });
  await test.step('กรอก Checkout Information', async () => {
    // กรอกข้อมูลแล้วกด Continue
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('50000');
    await page.locator('[data-test="continue"]').click();
  });
  await test.step('ตรวจสอบ Overview และยืนยันคำสั่งซื้อ', async () => {
    // ตรวจสอบรายการสินค้าแล้วกด Finish
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
    await page.locator('[data-test="finish"]').click();
  });
  await test.step('ตรวจสอบ Order Complete', async () => {
    // ต้องแสดง Thank you for your order!
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
