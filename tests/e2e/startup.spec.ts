import { test, expect } from '@playwright/test';
for (const language of ['fi', 'en']) {
  test(`missing app chunk has a localized recovery state: ${language}`, async ({
    page,
  }) => {
    await page.route('**/assets/runtime-*.js', (route) => route.abort());
    await page.goto(`index.html?lang=${language}`);
    await expect(page.locator('#workspace [role="alert"]')).toBeVisible();
    await expect(page.locator('#workspace h2')).toHaveText(
      language === 'en' ? 'The demo could not start' : 'Demo ei käynnistynyt',
    );
    await expect(page.locator('#workspace button')).toBeEnabled();
  });
}
