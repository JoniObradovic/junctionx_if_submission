// Structural/evidence constraints transcribed during research; not clinical or coverage validation.
import assert from 'node:assert/strict';
import { test } from 'vitest';
import { canonicalKnowledge } from '../../src/content/index.ts';
const pet = canonicalKnowledge.pet;
test('urgent routes cannot select the simulated remote handoff as their primary action', () => {
  const actions = new Map(pet.actions.map((action) => [action.id, action]));
  for (const route of ['emergency', 'urgent', 'contact']) {
    const action = actions.get(pet.rules.routing.primaryActionByRoute[route]);
    assert.ok(action.allowedRoutes.includes(route));
  }
  assert.notEqual(
    pet.rules.routing.primaryActionByRoute.emergency,
    'remote-demo',
  );
  assert.notEqual(pet.rules.routing.primaryActionByRoute.urgent, 'remote-demo');
  assert.equal(actions.has('remote-demo'), false);
  assert.deepEqual(Array.from(actions.get('vet-contact-help').allowedRoutes), [
    'contact',
  ]);
  assert.deepEqual(Array.from(actions.get('insured-help').allowedRoutes), [
    'contact',
    'urgent',
  ]);
});

test('current remote benefit is conditional and does not reuse the FirstVet visit cap', () => {
  assert.equal(pet.service.eligibilityStatus, 'unknown');
  assert.equal(pet.service.unlimitedConsultations, true);
  assert.equal(pet.service.annualVisitLimit, null);
  assert.equal(pet.service.remoteServiceDeductibleEur, 0);
  assert.equal(pet.service.partOfInsuranceContract, false);
  assert.deepEqual(Array.from(pet.service.eligibleInsuranceTypes), [
    'dog',
    'cat',
    'horse',
  ]);
  assert.equal(pet.service.availability.otherTimes, 'Puhelinpäivystys');
});

test('symptom, observation, task, action and source references are complete', () => {
  const ids = new Set(pet.sources.map((source) => source.id));
  const symptomIds = new Set(pet.symptoms.map((record) => record.id));
  const emergencyIds = new Set(pet.emergencySigns.map((record) => record.id));
  const observations = new Map(
    pet.observations.map((record) => [record.id, record]),
  );
  for (const record of [
    ...Object.values(pet.rules),
    ...Object.values(pet.insights),
    ...pet.symptoms,
    ...pet.emergencySigns,
    ...pet.observations,
    ...pet.tasks,
    ...pet.actions,
    pet.service,
    pet.packet,
    pet.business,
  ]) {
    assert.ok(
      ['verified', 'illustrative', 'unverified'].includes(record.status),
    );
    assert.ok(record.limitation.trim());
    assert.ok(record.sourceIds.length);
    for (const id of record.sourceIds)
      assert.ok(ids.has(id), `known source ${id}`);
  }
  for (const id of [
    ...pet.defaults.symptomIds,
    ...pet.rules.routing.urgent.anySymptomIds,
    ...pet.rules.routing.urgent.allSymptomIdsWithDuration.symptomIds,
  ])
    assert.ok(symptomIds.has(id));
  for (const id of pet.defaults.emergencySignIds)
    assert.ok(emergencyIds.has(id));
  for (const [id, value] of Object.entries(pet.defaults.observations)) {
    assert.ok(
      observations.get(id)?.options.some((option) => option.value === value),
    );
  }
  for (const predicate of pet.rules.routing.emergency.anyObservationEquals) {
    assert.ok(
      observations
        .get(predicate.id)
        ?.options.some((option) => option.value === predicate.value),
    );
  }
});
