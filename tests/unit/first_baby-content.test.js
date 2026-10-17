// Structural/evidence constraints transcribed during research; not clinical or coverage validation.
import assert from 'node:assert/strict';
import { test } from 'vitest';
import { canonicalKnowledge } from '../../src/content/index.ts';
const baby = canonicalKnowledge.first_baby;
test('car-seat lifetime and approval metadata do not become a safety certificate', () => {
  const rule = baby.rules.carSeat;
  assert.equal(rule.universalMaximumAgeYears, null);
  assert.equal(rule.lifetimeBasis, 'manufacturerAndModel');
  assert.equal(rule.newSaleApproval, 'UN ECE R129');
  assert.deepEqual(Array.from(rule.legacyUseApprovals), [
    'UN ECE R44/03',
    'UN ECE R44/04',
  ]);
  assert.equal(rule.allR129AreISize, false);
  assert.equal(rule.automaticSafetyApproval, false);
});

test('cot advice uses the verified maximum only and separates changing-unit scope', () => {
  assert.equal(baby.rules.cotBarSpacing.maximumGapCm, 6.5);
  assert.equal(baby.rules.cotBarSpacing.minimumGapCm, null);
  const cot = baby.standards.find((record) => record.id === 'cot');
  const changing = baby.standards.find(
    (record) => record.id === 'changing-unit',
  );
  assert.deepEqual(Array.from(cot.sourceIds), ['baby-bsi-cot-metadata']);
  assert.deepEqual(Array.from(changing.sourceIds), [
    'baby-bsi-changing-metadata',
  ]);
});

test('insurance keeps calendar months, postnatal age and unknown eligibility distinct', () => {
  assert.equal(baby.defaults.weeksUntilDue, 6);
  const rule = baby.rules.insuranceTiming;
  assert.equal(rule.latestBeforeDue.value, 2);
  assert.equal(rule.latestBeforeDue.unit, 'calendarMonths');
  assert.equal(rule.postnatalMinimumAgeDays, 7);
  assert.equal(rule.healthDeclarationRequiredForChildInsurance, true);
  assert.equal(rule.automaticEligibilityCheck, false);
  assert.equal(baby.insights.insurance.alwaysVisible, true);
  assert.equal(baby.insights.insurance.when, undefined);
});

test('all categories retain common checks in new and used modes; history checks are additional', () => {
  assert.equal(baby.defaults.category, 'all');
  assert.equal(baby.defaults.equipmentCondition, 'used');
  const categories = Array.from(
    baby.controls.find((control) => control.id === 'category').options,
    (option) => option.value,
  );
  const modes = Array.from(
    baby.controls.find((control) => control.id === 'equipmentCondition')
      .options,
    (option) => option.value,
  );
  assert.deepEqual(categories, ['all', 'car', 'sleep', 'home']);
  assert.deepEqual(modes, ['new', 'used']);
  for (const mode of modes) {
    const applicable = baby.tasks.filter(
      (task) => !task.when || task.when.equipmentCondition === mode,
    );
    for (const category of categories.filter((value) => value !== 'all')) {
      assert.ok(
        applicable.some((task) => task.category === category),
        `${mode}/${category} has checks`,
      );
    }
  }
  for (const id of [
    'seat-fit',
    'cot-check',
    'changing-unit',
    'sleep-cords',
    'chemicals',
    'electricity',
  ]) {
    assert.equal(
      baby.tasks.find((task) => task.id === id).when,
      undefined,
      `${id} applies to both modes`,
    );
  }
  for (const id of ['seat-history', 'used-furniture']) {
    assert.equal(
      baby.tasks.find((task) => task.id === id).when.equipmentCondition,
      'used',
    );
  }
  assert.equal(baby.rules.filtering.categoryChangesApplicability, false);
  assert.equal(
    baby.rules.filtering.readinessBasis,
    'allConditionApplicableTasks',
  );
  assert.equal(baby.rules.filtering.preserveHiddenTaskState, true);
});

test('every rule, standard, insight, task, action and business record has evidence and limitations', () => {
  const sourceIds = new Set(baby.sources.map((source) => source.id));
  assert.equal(sourceIds.size, baby.sources.length);
  for (const record of [
    ...Object.values(baby.rules),
    ...baby.standards,
    ...Object.values(baby.insights),
    ...baby.tasks,
    ...baby.actions,
    baby.business,
  ]) {
    assert.ok(
      ['verified', 'illustrative', 'unverified'].includes(record.status),
    );
    assert.ok(record.limitation.trim());
    assert.ok(record.sourceIds.length);
    for (const id of record.sourceIds)
      assert.ok(sourceIds.has(id), `known source ${id}`);
  }
  const categories = new Set(
    baby.controls
      .find((control) => control.id === 'category')
      .options.map((option) => option.value),
  );
  const ids = new Set(baby.tasks.map((task) => task.id));
  assert.equal(ids.size, baby.tasks.length);
  for (const task of baby.tasks) assert.ok(categories.has(task.category));
  for (const id of baby.defaults.completedTaskIds) assert.ok(ids.has(id));
});
