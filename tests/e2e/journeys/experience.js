import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

export async function experienceJourney(browser, baseURL, artifacts) {
  fs.mkdirSync(artifacts, { recursive: true });
  try {
    console.log(
      `Browser: ${browser.browserType().name()} ${browser.version()}`,
    );
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    const errors = [],
      network = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('requestfailed', (request) => errors.push(request.url()));
    page.on('request', (request) => {
      if (
        /^https?:/.test(request.url()) &&
        !new URL(request.url()).origin.includes('127.0.0.1')
      )
        network.push(request.url());
    });
    const choose = (id) =>
      page.locator(`#scenario-nav [data-case="${id}"]`).click();
    const portfolio = (id) => page.locator(`[data-portfolio="${id}"]`);
    const task = (id) => page.locator(`[data-task="${id}"]`);
    const symptom = (id) =>
      page.locator(`[data-pet-field="symptomIds"][value="${id}"]`);
    const danger = (id) =>
      page.locator(`[data-pet-field="emergencySignIds"][value="${id}"]`);
    async function audit(label) {
      if (axePath) {
        if (!(await page.evaluate(() => !!window.axe)))
          await page.addScriptTag({ path: axePath });
        const violations = await page.evaluate(async () =>
          (
            await window.axe.run(document, {
              preload: false,
              runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
              },
            })
          ).violations.map((item) => ({
            id: item.id,
            nodes: item.nodes.map((node) => node.html),
          })),
        );
        assert.deepEqual(violations, [], label);
      }
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `${label}: fits viewport`,
      );
      console.log(`PASS: ${label}`);
    }
    async function capture(name) {
      await page.evaluate(() => {
        document.activeElement.blur();
        window.window.scrollTo(0, 0);
      });
      await page.screenshot({
        path: path.join(artifacts, name),
        fullPage: true,
      });
    }
    async function singleContact(action, access) {
      assert.equal(
        await page.locator('#pet-access').count(),
        0,
        'no parallel service card',
      );
      assert.equal(
        await page.locator('#pet-route > button').count(),
        1,
        'one relevant contact action',
      );
      assert.equal(
        await page.locator('#pet-route').getAttribute('data-access'),
        access,
      );
      assert.equal(
        await page.locator(`#pet-route > [data-action="${action}"]`).count(),
        1,
      );
      assert.equal(
        await page.locator('#pet-route .emergency-boundary').isVisible(),
        true,
      );
    }
    await page.goto(new URL('index.html', baseURL).href);
    assert.match(
      (await page.locator('.brand').textContent()).trim(),
      /^ifrinnalla/,
    );
    assert.equal(await page.locator('#judge-mode').count(), 0);
    assert.equal(await page.locator('[data-portfolio]').count(), 0);
    assert.equal(
      await page.locator('[data-benefit="new-customer"]').count(),
      1,
    );
    assert.equal(await page.locator('[data-benefit="maintenance"]').count(), 0);
    assert.equal(await page.locator('.claims-guidance').count(), 0);
    const newCustomerHero = await page.locator('.intro h1').textContent();
    const newCustomerIntros = {};
    await task('floor-drain').check();
    for (const id of ['new_home', 'absence', 'first_baby', 'pet']) {
      await choose(id);
      newCustomerIntros[id] = await page.locator('.case-intro').textContent();
      const info = page.locator('#workspace [data-info="business"]');
      await info.click();
      await audit(`${id} contextual information`);
      await page.keyboard.press('Escape');
      assert.equal(
        await info.evaluate((element) => element === document.activeElement),
        true,
      );
    }
    await singleContact('urgent-help', 'unknown');
    await symptom('lethargy').uncheck();
    await singleContact('vet-contact-help', 'unknown');
    await symptom('lethargy').check();
    await page.locator('#audience-nav [data-audience="customer"]').click();
    await page.waitForFunction(
      () => !!document.querySelector('[data-portfolio]'),
    );
    assert.notEqual(
      await page.locator('.intro h1').textContent(),
      newCustomerHero,
    );
    for (const id of ['multi', 'home', 'family']) {
      await portfolio(id).check();
      await choose('new_home');
      assert.notEqual(
        await page.locator('.case-intro').textContent(),
        newCustomerIntros.new_home,
      );
      assert.match(
        await page.locator('#policy-price').textContent(),
        id === 'home' ? /588,00/ : /529,20/,
      );
      assert.equal(
        await page.locator('[data-benefit="new-customer"]').count(),
        0,
      );
      assert.equal(
        await page.locator('[data-benefit="maintenance"]').count(),
        1,
      );
      assert.equal(await page.locator('.claims-guidance').isVisible(), true);
      assert.equal(
        await task('floor-drain').isChecked(),
        false,
        'customer state is separate from visitor state',
      );
      await choose('absence');
      assert.notEqual(
        await page.locator('.case-intro').textContent(),
        newCustomerIntros.absence,
      );
      assert.equal(
        await task('travel-documents').count(),
        id === 'multi' ? 1 : 0,
      );
      assert.match(
        await page.locator('#case-progress-count').textContent(),
        id === 'multi' ? /0\/7/ : /0\/6/,
      );
      await choose('first_baby');
      assert.notEqual(
        await page.locator('.case-intro').textContent(),
        newCustomerIntros.first_baby,
      );
      assert.equal(
        await page.locator('.insurance-owned').count(),
        id === 'family' ? 1 : 0,
      );
      assert.equal(
        await page.locator('.insurance-acquisition').count(),
        id === 'family' ? 0 : 1,
      );
      assert.equal(await page.locator('[data-task]').count(), 8);
      if (id === 'family') await capture('family-baby-desktop.png');
      await choose('pet');
      assert.notEqual(
        await page.locator('.case-intro').textContent(),
        newCustomerIntros.pet,
      );
      const insured = id === 'multi';
      await singleContact(
        insured ? 'insured-help' : 'intro-help',
        insured ? 'included' : 'notIncluded',
      );
      if (insured) {
        assert.match(
          await page.locator('#pet-route-heading').textContent(),
          /24\/7/,
        );
        await page.locator('[data-action="insured-help"]').click();
        assert.match(
          await page.locator('#dialog-content').textContent(),
          /päivystysnumero/,
        );
        assert.match(
          await page.locator('#dialog-confirmation').textContent(),
          /mitään lähetetty/,
        );
        await audit('insured contact dialog');
        await page.keyboard.press('Escape');
        await capture('customer-pet-desktop.png');
      } else
        assert.doesNotMatch(
          await page.locator('#pet-route-heading').textContent(),
          /Eläinapu/,
        );
      await symptom('lethargy').uncheck();
      await singleContact(
        insured ? 'insured-help' : 'intro-help',
        insured ? 'included' : 'notIncluded',
      );
      await page.locator(`#pet-route > button`).click();
      await danger('collapse').evaluate((element) => {
        element.checked = true;
        element.dispatchEvent(new Event('change', { bubbles: true }));
      });
      assert.equal(await page.locator('#help-dialog').isVisible(), false);
      assert.equal(
        await page.locator('#pet-route').getAttribute('data-route'),
        'emergency',
      );
      await singleContact(
        'emergency-help',
        insured ? 'included' : 'notIncluded',
      );
      assert.equal(
        await page.locator('#pet-route [data-action="insured-help"]').count(),
        0,
      );
      await danger('collapse').uncheck();
      await symptom('lethargy').check();
    }
    await choose('absence');
    await portfolio('multi').check();
    await task('travel-documents').check();
    assert.equal(
      await task('travel-documents').evaluate(
        (element) => element === document.activeElement,
      ),
      true,
    );
    assert.doesNotMatch(
      await page.locator('#absence-message').inputValue(),
      /matkavakuutuksen/,
    );
    await portfolio('home').check();
    assert.equal(await task('travel-documents').count(), 0);
    assert.equal(
      await page.locator('#case-progress-count').textContent(),
      '0/6 tehty',
    );
    await portfolio('multi').check();
    assert.equal(await task('travel-documents').isChecked(), true);
    await capture('customer-absence-desktop.png');
    await choose('new_home');
    await task('kitchen-leaks').check();
    await portfolio('home').check();
    assert.match(await page.locator('#policy-price').textContent(), /576,00/);
    assert.equal(
      await portfolio('home').evaluate(
        (element) => element === document.activeElement,
      ),
      true,
    );
    await page.locator('#audience-nav [data-audience="visitor"]').click();
    await page.waitForFunction(
      () => !document.querySelector('[data-portfolio]'),
    );
    assert.equal(await task('floor-drain').isChecked(), true);
    assert.equal(await task('kitchen-leaks').isChecked(), false);
    await page.locator('#audience-nav [data-audience="customer"]').click();
    await page.waitForFunction(
      () => !!document.querySelector('[data-portfolio]'),
    );
    assert.equal(await task('kitchen-leaks').isChecked(), true);
    for (const id of ['multi', 'home', 'family']) {
      await portfolio(id).check();
      for (const caseId of ['new_home', 'absence', 'first_baby', 'pet']) {
        await choose(caseId);
        await page.setViewportSize({ width: 320, height: 844 });
        await audit(`${id} ${caseId} 320px`);
      }
    }
    await portfolio('multi').check();
    await choose('pet');
    await capture('customer-pet-mobile.png');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page
      .getByRole('link', { name: 'Ifin henkilöstö', exact: true })
      .click();
    assert.equal(
      await page.locator('body').getAttribute('data-page'),
      'personnel',
    );
    assert.equal(
      await page
        .locator(
          '#staff-prepare, #staff-recommendation-heading, #staff-draft, #staff-discussed',
        )
        .count(),
      0,
    );
    assert.equal(await page.locator('#workspace button').count(), 0);
    assert.equal(
      await page.locator('#staff-metric-customers').textContent(),
      '3',
    );
    assert.equal(
      await page.locator('#staff-metric-policies').textContent(),
      '6',
    );
    assert.equal(await page.locator('#staff-metric-multi').textContent(), '2');
    assert.match(
      await page.locator('#staff-metric-feedback').textContent(),
      /4.*3 vastausta/,
    );
    assert.equal(
      await page.locator('#staff-customer-table tbody tr').count(),
      3,
    );
    await audit('personnel analytics desktop');
    await capture('personnel-desktop.png');
    await page.locator('#staff-policy-filter').focus();
    await page.locator('#staff-policy-filter').selectOption('dog');
    assert.equal(
      await page
        .locator('#staff-policy-filter')
        .evaluate((element) => element === document.activeElement),
      true,
    );
    assert.equal(
      await page.locator('#staff-metric-customers').textContent(),
      '1',
    );
    assert.equal(
      await page.locator('#staff-metric-policies').textContent(),
      '3',
    );
    assert.match(
      await page.locator('#staff-customer-table tbody').textContent(),
      /Matti ja Liisa/,
    );
    assert.equal(
      await page.locator('#staff-customer-table tbody tr').count(),
      1,
    );
    await page.locator('#staff-case-filter').selectOption('first_baby');
    assert.equal(
      await page.locator('#staff-metric-customers').textContent(),
      '0',
    );
    assert.equal(
      await page.locator('#staff-metric-feedback').textContent(),
      '—',
    );
    assert.equal(await page.locator('.empty-state').isVisible(), true);
    assert.doesNotMatch(
      await page.locator('#staff-report').textContent(),
      /NaN|Infinity/,
    );
    await audit('personnel empty cohort');
    await page.locator('#staff-policy-filter').selectOption('all');
    assert.equal(
      await page.locator('#staff-metric-customers').textContent(),
      '1',
    );
    assert.equal(
      await page.locator('#staff-metric-policies').textContent(),
      '2',
    );
    assert.match(
      await page.locator('#staff-customer-table tbody').textContent(),
      /Aino/,
    );
    await page.locator('#staff-case-filter').selectOption('all');
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await audit(`personnel analytics ${width}px`);
    }
    await capture('personnel-mobile.png');
    await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
    if (browser.browserType().name() === 'chromium')
      await page.pdf({
        path: path.join(artifacts, 'personnel-print.pdf'),
        format: 'A4',
      });
    await page.emulateMedia({ media: 'screen' });
    await page.reload();
    assert.equal(
      await page.locator('#staff-policy-filter').inputValue(),
      'all',
    );
    assert.equal(
      await page.locator('#staff-metric-customers').textContent(),
      '3',
    );
    await page
      .getByRole('link', { name: 'Nykyinen asiakas', exact: true })
      .click();
    assert.equal(await portfolio('multi').isChecked(), true);
    assert.deepEqual(errors, []);
    assert.deepEqual(network, []);
    console.log(
      'PASS: all profile/scenario combinations, single relevant pet contact and emergency precedence, filtered benefits/travel tasks/owned baby cover, independent state, read-only cohort analytics, empty filters, mobile, print and no external requests.',
    );
  } finally {
    /* Browser lifecycle belongs to Playwright. */
  }
}
