import assert from 'node:assert/strict';
import { test } from 'vitest';
import { canonicalKnowledge as knowledge } from '../../src/content/index.js';
import { createDomain } from '../../src/domain/engine.ts';
const app = createDomain(knowledge);
test('pet service depends on the fictional insurance portfolio, not just customer status', () => {
  const visitor = app.createState();
  assert.equal(app.petServiceAccess(visitor), 'unknown');
  const customer = app.createState('customer');
  assert.equal(app.petServiceAccess(customer), 'included');
  customer.portfolioId = 'home';
  assert.equal(app.petServiceAccess(customer), 'notIncluded');
  customer.portfolioId = 'missing';
  assert.equal(app.petServiceAccess(customer), 'unknown');
  assert.equal(app.createState('staff').audience, 'visitor');
});

test('audiences have independent state and eligibility cannot change clinical urgency or pricing', () => {
  const visitor = app.createState();
  const customer = app.createState('customer');
  app.setTaskComplete(customer, 'new_home', 'floor-drain', true);
  assert.equal(
    visitor.cases.new_home.completedTaskIds.has('floor-drain'),
    false,
  );
  for (const state of [visitor, customer]) {
    for (const portfolioId of ['multi', 'home', 'missing']) {
      state.portfolioId = portfolioId;
      assert.equal(app.petRoute(state), 'urgent');
      app.setPetSelection(state, 'emergencySignIds', 'collapse', true);
      assert.equal(app.petRoute(state), 'emergency');
      assert.equal(app.petAction(state, 'remote-demo'), null);
      app.setPetSelection(state, 'emergencySignIds', 'collapse', false);
    }
  }
});

test('each profile gets one pet contact action and emergency always overrides service entitlement', () => {
  for (const audience of ['visitor', 'customer']) {
    for (const portfolio of ['multi', 'home', 'family']) {
      const state = app.createState(audience);
      if (audience === 'customer') app.setPortfolio(state, portfolio);
      const insured = audience === 'customer' && portfolio === 'multi';
      assert.equal(
        app.petPrimaryAction(state).id,
        insured
          ? 'insured-help'
          : audience === 'customer'
            ? 'intro-help'
            : 'urgent-help',
      );
      state.cases.pet.symptomIds = [];
      assert.equal(
        app.petPrimaryAction(state).id,
        insured
          ? 'insured-help'
          : audience === 'customer'
            ? 'intro-help'
            : 'vet-contact-help',
      );
      assert.equal(
        app.petAction(state, insured ? 'vet-contact-help' : 'insured-help'),
        null,
      );
      app.setPetSelection(state, 'emergencySignIds', 'collapse', true);
      assert.equal(app.petPrimaryAction(state).id, 'emergency-help');
      assert.equal(app.petAction(state, 'insured-help'), null);
    }
  }
});

test('selected portfolio changes the actual home projection and visitors get no assumed bundle benefit', () => {
  const visitor = app.createState();
  assert.equal(app.calculateHomePrice(visitor).bundleDiscountBps, 0);
  assert.equal(app.calculateHomePrice(visitor).projectedAnnualCents, 58800);
  assert.equal(app.setPortfolio(visitor, 'multi'), false);
  const customer = app.createState('customer');
  assert.equal(app.calculateHomePrice(customer).projectedAnnualCents, 52920);
  assert.equal(app.setPortfolio(customer, 'home'), true);
  assert.equal(app.calculateHomePrice(customer).projectedAnnualCents, 58800);
  app.setTaskComplete(customer, 'new_home', 'kitchen-leaks', true);
  assert.equal(app.calculateHomePrice(customer).projectedAnnualCents, 57600);
  assert.equal(app.setPortfolio(customer, 'multi'), true);
  assert.equal(app.calculateHomePrice(customer).projectedAnnualCents, 51840);
  assert.equal(app.setPortfolio(customer, 'missing'), false);
  assert.equal(customer.portfolioId, 'multi');
  customer.portfolioId = 'missing';
  assert.equal(app.calculateHomePrice(customer), null);
});

test('home year controls change the next action, never manufacture an age-based premium discount', () => {
  const state = app.createState();
  assert.equal(app.homeGuidance(state).nextTask.id, 'professional-review');
  app.updateHome(state, 'pipeworkYear', 2026);
  assert.equal(app.homeGuidance(state).result.deductionPercent, 0);
  assert.equal(app.homeGuidance(state).nextTask.id, 'kitchen-leaks');
  const price = app.calculateHomePrice(state).projectedAnnualCents;
  app.updateHome(state, 'surfaceYear', 2018);
  assert.equal(app.calculateHomePrice(state).projectedAnnualCents, price);
  app.updateHome(state, 'pipeworkYear', null);
  assert.equal(app.homeGuidance(state).result, null);
  assert.equal(app.homeGuidance(state).nextTask.id, 'professional-review');
  for (const task of knowledge.new_home.tasks)
    app.setTaskComplete(state, 'new_home', task.id, true);
  assert.equal(app.homeGuidance(state).nextTask, null);
});

test('one-use introduction survives portfolio switches and emergencies bypass it', () => {
  const state = app.createState('customer');
  app.setPortfolio(state, 'home');
  assert.equal(app.petIntroAvailable(state), true);
  app.setPetSelection(state, 'emergencySignIds', 'collapse', true);
  assert.equal(app.usePetIntro(state), false);
  assert.equal(app.petPrimaryAction(state).id, 'emergency-help');
  app.setPetSelection(state, 'emergencySignIds', 'collapse', false);
  assert.equal(app.usePetIntro(state), true);
  assert.equal(app.usePetIntro(state), false);
  for (const id of ['multi', 'family', 'home']) {
    app.setPortfolio(state, id);
    assert.equal(app.petIntroAvailable(state), false);
  }
  assert.equal(app.petRoute(state), 'urgent');
  assert.equal(app.createState('customer').cases.pet.introContactUsed, false);
});
