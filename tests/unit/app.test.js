import assert from 'node:assert/strict';
import { test } from 'vitest';
import { canonicalKnowledge as knowledge } from '../../src/content/index.js';
import { createDomain } from '../../src/domain/engine.ts';
const app = createDomain(knowledge);
const homeModule = () => structuredClone(knowledge.new_home);
test('premium preview separates published-reference programme from proposed prevention saving', () => {
  const none = app.calculatePreventionPrice([]);
  assert.equal(none.baseAnnualCents, 60000);
  assert.equal(none.bundleSavingCents, 6000);
  assert.equal(none.afterBundleCents, 54000);
  assert.equal(none.projectedAnnualCents, 54000);
  assert.equal(none.preventionSavingCents, 0);
  assert.equal(none.approval, 'not-assessed');
  const initial = app.calculatePreventionPrice(
    app.createState().cases.new_home.completedTaskIds,
  );
  assert.equal(initial.projectedAnnualCents, 52920);
  assert.equal(initial.preventionSavingCents, 1080);
  assert.equal(initial.completedActionCount, 1);
  assert.equal(initial.eligibleActionCount, 3);
});

test('eligible actions reach 5 percent; preparation and unrelated identifiers earn nothing', () => {
  const all = app.calculatePreventionPrice([
    'main-valve',
    'kitchen-leaks',
    'floor-drain',
    'professional-review',
  ]);
  assert.equal(all.preventionDiscountBps, 500);
  assert.equal(all.projectedAnnualCents, 51300);
  assert.equal(all.preventionSavingCents, 2700);
  assert.equal(all.completedActionCount, 3);
  assert.equal(
    app.calculatePreventionPrice(['professional-review', 'not-a-task'])
      .projectedAnnualCents,
    54000,
  );
});

test('per-policy cap, duplicate completions and duplicate action records never stack extra awards', () => {
  const module = homeModule();
  module.preventionIncentive.preventionCapBps = 300;
  module.preventionIncentive.eligibleActions.push({
    ...module.preventionIncentive.eligibleActions[0],
  });
  module.preventionIncentive.eligibleActions.push({
    id: 'foreign',
    policyId: 'another-policy',
    taskId: 'floor-drain',
    discountBps: 9000,
  });
  const result = app.calculatePreventionPrice(
    ['main-valve', 'main-valve', 'kitchen-leaks', 'floor-drain'],
    module,
  );
  assert.equal(result.preventionDiscountBps, 300);
  assert.equal(result.projectedAnnualCents, 52380);
  assert.equal(result.eligibleActionCount, 3);
  assert.equal(result.completedActionCount, 3);
});

test('undo reverses the projection; input years and other cases do not affect it', () => {
  const state = app.createState();
  const initial = app.calculatePreventionPrice(
    state.cases.new_home.completedTaskIds,
  ).projectedAnnualCents;
  app.setTaskComplete(state, 'new_home', 'kitchen-leaks', true);
  assert.equal(
    app.calculatePreventionPrice(state.cases.new_home.completedTaskIds)
      .projectedAnnualCents,
    51840,
  );
  app.setTaskComplete(state, 'new_home', 'kitchen-leaks', false);
  app.updateHome(state, 'surfaceYear', 2018);
  app.updateHome(state, 'pipeworkYear', null);
  state.activeCase = 'pet';
  state.cases.pet.symptomIds = [];
  state.cases.pet.completedTaskIds.clear();
  assert.equal(
    app.calculatePreventionPrice(state.cases.new_home.completedTaskIds)
      .projectedAnnualCents,
    initial,
  );
  assert.equal(app.calculateDeduction(1994).deductionPercent, 25);
});

test('price stages round the remaining cents half-up without floating-point loss', () => {
  const module = homeModule();
  const config = module.preventionIncentive;
  config.baseAnnualCents = 101;
  config.bundleDiscountBps = 5000;
  config.preventionCapBps = 5000;
  config.eligibleActions[0].discountBps = 5000;
  const result = app.calculatePreventionPrice(['main-valve'], module);
  assert.equal(result.afterBundleCents, 51);
  assert.equal(result.projectedAnnualCents, 26);
  assert.equal(result.bundleSavingCents, 50);
  assert.equal(result.preventionSavingCents, 25);
  config.baseAnnualCents = Number.MAX_SAFE_INTEGER;
  config.bundleDiscountBps = 1000;
  assert.equal(
    app.calculatePreventionPrice([], module).afterBundleCents,
    8106479329266892,
  );
});

