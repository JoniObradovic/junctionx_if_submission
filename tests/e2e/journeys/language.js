import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
export async function languageJourney(browser, baseURL, artifacts) {
  fs.mkdirSync(artifacts, { recursive: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    const errors = [],
      network = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('requestfailed', (r) => errors.push(r.url()));
    page.on('request', (r) => {
      if (
        /^https?:/.test(r.url()) &&
        !new URL(r.url()).origin.includes('127.0.0.1')
      )
        network.push(r.url());
    });
    const lang = (code) => page.locator(`[data-language="${code}"]`).click();
    const choose = (id) =>
      page.locator(`#scenario-nav [data-case="${id}"]`).click();
    async function audit(label) {
      await page.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          ),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `${label}: viewport fit`,
      );
      if (axePath) {
        if (!(await page.evaluate(() => !!window.axe)))
          await page.addScriptTag({ path: axePath });
        const issues = await page.evaluate(async () =>
          (
            await window.axe.run(document, {
              preload: false,
              runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
              },
            })
          ).violations.map((x) => ({
            id: x.id,
            nodes: x.nodes.map((n) => n.html),
          })),
        );
        assert.deepEqual(issues, [], label);
      }
      const collisions = await page
        .locator('.adaptive-workspace .card')
        .evaluateAll((cards) => {
          const rects = cards
            .filter((e) => e.getBoundingClientRect().width)
            .map((e) => e.getBoundingClientRect());
          return rects.flatMap((a, i) =>
            rects
              .slice(i + 1)
              .filter(
                (b) =>
                  Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 &&
                  Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2,
              ),
          );
        });
      assert.equal(collisions.length, 0, `${label}: cards do not overlap`);
      console.log(`PASS: ${label}`);
    }
    async function capture(name) {
      await page.evaluate(() => {
        document.activeElement.blur();
        window.scrollTo(0, 0);
      });
      await page.screenshot({
        path: path.join(artifacts, name),
        fullPage: true,
      });
    }
    await page.goto(new URL('index.html', baseURL).href + '#asiakas');
    await page.locator('[data-task="floor-drain"]').check();
    await page.locator('#pipework-year').fill('2010');
    await lang('en');
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.equal(
      await page.locator('[data-language="en"]').getAttribute('aria-pressed'),
      'true',
    );
    assert.equal(
      await page
        .locator('[data-language="en"]')
        .evaluate((e) => e === document.activeElement),
      true,
    );
    assert.equal(
      await page.locator('[data-task="floor-drain"]').isChecked(),
      true,
    );
    assert.equal(await page.locator('#pipework-year').inputValue(), '2010');
    assert.match(
      await page.locator('#scenario-title').textContent(),
      /New home/,
    );
    assert.match(await page.locator('#annual-price').textContent(), /523.80/);
    await page.locator('[data-action="plumbing-help"]').click();
    assert.match(
      await page.locator('#help-packet').inputValue(),
      /Example task status/,
    );
    assert.match(
      await page.locator('#dialog-confirmation').textContent(),
      /Nothing was sent/,
    );
    await page.keyboard.press('Escape');
    await audit('English home and preserved state');
    await capture('english-home-desktop.png');
    await choose('absence');
    await page.locator('#absence-duration').fill('20');
    await lang('fi');
    await lang('en');
    assert.equal(await page.locator('#absence-duration').inputValue(), '20');
    assert.match(
      await page.locator('#absence-message').inputValue(),
      /Hi Pekka!/,
    );
    assert.match(
      await page.locator('#absence-message').inputValue(),
      /Nothing was sent/,
    );
    await audit('English absence and translated draft');
    await choose('first_baby');
    await page
      .locator('[data-field="equipmentCondition"][value="new"]')
      .check();
    await lang('fi');
    await lang('en');
    assert.equal(await page.locator('[data-task]').count(), 6);
    await page.locator('[data-action="prepare-questions"]').click();
    assert.match(
      await page.locator('#scenario-packet').inputValue(),
      /What is the product model/,
    );
    await page.keyboard.press('Escape');
    await audit('English baby and purchase type persistence');
    await choose('pet');
    await page.locator('[data-portfolio="home"]').check();
    assert.equal(await page.locator('[data-intro-offer]').count(), 1);
    assert.equal(await page.locator('#pet-route > button').count(), 1);
    await capture('english-pet-concept-desktop.png');
    await page.locator('[data-action="intro-help"]').click();
    assert.match(
      await page.locator('#dialog-confirmation').textContent(),
      /Previewing does not consume/,
    );
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('[data-action="intro-help"]').count(), 1);
    await page.locator('[data-action="intro-help"]').click();
    await audit('English complimentary-contact preview');
    await page.locator('[data-use-pet-intro]').click();
    assert.equal(await page.locator('[data-use-pet-intro]').isDisabled(), true);
    assert.match(
      await page.locator('#intro-use-status').textContent(),
      /no real connection/,
    );
    await page.keyboard.press('Escape');
    await page.waitForFunction(
      () =>
        document.querySelector('#pet-route > button') ===
        document.activeElement,
    );
    assert.equal(
      await page
        .locator('#pet-route > button')
        .evaluate((e) => e === document.activeElement),
      true,
      'closing consumed preview focuses the current contact route',
    );
    assert.equal(await page.locator('[data-intro-offer]').count(), 0);
    assert.equal(await page.locator('[data-intro-used]').count(), 1);
    await page.locator('[data-portfolio="family"]').check();
    await lang('fi');
    await lang('en');
    assert.equal(
      await page.locator('[data-intro-offer]').count(),
      0,
      'no extra contact from language or profile switching',
    );
    assert.equal(await page.locator('[data-action="urgent-help"]').count(), 1);
    await page.locator('#observation-waterRetention').selectOption('vomited');
    // Observation values are taken from the real control rather than inferred health state.
    await page
      .locator('[data-pet-field="emergencySignIds"][value="collapse"]')
      .check();
    assert.equal(
      await page.locator('#pet-route').getAttribute('data-route'),
      'emergency',
    );
    assert.match(
      await page.locator('#pet-route-heading').textContent(),
      /emergency veterinary care/,
    );
    assert.equal(await page.locator('[data-action="intro-help"]').count(), 0);
    await page
      .locator('[data-pet-field="emergencySignIds"][value="collapse"]')
      .uncheck();
    await page.locator('#observation-waterRetention').selectOption('unknown');
    await page.locator('.packet-preview > summary').click();
    assert.equal(await page.locator('#pet-packet').isVisible(), true);
    await page.locator('.check-options .evidence > summary').first().click();
    await audit(
      'English pet, one-use simulation, expanded details and emergency priority',
    );
    await capture('english-pet-desktop.png');
    for (const width of [1920, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const id of ['new_home', 'absence', 'first_baby', 'pet']) {
        await choose(id);
        await audit(`English ${id} at ${width}px`);
      }
    }
    await capture('english-pet-mobile.png');
    await page.setViewportSize({ width: 1440, height: 1000 });
    const existingHero = await page.locator('.intro h1').textContent();
    const existingMessages = {};
    for (const id of ['new_home', 'absence', 'first_baby', 'pet']) {
      await choose(id);
      existingMessages[id] = await page.locator('.case-intro').textContent();
    }
    await page.locator('[data-audience="visitor"]').click();
    await page.waitForFunction(
      () => !document.querySelector('[data-portfolio]'),
    );
    assert.notEqual(
      await page.locator('.intro h1').textContent(),
      existingHero,
    );
    for (const id of ['new_home', 'absence', 'first_baby', 'pet']) {
      await choose(id);
      assert.notEqual(
        await page.locator('.case-intro').textContent(),
        existingMessages[id],
        `${id}: English audience copy differs`,
      );
    }
    await page.locator('[data-audience="customer"]').click();
    await page.waitForFunction(
      () => !!document.querySelector('[data-portfolio]'),
    );
    assert.equal(
      await page.locator('[data-intro-used]').count(),
      1,
      'copy changes preserve existing customer trial use',
    );
    await audit('English new/existing customer copy and state');
    await page.locator('#audience-nav a[href*="personnel.html"]').click();
    await page.waitForURL((url) => url.pathname.endsWith('/personnel.html'));
    assert.equal(new URL(page.url()).searchParams.get('lang'), 'en');
    await page.waitForFunction(
      () =>
        document.body.dataset.page === 'personnel' &&
        document.documentElement.lang === 'en',
    );
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.match(
      await page.locator('#staff-title').textContent(),
      /Customer analytics/,
    );
    await page.locator('#staff-policy-filter').selectOption('dog');
    assert.equal(
      await page.locator('#staff-metric-customers').textContent(),
      '1',
    );
    await lang('fi');
    await lang('en');
    assert.equal(
      await page.locator('#staff-policy-filter').inputValue(),
      'dog',
    );
    assert.equal(
      await page.locator('#staff-metric-customers').textContent(),
      '1',
    );
    await page.locator('#staff-case-filter').selectOption('pet');
    assert.equal(
      await page.locator('#staff-metric-feedback').textContent(),
      '—',
    );
    await audit('English staff analytics and retained filters');
    await page.locator('#staff-policy-filter').selectOption('all');
    await page.locator('#staff-case-filter').selectOption('all');
    await capture('english-staff-desktop.png');
    await page.setViewportSize({ width: 320, height: 844 });
    await audit('English staff at 320px');
    await page.locator('.header-tools > a').click();
    await page.waitForFunction(
      () =>
        document.getElementById('scenario-nav')?.childElementCount &&
        document.documentElement.lang === 'en',
    );
    assert.equal(
      await page.locator('html').getAttribute('lang'),
      'en',
      'language follows navigation between pages',
    );
    await lang('fi');
    assert.equal(await page.locator('html').getAttribute('lang'), 'fi');
    assert.equal(
      await page.locator('[data-language="fi"]').getAttribute('aria-pressed'),
      'true',
    );
    assert.deepEqual(network, [], 'no HTTP requests');
    assert.deepEqual(errors, [], 'no page or console errors');
    console.log(
      'PASS: offline bilingual journey, analytics, responsive views and no external requests',
    );
    await context.close();
  } finally {
    /* Browser lifecycle belongs to Playwright. */
  }
}
