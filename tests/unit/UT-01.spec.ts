import { test, expect } from '@playwright/test';

test.describe('UT-01: Login Form Validation', () => {
  test('UT-01.1: empty username and password', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login โดยไม่กรอก Username และ Password' },
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login', async () => {
      // เปิดเว็บไซต์ SauceDemo
      await page.goto('/');
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });
    await test.step('ไม่กรอกข้อมูลแล้วกด Login', async () => {
      // กดปุ่ม Login โดยไม่กรอกข้อมูล
      await page.locator('[data-test="login-button"]').click();
    });
    await test.step('ตรวจสอบข้อความ Error และ URL', async () => {
      // ต้องแสดง Username is required และไม่เข้าสู่หน้า Inventory
      await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  });

  test('UT-01.2: missing password', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อกรอก Username แต่ไม่กรอก Password' },
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login และกรอก Username', async () => {
      // กรอก standard_user
      await page.goto('/');
      await page.locator('[data-test="username"]').fill('standard_user');
    });
    await test.step('กด Login โดยไม่กรอก Password', async () => {
      // กดปุ่ม Login
      await page.locator('[data-test="login-button"]').click();
    });
    await test.step('ตรวจสอบข้อความ Error และ URL', async () => {
      // ต้องแสดง Password is required และไม่เข้าสู่หน้า Inventory
      await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  });

  test('UT-01.3: invalid login details', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login ด้วย Username และ Password ที่ไม่ถูกต้อง' },
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login และกรอกข้อมูลผิด', async () => {
      // กรอก invalid_user / wrong_password
      await page.goto('/');
      await page.locator('[data-test="username"]').fill('invalid_user');
      await page.locator('[data-test="password"]').fill('wrong_password');
    });
    await test.step('กด Login', async () => {
      // กดปุ่ม Login
      await page.locator('[data-test="login-button"]').click();
    });
    await test.step('ตรวจสอบข้อความ Error และ URL', async () => {
      // ต้องแสดงข้อความว่า Username/Password ไม่ตรงกัน และไม่เข้าสู่หน้า Inventory
      await expect(page.locator('[data-test="error"]')).toContainText(
        'Username and password do not match any user in this service',
      );
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  });
});
