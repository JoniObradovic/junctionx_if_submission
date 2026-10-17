import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('compact views fit and expose the relevant contact on mobile', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('index.html?lang=en#asiakas');
  for (const portfolio of ['multi', 'home', 'family']) {
    await page.locator(`[data-portfolio="${portfolio}"]`).check();
    for (const scenario of ['new_home', 'absence', 'first_baby', 'pet']) {
      await page.locator(`#scenario-nav [data-case="${scenario}"]`).click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await expect(page.locator('#pet-route > button')).toHaveCount(1);
  }
  await page.screenshot({
    path: testInfo.outputPath('pet-mobile.png'),
    fullPage: true,
  });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
});
