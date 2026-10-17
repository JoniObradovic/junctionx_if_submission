// Structural/evidence constraints transcribed during research; not clinical or coverage validation.
import assert from 'node:assert/strict';
import { test } from 'vitest';
import { canonicalKnowledge } from '../../src/content/index.ts';
const home = canonicalKnowledge.new_home;
test('leakage bands match policy boundaries including age 50', () => {
  const bands = home.rules.leakageDeduction.bands;
  for (const [age, expected] of [
    [0, 0],
    [15, 0],
    [16, 0],
    [25, 0],
    [26, 0],
    [29, 0],
    [30, 25],
    [32, 25],
    [35, 25],
    [36, 25],
    [49, 25],
    [50, 25],
    [51, 50],
    [56, 50],
  ]) {
    const matches = bands.filter(
      (band) =>
        age >= band.minAge && (band.maxAge === null || age <= band.maxAge),
    );
    assert.equal(matches.length, 1, `one band for age ${age}`);
    assert.equal(
      matches[0].deductionPercent,
      expected,
      `policy deduction for age ${age}`,
    );
  }
  // No gaps/overlaps throughout the entire slider, not only the sampled boundaries.
  for (let age = 0; age <= 56; age++) {
    assert.equal(
      bands.filter(
        (band) =>
          age >= band.minAge && (band.maxAge === null || age <= band.maxAge),
      ).length,
      1,
    );
  }
  assert.equal(home.referenceYear - home.defaults.pipeworkYear, 32);
  assert.equal(home.rules.leakageDeduction.unknownInputResult, null);
  assert.equal(home.rules.leakageDeduction.eligibleDamageRequired, true);
});

test('surface changes and pipe repairs stay separate from the leakage bar', () => {
  assert.equal(home.rules.surfaceYear.affectsLeakageDeduction, false);
  assert.equal(home.rules.pipeRepair.includedInLeakageBar, false);
  assert.equal(home.rules.pipeRepair.annualDeductionPercent, 3);
  assert.deepEqual(Array.from(home.rules.pipeRepair.noDeductionAges), [0, 1]);
  assert.equal(home.rules.technicalLifespan.criticalAge, null);
  assert.equal(home.rules.technicalLifespan.status, 'unverified');
});

test('all rules, insights, tasks and simulated handoffs carry resolved evidence and limitations', () => {
  const sourceIds = new Set(home.sources.map((source) => source.id));
  const records = [
    ...Object.values(home.rules),
    ...Object.values(home.insights),
    ...home.tasks,
    ...home.actions,
    home.business,
    home.preventionIncentive,
    ...home.publishedBenefits.items,
    home.claimsGuidance,
    ...home.claimsGuidance.items,
  ];
  for (const record of records) {
    assert.ok(
      ['verified', 'illustrative', 'unverified'].includes(record.status),
    );
    assert.ok(record.limitation.trim());
    assert.ok(record.sourceIds.length);
    for (const id of record.sourceIds)
      assert.ok(sourceIds.has(id), `missing source ${id}`);
  }
  for (const id of home.defaults.completedTaskIds)
    assert.ok(home.tasks.some((task) => task.id === id));
  for (const task of home.tasks.filter((task) => task.actionId)) {
    assert.ok(home.actions.some((action) => action.id === task.actionId));
  }
});

test('pricing proposal and claim outcomes stay distinct from published benefits', () => {
  assert.equal(home.preventionIncentive.status, 'illustrative');
  assert.equal(
    home.preventionIncentive.proposalRef,
    'README.md#what-the-prototype-demonstrates',
  );
  assert.equal(home.preventionIncentive.bundleDiscountBps, 1000);
  assert.equal(home.preventionIncentive.preventionCapBps, 500);
  assert.equal(
    home.preventionIncentive.eligibleActions.some(
      (action) => action.taskId === 'professional-review',
    ),
    false,
  );
  assert.equal(home.claimsGuidance.observedSuccessRatePercent, null);
  assert.equal(home.claimsGuidance.successEvidenceStatus, 'unverified');
  const maintenance = home.publishedBenefits.items.find(
    (item) => item.id === 'maintenance',
  );
  assert.ok(maintenance.sourceIds.includes('if-maintenance-data-boundary'));
  assert.match(
    maintenance.limitation,
    /ei käytetä vakuutusmaksun tai korvauspäätöksen/,
  );
  assert.match(
    home.publishedBenefits.items.find((item) => item.id === 'new-customer')
      .limitation,
    /ei sisälly demon hintaan/,
  );
});
