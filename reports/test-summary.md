# Test Summary – Final Exam (Playwright)

- **Student ID:** 6804101371
- **Target:** https://www.saucedemo.com/
- **Tool:** Playwright Test (TypeScript), Chromium (Desktop Chrome)
- **Run date:** 2026-10-16
- **Total:** 8 tests – **8 Passed**, 0 Failed, 0 Skipped (≈ 6.6 s)

| ID | Test Case | Type | Expected Result | Status | Duration |
| --- | --- | --- | --- | --- | --- |
| UT-01.1 | empty username and password | Unit / UI Component | แสดง `Username is required` และไม่เข้าหน้า Inventory | Passed | 0.59 s |
| UT-01.2 | missing password | Unit / UI Component | แสดง `Password is required` และไม่เข้าหน้า Inventory | Passed | 0.58 s |
| UT-01.3 | invalid login details | Unit / UI Component | แสดงข้อความ Username/Password ไม่ตรงกัน และไม่เข้าหน้า Inventory | Passed | 0.74 s |
| UT-02 | product button state Add to cart -> Remove -> Add to cart | Unit / UI Component | ปุ่มเปลี่ยนเป็น Remove, Badge = 1, แล้วกลับเป็น Add to cart และ Badge หายไป | Passed | 0.70 s |
| IT-01 | top-down REAL Login -> browser-level Inventory STUB | Integration (Top-Down + Stub) | Login จริงสำเร็จ, Stub แสดง `Mock Inventory Ready` และสินค้า 2 รายการ | Passed | 0.80 s |
| IT-02 | DRIVER login state -> REAL Inventory and Cart | Integration (Bottom-Up + Driver) | เข้าหน้า Inventory ผ่าน Driver, สินค้า 6 รายการ, Badge = 2, Cart มีสินค้าครบ | Passed | 0.70 s |
| ST-01 | complete purchase of two products | System | สั่งซื้อสำเร็จ แสดง `Thank you for your order!` | Passed | 0.94 s |
| ST-02 | checkout validation and recovery | System | แสดง Error ของ First Name / Last Name / Postal Code ตามลำดับ แล้วสั่งซื้อสำเร็จ | Passed | 0.99 s |

## Reports

- HTML Report: `playwright-report/index.html` (เปิดด้วย `npx playwright show-report`)
- JSON Report: `reports/results.json`
