# Final Exam – Software Testing with Playwright

ทดสอบเว็บไซต์ https://www.saucedemo.com/ ด้วย Playwright Test (TypeScript)

## วิธีรัน

```bash
npm install
npx playwright install chromium
npx playwright test
npx playwright show-report
```

ผลการทดสอบจะอยู่ที่ `playwright-report/index.html` (HTML) และ `reports/results.json` (JSON)

## โครงสร้าง Test Cases

| ส่วน | ไฟล์ | Test Case |
| --- | --- | --- |
| Unit / UI Component | `tests/unit/UT-01.spec.ts` | Login Form Validation (UT-01.1 – UT-01.3) |
| Unit / UI Component | `tests/unit/UT-02.spec.ts` | Product Button State Validation |
| Integration (Top-Down) | `tests/integration/IT-01.spec.ts` | Real Login -> Inventory Stub |
| Integration (Bottom-Up) | `tests/integration/IT-02.spec.ts` | Driver login state -> Real Inventory and Cart |
| System | `tests/system/ST-01.spec.ts` | Complete Purchase Flow |
| System | `tests/system/ST-02.spec.ts` | Checkout Validation and Recovery |

## Integration Testing: ส่วนที่เป็น Real / Stub / Driver

### IT-01: Top-Down Integration Testing with Stub

- **Real:** หน้า Login ของ SauceDemo (กรอก `standard_user` / `secret_sauce` และตรวจสอบว่าไปที่ `inventory.html` จริง)
- **Stub:** หน้า Inventory ถูกแทนที่ด้วย HTML จำลองผ่าน `page.setContent()` แสดงหัวข้อ `Mock Inventory Ready` และสินค้า 2 รายการ (`Mock Backpack`, `Mock Bike Light`)
- Stub นี้เป็น Stub ระดับ Browser (แทนที่ DOM) ไม่ได้แทนที่ Internal Module ของ SauceDemo

### IT-02: Bottom-Up Integration Testing with Driver

- **Driver:** ฟังก์ชัน `driverOpenInventory()` สร้าง `BrowserContext` ใหม่ และใช้ `BrowserContext.addCookies()` ตั้ง Cookie `session-username=standard_user` สำหรับ `www.saucedemo.com` แล้วเปิด `inventory.html` โดยตรง แทนการผ่าน Login Form
- **Real:** หน้า Inventory (สินค้า 6 รายการ), การเพิ่มสินค้าลงตะกร้า, Cart Badge และหน้า Shopping Cart