test('unknown or invalid price inputs give no estimate and cannot become a free policy', () => {
  for (const value of [
    null,
    undefined,
    '60000',
    NaN,
    Infinity,
    0,
    -1,
    1.5,
    Number.MAX_SAFE_INTEGER + 1,
  ]) {
    const module = homeModule();
    module.preventionIncentive.baseAnnualCents = value;
    assert.equal(
      app.calculatePreventionPrice([], module),
      null,
      `base ${value}`,
    );
  }
  for (const field of ['bundleDiscountBps', 'preventionCapBps']) {
    for (const value of [null, undefined, '1000', NaN, -1, 1.5, 10000]) {
      const module = homeModule();
      module.preventionIncentive[field] = value;
      assert.equal(
        app.calculatePreventionPrice([], module),
        null,
        `${field} ${value}`,
      );
    }
  }
  assert.equal(app.calculatePreventionPrice(null), null);
  assert.equal(app.calculatePreventionPrice('main-valve'), null);
  const tiny = homeModule();
  tiny.preventionIncentive.baseAnnualCents = 1;
  tiny.preventionIncentive.bundleDiscountBps = 9999;
  assert.equal(app.calculatePreventionPrice([], tiny), null);
});

test('conflicting action mappings and missing configuration do not silently produce an offer', () => {
  for (const edit of [
    (module) => {
      module.preventionIncentive.eligibleActions[0].discountBps = -1;
    },
    (module) => {
      module.preventionIncentive.eligibleActions[0].taskId = 'unknown';
    },
    (module) => {
      module.preventionIncentive.eligibleActions.push({
        ...module.preventionIncentive.eligibleActions[0],
        discountBps: 300,
      });
    },
    (module) => {
      module.preventionIncentive.eligibleActions.push({
        ...module.preventionIncentive.eligibleActions[0],
        id: 'alias',
      });
    },
    (module) => {
      module.preventionIncentive.policyId = null;
    },
    (module) => {
      module.preventionIncentive.rounding = 'unspecified';
    },
    (module) => {
      module.preventionIncentive = null;
    },
  ]) {
    const module = homeModule();
    edit(module);
    assert.equal(app.calculatePreventionPrice(['main-valve'], module), null);
  }
});

test('production calculation matches policy boundaries and keeps coverage unknown', () => {
  for (const [year, deduction] of [
    [2026, 0],
    [1997, 0],
    [1996, 25],
    [1994, 25],
    [1976, 25],
    [1975, 50],
    [1970, 50],
  ]) {
    const result = app.calculateDeduction(year);
    assert.equal(result.deductionPercent, deduction, `year ${year}`);
    assert.equal(result.remainingPercent, 100 - deduction);
    assert.equal(result.age, 2026 - year);
    assert.equal(result.coverageKnown, false);
  }
});

test('missing, non-numeric, fractional and out-of-range years produce no estimate', () => {
  for (const year of [
    null,
    undefined,
    '',
    '1994',
    NaN,
    Infinity,
    true,
    1994.5,
    1969,
    2027,
    -1,
  ]) {
    assert.equal(app.calculateDeduction(year), null, String(year));
  }
});

test('surface updates leave pipe year and financial result independent', () => {
  const state = app.createState();
  const result = app.calculateDeduction(state.cases.new_home.pipeworkYear);
  app.updateHome(state, 'surfaceYear', 2018);
  assert.equal(state.cases.new_home.surfaceYear, 2018);
  assert.equal(state.cases.new_home.pipeworkYear, 1994);
  assert.equal(
    app.calculateDeduction(state.cases.new_home.pipeworkYear).deductionPercent,
    result.deductionPercent,
  );
  app.updateHome(state, 'surfaceYear', 2020);
  assert.equal(state.cases.new_home.surfaceYear, 2018);
});

test('task updates are idempotent and isolated between cases and page instances', () => {
  const state = app.createState();
  const second = app.createState();
  const absenceBefore = JSON.stringify([
    ...state.cases.absence.completedTaskIds,
  ]);
  assert.equal(app.readiness(state, 'new_home').completed, 1);
  app.setTaskComplete(state, 'new_home', 'kitchen-leaks', true);
  app.setTaskComplete(state, 'new_home', 'kitchen-leaks', true);
  app.setTaskComplete(state, 'new_home', 'not-a-task', true);
  assert.equal(app.readiness(state, 'new_home').completed, 2);
  assert.equal(app.readiness(state, 'new_home').percent, 50);
  assert.equal(app.readiness(second, 'new_home').completed, 1);
  assert.equal(
    JSON.stringify([...state.cases.absence.completedTaskIds]),
    absenceBefore,
  );
  app.setTaskComplete(state, 'new_home', 'kitchen-leaks', false);
  assert.equal(app.readiness(state, 'new_home').completed, 1);
  assert.equal(knowledge.new_home.defaults.completedTaskIds.length, 1);
});
