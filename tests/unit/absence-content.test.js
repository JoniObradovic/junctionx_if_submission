// Structural/evidence constraints transcribed during research; not clinical or coverage validation.
import assert from 'node:assert/strict';
import { test } from 'vitest';
import { canonicalKnowledge } from '../../src/content/index.ts';
const absence = canonicalKnowledge.absence;
test('more-than-one-week water condition is seasonal-independent and requires building applicability', () => {
  // Source wording is "yli viikon": seven itself must not trigger the condition.
  const water = absence.rules.extendedAbsence;
  assert.equal(water.durationDaysGreaterThan, 7);
  assert.deepEqual(Array.from(water.seasons), ['winter', 'summer']);
  assert.equal(water.requiresUnoccupiedBuilding, true);
  assert.equal(water.applicability, 'checkPolicyAndBuildingResponsibilities');
  // PDF says both actions, despite the consumer page using "or".
  assert.equal(water.closeBuildingInternalMainValve, true);
  assert.equal(water.turnOffDomesticWaterPumpIfPresent, true);
  assert.equal(water.closeBeforeWaterMeterIfPresent, true);
  const priority = absence.rules.priorityEscalation;
  assert.equal(priority.durationDaysGreaterThan, 7);
  assert.equal(priority.status, 'illustrative');
  assert.deepEqual(Array.from(priority.taskIds), ['water-plan', 'caretaker']);
  assert.equal(priority.priority, 'critical');
});

test('weekly special-condition monitoring is separate from general monthly visits', () => {
  const cold = absence.rules.insufficientBaseHeat;
  assert.equal(cold.condition, 'coldSeasonWithoutSufficientBaseHeat');
  assert.equal(cold.drainLviAndPipework, true);
  assert.equal(cold.maintainWaterMeterRoomHeat, true);
  assert.equal(cold.heatingVisitAtLeastEveryDays, 7);
  assert.equal(
    absence.rules.buildingMonitoring.minimumVisitFrequency,
    'atLeastOnceAMonth',
  );
  assert.equal(absence.rules.winterHeating.minimumTemperatureC, null);
  assert.equal(absence.rules.compensation.reductionPercent, null);
  assert.equal(absence.rules.compensation.calculationEnabled, false);
});

test('default handoff assignments are observable tasks and never shared plumbing operations', () => {
  const tasks = new Map(absence.tasks.map((task) => [task.id, task]));
  for (const id of absence.defaults.assignedTaskIds) {
    assert.equal(tasks.get(id)?.delegatable, true, `${id} can be assigned`);
    assert.ok(tasks.get(id).delegationText.trim());
  }
  assert.equal(tasks.get('water-plan').delegatable, false);
  assert.equal(tasks.get('caretaker').delegatable, false);
  assert.equal(tasks.get('heating').when.season, 'winter');
  assert.equal(tasks.get('mailbox').when, undefined);
  assert.equal(
    absence.delegation.includeOnlyVisibleAssignedIncompleteTasks,
    true,
  );
  assert.ok(absence.delegation.emptyText);
  assert.ok(
    absence.actions.find((action) => action.id === 'copy-message')
      .fallbackLabel,
  );
});

test('demo defaults, duration limits and date anchors remain coherent', () => {
  const duration = absence.controls.find(
    (control) => control.id === 'durationDays',
  );
  assert.deepEqual([duration.min, duration.max, duration.step], [2, 30, 1]);
  assert.equal(absence.defaults.season, 'winter');
  assert.equal(absence.defaults.durationDays, 14);
  assert.equal(absence.referenceYear, 2026);
  assert.equal(absence.rules.tripDates.departureBySeason.winter, '2026-02-15');
  assert.equal(absence.rules.tripDates.departureBySeason.summer, '2026-07-15');
  assert.equal(
    absence.rules.tripDates.returnDateBasis,
    'departurePlusDurationCalendarDays',
  );
  const taskIds = new Set(absence.tasks.map((task) => task.id));
  for (const id of [
    ...absence.defaults.completedTaskIds,
    ...absence.rules.priorityEscalation.taskIds,
  ]) {
    assert.ok(taskIds.has(id), `known task ${id}`);
  }
});

test('all decision and editorial records carry traceable sources, status and limitations', () => {
  const ids = new Set(absence.sources.map((source) => source.id));
  assert.equal(ids.size, absence.sources.length);
  for (const record of [
    ...Object.values(absence.rules),
    ...Object.values(absence.insights),
    ...absence.tasks,
    absence.delegation,
    ...absence.actions,
    absence.business,
  ]) {
    assert.ok(
      ['verified', 'illustrative', 'unverified'].includes(record.status),
    );
    assert.ok(record.limitation.trim());
    assert.ok(record.sourceIds.length);
    for (const id of record.sourceIds)
      assert.ok(ids.has(id), `known source ${id}`);
  }
});
