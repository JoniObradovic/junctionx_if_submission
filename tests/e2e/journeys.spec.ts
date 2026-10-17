import { test } from '@playwright/test';
import { homeJourney } from './journeys/home.js';
import { scenariosJourney } from './journeys/scenarios.js';
import { experienceJourney } from './journeys/experience.js';
import { languageJourney } from './journeys/language.js';
test('home interaction journey', async ({ browser, baseURL }, testInfo) => {
  test.setTimeout(240_000);
  await homeJourney(browser, baseURL!, testInfo.outputPath('screenshots'));
});
test('scenarios interaction journey', async ({
  browser,
  baseURL,
}, testInfo) => {
  test.setTimeout(240_000);
  await scenariosJourney(browser, baseURL!, testInfo.outputPath('screenshots'));
});
test('experience interaction journey', async ({
  browser,
  baseURL,
}, testInfo) => {
  test.setTimeout(240_000);
  await experienceJourney(
    browser,
    baseURL!,
    testInfo.outputPath('screenshots'),
  );
});
test('language interaction journey', async ({ browser, baseURL }, testInfo) => {
  test.setTimeout(240_000);
  await languageJourney(browser, baseURL!, testInfo.outputPath('screenshots'));
});
