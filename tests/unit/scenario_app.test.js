import assert from 'node:assert/strict';
import { test } from 'vitest';
import {
  canonicalKnowledge as knowledge,
  canonicalExperience,
} from '../../src/content/index.ts';
import { createDomain } from '../../src/domain/engine.ts';
const app = createDomain(knowledge, canonicalExperience);
test('absence dates and strict 7/8-day priority boundary agree in both seasons', () => {
  const state = app.createState();
  assert.equal(app.absenceTrip(state).returnDate, '2026-03-01');
  for (const season of ['winter', 'summer']) {
    app.updateScenario(state, 'absence', 'season', season);
    app.updateScenario(state, 'absence', 'durationDays', 7);
    assert.equal(
      app.absencePriority(state, knowledge.absence.tasks[0]),
      'high',
    );
    app.updateScenario(state, 'absence', 'durationDays', 8);
    assert.equal(
      app.absencePriority(state, knowledge.absence.tasks[0]),
      'critical',
    );
    assert.equal(
      app.absenceTrip(state).returnDate,
      season === 'winter' ? '2026-02-23' : '2026-07-23',
    );
    assert.equal(
      app.absencePriority(
        state,
        knowledge.absence.tasks.find((task) => task.id === 'caretaker'),
      ),
      'critical',
    );
    assert.equal(
      app.absencePriority(
        state,
        knowledge.absence.tasks.find((task) => task.id === 'appliance-taps'),
      ),
      'high',
    );
  }
});

test('default pet needs prompt contact in every duration, regardless of completed tasks', () => {
  const state = app.createState();
  for (const option of knowledge.pet.controls.find(
    (control) => control.id === 'duration',
  ).options) {
    app.updateScenario(state, 'pet', 'duration', option.value);
    for (const task of knowledge.pet.tasks)
      app.setTaskComplete(state, 'pet', task.id, true);
    assert.equal(app.petRoute(state), 'urgent');
    assert.equal(app.petAction(state, 'remote-demo'), null);
    assert.equal(app.petAction(state, 'urgent-help').id, 'urgent-help');
  }
});

test('each emergency sign overrides symptoms, invalid duration, benign observations and completed tasks', () => {
  for (const sign of knowledge.pet.emergencySigns) {
    for (const duration of ['under-6h', '6-24h', 'over-24h', 'invalid', null]) {
      const state = app.createState();
      state.cases.pet.symptomIds = [];
      state.cases.pet.duration = duration;
      app.setPetObservation(state, 'breathing', 'unremarkable');
      app.setPetObservation(state, 'waterRetention', 'retained');
      app.setPetSelection(state, 'emergencySignIds', sign.id, true);
      for (const task of knowledge.pet.tasks)
        app.setTaskComplete(state, 'pet', task.id, true);
      assert.equal(app.petRoute(state), 'emergency');
      assert.equal(app.petAction(state, 'remote-demo'), null);
      assert.equal(app.petAction(state, 'urgent-help'), null);
      assert.equal(app.petAction(state, 'emergency-help').id, 'emergency-help');
    }
  }
});

test('dangerous observations override checklist progress without a symptom-chip requirement', () => {
  for (const [id, value] of [
    ['breathing', 'difficult'],
    ['waterRetention', 'vomited'],
  ]) {
    const state = app.createState();
    state.cases.pet.symptomIds = [];
    app.setPetObservation(state, id, value);
    assert.equal(app.petRoute(state), 'emergency');
  }
});

test('fallback contact is never home-care clearance and stale remote requests are rejected', () => {
  const state = app.createState();
  state.cases.pet.symptomIds = [];
  assert.equal(app.petRoute(state), 'contact');
  assert.equal(app.petAction(state, 'vet-contact-help').id, 'vet-contact-help');
  app.setPetSelection(state, 'symptomIds', 'vomiting-diarrhea', true);
  app.updateScenario(state, 'pet', 'duration', 'over-24h');
  assert.equal(app.petRoute(state), 'urgent');
  assert.equal(app.petAction(state, 'remote-demo'), null);
  app.setPetObservation(state, 'waterRetention', 'vomited');
  assert.equal(app.petRoute(state), 'emergency');
  assert.equal(app.petAction(state, 'remote-demo'), null);
});

test('nested defaults, page instances and policy incentives remain independent', () => {
  const state = app.createState();
  const second = app.createState();
  state.cases.pet.observations.breathing = 'difficult';
  state.cases.pet.symptomIds.length = 0;
  state.cases.absence.assignedTaskIds.clear();
  assert.equal(second.cases.pet.observations.breathing, 'unknown');
  assert.equal(second.cases.pet.symptomIds.length, 2);
  assert.equal(second.cases.absence.assignedTaskIds.size, 2);
  assert.equal(knowledge.pet.defaults.observations.breathing, 'unknown');
  for (const id of ['absence', 'first_baby', 'pet'])
    for (const task of knowledge[id].tasks)
      app.setTaskComplete(state, id, task.id, true);
  assert.equal(
    app.calculatePreventionPrice(state.cases.new_home.completedTaskIds)
      .projectedAnnualCents,
    52920,
  );
});
