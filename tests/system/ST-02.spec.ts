import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ',
  },
}, async ({ page }) => {
  const error = page.locator('[data-test="error"]');
  const continueButton = page.locator('[data-test="continue"]');

  await test.step('Login เพิ่มสินค้า และไปหน้า Checkout', async () => {
    // เข้าสู่หน้า Checkout Information
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
  await test.step('ตรวจสอบ First Name is required', async () => {
    // กด Continue โดยไม่กรอกข้อมูลแล้วตรวจสอบ Error
    await continueButton.click();
    await expect(error).toContainText('First Name is required');
  });
  await test.step('ตรวจสอบ Last Name is required', async () => {
    // กรอก First Name แล้วตรวจสอบ Error
    await page.locator('[data-test="firstName"]').fill('John');
    await continueButton.click();
    await expect(error).toContainText('Last Name is required');
  });
  await test.step('ตรวจสอบ Postal Code is required', async () => {
    // กรอก Last Name แล้วตรวจสอบ Error
    await page.locator('[data-test="lastName"]').fill('Doe');
    await continueButton.click();
    await expect(error).toContainText('Postal Code is required');
  });
  await test.step('แก้ไขข้อมูลและสั่งซื้อให้สำเร็จ', async () => {
    // กรอก Postal Code, ตรวจสอบ Overview, กด Finish
    await page.locator('[data-test="postalCode"]').fill('50000');
    await continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
