import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Utility Hub/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main h1').first()).toContainText('Free Online Utility Tools');
  });

  test('should display navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav a[href="/"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/#calculators"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/#text-tools"]').first()).toBeVisible();
    await expect(page.locator('nav a[href="/#dev-tools"]').first()).toBeVisible();
  });

  test('should display all tool categories', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main h2', { hasText: 'Calculators' }).first()).toBeVisible();
    await expect(page.locator('main h2', { hasText: 'Text Tools' }).first()).toBeVisible();
    await expect(page.locator('main h2', { hasText: 'Dev Tools' }).first()).toBeVisible();
    await expect(page.locator('main h2', { hasText: 'Image & Media Tools' }).first()).toBeVisible();
    await expect(page.locator('main h2', { hasText: 'Design & Utility Tools' }).first()).toBeVisible();
  });

  test('should have links to all tool pages', async ({ page }) => {
    await page.goto('/');
    const toolLinks = [
      '/tools/age-calculator',
      '/tools/percentage-calculator',
      '/tools/date-difference-calculator',
      '/tools/compound-interest-calculator',
      '/tools/bmi-calculator',
      '/tools/word-counter',
      '/tools/character-counter',
      '/tools/case-converter',
      '/tools/remove-extra-spaces',
      '/tools/json-formatter',
      '/tools/jwt-decoder',
      '/tools/uuid-generator',
      '/tools/base64-encoder-decoder',
      '/tools/timestamp-converter',
      '/tools/regex-tester',
      '/tools/qr-code-generator',
      '/tools/image-compressor',
      '/tools/image-resizer',
      '/tools/webp-converter',
      '/tools/color-picker',
    ];
    for (const link of toolLinks) {
      await expect(page.locator(`main a[href="${link}"]`).first()).toBeVisible();
    }
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer').first()).toContainText('Utility Hub');
  });

  test('should navigate to a tool page when clicking a link', async ({ page }) => {
    await page.goto('/');
    await page.locator('main a[href="/tools/age-calculator"]').first().click();
    await expect(page).toHaveURL(/age-calculator/);
    await expect(page.locator('main h1').first()).toContainText('Age Calculator');
  });
});
