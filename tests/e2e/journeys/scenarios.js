const baselineTaskIds = {
  new_home: [
    'floor-drain',
    'kitchen-leaks',
    'main-valve',
    'professional-review',
  ],
  absence: [
    'appliance-taps',
    'caretaker',
    'heating',
    'locks',
    'mailbox',
    'water-plan',
  ],
  first_baby: [
    'changing-unit',
    'chemicals',
    'cot-check',
    'electricity',
    'seat-fit',
    'seat-history',
    'sleep-cords',
    'used-furniture',
  ],
  pet: [
    'background',
    'notice-urgency',
    'symptom-timeline',
    'water-observation',
  ],
};
import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
import fs from 'node:fs';

export async function scenariosJourney(browser, baseURL, artifacts) {
  fs.mkdirSync(artifacts, { recursive: true });
  try {
    console.log(
      `Browser: ${browser.browserType().name()} ${browser.version()}`,
    );
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    await context.addInitScript(() => {
      window.__copyMode = 'fail';
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText(text) {
            window.__copiedText = text;
            if (window.__copyMode === 'pending')
              return new Promise((resolve) => {
                window.__finishCopy = resolve;
              });
            return window.__copyMode === 'success'
              ? Promise.resolve()
              : Promise.reject(new Error('Permission denied for test'));
          },
        },
      });
    });
    const page = await context.newPage();
    const errors = [],
      requests = [];
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
        requests.push(request.url());
    });
    const chooseCase = (id) =>
      page.locator(`#scenario-nav [data-case="${id}"]`).click();
    const task = (id) => page.locator(`[data-task="${id}"]`);
    const radio = (field, value) =>
      page.locator(`[data-field="${field}"][value="${value}"]`);
    const symptom = (id) =>
      page.locator(`[data-pet-field="symptomIds"][value="${id}"]`);
    const danger = (id) =>
      page.locator(`[data-pet-field="emergencySignIds"][value="${id}"]`);
    async function checkTaskCoverage(caseId) {
      const expected = baselineTaskIds[caseId];
      const actual = await page
        .locator('[data-task]')
        .evaluateAll((elements) =>
          elements.map((element) => element.dataset.task).sort(),
        );
      assert.deepEqual(
        actual,
        expected,
        `${caseId}: every applicable task appears exactly once`,
      );
    }
    async function accessibility(label) {
      if (!axePath) return;
      if (!(await page.evaluate(() => !!window.axe)))
        await page.addScriptTag({ path: axePath });
      const failures = await page.evaluate(async () =>
        (
          await window.axe.run(document, {
            preload: false,
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
          })
        ).violations.map((item) => ({
          id: item.id,
          impact: item.impact,
          nodes: item.nodes.map((node) => node.html),
        })),
      );
      assert.deepEqual(failures, [], `accessibility: ${label}`);
      console.log(`PASS: accessibility ${label}`);
    }
    async function route(expected) {
      assert.equal(
        await page.locator('#pet-route').getAttribute('data-route'),
        expected,
      );
    }
    async function finishCopy() {
      await page.evaluate(async () => {
        window.__finishCopy();
        await Promise.resolve();
        await Promise.resolve();
      });
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

    await page.goto(new URL('index.html', baseURL).href);
    for (const name of [
      'Uusi koti',
      'Koti tyhjillään',
      'Ensimmäinen lapsi',
      'Lemmikin vointi',
    ]) {
      assert.equal(
        await page.getByRole('button', { name: new RegExp(name) }).count(),
        1,
        `named navigation for ${name}`,
      );
    }
    await chooseCase('absence');
    await checkTaskCoverage('absence');
    assert.equal(
      await task('water-plan').evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top >= 0 && bounds.bottom <= window.innerHeight;
      }),
      true,
      'the first departure task is visible beside the trip controls',
    );
    assert.equal(
      await page.locator('#case-progress-count').textContent(),
      '0/6 tehty',
    );
    assert.match(
      await page.locator('#absence-dates').textContent(),
      /1\.3\.2026/,
    );
    assert.match(
      await page.locator('#absence-message').inputValue(),
      /lämmitys toimii/,
    );
    await accessibility('absence default');
    const slider = page.locator('#absence-duration');
    await slider.focus();
    await page.keyboard.press('Home');
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
    assert.equal(await slider.inputValue(), '7');
    assert.equal(
      await page.locator('[data-priority="water-plan"]').textContent(),
      'Korkea prioriteetti',
    );
    assert.equal(await page.locator('#absence-water').isVisible(), false);
    await page.keyboard.press('ArrowRight');
    assert.equal(await slider.inputValue(), '8');
    assert.equal(
      await page.locator('[data-priority="water-plan"]').textContent(),
      'Kriittinen huomio',
    );
    assert.equal(await page.locator('#absence-water').isVisible(), true);
    assert.equal(
      await slider.evaluate((element) => element === document.activeElement),
      true,
    );
    await task('heating').check();
    assert.equal(
      await task('heating').evaluate(
        (element) => element === document.activeElement,
      ),
      true,
    );
    assert.doesNotMatch(
      await page.locator('#absence-message').inputValue(),
      /lämmitys toimii/,
    );
    assert.equal(
      await page.locator('[data-assign="heating"]').isDisabled(),
      true,
    );
    await task('heating').uncheck();
    assert.match(
      await page.locator('#absence-message').inputValue(),
      /lämmitys toimii/,
    );
    await radio('season', 'summer').check();
    assert.equal(await task('heating').count(), 0);
    assert.equal(await page.locator('#absence-winter').isVisible(), false);
    assert.equal(
      await page.locator('#case-progress-count').textContent(),
      '0/5 tehty',
    );
    assert.doesNotMatch(
      await page.locator('#absence-message').inputValue(),
      /lämmitys toimii/,
    );
    assert.match(
      await page.locator('#absence-message').inputValue(),
      /15\.7\.2026–23\.7\.2026/,
    );
    await page.locator('#copy-absence').click();
    assert.match(
      await page.locator('#copy-status').textContent(),
      /Kopiointi ei onnistunut/,
    );
    assert.match(
      await page.locator('#copy-status').textContent(),
      /Mitään ei lähetetty/,
    );
    assert.equal(
      await page
        .locator('#absence-message')
        .evaluate(
          (element) =>
            element.selectionStart === 0 &&
            element.selectionEnd === element.value.length,
        ),
      true,
    );
    await page.evaluate(() => {
      window.__copyMode = 'success';
    });
    await page.locator('#copy-absence').click();
    assert.match(
      await page.locator('#copy-status').textContent(),
      /Viesti kopioitu/,
    );
    assert.equal(
      await page.evaluate(() => window.__copiedText),
      await page.locator('#absence-message').inputValue(),
    );
    await page.evaluate(() => {
      window.__copyMode = 'pending';
    });
    await page.locator('#copy-absence').click();
    await slider.evaluate((element) => {
      element.value = 9;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await finishCopy();
    assert.equal(await page.locator('#copy-status').textContent(), '');
    await task('mailbox').check();
    assert.equal(await page.locator('#copy-absence').isDisabled(), true);
    await radio('season', 'winter').check();
    assert.equal(
      await page.locator('[data-assign="heating"]').isChecked(),
      true,
    );
    assert.equal(await page.locator('#copy-absence').isDisabled(), false);
    await capture('absence-desktop.png');

    await chooseCase('first_baby');
    await checkTaskCoverage('first_baby');
    assert.equal(
      await page.locator('#case-progress-count').textContent(),
      '0/8 tehty',
    );
    assert.equal(await page.locator('[data-task]').count(), 8);
    for (const name of ['Pinnasängyt: EN 716-1', 'Hoitotasot: EN 12221']) {
      const note = page
        .locator('.topic-details')
        .filter({ has: page.getByText(name, { exact: true }) });
      await note.locator(':scope > summary').click();
      assert.doesNotMatch(await note.textContent(), /undefined/);
      assert.match(await note.textContent(), /soveltamisala/);
      await note.locator(':scope > summary').click();
    }
    assert.match(
      await page.locator('.insurance-note').textContent(),
      /määräaika.*ohitettu/,
    );
    await task('seat-fit').check();
    await radio('category', 'car').check();
    assert.equal(
      await radio('category', 'car').evaluate(
        (element) => element === document.activeElement,
      ),
      true,
    );
    assert.equal(await page.locator('#case-tasks [data-task]').count(), 2);
    assert.equal(
      await page.locator('#case-progress-count').textContent(),
      '1/8 tehty',
    );
    await task('seat-history').check();
    await radio('equipmentCondition', 'new').check();
    assert.equal(await page.locator('#case-tasks [data-task]').count(), 1);
    assert.equal(
      await page.locator('#case-progress-count').textContent(),
      '1/6 tehty',
    );
    await accessibility('baby new equipment');
    await radio('equipmentCondition', 'used').check();
    assert.equal(await task('seat-history').isChecked(), true);
    await radio('category', 'home').check();
    assert.equal(
      await page.locator('#case-progress-count').textContent(),
      '2/8 tehty',
    );
    assert.equal(await page.locator('.insurance-note').isVisible(), true);
    await page.locator('[data-action="prepare-questions"]').click();
    assert.match(
      await page.locator('#scenario-packet').inputValue(),
      /\[x\] Selvitä käytetyn istuimen/,
    );
    assert.match(
      await page.locator('#dialog-confirmation').textContent(),
      /Mitään ei lähetetty/,
    );
    await accessibility('baby questions dialog');
    await page.keyboard.press('Escape');
    await radio('category', 'all').check();
    await capture('baby-desktop.png');

    await chooseCase('pet');
    await checkTaskCoverage('pet');
    await route('urgent');
    assert.equal(
      await page.locator('[data-action="vet-contact-help"]').count(),
      0,
    );
    assert.match(
      await page.locator('#pet-route').textContent(),
      /Ota yhteys eläinlääkäriin nyt/,
    );
    assert.equal(await page.locator('.emergency-boundary').isVisible(), true);
    assert.match(
      await page.locator('#pet-packet').inputValue(),
      /Hengityshavainto \(esimerkki\): Ei tiedossa/,
    );
    await accessibility('pet default urgent');
    await page.locator('[data-action="urgent-help"]').click();
    assert.match(
      await page.locator('#dialog-confirmation').textContent(),
      /Puhelua, varausta tai viestiä ei tehty/,
    );
    await page.keyboard.press('Escape');
    await symptom('lethargy').uncheck();
    await route('contact');
    await page.locator('[data-action="vet-contact-help"]').click();
    assert.match(
      await page.locator('#dialog-confirmation').textContent(),
      /Ohje vain/,
    );
    assert.match(
      await page.locator('#dialog-confirmation').textContent(),
      /ei tehty/,
    );
    await accessibility('pet general contact');
    // A state change must dismiss a stale contact instructions even if triggered externally.
    await page.locator('#observation-breathing').evaluate((element) => {
      element.value = 'difficult';
      element.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await route('emergency');
    assert.equal(await page.locator('#help-dialog').isVisible(), false);
    assert.equal(
      await page
        .locator('#pet-route-heading')
        .evaluate((element) => element === document.activeElement),
      true,
    );
    assert.equal(
      await page.locator('[data-action="vet-contact-help"]').count(),
      0,
    );
    await page.locator('#observation-breathing').selectOption('unknown');
    await route('contact');
    for (const id of [
      'breathing-difficulty',
      'bloat-retching',
      'collapse',
      'poisoning',
    ]) {
      await danger(id).check();
      await route('emergency');
      await radio('duration', 'under-6h').check();
      await route('emergency');
      await danger(id).uncheck();
    }
    await page.locator('#observation-waterRetention').focus();
    await page.locator('#observation-waterRetention').selectOption('vomited');
    await route('emergency');
    // Compact columns can keep the route heading visible beside this input.
    // Explicitly leave the heading before requiring its floating counterpart.
    await page.evaluate(() => {
      const heading = document.getElementById('pet-route-heading');
      window.scrollTo(
        0,
        window.scrollY + heading.getBoundingClientRect().bottom + 32,
      );
    });
    await page.waitForFunction(
      () => !document.getElementById('pet-guidance-feedback').hidden,
    );
    assert.match(
      await page.locator('#pet-feedback-heading').textContent(),
      /Hakeudu viipymättä/,
    );
    assert.equal(
      await page
        .locator('#observation-waterRetention')
        .evaluate((element) => element === document.activeElement),
      true,
    );
    await page.locator('[data-show-pet-guidance]').click();
    assert.equal(
      await page
        .locator('#pet-route-heading')
        .evaluate((element) => element === document.activeElement),
      true,
    );
    await accessibility('pet emergency');
    await page.locator('#observation-waterRetention').selectOption('retained');
    await radio('duration', 'over-24h').check();
    await route('urgent');
    for (const id of [
      'notice-urgency',
      'symptom-timeline',
      'water-observation',
      'background',
    ])
      await task(id).check();
    await route('urgent');
    assert.match(
      await page.locator('#pet-packet').inputValue(),
      /eivät tutkimustuloksia/,
    );
    await capture('pet-desktop.png');

    for (const id of ['absence', 'first_baby', 'pet']) {
      await chooseCase(id);
      assert.equal(await page.locator('#judge-card').count(), 0);
      for (const width of [390, 320]) {
        await page.setViewportSize({ width, height: 844 });
        if (id === 'pet') {
          await page.locator('#observation-breathing').scrollIntoViewIfNeeded();
          await page.waitForFunction(
            () => !document.getElementById('pet-guidance-feedback').hidden,
          );
        }
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          true,
          `${id} fits ${width}px`,
        );
      }
      await accessibility(`${id} mobile`);
      await page.evaluate(() => {
        document.activeElement.blur();
        window.window.scrollTo(0, 0);
      });
      await page.screenshot({
        path: path.join(artifacts, `${id}-mobile.png`),
        fullPage: true,
      });
      await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
      assert.equal(await page.locator('#workspace').isVisible(), true);
      if (browser.browserType().name() === 'chromium')
        await page.pdf({
          path: path.join(artifacts, `${id}-print.pdf`),
          format: 'A4',
        });
      await page.emulateMedia({ media: 'screen' });
    }
    await chooseCase('absence');
    assert.equal(await slider.inputValue(), '9');
    assert.equal(await task('mailbox').isChecked(), true);
    await chooseCase('first_baby');
    assert.equal(await task('seat-history').isChecked(), true);
    await chooseCase('pet');
    await route('urgent');
    assert.equal(await task('background').isChecked(), true);
    assert.equal(
      await page.locator('#observation-waterRetention').inputValue(),
      'retained',
    );
    await chooseCase('new_home');
    assert.match(await page.locator('#annual-price').textContent(), /588,00/);
    assert.equal(
      await page.locator('#progress-count').textContent(),
      '1/4 tehty',
    );
    assert.equal(await page.locator('#judge-card').count(), 0);
    await page.reload();
    assert.equal(await page.locator('#judge-mode').count(), 0);
    await chooseCase('absence');
    assert.equal(await slider.inputValue(), '14');
    assert.equal(
      await page.locator('#case-progress-count').textContent(),
      '0/6 tehty',
    );
    assert.deepEqual(requests, [], 'no external service requests');
    assert.deepEqual(errors, [], 'no page, console or local-resource failures');
    console.log(
      `PASS: all remaining cases over HTTP; absence priorities/dates/delegation, clipboard failure/success/stale result, baby filters/readiness/timing, pet precedence/observations/stale service guard, persistence, mobile, print and accessibility. Artifacts: ${artifacts}`,
    );
  } finally {
    /* Browser lifecycle belongs to Playwright. */
  }
}
