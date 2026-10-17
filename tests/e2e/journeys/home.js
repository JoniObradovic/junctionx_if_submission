// Optional development-only real-browser check. The delivered app has no dependency.
// IF_BROWSER_TOOLS points to an existing Playwright installation (outside runtime).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

export async function homeJourney(browser, baseURL, artifacts) {
  fs.mkdirSync(artifacts, { recursive: true });
  try {
    console.log(
      `Browser: ${browser.browserType().name()} ${browser.version()}`,
    );
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    const errors = [];
    const network = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('request', (request) => {
      if (
        /^https?:/.test(request.url()) &&
        !new URL(request.url()).origin.includes('127.0.0.1')
      )
        network.push(request.url());
    });
    page.on('requestfailed', (request) =>
      errors.push(`Resource failure: ${request.url()}`),
    );
    async function checkAccessibility(label) {
      if (!axePath) return;
      if (!(await page.evaluate(() => !!window.axe)))
        await page.addScriptTag({ path: axePath });
      const violations = await page.evaluate(async () =>
        (
          await window.axe.run(document, {
            // Audit the already-rendered page; stylesheet re-reading is blocked on file URLs.
            preload: false,
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
          })
        ).violations.map((item) => ({
          id: item.id,
          impact: item.impact,
          nodes: item.nodes.map((node) => node.html),
        })),
      );
      assert.deepEqual(violations, [], `automated accessibility: ${label}`);
      console.log(`PASS: automated accessibility (${label})`);
    }
    async function checkPrice(euros) {
      assert.equal(
        (await page.locator('#annual-price').textContent()).replace(/\s/g, ''),
        `${euros}€`,
      );
    }
    await page.goto(new URL('index.html', baseURL).href);
    assert.match(await page.title(), /If rinnalla/);
    assert.equal(
      await page.locator('#deduction-percent').textContent(),
      '25 %',
    );
    assert.equal(
      await page.locator('#progress-count').textContent(),
      '1/4 tehty',
    );
    assert.equal(await page.locator('#judge-mode').count(), 0);
    assert.equal(await page.locator('#judge-card').count(), 0);
    assert.deepEqual(
      await page
        .locator('[data-task]')
        .evaluateAll((elements) =>
          elements.map((element) => element.dataset.task).sort(),
        ),
      ['floor-drain', 'kitchen-leaks', 'main-valve', 'professional-review'],
    );
    await checkPrice('588,00');
    assert.equal(
      await page.locator('#pricing-eligible-count').textContent(),
      '1/3',
    );
    assert.match(
      await page.locator('#pricing-concept').textContent(),
      /Hinnoittelukonsepti – esimerkkihinta/,
    );
    assert.match(
      await page.locator('.pricing-verification').textContent(),
      /ei ole todennettu/,
    );
    assert.equal(await page.locator('.claims-guidance').count(), 0);
    await page.screenshot({
      path: path.join(artifacts, 'new-home-desktop.png'),
      fullPage: true,
    });
    await checkAccessibility('desktop');

    await page.locator('[data-task="main-valve"]').uncheck();
    await checkPrice('600,00');
    assert.equal(await page.locator('#prevention-rate').textContent(), '0 %');
    await page.locator('[data-task="main-valve"]').check();
    await page.locator('[data-task="kitchen-leaks"]').check();
    await checkPrice('576,00');
    assert.equal(await page.locator('#pricing-feedback').isVisible(), true);
    assert.match(
      await page.locator('#pricing-feedback-price').textContent(),
      /576,00/,
    );
    assert.equal(
      await page
        .locator('[data-task="kitchen-leaks"]')
        .evaluate((element) => element === document.activeElement),
      true,
    );
    await page.locator('[data-task="floor-drain"]').check();
    await checkPrice('570,00');
    assert.match(
      await page.locator('#prevention-saving').textContent(),
      /30,00/,
    );
    assert.equal(await page.locator('#prevention-rate').textContent(), '5 %');
    await page.locator('[data-task="professional-review"]').check();
    await checkPrice('570,00');
    assert.equal(
      await page.locator('#progress-count').textContent(),
      '4/4 tehty',
    );
    assert.equal(
      await page.locator('#pricing-eligible-count').textContent(),
      '3/3',
    );
    for (const id of ['kitchen-leaks', 'floor-drain', 'professional-review'])
      await page.locator(`[data-task="${id}"]`).uncheck();
    await checkPrice('588,00');
    await page.locator('[data-show-pricing]').click();
    assert.equal(await page.locator('#pricing-feedback').isVisible(), false);
    assert.equal(
      await page
        .locator('#pricing-heading')
        .evaluate((element) => element === document.activeElement),
      true,
    );
    await page.locator('.pricing-assumptions > summary').click();
    assert.match(
      await page.locator('.pricing-assumptions').textContent(),
      /keksittyjä oletuksia/,
    );
    await page.locator('.pricing-assumptions > summary').click();
    const slider = page.locator('#pipework-year');
    await slider.focus();
    await page.keyboard.press('Home');
    assert.equal(await slider.inputValue(), '1970');
    assert.equal(
      await page.locator('#deduction-percent').textContent(),
      '50 %',
    );
    await page.keyboard.press('End');
    assert.equal(await page.locator('#deduction-percent').textContent(), '0 %');
    assert.equal(
      await slider.evaluate((element) => element === document.activeElement),
      true,
    );
    assert.match(
      await page.locator('#home-next-title').textContent(),
      /allaskaappi/,
    );
    await page.locator('#home-next-button').click();
    assert.equal(
      await page
        .locator('[data-task="kitchen-leaks"]')
        .evaluate((element) => element === document.activeElement),
      true,
    );
    await slider.focus();
    assert.equal(
      await slider.evaluate((element) =>
        element
          .closest('[data-complete]')
          .contains(document.getElementById('deduction-percent')),
      ),
      true,
      'input and result belong to the same task',
    );
    for (const [year, percent] of [
      [1975, 50],
      [1976, 25],
      [1996, 25],
      [1997, 0],
      [1994, 25],
    ]) {
      await slider.evaluate((element, year) => {
        element.value = year;
        element.dispatchEvent(new Event('input', { bubbles: true }));
      }, year);
      assert.equal(
        await page.locator('#deduction-percent').textContent(),
        `${percent} %`,
      );
      assert.match(
        await page.locator('#home-next-reason').textContent(),
        new RegExp(`${percent} %`),
      );
    }
    await page.getByRole('radio', { name: 'Remontoitu 2018' }).check();
    assert.equal(await slider.inputValue(), '1994');
    assert.equal(
      await page.locator('#deduction-percent').textContent(),
      '25 %',
    );
    assert.match(await page.locator('#surface-text').textContent(), /2018/);
    await checkPrice('588,00');
    await page.locator('#unknown-pipework-year').check();
    assert.equal(await slider.isDisabled(), true);
    assert.match(
      await page.locator('#deduction-context').textContent(),
      /ei voida arvioida/,
    );
    assert.equal(await page.locator('#deduction-percent').textContent(), '—');
    await checkPrice('588,00');
    await page.locator('#unknown-pipework-year').uncheck();
    assert.equal(await slider.isDisabled(), false);
    assert.equal(
      await page.locator('#deduction-percent').textContent(),
      '25 %',
    );

    await page.locator('[data-task="kitchen-leaks"]').check();
    await slider.evaluate((element) => {
      element.value = 1976;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    });
    assert.equal(
      await page.locator('#progress-count').textContent(),
      '2/4 tehty',
    );
    assert.equal(await page.locator('#judge-card').count(), 0);
    assert.equal(await page.locator('.pricing-card').isVisible(), true);
    await checkPrice('576,00');
    for (const id of ['absence', 'first_baby', 'pet']) {
      await page.locator(`#scenario-nav [data-case="${id}"]`).click();
      assert.ok(await page.locator('#scenario-title').textContent());
    }
    await page.locator('#scenario-nav [data-case="new_home"]').click();
    assert.equal(
      await page.locator('[data-task="kitchen-leaks"]').isChecked(),
      true,
    );
    assert.equal(
      await page.getByRole('radio', { name: 'Remontoitu 2018' }).isChecked(),
      true,
    );
    assert.equal(await page.locator('#judge-card').count(), 0);
    assert.equal(await slider.inputValue(), '1976');
    await checkPrice('576,00');
    for (const id of ['programme', 'new-customer']) {
      const benefit = page.locator(`[data-benefit="${id}"]`);
      await benefit.locator(':scope > summary').click();
      assert.equal(await benefit.locator('.evidence').count(), 1);
      await benefit.locator(':scope > summary').click();
    }
    await checkPrice('576,00');

    const action = page.locator('[data-action="plumbing-help"]');
    await action.click();
    await checkPrice('576,00');
    assert.equal(await page.locator('#help-dialog').isVisible(), true);
    assert.match(
      await page.locator('#help-packet').inputValue(),
      /remonttivuosi: 2018/,
    );
    assert.match(
      await page.locator('#help-packet').inputValue(),
      /\[x\] Tarkista allaskaappi/,
    );
    assert.match(
      await page.locator('#dialog-confirmation').textContent(),
      /Mitään ei lähetetty/,
    );
    await checkAccessibility('open dialog');
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      // Native dialogs may cycle through browser chrome (activeElement = body),
      // but must never allow focus into another page control while open.
      assert.equal(
        await page.evaluate(
          () =>
            document.activeElement === document.body ||
            !!document.activeElement.closest('dialog'),
        ),
        true,
      );
    }
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#help-dialog').isVisible(), false);
    assert.equal(
      await action.evaluate((element) => element === document.activeElement),
      true,
    );
    await page.locator('[data-info="deduction"]').click();
    await page
      .locator('#dialog-content .evidence')
      .first()
      .locator('summary')
      .click();
    const sourceLink = page.locator('#dialog-content .evidence a').first();
    assert.match(
      await sourceLink.getAttribute('href'),
      /kotivakuutusehdot.pdf$/,
    );
    assert.match(
      await page.locator('#dialog-content .evidence').first().textContent(),
      /6\.2\.1\.3/,
    );
    await page.keyboard.press('Escape');
    assert.equal(
      await page
        .locator('[data-info="deduction"]')
        .evaluate((element) => element === document.activeElement),
      true,
    );

    await page.reload();
    assert.equal(
      await page.locator('#progress-count').textContent(),
      '1/4 tehty',
    );
    assert.equal(await page.locator('#judge-mode').count(), 0);
    await checkPrice('588,00');
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(
        await page
          .locator('.home-task-card')
          .evaluate(
            (element) =>
              element.getBoundingClientRect().width >= innerWidth - 64,
          ),
        true,
        'mobile tasks use the available reading width',
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `no horizontal overflow at ${width}px`,
      );
      await page.locator('[data-task="floor-drain"]').check();
      await checkPrice('582,00');
      assert.equal(await page.locator('#pricing-feedback').isVisible(), true);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `price feedback fits ${width}px`,
      );
      assert.equal(
        await page.locator('#progress-count').textContent(),
        '2/4 tehty',
      );
      await page.locator('[data-task="floor-drain"]').uncheck();
      await page.locator('.pricing-assumptions > summary').click();
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `expanded price assumptions fit ${width}px`,
      );
      await page.locator('.pricing-assumptions > summary').click();
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await checkAccessibility('mobile');
    await page.locator('[data-show-pricing]').click();
    await page.evaluate(() => {
      document.activeElement.blur();
      window.window.scrollTo(0, 0);
    });
    await page.screenshot({
      path: path.join(artifacts, 'new-home-mobile.png'),
      fullPage: true,
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await slider.focus();
    await page.keyboard.press('End');
    assert.equal(await page.locator('#deduction-percent').textContent(), '0 %');
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('#scenario-nav').isVisible(), false);
    assert.equal(await page.locator('#workspace').isVisible(), true);
    if (browser.browserType().name() === 'chromium')
      await page.pdf({
        path: path.join(artifacts, 'new-home-print.pdf'),
        format: 'A4',
      });
    assert.deepEqual(network, [], 'no external service requests');
    assert.deepEqual(errors, [], 'no console, page or local resource errors');
    console.log(
      `PASS: built HTTP demo; live pricing, eligible actions, cap, undo, preparation exclusion, unknown price, source/status labels and published benefits; deduction boundaries, keyboard focus, independent controls, readiness, persistence, contextual information, source details, modal, mobile, reduced motion and print. Artifacts: ${artifacts}`,
    );
  } finally {
    /* Browser lifecycle belongs to Playwright. */
  }
}
