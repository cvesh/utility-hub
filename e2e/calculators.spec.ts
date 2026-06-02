import { test, expect } from '@playwright/test';

test.describe('Age Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/age-calculator');
  });

  test('should load the age calculator page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Age Calculator');
  });

  test('should have a date input and calculate button', async ({ page }) => {
    await expect(page.locator('main input[type="date"]').first()).toBeVisible();
    await expect(page.locator('main button', { hasText: 'Calculate Age' }).first()).toBeVisible();
  });

  test('should calculate age correctly', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Calculate Age' }).first()).toBeVisible();
    await page.locator('main input[type="date"]').first().fill('2000-01-01');
    await page.locator('main button', { hasText: 'Calculate Age' }).first().click();
    await expect(page.locator('main', { hasText: 'Years' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Total Days' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Next Birthday in' })).toBeVisible();
  });

  test('should not calculate with empty date', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Calculate Age' }).first()).toBeVisible();
    await page.locator('main button', { hasText: 'Calculate Age' }).first().click();
    // Result grid should not appear (grid-cols-2 is the result container)
    await expect(page.locator('main .grid-cols-2')).not.toBeVisible();
  });

  test('should display SEO content', async ({ page }) => {
    await expect(page.locator('main article')).toBeVisible();
    await expect(page.locator('main article h2').first()).toContainText('What is an Age Calculator');
  });
});

test.describe('Percentage Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/percentage-calculator');
  });

  test('should load the percentage calculator page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Percentage Calculator');
  });

  test('should have mode tabs', async ({ page }) => {
    await expect(page.locator('main button', { hasText: '% of' }).first()).toBeVisible();
    await expect(page.locator('main button', { hasText: 'What %' }).first()).toBeVisible();
    await expect(page.locator('main button', { hasText: '% Change' }).first()).toBeVisible();
  });

  test('should calculate percentage of a number', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Calculate' }).first()).toBeVisible();
    const inputs = page.locator('main input[type="number"]');
    await inputs.nth(0).fill('20');
    await inputs.nth(1).fill('200');
    await page.locator('main button', { hasText: 'Calculate' }).first().click();
    await expect(page.locator('main', { hasText: '20% of 200 = 40' })).toBeVisible();
  });

  test('should switch between modes', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'What %' }).first()).toBeVisible();
    await page.locator('main button', { hasText: 'What %' }).first().click();
    const inputs = page.locator('main input[type="number"]');
    await inputs.nth(0).fill('50');
    await inputs.nth(1).fill('200');
    await page.locator('main button', { hasText: 'Calculate' }).first().click();
    await expect(page.locator('main', { hasText: '50 is 25% of 200' })).toBeVisible();
  });

  test('should handle division by zero gracefully', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'What %' }).first()).toBeVisible();
    await page.locator('main button', { hasText: 'What %' }).first().click();
    const inputs = page.locator('main input[type="number"]');
    await inputs.nth(0).fill('50');
    await inputs.nth(1).fill('0');
    await page.locator('main button', { hasText: 'Calculate' }).first().click();
    await expect(page.locator('main', { hasText: 'undefined' })).toBeVisible();
  });
});

test.describe('Date Difference Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/date-difference-calculator');
  });

  test('should load the date difference calculator page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Date Difference Calculator');
  });

  test('should calculate date difference', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Calculate Difference' }).first()).toBeVisible();
    const inputs = page.locator('main input[type="date"]');
    await inputs.nth(0).fill('2024-01-01');
    await inputs.nth(1).fill('2024-12-31');
    await page.locator('main button', { hasText: 'Calculate Difference' }).first().click();
    await expect(page.locator('main', { hasText: 'Total Days' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Weekdays' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Weekends' })).toBeVisible();
  });
});

test.describe('Compound Interest Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/compound-interest-calculator');
  });

  test('should load the compound interest calculator page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Compound Interest Calculator');
  });

  test('should calculate compound interest with default values', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Calculate' }).first()).toBeVisible();
    await page.locator('main button', { hasText: 'Calculate' }).first().click();
    await expect(page.locator('main', { hasText: 'Total Amount' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Total Interest' })).toBeVisible();
  });

  test('should have frequency select options', async ({ page }) => {
    // Wait for React island to hydrate and show the select
    const select = page.locator('main select').first();
    await expect(select).toBeVisible({ timeout: 15000 });
    const options = await select.locator('option').allTextContents();
    expect(options.some(o => o.includes('Annually'))).toBe(true);
    expect(options.some(o => o.includes('Monthly'))).toBe(true);
  });
});

test.describe('BMI Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/bmi-calculator');
  });

  test('should load the BMI calculator page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('BMI Calculator');
  });

  test('should calculate BMI correctly', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Calculate BMI' }).first()).toBeVisible();
    const inputs = page.locator('main input[type="number"]');
    await inputs.nth(0).fill('70');
    await inputs.nth(1).fill('175');
    await page.locator('main button', { hasText: 'Calculate BMI' }).first().click();
    await expect(page.locator('main', { hasText: 'Your BMI' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Healthy Weight Range' })).toBeVisible();
  });

  test('should handle zero height gracefully', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Calculate BMI' }).first()).toBeVisible();
    const inputs = page.locator('main input[type="number"]');
    await inputs.nth(0).fill('70');
    await inputs.nth(1).fill('0');
    await page.locator('main button', { hasText: 'Calculate BMI' }).first().click();
    await expect(page.locator('main', { hasText: 'Invalid' })).toBeVisible();
  });
});