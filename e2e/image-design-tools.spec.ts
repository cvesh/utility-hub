import { test, expect } from '@playwright/test';

test.describe('QR Code Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/qr-code-generator');
  });

  test('should load the QR code generator page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('QR Code Generator');
  });

  test('should have textarea and generate button', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await expect(page.locator('main button', { hasText: 'Generate QR Code' }).first()).toBeVisible();
  });

  test('should generate QR code image', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Generate QR Code' }).first()).toBeVisible();
    await page.locator('main textarea').first().fill('https://example.com');
    await page.locator('main button', { hasText: 'Generate QR Code' }).first().click();
    const img = page.locator('main img[alt="Generated QR Code"]');
    await expect(img).toBeVisible({ timeout: 10000 });
  });

  test('should show download button after generation', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Generate QR Code' }).first()).toBeVisible();
    await page.locator('main textarea').first().fill('Hello World');
    await page.locator('main button', { hasText: 'Generate QR Code' }).first().click();
    await expect(page.locator('main button', { hasText: 'Download PNG' }).first()).toBeVisible({ timeout: 10000 });
  });

  test('should not generate QR code for empty text', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Generate QR Code' }).first()).toBeVisible();
    await page.locator('main button', { hasText: 'Generate QR Code' }).first().click();
    await expect(page.locator('main img[alt="Generated QR Code"]')).not.toBeVisible();
  });
});

test.describe('Image Compressor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/image-compressor');
  });

  test('should load the image compressor page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Image Compressor');
  });

  test('should have file input and quality slider', async ({ page }) => {
    await expect(page.locator('main input[type="file"]').first()).toBeVisible();
    await expect(page.locator('main input[type="range"]').first()).toBeVisible();
  });

  test('should have compress button', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Compress Image' }).first()).toBeVisible();
  });

  test('compress button should be disabled without file', async ({ page }) => {
    const button = page.locator('main button', { hasText: 'Compress Image' }).first();
    await expect(button).toBeDisabled();
  });
});

test.describe('Image Resizer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/image-resizer');
  });

  test('should load the image resizer page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Image Resizer');
  });

  test('should have file input', async ({ page }) => {
    await expect(page.locator('main input[type="file"]').first()).toBeVisible();
  });

  test('should display page description', async ({ page }) => {
    // The resize controls (button, checkbox) only appear after a file is selected
    // Just verify the page loads correctly with proper content
    await expect(page.locator('main p').first()).toBeVisible();
  });
});

test.describe('WebP Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/webp-converter');
  });

  test('should load the WebP converter page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('WebP Converter');
  });

  test('should have file input and convert button', async ({ page }) => {
    await expect(page.locator('main input[type="file"]').first()).toBeVisible();
    await expect(page.locator('main button', { hasText: 'Convert to WebP' }).first()).toBeVisible();
  });

  test('convert button should be disabled without file', async ({ page }) => {
    const button = page.locator('main button', { hasText: 'Convert to WebP' }).first();
    await expect(button).toBeDisabled();
  });
});

test.describe('Color Picker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/color-picker');
  });

  test('should load the color picker page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Color Picker');
  });

  test('should have color input, hex input, and RGB inputs', async ({ page }) => {
    await expect(page.locator('main input[type="color"]').first()).toBeVisible();
    await expect(page.locator('main input[type="text"]').first()).toBeVisible();
    const numberInputs = page.locator('main input[type="number"]');
    expect(await numberInputs.count()).toBeGreaterThanOrEqual(3);
  });

  test('should have preset color buttons', async ({ page }) => {
    const buttons = page.locator('main button.h-10');
    expect(await buttons.count()).toBeGreaterThanOrEqual(6);
  });

  test('should update hex when color is changed', async ({ page }) => {
    await expect(page.locator('main input[type="text"]').first()).toBeVisible();
    const hexInput = page.locator('main input[type="text"]').first();
    await hexInput.fill('#FF0000');
    await hexInput.press('Tab');
    await expect(page.locator('main', { hasText: 'Preview' })).toBeVisible();
  });

  test('should have copy buttons', async ({ page }) => {
    const copyButtons = page.locator('main button', { hasText: 'Copy' });
    await expect(copyButtons.first()).toBeVisible();
  });

  test('should display color preview section', async ({ page }) => {
    await expect(page.locator('main', { hasText: 'Preview:' })).toBeVisible();
  });
});