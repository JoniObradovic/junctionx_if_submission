import { test, expect } from '@playwright/test';
for (const entry of ['index.html#asiakas', 'personnel.html']) {
  test(`locale survives refresh and sharing: ${entry}`, async ({
    page,
    context,
    baseURL,
  }) => {
    const url = new URL(entry, baseURL);
    url.searchParams.set('lang', 'en');
    await page.goto(url.href);
    await page.locator('[data-language="fi"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'fi');
    expect(new URL(page.url()).searchParams.get('lang')).toBe('fi');
    if (entry.includes('#')) expect(new URL(page.url()).hash).toBe('#asiakas');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'fi');
    await page.locator('[data-language="en"]').click();
    expect(new URL(page.url()).searchParams.get('lang')).toBe('en');
    const shared = await context.newPage();
    await shared.goto(page.url());
    await expect(shared.locator('html')).toHaveAttribute('lang', 'en');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
}
test('approved PDF is available at its original public path', async ({
  request,
  baseURL,
}) => {
  const response = await request.get(
    new URL('presentation/If-rinnalla-demo-EN.pdf', baseURL).href,
  );
  expect(response.ok()).toBe(true);
  const { createHash } = await import('node:crypto');
  expect(
    createHash('sha256')
      .update(await response.body())
      .digest('hex'),
  ).toBe('7a30789b239a969917f4ad5ace7e70f1579a501e50fe1dc0e2628817f2b19a74');
});
