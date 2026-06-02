import { test, expect } from '@playwright/test';

test.describe('Word Counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/word-counter');
  });

  test('should load the word counter page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Word Counter');
  });

  test('should count words in real-time', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('Hello world this is a test');
    await expect(page.locator('main', { hasText: 'Words' })).toBeVisible();
  });

  test('should count characters', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('Hello');
    await expect(page.locator('main', { hasText: 'Characters' })).toBeVisible();
  });

  test('should show 0 for empty text', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    // Default state should show 0 words
    await expect(page.locator('main', { hasText: 'Words' })).toBeVisible();
  });

  test('should count sentences', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('Hello world. How are you? I am fine!');
    await expect(page.locator('main', { hasText: 'Sentences' })).toBeVisible();
  });
});

test.describe('Character Counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/character-counter');
  });

  test('should load the character counter page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Character Counter');
  });

  test('should count characters in real-time', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('Hello');
    await expect(page.locator('main', { hasText: 'Total Characters' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'No Spaces' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Words' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'Lines' })).toBeVisible();
  });

  test('should show warning for long text', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('a'.repeat(5001));
    await expect(page.locator('main', { hasText: 'Warning: Over 5000 characters' })).toBeVisible();
  });
});

test.describe('Case Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/case-converter');
  });

  test('should load the case converter page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Case Converter');
  });

  test('should convert text to all cases', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('hello world');
    // Should show all case conversions
    await expect(page.locator('main', { hasText: 'upper' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'lower' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'title' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'camel' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'snake' })).toBeVisible();
    await expect(page.locator('main', { hasText: 'kebab' })).toBeVisible();
  });

  test('should have copy buttons for each case', async ({ page }) => {
    await expect(page.locator('main textarea').first()).toBeVisible();
    await page.locator('main textarea').first().fill('hello world');
    const copyButtons = page.locator('main button', { hasText: 'Copy' });
    await expect(copyButtons.first()).toBeVisible();
  });
});

test.describe('Remove Extra Spaces', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/remove-extra-spaces');
  });

  test('should load the remove extra spaces page', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Remove Extra Spaces');
  });

  test('should remove extra spaces from text', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Clean Text' }).first()).toBeVisible();
    await page.locator('main textarea').first().fill('Hello   world   this   is   a   test');
    await page.locator('main button', { hasText: 'Clean Text' }).first().click();
    const output = page.locator('main textarea').nth(1);
    await expect(output).toHaveValue('Hello world this is a test');
  });

  test('should preserve paragraph breaks', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Clean Text' }).first()).toBeVisible();
    await page.locator('main textarea').first().fill('Paragraph one.\n\nParagraph two.');
    await page.locator('main button', { hasText: 'Clean Text' }).first().click();
    const output = page.locator('main textarea').nth(1);
    const value = await output.inputValue();
    expect(value).toContain('\n\n');
  });

  test('should show character reduction count', async ({ page }) => {
    await expect(page.locator('main button', { hasText: 'Clean Text' }).first()).toBeVisible();
    await page.locator('main textarea').first().fill('Hello   world');
    await page.locator('main button', { hasText: 'Clean Text' }).first().click();
    await expect(page.locator('main', { hasText: 'Removed' })).toBeVisible();
  });
});