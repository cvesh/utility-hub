import { test, expect } from '@playwright/test';

test.describe('JSON Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/json-formatter');
  });

  test('should load the JSON formatter page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('JSON Formatter');
  });

  test('should format valid JSON', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('{"name":"John","age":30}');
    await page.locator('main button', { hasText: 'Format' }).first().click();
    const output = page.locator('main textarea').nth(1);
    const value = await output.inputValue();
    expect(value).toContain('"name": "John"');
    expect(value).toContain('"age": 30');
  });

  test('should minify JSON', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('{\n  "name": "John",\n  "age": 30\n}');
    await page.locator('main button', { hasText: 'Minify' }).first().click();
    const output = page.locator('main textarea').nth(1);
    const value = await output.inputValue();
    expect(value).toBe('{"name":"John","age":30}');
  });

  test('should show error for invalid JSON', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('{invalid json}');
    await page.locator('main button', { hasText: 'Format' }).first().click();
    await expect(page.locator('main', { hasText: 'Invalid' })).toBeVisible();
  });

  test('should validate valid JSON', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('{"valid": true}');
    await page.locator('main button', { hasText: 'Validate' }).first().click();
    await expect(page.locator('main', { hasText: 'Valid JSON' })).toBeVisible();
  });
});

test.describe('JWT Decoder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/jwt-decoder');
  });

  test('should load the JWT decoder page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('JWT Decoder');
  });

  test('should decode a valid JWT token', async ({ page }) => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill(jwt);
    await page.locator('main button', { hasText: 'Decode Token' }).first().click();
    await expect(page.locator('main', { hasText: 'Header' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Payload' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Signature' })).toBeVisible();
  });

  test('should show error for invalid JWT', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('not-a-jwt');
    await page.locator('main button', { hasText: 'Decode Token' }).first().click();
    await expect(page.locator('main', { hasText: 'Invalid JWT token' })).toBeVisible();
  });
});

test.describe('UUID Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/uuid-generator');
  });

  test('should load the UUID generator page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('UUID Generator');
  });

  test('should generate UUIDs', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Generate' }).first()).toBeVisible();
    await page.locator('main button', { hasText: 'Generate' }).first().click();
    const codes = page.locator('main code');
    await expect(codes.first()).toBeVisible();
    const uuid = await codes.first().textContent();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  test('should generate specified number of UUIDs', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Generate' }).first()).toBeVisible();
    const countInput = page.locator('main input[type="number"]').first();
    await countInput.fill('3');
    await page.locator('main button', { hasText: 'Generate' }).first().click();
    const codes = page.locator('main code');
    await expect(codes).toHaveCount(3);
  });
});

test.describe('Base64 Encoder/Decoder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/base64-encoder-decoder');
  });

  test('should load the base64 tool page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Base64');
  });

  test('should encode text to Base64', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('Hello World');
    await page.locator('main button', { hasText: 'Encode to Base64' }).first().click();
    const output = page.locator('main textarea').nth(1);
    await expect(output).toHaveValue('SGVsbG8gV29ybGQ=');
  });

  test('should decode Base64 to text', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Decode' }).first()).toBeVisible();
    await page.locator('main button', { hasText: 'Decode' }).first().click();
    await page.locator('main textarea').first().fill('SGVsbG8gV29ybGQ=');
    await page.locator('main button', { hasText: 'Decode from Base64' }).first().click();
    const output = page.locator('main textarea').nth(1);
    await expect(output).toHaveValue('Hello World');
  });

  test('should switch between encode and decode modes', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Encode' }).first()).toBeVisible();
    await expect(page.locator('main button', { hasText: 'Decode' }).first()).toBeVisible();
    await page.locator('main button', { hasText: 'Decode' }).first().click();
    await expect(page.locator('main button', { hasText: 'Decode from Base64' }).first()).toBeVisible();
  });
});

test.describe('Timestamp Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/timestamp-converter');
  });

  test('should load the timestamp converter page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Timestamp Converter');
  });

  test('should convert timestamp to date', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Convert to Date' }).first()).toBeVisible();
    await page.locator('main input[type="number"]').first().fill('1700000000');
    await page.locator('main button', { hasText: 'Convert to Date' }).first().click();
    await expect(page.locator('main', { hasText: 'Result' })).toBeVisible();
  });

  test('should convert date to timestamp', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Convert to Timestamp' }).first()).toBeVisible();
    await page.locator('main input[type="date"]').first().fill('2024-01-01');
    await page.locator('main button', { hasText: 'Convert to Timestamp' }).first().click();
    await expect(page.locator('main', { hasText: 'Result' })).toBeVisible();
  });

  test('should show error for invalid timestamp', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Convert to Date' }).first()).toBeVisible();
    // Click convert without entering any value - parseInt('') is NaN, triggers error
    await page.locator('main button', { hasText: 'Convert to Date' }).first().click();
    await expect(page.locator('main', { hasText: 'Invalid timestamp' }).first()).toBeVisible();
  });
});

test.describe('Regex Tester', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/regex-tester');
  });

  test('should load the regex tester page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Regex Tester');
  });

  test('should find regex matches', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Test Regex' }).first()).toBeVisible();
    await page.locator('main input[type="text"]').first().fill('\\d+');
    await page.locator('main textarea').first().fill('There are 42 items and 7 categories');
    await page.locator('main button', { hasText: 'Test Regex' }).first().click();
    await expect(page.locator('main', { hasText: 'Matches found' })).toBeVisible();
  });

  test('should show error for invalid regex', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Test Regex' }).first()).toBeVisible();
    await page.locator('main input[type="text"]').first().fill('[invalid');
    await page.locator('main button', { hasText: 'Test Regex' }).first().click();
    // Error is displayed in a red div
    await expect(page.locator('main .bg-red-50').first()).toBeVisible();
  });

  test('should not hang on empty-matching patterns', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Test Regex' }).first()).toBeVisible();
    await page.locator('main input[type="text"]').first().fill('a*');
    await page.locator('main textarea').first().fill('test');
    await page.locator('main button', { hasText: 'Test Regex' }).first().click();
    await expect(page.locator('main', { hasText: 'Matches found' })).toBeVisible({ timeout: 5000 });
  });
});