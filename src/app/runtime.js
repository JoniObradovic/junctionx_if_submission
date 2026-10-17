import { canonicalKnowledge } from '../content/index.js';
import { icons } from '../ui/icons.js';
(function () {
  'use strict';

  let knowledge = canonicalKnowledge;
  let language = 'fi';
  function text(value) {
    return language === 'en' &&
      Object.prototype.hasOwnProperty.call(
        canonicalKnowledge.new_home.uiEnglish,
        value,
      )
      ? canonicalKnowledge.new_home.uiEnglish[value]
      : value;
  }
  function setLanguage(value) {
    if (!['fi', 'en'].includes(value)) return false;
    language = value;
    knowledge =
      value === 'fi'
        ? canonicalKnowledge
        : Object.fromEntries(
            Object.entries(canonicalKnowledge).map(([id, original]) => {
              const module = JSON.parse(JSON.stringify(original));
              Object.entries(original.english).forEach(
                ([path, translation]) => {
                  const keys = path.split('.');
                  const last = keys.pop();
                  const parent = keys.reduce((node, key) => node[key], module);
                  parent[last] = translation;
                },
              );
              return [id, module];
            }),
          );
    return true;
  }
  const scenarios = [
    { id: 'new_home', icon: 'home', label: 'Uusi koti' },
    { id: 'absence', icon: 'suitcase', label: 'Koti tyhjillään' },
    { id: 'first_baby', icon: 'baby', label: 'Ensimmäinen lapsi' },
    { id: 'pet', icon: 'paw', label: 'Lemmikin vointi' },
  ];

  function calculateDeduction(year, module = knowledge.new_home) {
    const control = module.controls.find((item) => item.id === 'pipeworkYear');
    if (
      !Number.isInteger(year) ||
      year < control.min ||
      year > control.max ||
      year > module.referenceYear
    )
      return null;
    const age = module.referenceYear - year;
    const band = module.rules.leakageDeduction.bands.find(
      (item) =>
        age >= item.minAge && (item.maxAge === null || age <= item.maxAge),
    );
    if (!band) return null;
    return {
      age,
      deductionPercent: band.deductionPercent,
      remainingPercent: 100 - band.deductionPercent,
      coverageKnown: false,
    };
  }

  function createState(audience = 'visitor') {
    const cases = {};
    scenarios.forEach(({ id }) => {
      const defaults = JSON.parse(JSON.stringify(knowledge[id].defaults));
      cases[id] = {
        ...defaults,
        completedTaskIds: new Set(defaults.completedTaskIds || []),
      };
      if (id === 'absence')
        cases[id].assignedTaskIds = new Set(defaults.assignedTaskIds);
    });
    cases.new_home.lastKnownPipeworkYear = cases.new_home.pipeworkYear;
    return {
      activeCase: 'new_home',
      audience: audience === 'customer' ? 'customer' : 'visitor',
      portfolioId: 'multi',
      cases,
    };
  }

  function updateHome(state, field, value) {
    const home = state.cases.new_home;
    if (field === 'pipeworkYear') {
      home.pipeworkYear = calculateDeduction(value) ? value : null;
      if (home.pipeworkYear !== null) home.lastKnownPipeworkYear = value;
    } else if (field === 'surfaceYear') {
      const control = knowledge.new_home.controls.find(
        (item) => item.id === field,
      );
      if (control.options.some((option) => option.value === value))
        home.surfaceYear = value;
    }
  }

  function setTaskComplete(state, caseId, taskId, complete) {
    if (!knowledge[caseId].tasks.some((task) => task.id === taskId)) return;
    const completed = state.cases[caseId].completedTaskIds;
    if (complete) completed.add(taskId);
    else completed.delete(taskId);
  }

  function applicableTasks(state, caseId) {
    return knowledge[caseId].tasks.filter(
      (task) =>
        Object.entries(task.when || {}).every(
          ([field, value]) => state.cases[caseId][field] === value,
        ) &&
        (!task.requiresPolicyType || hasPolicy(state, task.requiresPolicyType)),
    );
  }

  function visibleTasks(state, caseId) {
    return applicableTasks(state, caseId).filter(
      (task) =>
        caseId !== 'first_baby' ||
        state.cases.first_baby.category === 'all' ||
        task.category === state.cases.first_baby.category,
    );
  }

  function readiness(state, caseId) {
    const tasks = applicableTasks(state, caseId);
    const completed = tasks.filter((task) =>
      state.cases[caseId].completedTaskIds.has(task.id),
    ).length;
    return {
      completed,
      total: tasks.length,
      percent: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
    };
  }

  function updateScenario(state, caseId, field, value) {
    const control = knowledge[caseId]?.controls.find(
      (item) => item.id === field,
    );
    if (!control || !state.cases[caseId]) return false;
    if (
      control.type === 'choice' &&
      !control.options.some((option) => option.value === value)
    )
      return false;
    if (
      control.type === 'range' &&
      (!Number.isInteger(value) || value < control.min || value > control.max)
    )
      return false;
    if (!['choice', 'range'].includes(control.type)) return false;
    state.cases[caseId][field] = value;
    return true;
  }

  function absenceTrip(state) {
    const context = state.cases.absence;
    const module = knowledge.absence;
    const control = module.controls.find((item) => item.id === 'durationDays');
    const departure = module.rules.tripDates.departureBySeason[context.season];
    if (
      !departure ||
      !Number.isInteger(context.durationDays) ||
      context.durationDays < control.min ||
      context.durationDays > control.max
    )
      return null;
    const date = new Date(`${departure}T00:00:00Z`);
    if (!Number.isFinite(date.getTime())) return null;
    date.setUTCDate(date.getUTCDate() + context.durationDays);
    return {
      departure,
      returnDate: date.toISOString().slice(0, 10),
      durationDays: context.durationDays,
    };
  }

  function absencePriority(state, task) {
    const rule = knowledge.absence.rules.priorityEscalation;
    return absenceTrip(state) &&
      state.cases.absence.durationDays > rule.durationDaysGreaterThan &&
      rule.taskIds.includes(task.id)
      ? rule.priority
      : task.priority;
  }

  function setAssignment(state, taskId, assigned) {
    const task = visibleTasks(state, 'absence').find(
      (item) => item.id === taskId,
    );
    if (!task?.delegatable) return false;
    if (assigned) state.cases.absence.assignedTaskIds.add(taskId);
    else state.cases.absence.assignedTaskIds.delete(taskId);
    return true;
  }

  function displayDate(iso) {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fi-FI', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${iso}T00:00:00Z`));
  }

  function buildAbsenceDraft(state) {
    const module = knowledge.absence;
    const context = state.cases.absence;
    const trip = absenceTrip(state);
    const tasks = trip
      ? visibleTasks(state, 'absence').filter(
          (task) =>
            task.delegatable &&
            context.assignedTaskIds.has(task.id) &&
            !context.completedTaskIds.has(task.id),
        )
      : [];
    if (!trip)
      return { taskIds: [], text: module.presentation.invalidTripLabel };
    if (!tasks.length)
      return {
        taskIds: [],
        text: `${module.delegation.emptyText}\n\n${module.presentation.notSent}`,
      };
    const intro = module.delegation.introTemplate
      .replace('{neighborName}', context.neighborName)
      .replace('{departureDate}', displayDate(trip.departure))
      .replace('{returnDate}', displayDate(trip.returnDate))
      .replace('{durationDays}', trip.durationDays);
    return {
      taskIds: tasks.map((task) => task.id),
      text: [
        intro,
        '',
        ...tasks.map((task, index) => `${index + 1}. ${task.delegationText}`),
        '',
        module.delegation.closingText,
        module.presentation.notSent,
      ].join('\n'),
    };
  }

  function setPetSelection(state, field, id, selected) {
    const entries =
      field === 'symptomIds'
        ? knowledge.pet.symptoms
        : field === 'emergencySignIds'
          ? knowledge.pet.emergencySigns
          : [];
    if (!entries.some((item) => item.id === id)) return false;
    const values = new Set(state.cases.pet[field]);
    if (selected) values.add(id);
    else values.delete(id);
    state.cases.pet[field] = [...values];
    return true;
  }

  function setPetObservation(state, id, value) {
    if (
      !knowledge.pet.observations.some(
        (item) =>
          item.id === id &&
          item.options.some((option) => option.value === value),
      )
    )
      return false;
    state.cases.pet.observations[id] = value;
    return true;
  }

  function petRoute(state) {
    const context = state.cases.pet;
    const rule = knowledge.pet.rules.routing;
    const symptoms = new Set(context.symptomIds || []);
    if (
      (rule.emergency.anyEmergencySign && context.emergencySignIds?.length) ||
      rule.emergency.anyObservationEquals.some(
        (item) => context.observations?.[item.id] === item.value,
      )
    )
      return 'emergency';
    const durationRule = rule.urgent.allSymptomIdsWithDuration;
    if (
      rule.urgent.anySymptomIds.some((id) => symptoms.has(id)) ||
      (context.duration === durationRule.duration &&
        durationRule.symptomIds.every((id) => symptoms.has(id)))
    )
      return 'urgent';
    return rule.fallbackRoute;
  }

  function petPrimaryAction(currentState) {
    const route = petRoute(currentState);
    if (petIntroAvailable(currentState))
      return knowledge.pet.actions.find((action) => action.id === 'intro-help');
    const mapping =
      petServiceAccess(currentState) === 'included'
        ? knowledge.pet.rules.routing.insuredActionByRoute
        : knowledge.pet.rules.routing.primaryActionByRoute;
    return (
      knowledge.pet.actions.find(
        (action) =>
          action.id === mapping[route] && action.allowedRoutes.includes(route),
      ) || null
    );
  }

  function petAction(state, actionId) {
    const action = petPrimaryAction(state);
    return action?.id === actionId ? action : null;
  }

  function petIntroAvailable(currentState) {
    return (
      petServiceAccess(currentState) === 'notIncluded' &&
      !currentState.cases.pet.introContactUsed &&
      petRoute(currentState) !== 'emergency'
    );
  }

  function usePetIntro(currentState) {
    if (!petIntroAvailable(currentState)) return false;
    currentState.cases.pet.introContactUsed = true;
    return true;
  }

  function buildPetPacket(state) {
    const module = knowledge.pet;
    const context = state.cases.pet;
    const duration =
      module.controls
        .find((control) => control.id === 'duration')
        .options.find((option) => option.value === context.duration)?.label ||
      module.rules.observations.unknownResultLabel;
    const labels = (entries, ids, fallback) =>
      entries
        .filter((entry) => (ids || []).includes(entry.id))
        .map((entry) => entry.label)
        .join('; ') || fallback;
    return [
      module.persona,
      audienceCopy(state, 'pet').packetContext,
      `${module.presentation.symptomsLabel}: ${labels(module.symptoms, context.symptomIds, module.packet.emptySymptomsLabel)}`,
      `${module.presentation.emergencyLabel}: ${labels(module.emergencySigns, context.emergencySignIds, module.packet.unselectedEmergencyLabel)}`,
      `${module.presentation.durationLabel}: ${duration}`,
      ...module.observations.map(
        (item) =>
          `${item.label}: ${item.options.find((option) => option.value === context.observations?.[item.id])?.label || module.rules.observations.unknownResultLabel}`,
      ),
      module.packet.unknownBackgroundLabel,
      module.packet.temperatureLabel,
      '',
      `${module.presentation.routeLabel}: ${module.insights[petRoute(state)].title}`,
      module.insights[petRoute(state)].text,
      '',
      module.packet.completedTasksLabel,
      ...module.tasks.map(
        (task) =>
          `${context.completedTaskIds.has(task.id) ? '[x]' : '[ ]'} ${task.title}`,
      ),
      '',
      module.presentation.notSent,
    ].join('\n');
  }

  function buildBabyPacket(state) {
    const module = knowledge.first_baby;
    const condition = module.controls
      .find((item) => item.id === 'equipmentCondition')
      .options.find(
        (option) => option.value === state.cases.first_baby.equipmentCondition,
      )?.label;
    return [
      module.persona,
      audienceCopy(state, 'first_baby').packetContext,
      `${module.presentation.conditionLabel}: ${condition}`,
      '',
      module.actions[0].text,
      '',
      ...applicableTasks(state, 'first_baby').map(
        (task) =>
          `${state.cases.first_baby.completedTaskIds.has(task.id) ? '[x]' : '[ ]'} ${task.title}`,
      ),
      '',
      module.actions[0].confirmation,
    ].join('\n');
  }

  function calculatePreventionPrice(
    completedTaskIds,
    module = knowledge.new_home,
  ) {
    const config = module?.preventionIncentive;
    const isRate = (value) =>
      Number.isInteger(value) && value >= 0 && value < 10000;
    if (
      !config ||
      config.status !== 'illustrative' ||
      typeof config.policyId !== 'string' ||
      !config.policyId.trim() ||
      !Number.isSafeInteger(config.baseAnnualCents) ||
      config.baseAnnualCents <= 0 ||
      !isRate(config.bundleDiscountBps) ||
      !isRate(config.preventionCapBps) ||
      config.rounding !== 'half-up-per-stage' ||
      !Array.isArray(config.eligibleActions) ||
      !Array.isArray(module.tasks) ||
      !completedTaskIds ||
      typeof completedTaskIds === 'string' ||
      typeof completedTaskIds[Symbol.iterator] !== 'function'
    )
      return null;
    const completed = new Set(completedTaskIds);
    const taskIds = new Set(module.tasks.map((task) => task.id));
    const actions = new Map();
    const actionByTask = new Map();
    for (const action of config.eligibleActions) {
      if (!action || typeof action.policyId !== 'string') return null;
      if (action.policyId !== config.policyId) continue;
      if (
        typeof action.id !== 'string' ||
        !action.id.trim() ||
        !taskIds.has(action.taskId) ||
        !isRate(action.discountBps)
      )
        return null;
      const existing =
        actions.get(action.id) || actionByTask.get(action.taskId);
      if (existing) {
        if (
          existing.id !== action.id ||
          existing.taskId !== action.taskId ||
          existing.discountBps !== action.discountBps
        )
          return null;
        continue;
      }
      actions.set(action.id, action);
      actionByTask.set(action.taskId, action);
    }
    let preventionDiscountBps = 0;
    let completedActionCount = 0;
    for (const action of actions.values()) {
      if (!completed.has(action.taskId)) continue;
      preventionDiscountBps = Math.min(
        config.preventionCapBps,
        preventionDiscountBps + action.discountBps,
      );
      completedActionCount++;
    }
    // Calculate in integer cents; round the remaining price at each stage.
    const applyRate = (cents, bps) =>
      Number((BigInt(cents) * BigInt(10000 - bps) + 5000n) / 10000n);
    const afterBundleCents = applyRate(
      config.baseAnnualCents,
      config.bundleDiscountBps,
    );
    const projectedAnnualCents = applyRate(
      afterBundleCents,
      preventionDiscountBps,
    );
    if (afterBundleCents <= 0 || projectedAnnualCents <= 0) return null;
    return {
      baseAnnualCents: config.baseAnnualCents,
      bundleDiscountBps: config.bundleDiscountBps,
      bundleSavingCents: config.baseAnnualCents - afterBundleCents,
      afterBundleCents,
      preventionDiscountBps,
      preventionSavingCents: afterBundleCents - projectedAnnualCents,
      projectedAnnualCents,
      completedActionCount,
      eligibleActionCount: actions.size,
      preventionCapBps: config.preventionCapBps,
      approval: 'not-assessed',
    };
  }

  function buildHomePacket(state) {
    const module = knowledge.new_home;
    const home = state.cases.new_home;
    const controls = module.controls;
    const action = module.actions[0];
    const lines = [
      module.persona,
      audienceCopy(state, 'new_home').packetContext,
      `${controls[0].label}: ${home.pipeworkYear === null ? text('Ei tiedossa') : home.pipeworkYear}`,
      `${controls[1].label}: ${home.surfaceYear}`,
      '',
      action.text,
      '',
      text('Esimerkkitehtävien tilanne:'),
    ];
    module.tasks.forEach((task) =>
      lines.push(
        `${home.completedTaskIds.has(task.id) ? '[x]' : '[ ]'} ${task.title}`,
      ),
    );
    lines.push('', action.confirmation);
    return lines.join('\n');
  }

  function audienceCopy(currentState, caseId = currentState.activeCase) {
    return knowledge[caseId].audiences[
      currentState.audience === 'customer' ? 'customer' : 'visitor'
    ];
  }

  function currentPolicies(currentState) {
    if (currentState.audience !== 'customer') return [];
    const portfolio = knowledge.new_home.experience.portfolios.find(
      (item) => item.id === currentState.portfolioId,
    );
    return portfolio
      ? [...portfolio.policies, ...(currentState.extraPolicies || [])]
      : [];
  }

  function hasPolicy(currentState, type) {
    return currentPolicies(currentState).some((policy) => policy.type === type);
  }

  function visibleBenefits(currentState) {
    return knowledge.new_home.publishedBenefits.items.filter(
      (item) =>
        !item.audiences || item.audiences.includes(currentState.audience),
    );
  }

  function petServiceAccess(currentState) {
    if (currentState.audience !== 'customer') return 'unknown';
    const portfolio = knowledge.new_home.experience.portfolios.find(
      (item) => item.id === currentState.portfolioId,
    );
    if (!portfolio) return 'unknown';
    return portfolio.policies.some((policy) =>
      knowledge.pet.service.eligibleInsuranceTypes.includes(policy.type),
    )
      ? 'included'
      : 'notIncluded';
  }

  function setPortfolio(currentState, portfolioId) {
    if (
      currentState.audience !== 'customer' ||
      !knowledge.new_home.experience.portfolios.some(
        (item) => item.id === portfolioId,
      )
    )
      return false;
    currentState.portfolioId = portfolioId;
    return true;
  }

  function calculateHomePrice(currentState) {
    const module = knowledge.new_home;
    const portfolio = knowledge.new_home.experience.portfolios.find(
      (item) => item.id === currentState.portfolioId,
    );
    if (currentState.audience === 'customer' && !portfolio) return null;
    const bundleDiscountBps =
      currentState.audience === 'customer'
        ? portfolio.demoBundleDiscountBps
        : 0;
    return calculatePreventionPrice(
      currentState.cases.new_home.completedTaskIds,
      {
        ...module,
        preventionIncentive: {
          ...module.preventionIncentive,
          bundleDiscountBps,
        },
      },
    );
  }

  function homeGuidance(currentState) {
    const module = knowledge.new_home;
    const completed = currentState.cases.new_home.completedTaskIds;
    const result = calculateDeduction(currentState.cases.new_home.pipeworkYear);
    const pending = module.tasks.filter((task) => !completed.has(task.id));
    const nextTask =
      ((!result || result.deductionPercent > 0) &&
        pending.find((task) => task.id === 'professional-review')) ||
      pending.find((task) => task.id !== 'professional-review') ||
      pending[0] ||
      null;
    return { result, nextTask };
  }

  function policyContext(currentState) {
    const copy = knowledge.new_home.experience.policyContext;
    if (currentState.audience !== 'customer') return copy.visitor;
    if (currentState.activeCase === 'pet')
      return petServiceAccess(currentState) === 'included'
        ? copy.petIncluded
        : copy.petNotIncluded;
    const portfolio = knowledge.new_home.experience.portfolios.find(
      (item) => item.id === currentState.portfolioId,
    );
    if (currentState.activeCase === 'absence')
      return portfolio?.policies.some((item) => item.type === 'travel')
        ? copy.absenceTravel
        : copy.absenceHome;
    if (
      currentState.activeCase === 'first_baby' &&
      hasPolicy(currentState, 'unborn-child')
    )
      return copy.babyIncluded;
    return copy[currentState.activeCase];
  }

  function buildPolicyQuestions(currentState) {
    const copy = knowledge.new_home.experience.policyContext;
    const portfolio =
      currentState.audience === 'customer' &&
      knowledge.new_home.experience.portfolios.find(
        (item) => item.id === currentState.portfolioId,
      );
    const lines = [
      knowledge[currentState.activeCase].title,
      copy.policiesLabel,
      portfolio
        ? portfolio.policies.map((item) => item.label).join(', ')
        : copy.noPolicies,
      '',
      copy.question,
    ];
    if (currentState.activeCase === 'new_home')
      lines.push(buildHomePacket(currentState));
    if (currentState.activeCase === 'absence') {
      const trip = absenceTrip(currentState);
      if (trip)
        lines.push(
          `${displayDate(trip.departure)}–${displayDate(trip.returnDate)}`,
        );
      lines.push(copy.travelQuestion);
    }
    if (currentState.activeCase === 'first_baby')
      lines.push(
        hasPolicy(currentState, 'unborn-child')
          ? copy.babyOwnedQuestion
          : copy.babyQuestion,
      );
    lines.push('', copy.notSent);
    return lines.join('\n');
  }

  function staffAnalytics({ policyType = 'all', caseId = 'all' } = {}) {
    const copy = knowledge.new_home.experience.staff;
    if (
      policyType !== 'all' &&
      !copy.policyTypes.some((item) => item.id === policyType)
    )
      return null;
    if (caseId !== 'all' && !scenarios.some((item) => item.id === caseId))
      return null;
    const rows = copy.customers
      .map((customer) => {
        const example = createState('customer');
        example.portfolioId = customer.portfolioId;
        example.extraPolicies = customer.extraPolicies || [];
        example.cases[customer.caseId].completedTaskIds = new Set(
          customer.completedTaskIds,
        );
        return {
          ...customer,
          policies: currentPolicies(example),
          preparation: readiness(example, customer.caseId),
        };
      })
      .filter(
        (customer) =>
          (policyType === 'all' ||
            customer.policies.some((policy) => policy.type === policyType)) &&
          (caseId === 'all' || customer.caseId === caseId),
      );
    const feedback = rows.filter(
      (item) =>
        Number.isInteger(item.feedbackScore) &&
        item.feedbackScore >= 1 &&
        item.feedbackScore <= 5,
    );
    return {
      rows,
      summary: {
        customers: rows.length,
        policies: rows.reduce((sum, item) => sum + item.policies.length, 0),
        multi: rows.filter((item) => item.policies.length > 1).length,
        feedback: feedback.length
          ? feedback.reduce((sum, item) => sum + item.feedbackScore, 0) /
            feedback.length
          : null,
        feedbackCount: feedback.length,
        completed: rows.reduce(
          (sum, item) => sum + item.preparation.completed,
          0,
        ),
        total: rows.reduce((sum, item) => sum + item.preparation.total, 0),
      },
      policyDistribution: copy.policyTypes.map((type) => ({
        ...type,
        count: rows.reduce(
          (sum, item) =>
            sum +
            item.policies.filter((policy) => policy.type === type.id).length,
          0,
        ),
      })),
      feedbackDistribution: [1, 2, 3, 4, 5].map((score) => ({
        score,
        count: feedback.filter((item) => item.feedbackScore === score).length,
      })),
      byCase: scenarios.map((scenario) => {
        const customers = rows.filter((item) => item.caseId === scenario.id);
        return {
          id: scenario.id,
          customers: customers.length,
          completed: customers.reduce(
            (sum, item) => sum + item.preparation.completed,
            0,
          ),
          total: customers.reduce(
            (sum, item) => sum + item.preparation.total,
            0,
          ),
        };
      }),
    };
  }

  const workspace = document.getElementById('workspace');
  const audienceStates = {
    visitor: createState('visitor'),
    customer: createState('customer'),
  };
  let state =
    audienceStates[
      window.location.hash === '#asiakas' ? 'customer' : 'visitor'
    ];
  const nav = document.getElementById('scenario-nav');
  const dialog = document.getElementById('help-dialog');
  let layoutObserver;
  function arrangeWorkspace() {
    layoutObserver?.disconnect();
    const grid = workspace.querySelector('.adaptive-workspace');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.card')];
    const balanced = innerWidth > 760 && typeof ResizeObserver !== 'undefined';
    grid.classList.toggle('balanced-workspace', balanced);
    cards.forEach((card) => card.style.removeProperty('grid-row-end'));
    if (!balanced) return;
    // Intrinsic heights determine spans. DOM and keyboard order stay unchanged.
    const fit = (card) => {
      const style = getComputedStyle(grid);
      const gap = parseFloat(style.rowGap);
      const row = parseFloat(style.gridAutoRows);
      card.style.gridRowEnd = `span ${Math.ceil((card.getBoundingClientRect().height + gap) / (row + gap))}`;
    };
    layoutObserver = new ResizeObserver((entries) =>
      entries.forEach((entry) => fit(entry.target)),
    );
    cards.forEach((card) => {
      fit(card);
      layoutObserver.observe(card);
    });
  }
  const statusLabels = {
    verified: 'Lähteestä tarkistettu',
    illustrative: 'Havainnollistava demo',
    unverified: 'Ei vahvistettu',
  };
  const priorityLabels = {
    critical: 'Kriittinen huomio',
    high: 'Korkea prioriteetti',
    medium: 'Huomioi',
    recommendation: 'Suositus',
  };
  const escape = (value) =>
    String(text(value)).replace(
      /[&<>"']/g,
      (char) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[char],
    );
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;
  const money = (cents) =>
    new Intl.NumberFormat(language === 'en' ? 'en-IE' : 'fi-FI', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  const percent = (bps) =>
    new Intl.NumberFormat(language === 'en' ? 'en-IE' : 'fi-FI', {
      maximumFractionDigits: 2,
    }).format(bps / 100);

  function evidence(item, module, summaryLabel = 'Lähteet ja rajoitukset') {
    const sources = item.sourceIds.map((id) =>
      module.sources.find((source) => source.id === id),
    );
    return `<details class="evidence"><summary>${escape(summaryLabel)} <span class="evidence-status">${escape(statusLabels[item.status])}</span></summary><div class="evidence-content">${item.sourceScope ? `<p>${escape(item.sourceScope)}</p>` : ''}<p>${escape(item.limitation)}</p><ul class="source-list">${sources.map((source) => `<li><a lang="fi" href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.publisher)} · ${escape(source.title)}</a><span lang="fi">${escape(source.version)} · ${escape(source.locator)}</span><span>${text('Tarkistettu')} ${escape(source.checkedAt)}${source.effectiveFrom ? ` · ${text('Voimassa')} ${escape(source.effectiveFrom)} ${text('alkaen')}` : ''}</span><span>${escape(statusLabels[source.status])} · ${escape(source.limitation)}</span></li>`).join('')}</ul></div></details>`;
  }

  function renderNav() {
    nav.innerHTML = scenarios
      .map((scenario) => {
        const ready = readiness(state, scenario.id);
        const module = knowledge[scenario.id];
        const label = module.presentation?.navTitle || scenario.label;
        return `<button class="scenario-button" type="button" data-case="${scenario.id}" aria-current="${state.activeCase === scenario.id}"><span class="scenario-icon">${icon(scenario.icon)}</span><span><span class="scenario-name">${escape(label)}</span><span class="scenario-meta" id="nav-progress-${scenario.id}">${ready.completed}/${ready.total} ${text('tehty')}${scenario.id === 'new_home' ? ` · ${text('Ikävähennykset')}` : ''}</span></span></button>`;
      })
      .join('');
  }

  function infoButton(topic, module, label) {
    return `<button type="button" class="info-button" data-info="${topic}" data-info-case="${scenarios.find((item) => knowledge[item.id] === module)?.id || 'new_home'}" aria-label="${escape(label)}" title="${escape(label)}"><span aria-hidden="true">i</span></button>`;
  }

  function openInfo(topic, caseId) {
    const module = knowledge[caseId];
    if (!module) return;
    const copy = knowledge.new_home.experience.info;
    let title, content;
    if (topic === 'business') {
      const item = module.business;
      title = copy.businessLabel;
      content = `<p>${escape(item.text)}</p><h3>${escape(copy.metricsLabel)}</h3><ul>${item.proposedMetrics.map((metric) => `<li>${escape(metric)}</li>`).join('')}</ul><p class="fine-print">${escape(item.limitation)}</p>${evidence(item, module)}`;
    } else if (topic === 'pricing') {
      title = copy.pricingLabel;
      content = `<p>${escape(knowledge.new_home.preventionIncentive.copy.assumptionsText)}</p>${evidence(knowledge.new_home.preventionIncentive, knowledge.new_home)}`;
    } else if (topic === 'deduction') {
      title = copy.deductionLabel;
      content = `<p>${escape(knowledge.new_home.presentation.calculationScope)}</p><ul>${knowledge.new_home.rules.leakageDeduction.bands.map((band) => `<li>${band.minAge}–${band.maxAge === null ? '∞' : band.maxAge} ${text('v')}: ${band.deductionPercent} %</li>`).join('')}</ul>${evidence(knowledge.new_home.insights.deduction, knowledge.new_home)}${evidence(knowledge.new_home.insights.scope, knowledge.new_home)}${evidence(knowledge.new_home.rules.pipeRepair, knowledge.new_home)}${evidence(knowledge.new_home.rules.technicalLifespan, knowledge.new_home)}`;
    } else if (topic === 'policy') {
      title = copy.policyTitle;
      content = `<p>${escape(copy.policyText)}</p><p class="fine-print">${escape(copy.policyLimits)}</p>${evidence(knowledge.new_home.preventionIncentive, knowledge.new_home)}`;
    } else return;
    document.getElementById('dialog-content').innerHTML =
      `<h2 id="dialog-title">${escape(title)}</h2><p class="confirmation" id="dialog-confirmation">${escape(copy.notice)}</p>${content}`;
    dialog.dataset.case = caseId === 'pet' ? 'pet-info' : 'info';
    dialog.dataset.route = caseId === 'pet' ? petRoute(state) : '';
    dialog.showModal();
  }

  function pricingCard(module) {
    const config = module.preventionIncentive;
    const audience = audienceCopy(state, 'new_home');
    const copy = {
      ...config.copy,
      title: audience.priceTitle,
      intro: audience.priceIntro,
    };
    return `<section class="card pricing-card" aria-labelledby="pricing-heading" aria-describedby="pricing-concept pricing-limitation">
      <p class="eyebrow" id="pricing-concept">${escape(copy.conceptLabel)}</p>
      <div class="section-title"><h3 id="pricing-heading" tabindex="-1">${escape(copy.title)}</h3>${infoButton('pricing', module, knowledge.new_home.experience.info.pricingLabel)}</div><p class="pricing-intro">${escape(copy.intro)}</p>
      <div id="pricing-result"><p class="small-label" id="annual-price-label">${escape(copy.projectedLabel)}</p><div class="annual-price"><output id="annual-price" aria-labelledby="annual-price-label"></output><span>${escape(copy.perYear)}</span></div>
        <div class="pricing-saving"><span>${escape(copy.savingLabel)}</span><strong><span id="prevention-saving"></span> ${escape(copy.perYear)}</strong></div>

        <p class="fine-print pricing-count">${escape(copy.eligibleCountLabel)} <strong id="pricing-eligible-count"></strong> · ${escape(copy.capLabel)} <strong id="pricing-cap"></strong></p>
      </div><p class="limitation" id="pricing-unavailable" hidden>${escape(copy.unavailableLabel)}</p>
      <p class="sr-only" role="status" id="pricing-announcement" aria-live="polite"></p>
      <p class="pricing-verification">${escape(copy.verificationNotice)}</p><p class="fine-print" id="pricing-limitation">${escape(config.limitation)}</p>
      <details class="pricing-assumptions"><summary>${escape(copy.assumptionsLabel)}</summary><dl class="pricing-breakdown"><div><dt>${escape(copy.baseLabel)}</dt><dd id="base-annual-price"></dd></div><div><dt>${escape(copy.bundleLabel)} <span id="bundle-rate"></span></dt><dd id="bundle-saving"></dd></div><div class="pricing-subtotal"><dt>${escape(copy.afterBundleLabel)}</dt><dd id="after-bundle-price"></dd></div><div><dt>${escape(copy.preventionLabel)} <span id="prevention-rate"></span></dt><dd id="prevention-discount"></dd></div></dl><p class="fine-print">${escape(copy.assumptionsText)}</p><ul class="pricing-actions">${config.eligibleActions
        .filter((action) => action.policyId === config.policyId)
        .map(
          (action) =>
            `<li><span>${escape(module.tasks.find((task) => task.id === action.taskId).title)}<span class="small-label" data-pricing-status="${escape(action.taskId)}"></span></span><strong>${escape(copy.taskBenefitTemplate.replace('{percent}', percent(action.discountBps)))}</strong></li>`,
        )
        .join(
          '',
        )}</ul><p class="fine-print">${escape(copy.preparationNotice)}</p><p class="fine-print">${escape(copy.verificationPlan)}</p></details>
      ${evidence(config, module, copy.evidenceLabel)}<p class="fine-print pricing-separation">${escape(copy.deductionNotice)}</p>
    </section>`;
  }

  function pricingFeedback(module) {
    const copy = module.preventionIncentive.copy;
    return `<div class="pricing-feedback" id="pricing-feedback" hidden><div><span class="small-label">${escape(copy.feedbackLabel)}</span><strong id="pricing-feedback-price"></strong><span class="fine-print" id="pricing-feedback-saving"></span></div><button type="button" class="primary-button" data-show-pricing>${escape(copy.showCalculationLabel)} ${icon('arrow')}</button></div>`;
  }

  function updatePricingView(showFeedback = false) {
    const config = knowledge.new_home.preventionIncentive;
    const completed = state.cases.new_home.completedTaskIds;
    const result = calculateHomePrice(state);
    document.getElementById('pricing-feedback').hidden =
      !showFeedback || !result;
    document.body.classList.toggle(
      'pricing-feedback-visible',
      showFeedback && !!result,
    );
    const policyPrice = document.getElementById('policy-price');
    if (policyPrice)
      policyPrice.textContent = result
        ? `${money(result.projectedAnnualCents)} ${config.copy.perYear}`
        : config.copy.unavailableLabel;
    document.getElementById('pricing-result').hidden = !result;
    document.getElementById('pricing-unavailable').hidden = !!result;
    document.querySelectorAll('[data-pricing-status]').forEach((element) => {
      element.textContent = completed.has(element.dataset.pricingStatus)
        ? config.copy.completedLabel
        : config.copy.incompleteLabel;
    });
    if (!result) {
      document.getElementById('pricing-announcement').textContent =
        config.copy.unavailableLabel;
      return;
    }
    const values = {
      'annual-price': money(result.projectedAnnualCents),
      'prevention-saving': money(result.preventionSavingCents),
      'base-annual-price': money(result.baseAnnualCents),
      'bundle-rate': `${percent(result.bundleDiscountBps)} %`,
      'bundle-saving': `−${money(result.bundleSavingCents)}`,
      'after-bundle-price': money(result.afterBundleCents),
      'prevention-rate': `${percent(result.preventionDiscountBps)} %`,
      'prevention-discount': `−${money(result.preventionSavingCents)}`,
      'pricing-eligible-count': `${result.completedActionCount}/${result.eligibleActionCount}`,
      'pricing-cap': `${percent(result.preventionCapBps)} %`,
    };
    Object.entries(values).forEach(([id, value]) => {
      document.getElementById(id).textContent = value;
    });
    document.getElementById('pricing-feedback-price').textContent =
      `${values['annual-price']} ${config.copy.perYear}`;
    document.getElementById('pricing-feedback-saving').textContent =
      config.copy.feedbackSavingTemplate.replace(
        '{saving}',
        values['prevention-saving'],
      );
    document.getElementById('pricing-announcement').textContent =
      config.copy.announcementTemplate
        .replace('{price}', values['annual-price'])
        .replace('{saving}', values['prevention-saving']);
  }

  function publishedBenefitsCard(module) {
    const benefits = module.publishedBenefits;
    return `<section class="card reference-benefits" aria-labelledby="benefits-heading"><h3 id="benefits-heading">${escape(benefits.title)}</h3><p class="fine-print">${escape(benefits.notice)}</p>${visibleBenefits(
      state,
    )
      .map(
        (item) =>
          `<details class="reference-benefit" data-benefit="${escape(item.id)}"><summary>${escape(item.title)}</summary><p>${escape(item.text)}</p><p class="fine-print">${escape(item.limitation)}</p>${evidence(item, module)}</details>`,
      )
      .join('')}</section>`;
  }

  function claimsGuidanceCard(module) {
    const guide = module.claimsGuidance;
    return `<section class="card claims-guidance" aria-labelledby="claims-guidance-heading"><h3 id="claims-guidance-heading">${escape(guide.title)}</h3><p class="limitation" id="claim-success-evidence">${escape(guide.successNotice)}</p><p class="fine-print">${escape(guide.limitation)}</p>${guide.items.map((item) => `<details class="reference-benefit"><summary>${escape(item.title)}</summary><p>${escape(item.text)}</p>${evidence(item, module)}</details>`).join('')}</section>`;
  }

  function renderTasks(module, taskIds = module.tasks.map((task) => task.id)) {
    const home = state.cases.new_home;
    return taskIds
      .map((id) => module.tasks.find((task) => task.id === id))
      .filter(Boolean)
      .map((task) => {
        if (task.id === 'professional-review')
          return homePipeTask(module, task);
        const completed = home.completedTaskIds.has(task.id);
        const action = module.actions.find((item) => item.id === task.actionId);
        const incentive = module.preventionIncentive;
        const benefit = incentive.eligibleActions.find(
          (item) =>
            item.taskId === task.id && item.policyId === incentive.policyId,
        );
        const benefitLabel = benefit
          ? incentive.copy.taskBenefitTemplate.replace(
              '{percent}',
              percent(benefit.discountBps),
            )
          : incentive.copy.preparationLabel;
        return `<article class="task inline-task" id="task-${task.id}" data-complete="${completed}"><label class="task-toggle"><input type="checkbox" data-task="${task.id}" ${completed ? 'checked' : ''}><span>${escape(task.title)}</span></label><div class="task-body"><p class="task-why">${escape(task.why)}</p><div class="task-meta"><span class="badge ${task.priority === 'high' ? 'priority-high' : ''}">${escape(priorityLabels[task.priority])}</span><span class="badge ${benefit ? 'incentive-badge' : ''}">${escape(benefitLabel)}</span><span class="complete-label" ${completed ? '' : 'hidden'}>${text('Merkitty tehdyksi')}</span></div>${evidence(task, module)}${action ? `<button type="button" class="primary-button" data-action="${action.id}">${escape(action.label)} ${icon('arrow')}</button>` : ''}</div></article>`;
      })
      .join('');
  }

  function homePipeTask(module, task) {
    const home = state.cases.new_home;
    const [pipeControl, surfaceControl] = module.controls;
    const complete = home.completedTaskIds.has(task.id);
    return `<article class="task inline-task pipe-task" id="task-${task.id}" data-complete="${complete}"><label class="task-toggle"><input type="checkbox" data-task="${task.id}" ${complete ? 'checked' : ''}><span>${escape(module.presentation.pipeTaskTitle)}</span></label><div class="task-body"><p class="task-why">${escape(module.presentation.pipeTaskHelp)}</p>
      <div class="field"><label for="pipework-year">${escape(pipeControl.label)}</label><div class="range-value"><output class="year-value" id="pipework-value" for="pipework-year"></output><span id="pipework-age"></span></div><input type="range" id="pipework-year" min="${pipeControl.min}" max="${pipeControl.max}" step="${pipeControl.step}" value="${home.lastKnownPipeworkYear}" aria-describedby="pipework-help"><p id="pipework-help" class="field-help">${escape(pipeControl.help)}</p><label class="unknown-year"><input type="checkbox" id="unknown-pipework-year" ${home.pipeworkYear === null ? 'checked' : ''}>${escape(module.presentation.unknownYearLabel)}</label></div>
      <div class="inline-result" role="status"><div><span>${escape(module.presentation.resultLabel)}</span><output id="deduction-percent" aria-label="${text('Vuotovähennys')}"></output><p class="fine-print" id="deduction-context"></p></div>${infoButton('deduction', module, knowledge.new_home.experience.info.deductionLabel)}</div>
      <fieldset class="field" aria-describedby="surface-help"><legend>${escape(surfaceControl.label)}</legend><div class="segmented">${surfaceControl.options.map((option) => `<label><input type="radio" name="surface-year" value="${option.value}" ${option.value === home.surfaceYear ? 'checked' : ''}><span>${escape(option.label)}</span></label>`).join('')}</div><p id="surface-help" class="field-help">${escape(surfaceControl.help)}</p><p id="surface-text" class="task-why"></p></fieldset>
      <div class="task-meta"><span class="badge">${escape(module.preventionIncentive.copy.preparationLabel)}</span><span class="complete-label" ${complete ? '' : 'hidden'}>${text('Merkitty tehdyksi')}</span></div>${evidence(task, module)}<button type="button" class="primary-button" data-action="plumbing-help">${escape(module.actions[0].label)} ${icon('arrow')}</button></div></article>`;
  }

  function renderHome() {
    const module = knowledge.new_home;
    workspace.innerHTML = `${caseHeading(module)}<div class="workspace-grid home-workspace"><div class="stack"><section class="card home-summary" aria-labelledby="context-heading"><p class="small-label">${escape(module.presentation.homeLabel)}</p><h3 id="context-heading">${escape(audienceCopy(state).contextTitle)}</h3><p class="next-task-title" id="home-next-title"></p><p class="insight-text" id="home-next-reason" role="status"></p><p class="fine-print" id="home-surface-summary"></p><button class="secondary-button" type="button" id="home-next-button" data-show-home-task>${escape(module.presentation.nextActionLabel)} ${icon('arrow')}</button><section class="progress-card context-progress" aria-labelledby="progress-heading"><div class="progress-header"><h3 id="progress-heading">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</h3><output id="progress-count" aria-live="polite"></output></div><progress id="home-progress" aria-labelledby="progress-heading"></progress><p class="fine-print">${escape(module.presentation.progressNotice)}</p></section></section>${pricingCard(module)}</div>
      <section class="card home-task-card" aria-labelledby="tasks-heading"><h3 id="tasks-heading">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</h3><p class="fine-print">${escape(module.presentation.prioritiesNotice)}</p><div class="topic-tasks">${renderTasks(module, ['professional-review', 'main-valve', 'kitchen-leaks', 'floor-drain'])}</div></section></div><div class="support-grid">${publishedBenefitsCard(module)}${state.audience === 'customer' ? claimsGuidanceCard(module) : ''}</div>${pricingFeedback(module)}`;
    updateHomeView();
    updateProgress();
    updatePricingView();
  }

  function updateHomeView() {
    const home = state.cases.new_home;
    const module = knowledge.new_home;
    const { result, nextTask } = homeGuidance(state);
    document.getElementById('pipework-value').textContent = result
      ? home.pipeworkYear
      : text('Ei tiedossa');
    document.getElementById('pipework-year').disabled =
      home.pipeworkYear === null;
    document.getElementById('pipework-age').textContent = result
      ? `${result.age} ${text('vuotta vuonna')} ${module.referenceYear}`
      : `${text('Vertailuvuosi')} ${module.referenceYear}`;
    document.getElementById('deduction-percent').textContent = result
      ? `${result.deductionPercent} %`
      : '—';
    document.getElementById('deduction-context').textContent = result
      ? module.insights.deduction.limitation
      : module.insights.deduction.unknownLabel;
    document.getElementById('surface-text').textContent =
      home.surfaceYear === module.defaults.surfaceYear
        ? module.insights.surface.originalText
        : module.insights.surface.renovatedText;
    document.getElementById('home-next-title').textContent = nextTask
      ? nextTask.id === 'professional-review'
        ? module.presentation.pipeTaskTitle
        : nextTask.title
      : module.presentation.allDoneTitle;
    document.getElementById('home-next-reason').textContent = !nextTask
      ? module.presentation.allDoneText
      : !result
        ? module.presentation.missingYearText
        : (result.deductionPercent
            ? module.presentation.deductionText
            : module.presentation.zeroDeductionText
          )
            .replace('{year}', home.pipeworkYear)
            .replace('{percent}', result.deductionPercent);
    document.getElementById('home-surface-summary').textContent =
      module.presentation.surfaceSummary.replace('{year}', home.surfaceYear);
    const button = document.getElementById('home-next-button');
    button.hidden = !nextTask;
    button.dataset.taskTarget = nextTask?.id || '';
  }

  function updateProgress() {
    const ready = readiness(state, 'new_home');
    document.getElementById('progress-count').textContent =
      `${ready.completed}/${ready.total} ${text('tehty')}`;
    const progress = document.getElementById('home-progress');
    progress.max = ready.total;
    progress.value = ready.completed;
    document.getElementById('nav-progress-new_home').textContent =
      `${ready.completed}/${ready.total} ${text('tehty')} · ${text('Ikävähennykset')}`;
  }

  let draftRevision = 0;

  function caseHeading(module) {
    return `<div class="workspace-heading"><div class="workspace-title"><h2 id="scenario-title">${escape(module.title)}</h2><p class="case-intro" data-audience-copy="${state.audience}">${escape(audienceCopy(state).caseIntro)}</p></div><div class="heading-tools"><span class="small-label">${text('Kuvitteellinen esimerkkitilanne')} · ${module.referenceYear}</span>${infoButton('business', module, knowledge.new_home.experience.info.businessLabel)}</div></div>`;
  }

  function choiceControl(caseId, control) {
    return `<fieldset class="field" aria-describedby="help-${control.id}"><legend>${escape(control.label)}</legend><div class="segmented flexible-options">${control.options.map((option) => `<label><input type="radio" name="${caseId}-${control.id}" data-field="${control.id}" value="${escape(option.value)}" ${state.cases[caseId][control.id] === option.value ? 'checked' : ''}><span>${escape(option.label)}</span></label>`).join('')}</div><p class="field-help" id="help-${control.id}">${escape(control.help)}</p></fieldset>`;
  }

  function insightCard(item, module, extraClass = '') {
    return `<section class="card ${extraClass}"><h3>${escape(item.title || item.label)}</h3>${item.text ? `<p class="insight-text">${escape(item.text)}</p>` : ''}<p class="fine-print">${escape(item.limitation)}</p>${evidence(item, module)}</section>`;
  }

  function progressCard(module) {
    return `<section class="progress-card context-progress" aria-labelledby="case-progress-heading"><div class="progress-header"><h3 id="case-progress-heading">${escape(audienceCopy(state).progressTitle || module.presentation.progressTitle)}</h3><output id="case-progress-count" aria-live="polite"></output></div><progress id="case-progress" aria-labelledby="case-progress-heading"></progress><p class="fine-print">${escape(module.presentation.progressNotice)}</p></section>`;
  }

  function updateCaseProgress() {
    const ready = readiness(state, state.activeCase);
    document.getElementById('case-progress-count').textContent =
      `${ready.completed}/${ready.total} ${text('tehty')}`;
    const progress = document.getElementById('case-progress');
    progress.max = ready.total || 1;
    progress.value = ready.completed;
    document.getElementById(`nav-progress-${state.activeCase}`).textContent =
      `${ready.completed}/${ready.total} ${text('tehty')}`;
  }

  function caseTaskCards(caseId, taskIds = null) {
    const module = knowledge[caseId];
    return (
      visibleTasks(state, caseId)
        .filter((task) => !taskIds || taskIds.includes(task.id))
        .map((task) => {
          const complete = state.cases[caseId].completedTaskIds.has(task.id);
          const priority =
            caseId === 'absence' ? absencePriority(state, task) : task.priority;
          const assignment =
            caseId === 'absence' && task.delegatable
              ? `<label class="assignment"><input type="checkbox" data-assign="${task.id}" ${state.cases.absence.assignedTaskIds.has(task.id) ? 'checked' : ''} ${complete ? 'disabled' : ''}>${escape(module.presentation.assignLabel)}</label>`
              : '';
          return `<article class="task inline-task" data-complete="${complete}"><label class="task-toggle"><input type="checkbox" data-task="${task.id}" ${complete ? 'checked' : ''}><span>${escape(task.title)}</span></label><div class="task-body"><p class="task-why">${escape(task.why)}</p><div class="task-meta"><span class="badge priority-${priority}" data-priority="${task.id}">${escape(priorityLabels[priority])}</span><span class="complete-label" ${complete ? '' : 'hidden'}>${text('Merkitty tehdyksi')}</span></div>${assignment}${caseId === 'pet' ? `<p class="fine-print">${escape(task.limitation)}</p>` : ''}${evidence(task, module)}</div></article>`;
        })
        .join('') ||
      `<p class="fine-print">${escape(module.presentation.emptyTasksLabel || '')}</p>`
    );
  }

  function topicInsight(item, module) {
    return `<div class="topic-insight">${item.text ? `<p class="insight-text">${escape(item.text)}</p>` : ''}<p class="fine-print">${escape(item.limitation)}</p>${evidence(item, module)}</div>`;
  }

  function insightDetails(item, module) {
    return `<details class="topic-details"><summary>${escape(item.title || item.label)}</summary>${topicInsight(item, module)}</details>`;
  }

  function absenceTopics() {
    const module = knowledge.absence;
    return `<section class="card topic-card" aria-labelledby="water-heading"><h3 id="water-heading">${escape(module.presentation.waterTitle)}</h3><div class="topic-tasks">${caseTaskCards('absence', ['water-plan', 'appliance-taps'])}</div><p class="limitation">${escape(module.insights.water.limitation)}</p><div id="absence-water">${insightDetails(module.insights.water, module)}</div></section>
      <section class="card topic-card" id="absence-winter" aria-labelledby="heating-heading"><h3 id="heating-heading">${escape(module.presentation.heatingTitle)}</h3><div class="topic-tasks">${caseTaskCards('absence', ['heating'])}</div>${topicInsight(module.insights.winter, module)}</section>
      <section class="card topic-card" aria-labelledby="departure-heading"><h3 id="departure-heading">${escape(module.presentation.departureTitle)}</h3><div class="topic-tasks">${caseTaskCards('absence', ['caretaker', 'locks', 'mailbox', 'travel-documents'])}</div>${evidence(module.insights.preparation, module)}${evidence(module.rules.priorityEscalation, module)}</section>`;
  }

  function renderAbsence() {
    const module = knowledge.absence;
    const range = module.controls.find(
      (control) => control.id === 'durationDays',
    );
    const action = module.actions[0];
    workspace.innerHTML = `${caseHeading(module)}<div class="workspace-grid adaptive-workspace"><div class="stack"><section class="card" aria-labelledby="context-heading"><div class="card-heading"><h3 id="context-heading">${escape(audienceCopy(state).contextTitle)}</h3><span class="badge">${text('Esitäytetty profiili')}</span></div><p class="persona" id="absence-persona"></p><p class="trip-dates" id="absence-dates"></p>${choiceControl('absence', module.controls[0])}<div class="field"><label for="absence-duration">${escape(range.label)}</label><div class="range-value"><output class="year-value" id="absence-duration-value" for="absence-duration"></output><span>${text('vrk')}</span></div><input id="absence-duration" data-field="durationDays" type="range" min="${range.min}" max="${range.max}" step="${range.step}" value="${state.cases.absence.durationDays}" aria-describedby="help-duration"><div class="range-ends" aria-hidden="true"><span>${range.min} ${text('vrk')}</span><span>${range.max} ${text('vrk')}</span></div><p class="field-help" id="help-duration">${escape(range.help)}</p></div><p class="fine-print">${escape(module.demoNotice)}</p>${progressCard(module)}<p id="absence-preparation" class="fine-print" role="status"></p><p class="fine-print">${escape(module.presentation.priorityNotice)}</p></section></div>
      <div class="stack"><div id="case-tasks" class="stack">${absenceTopics()}</div>
      <section class="card draft-card" aria-labelledby="draft-heading"><h3 id="draft-heading">${escape(module.delegation.title)}</h3><p class="fine-print">${escape(module.presentation.notSent)}</p><label class="packet-label" for="absence-message">${escape(module.presentation.manualCopyLabel)}</label><textarea id="absence-message" rows="7" readonly></textarea><div class="draft-actions"><button type="button" class="primary-button" id="copy-absence">${escape(action.label)} ${icon('book')}</button><p id="copy-status" class="fine-print" role="status"></p></div>${evidence(module.delegation, module)}${evidence(action, module)}</section>
      <section class="card supporting-notes">${insightDetails(module.insights.consequences, module)}<details class="topic-details"><summary>${escape(module.presentation.scopeLabel)}</summary>${evidence(module.rules.buildingMonitoring, module)}${evidence(module.rules.insufficientBaseHeat, module)}</details></section></div></div>`;
    updateAbsenceView();
  }

  function updateAbsenceView(tasksChanged = false) {
    const module = knowledge.absence;
    const context = state.cases.absence;
    const trip = absenceTrip(state);
    document.getElementById('absence-duration-value').textContent =
      context.durationDays;
    document.getElementById('absence-persona').textContent =
      module.presentation.tripTemplate
        .replace('{season}', module.presentation.tripLabels[context.season])
        .replace('{durationDays}', context.durationDays);
    document.getElementById('absence-dates').textContent = trip
      ? `${displayDate(trip.departure)} – ${displayDate(trip.returnDate)}`
      : module.presentation.invalidTripLabel;
    if (tasksChanged)
      document.getElementById('case-tasks').innerHTML = absenceTopics();
    document.getElementById('absence-winter').hidden =
      context.season !== 'winter';
    document.getElementById('absence-water').hidden =
      !trip ||
      context.durationDays <=
        module.rules.extendedAbsence.durationDaysGreaterThan;
    document.querySelectorAll('[data-priority]').forEach((element) => {
      const task = module.tasks.find(
        (item) => item.id === element.dataset.priority,
      );
      const priority = absencePriority(state, task);
      element.textContent = text(priorityLabels[priority]);
      element.className = `badge priority-${priority}`;
    });
    const ready = readiness(state, 'absence');
    document.getElementById('absence-preparation').textContent =
      ready.completed === ready.total
        ? module.insights.preparation.completedLabel
        : module.insights.preparation.pendingLabel;
    const draft = buildAbsenceDraft(state);
    document.getElementById('absence-message').value = draft.text;
    document.getElementById('copy-absence').disabled = !draft.taskIds.length;
    document.getElementById('copy-status').textContent = draft.taskIds.length
      ? ''
      : module.actions[0].emptyLabel;
    draftRevision++;
    updateCaseProgress();
    if (tasksChanged) arrangeWorkspace();
  }

  async function copyAbsence() {
    const draft = buildAbsenceDraft(state);
    if (!draft.taskIds.length) return;
    const revision = draftRevision;
    let copied = false;
    try {
      await navigator.clipboard.writeText(draft.text);
      copied = true;
    } catch {
      /* Selectable text remains available. */
    }
    if (state.activeCase !== 'absence' || revision !== draftRevision) return;
    const action = knowledge.absence.actions[0];
    document.getElementById('copy-status').textContent = copied
      ? action.confirmation
      : `${action.fallbackLabel} ${knowledge.absence.presentation.notSent}`;
    if (!copied) {
      const textarea = document.getElementById('absence-message');
      textarea.focus();
      textarea.select();
    }
  }

  function babyTopics() {
    const module = knowledge.first_baby;
    const context = state.cases.first_baby;
    const categories =
      context.category === 'all'
        ? ['car', 'sleep', 'home']
        : [context.category];
    return categories
      .map((category) => {
        const tasks = visibleTasks(state, 'first_baby')
          .filter((task) => task.category === category)
          .map((task) => task.id);
        const notes =
          category === 'car'
            ? insightDetails(module.insights.approval, module)
            : category === 'sleep'
              ? module.standards
                  .map((item) => insightDetails(item, module))
                  .join('')
              : '';
        return `<section class="card topic-card" aria-labelledby="baby-${category}-heading"><h3 id="baby-${category}-heading">${escape(module.presentation.topicTitles[category])}</h3><div class="topic-tasks">${caseTaskCards('first_baby', tasks)}</div>${notes}</section>`;
      })
      .join('');
  }

  function renderBaby() {
    const module = knowledge.first_baby;
    workspace.innerHTML = `${caseHeading(module)}<div class="workspace-grid adaptive-workspace"><div class="stack"><section class="card"><div class="card-heading"><h3>${escape(audienceCopy(state).contextTitle)}</h3><span class="badge">${text('Esitäytetty profiili')}</span></div><p class="persona">${escape(module.persona)}</p>${module.controls.map((control) => choiceControl('first_baby', control)).join('')}<p class="fine-print persona-notice">${escape(module.demoNotice)}</p>${progressCard(module)}</section></div><div class="stack"><div id="case-tasks" class="stack">${babyTopics()}</div><section class="card supporting-notes" id="baby-insights"></section>${insightCard(hasPolicy(state, 'unborn-child') ? module.insights.existingInsurance : module.insights.insurance, module, `insurance-note ${hasPolicy(state, 'unborn-child') ? 'insurance-owned' : 'insurance-acquisition'}`)}<section class="card"><h3>${escape(module.actions[0].title)}</h3><p class="insight-text">${escape(module.actions[0].text)}</p><button type="button" class="primary-button" data-action="prepare-questions">${escape(module.actions[0].label)} ${icon('arrow')}</button>${evidence(module.actions[0], module)}</section></div></div>`;
    updateBabyView();
  }

  function updateBabyView(tasksChanged = false) {
    const module = knowledge.first_baby;
    const context = state.cases.first_baby;
    if (tasksChanged)
      document.getElementById('case-tasks').innerHTML = babyTopics();
    document.getElementById('baby-insights').innerHTML = insightDetails(
      context.equipmentCondition === 'used'
        ? module.insights.usedEquipment
        : module.insights.newEquipment,
      module,
    );
    updateCaseProgress();
    if (tasksChanged) arrangeWorkspace();
  }

  function petChecks(entries, field) {
    return `<div class="check-options">${entries.map((item) => `<div><label class="option-checkbox"><input type="checkbox" data-pet-field="${field}" value="${item.id}" ${state.cases.pet[field].includes(item.id) ? 'checked' : ''}><span>${escape(item.label)}</span></label>${evidence(item, knowledge.pet)}</div>`).join('')}</div>`;
  }

  function renderPet() {
    const module = knowledge.pet;
    workspace.innerHTML = `${caseHeading(module)}<section class="card route-card" id="pet-route" aria-live="polite" aria-labelledby="pet-route-heading"></section>
      <div class="workspace-grid adaptive-workspace"><div class="stack"><section class="card"><div class="card-heading"><h3>${escape(audienceCopy(state).contextTitle)}</h3><span class="badge">${text('Esitäytetty profiili')}</span></div><p class="persona">${escape(module.persona)}</p><p class="fine-print">${escape(module.demoNotice)}</p>${progressCard(module)}</section></div>
      <div class="stack">
      <section class="card topic-card"><fieldset class="field"><legend>${escape(module.controls[0].label)}</legend><p class="field-help">${escape(module.controls[0].help)}</p>${petChecks(module.symptoms, 'symptomIds')}</fieldset>${choiceControl('pet', module.controls[2])}<p class="preparation-label">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</p><div class="topic-tasks">${caseTaskCards('pet', ['symptom-timeline'])}</div></section>
      <section class="card topic-card"><fieldset class="field"><legend>${escape(module.controls[1].label)}</legend><p class="field-help">${escape(module.controls[1].help)}</p>${petChecks(module.emergencySigns, 'emergencySignIds')}</fieldset><p class="preparation-label">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</p><div class="topic-tasks">${caseTaskCards('pet', ['notice-urgency'])}</div></section>
      <section class="card topic-card" aria-labelledby="observations-heading"><h3 id="observations-heading">${escape(module.presentation.observationsTitle)}</h3>${module.observations.map((item) => `<div class="field"><label for="observation-${item.id}">${escape(item.label)}</label><select id="observation-${item.id}" data-observation="${item.id}">${item.options.map((option) => `<option value="${option.value}" ${state.cases.pet.observations[item.id] === option.value ? 'selected' : ''}>${escape(option.label)}</option>`).join('')}</select>${evidence(item, module)}${item.id === 'waterRetention' ? `<p class="preparation-label">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</p><div class="topic-tasks">${caseTaskCards('pet', ['water-observation'])}</div>` : ''}</div>`).join('')}</section>
      <section class="card draft-card"><h3>${escape(module.packet.title)}</h3><p class="fine-print">${escape(module.presentation.notSent)}</p><p class="preparation-label">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</p><div class="topic-tasks">${caseTaskCards('pet', ['background'])}</div><details class="packet-preview"><summary>${escape(module.presentation.packetLabel)}</summary><label class="sr-only" for="pet-packet">${escape(module.presentation.packetLabel)}</label><textarea id="pet-packet" rows="8" readonly></textarea></details>${evidence(module.packet, module)}</section>
</div></div><div class="pet-guidance-feedback" id="pet-guidance-feedback" hidden><div><strong id="pet-feedback-heading"></strong><p class="fine-print">${escape(module.presentation.guidancePrompt)}</p></div><button type="button" class="primary-button" data-show-pet-guidance>${escape(module.presentation.showGuidanceLabel)} ${icon('arrow')}</button></div>`;
    updatePetView();
  }

  function updatePetView() {
    const module = knowledge.pet;
    const route = petRoute(state);
    const container = document.getElementById('pet-route');
    const access = petServiceAccess(state);
    const viewKey = `${route}:${access}:${!!state.cases.pet.introContactUsed}`;
    if (container.dataset.viewKey !== viewKey) {
      const insight = module.insights[route];
      const action = petPrimaryAction(state);
      const insured = access === 'included' && route !== 'emergency';
      const intro = petIntroAvailable(state);
      const used =
        access === 'notIncluded' &&
        state.cases.pet.introContactUsed &&
        route !== 'emergency';
      const boundary = module.insights.alwaysVisibleBoundary;
      const title = insured
        ? route === 'urgent'
          ? module.presentation.insuredUrgentTitle
          : module.presentation.insuredContactTitle
        : insight.title;
      container.dataset.route = route;
      container.dataset.access = access;
      container.dataset.viewKey = viewKey;
      container.innerHTML = `<h3 id="pet-route-heading">${escape(title)}</h3><p>${escape(insight.text)}</p>${insured ? `<p class="service-access-text">${escape(module.service.access.includedText)}</p>` : ''}${intro ? `<div class="intro-offer" data-intro-offer><h4>${escape(module.introOffer.title)}</h4><p>${escape(module.introOffer.text)}</p><p class="fine-print">${escape(module.introOffer.notice)}</p>${evidence(module.introOffer, module)}</div>` : ''}${used ? `<p class="intro-used fine-print" data-intro-used>${escape(module.introOffer.usedText)}</p>` : ''}<p class="fine-print">${escape(insight.limitation)}</p><button type="button" class="primary-button" data-action="${action.id}">${escape(action.label)} ${icon('arrow')}</button>${insured ? `<details class="topic-details"><summary>${escape(module.presentation.channelDetailsLabel)}</summary><p class="fine-print">${escape(module.presentation.serviceHoursTemplate.replace('{weekday}', module.service.availability.weekdayChatVideo).replace('{weekend}', module.service.availability.weekendChatVideo).replace('{otherTimes}', module.service.availability.otherTimes))}</p><p class="fine-print">${escape(module.service.access.demoNotice)}</p>${evidence(module.service, module)}</details>` : ''}${evidence(insight, module)}${evidence(module.rules.routing, module)}<div class="emergency-boundary" aria-labelledby="boundary-heading"><h4 id="boundary-heading">${escape(boundary.title)}</h4><p class="fine-print">${escape(boundary.text)}</p><p class="fine-print">${escape(boundary.limitation)}</p>${evidence(boundary, module)}</div>`;
    }
    if (
      dialog.open &&
      ['pet', 'pet-info', 'policy'].includes(dialog.dataset.case) &&
      dialog.dataset.route !== route
    ) {
      dialog.close();
      const heading = document.getElementById('pet-route-heading');
      heading.tabIndex = -1;
      heading.focus();
    }
    document.getElementById('pet-packet').value = buildPetPacket(state);
    if (dialog.open && dialog.dataset.case === 'pet')
      document.getElementById('scenario-packet').value = buildPetPacket(state);
    document.getElementById('pet-feedback-heading').textContent =
      document.getElementById('pet-route-heading').textContent;
    document.getElementById('pet-guidance-feedback').dataset.route = route;
    syncPetGuidanceFeedback();
    updateCaseProgress();
  }

  function syncPetGuidanceFeedback() {
    if (state.activeCase !== 'pet') return;
    const heading = document.getElementById('pet-route-heading');
    if (!heading) return;
    const bounds = heading.getBoundingClientRect();
    const show =
      petRoute(state) !== 'contact' &&
      (bounds.bottom < 0 || bounds.top > window.innerHeight);
    document.getElementById('pet-guidance-feedback').hidden = !show;
    document.body.classList.toggle('pet-guidance-visible', show);
  }

  function openScenarioAction(actionId) {
    const caseId = state.activeCase;
    const module = knowledge[caseId];
    const action =
      caseId === 'pet'
        ? petAction(state, actionId)
        : module.actions.find((item) => item.id === actionId);
    if (!action) return;
    const packet =
      caseId === 'pet' ? buildPetPacket(state) : buildBabyPacket(state);
    document.getElementById('dialog-content').innerHTML =
      `<h2 id="dialog-title">${escape(action.title)}</h2><p class="confirmation" id="dialog-confirmation">${escape(action.confirmation)}</p>${caseId === 'pet' && petRoute(state) !== 'contact' ? `<p class="limitation">${escape(module.insights[petRoute(state)].text)}</p>` : ''}<p>${escape(action.text)}</p><label class="packet-label" for="scenario-packet">${escape(module.presentation.packetLabel)}</label><textarea id="scenario-packet" rows="10" readonly></textarea><p class="fine-print">${escape(action.limitation)}</p>${evidence(action, module)}${action.id === 'intro-help' ? `<button type="button" class="primary-button" data-use-pet-intro>${escape(module.introOffer.confirmLabel)}</button><p id="intro-use-status" role="status"></p>` : ''}`;
    document.getElementById('scenario-packet').value = packet;
    dialog.dataset.case = caseId;
    dialog.dataset.route = caseId === 'pet' ? petRoute(state) : '';
    dialog.showModal();
  }

  function switchCase(caseId) {
    if (!scenarios.some((item) => item.id === caseId)) return;
    if (dialog.open) dialog.close();
    state.activeCase = caseId;
    document.body.classList.remove('pricing-feedback-visible');
    document.body.classList.remove('pet-guidance-visible');
    nav
      .querySelectorAll('[data-case]')
      .forEach((button) =>
        button.setAttribute(
          'aria-current',
          String(button.dataset.case === caseId),
        ),
      );
    if (caseId === 'new_home') renderHome();
    else if (caseId === 'absence') renderAbsence();
    else if (caseId === 'first_baby') renderBaby();
    else renderPet();
    updatePolicyContext();
    arrangeWorkspace();
  }

  function openHelp() {
    const module = knowledge.new_home;
    const action = module.actions[0];
    document.getElementById('dialog-content').innerHTML =
      `<h2 id="dialog-title">${escape(action.title)}</h2><p class="confirmation" id="dialog-confirmation">${escape(action.confirmation)}</p><p>${escape(action.text)}</p><label class="packet-label" for="help-packet">${text('Oma kysymyslistasi · voit valita ja kopioida tekstin')}</label><textarea id="help-packet" readonly rows="10"></textarea><p class="fine-print">${escape(action.limitation)}</p>${evidence(action, module)}`;
    document.getElementById('help-packet').value = buildHomePacket(state);
    dialog.dataset.case = 'new_home';
    dialog.dataset.route = '';
    dialog.showModal();
  }

  function renderAudienceContext() {
    const experience = knowledge.new_home.experience;
    const copy = experience[state.audience];
    const customer = state.audience === 'customer';
    document.querySelector('.intro .eyebrow').textContent = copy.eyebrow;
    document.querySelector('.intro h1').innerHTML =
      `${escape(copy.heroLine1)}<br><span>${escape(copy.heroLine2)}</span>`;
    document.querySelector('.intro-copy').textContent = copy.heroText;
    document.getElementById('audience-context').innerHTML =
      `<div class="section-title"><h2 id="audience-title">${escape(copy.title)}</h2>${infoButton('policy', knowledge.new_home, experience.info.policyLabel)}</div>${customer ? `<fieldset class="portfolio-options"><legend>${escape(copy.portfolioLabel)}</legend>${experience.portfolios.map((item) => `<label class="portfolio-option"><input type="radio" name="customer-portfolio" data-portfolio="${item.id}" value="${item.id}" ${item.id === state.portfolioId ? 'checked' : ''}><span><strong>${escape(item.label)}</strong><span class="small-label">${escape(item.effect)}</span></span></label>`).join('')}</fieldset><p class="fine-print">${escape(copy.bundleNotice)}</p>` : `<p>${escape(copy.text)}</p>`}<p class="fine-print audience-notice">${escape(copy.notice)}</p>`;
    document
      .querySelectorAll('#audience-nav [data-audience]')
      .forEach((link) =>
        link.setAttribute(
          'aria-current',
          link.dataset.audience === state.audience ? 'page' : 'false',
        ),
      );
  }

  function updatePolicyContext() {
    let panel = document.getElementById('policy-context');
    if (!panel) {
      panel = document.createElement('section');
      panel.id = 'policy-context';
      panel.className = 'policy-context';
      panel.setAttribute(
        'aria-label',
        knowledge.new_home.experience.customer.portfolioLabel,
      );
      workspace.querySelector('.workspace-heading').after(panel);
    }
    panel.hidden = state.activeCase === 'pet';
    const price =
      state.activeCase === 'new_home' ? calculateHomePrice(state) : null;
    panel.innerHTML = `<p>${escape(policyContext(state))}</p>${state.activeCase === 'new_home' ? `<div class="policy-price"><span class="small-label">${escape(knowledge.new_home.experience.policyContext.homePriceLabel)}</span><strong id="policy-price">${price ? `${money(price.projectedAnnualCents)} ${escape(knowledge.new_home.preventionIncentive.copy.perYear)}` : escape(knowledge.new_home.preventionIncentive.copy.unavailableLabel)}</strong></div>` : ''}${state.audience === 'customer' ? `<button type="button" class="text-button" data-policy-questions>${escape(knowledge.new_home.experience.policyContext.questionsLabel)} ${icon('arrow')}</button>` : ''}`;
  }

  function openPolicyQuestions() {
    const copy = knowledge.new_home.experience.policyContext;
    document.getElementById('dialog-content').innerHTML =
      `<h2 id="dialog-title">${escape(copy.questionsTitle)}</h2><p class="confirmation" id="dialog-confirmation">${escape(copy.notSent)}</p><label class="packet-label" for="policy-packet">${escape(copy.packetLabel)}</label><textarea id="policy-packet" readonly rows="10"></textarea>`;
    document.getElementById('policy-packet').value =
      buildPolicyQuestions(state);
    dialog.dataset.case = 'policy';
    dialog.dataset.route = state.activeCase === 'pet' ? petRoute(state) : '';
    dialog.showModal();
  }

  function switchAudience() {
    const audience =
      window.location.hash === '#asiakas' ? 'customer' : 'visitor';
    if (state.audience === audience) return;
    if (dialog.open) dialog.close();
    const activeCase = state.activeCase;
    state = audienceStates[audience];
    state.activeCase = activeCase;
    renderAudienceContext();
    renderNav();
    switchCase(activeCase);
  }

  function renderPersonnel() {
    const copy = knowledge.new_home.experience.staff;
    document.getElementById('staff-title').textContent = copy.title;
    document.getElementById('staff-subtitle').textContent = copy.subtitle;
    document.getElementById('staff-notice').textContent = copy.notice;
    workspace.innerHTML = `<section class="card analytics-filters" aria-labelledby="staff-filters-heading"><h2 id="staff-filters-heading">${escape(copy.filtersTitle)}</h2><div class="filter-controls"><div><label for="staff-policy-filter">${escape(copy.policyFilterLabel)}</label><select id="staff-policy-filter"><option value="all">${escape(copy.allPoliciesLabel)}</option>${copy.policyTypes.map((type) => `<option value="${type.id}">${escape(type.label)}</option>`).join('')}</select></div><div><label for="staff-case-filter">${escape(copy.caseFilterLabel)}</label><select id="staff-case-filter"><option value="all">${escape(copy.allCasesLabel)}</option>${scenarios.map((item) => `<option value="${item.id}">${escape(knowledge[item.id].title)}</option>`).join('')}</select></div></div><p class="fine-print" id="staff-filter-result" role="status"></p></section><div class="stack" id="staff-report"></div>`;
    function renderReport() {
      const analytics = staffAnalytics({
        policyType: document.getElementById('staff-policy-filter').value,
        caseId: document.getElementById('staff-case-filter').value,
      });
      const summary = analytics.summary;
      const number = (value) =>
        new Intl.NumberFormat(language === 'en' ? 'en-IE' : 'fi-FI', {
          maximumFractionDigits: 1,
        }).format(value);
      const bars = (entries, feedback = false) =>
        `<ul class="analytics-bars">${entries.map((entry) => `<li><div><span>${escape(entry.label)}</span><strong>${entry.count} ${escape(feedback ? (entry.count === 1 ? copy.feedbackSingularLabel : copy.feedbackCountLabel) : entry.count === 1 ? copy.unitSingularLabel : copy.unitLabel)}</strong></div><div class="analytics-track" aria-hidden="true"><span style="width:${summary.customers ? (entry.count / summary.customers) * 100 : 0}%"></span></div></li>`).join('')}</ul>`;
      document.getElementById('staff-filter-result').textContent =
        `${copy.filterResultLabel}: ${summary.customers}`;
      document.getElementById('staff-report').innerHTML =
        `<section class="card" aria-labelledby="staff-analytics-heading"><h2 id="staff-analytics-heading">${escape(copy.analyticsTitle)}</h2><p class="fine-print">${escape(copy.analyticsNotice)}</p><dl class="staff-metrics">${Object.entries(
          copy.metricLabels,
        )
          .map(
            ([key, label]) =>
              `<div><dt>${escape(label)}</dt><dd id="staff-metric-${key}">${key === 'feedback' ? (summary.feedback === null ? '—' : `${number(summary.feedback)}<span class="metric-sample">${summary.feedbackCount} ${escape(summary.feedbackCount === 1 ? copy.feedbackSingularLabel : copy.feedbackCountLabel)}</span>`) : summary[key]}</dd></div>`,
          )
          .join('')}</dl></section>
        <div class="analytics-grid"><section class="card" aria-labelledby="staff-distribution-heading"><h2 id="staff-distribution-heading">${escape(copy.distributionTitle)}</h2><p class="fine-print">${escape(copy.distributionNotice)}</p>${bars(analytics.policyDistribution)}</section><section class="card" aria-labelledby="staff-feedback-heading"><h2 id="staff-feedback-heading">${escape(copy.feedbackTitle)}</h2><p class="fine-print">${escape(copy.feedbackNotice)}</p>${bars(
          analytics.feedbackDistribution.map((entry) => ({
            label: `${entry.score}/5`,
            count: entry.count,
          })),
          true,
        )}</section></div>
        <section class="card" aria-labelledby="staff-preparation-heading"><h2 id="staff-preparation-heading">${escape(copy.preparationTitle)}</h2><p class="fine-print">${escape(copy.preparationNotice)}</p><div class="table-scroll" role="region" tabindex="0" aria-label="${escape(copy.preparationTitle)}"><table><thead><tr><th scope="col">${escape(copy.caseColumn)}</th><th scope="col">${escape(copy.customerCountColumn)}</th><th scope="col">${escape(copy.taskCountColumn)}</th></tr></thead><tbody>${analytics.byCase.map((item) => `<tr><th scope="row">${escape(knowledge[item.id].title)}</th><td>${item.customers}</td><td>${item.total ? `${item.completed} / ${item.total}` : '—'}</td></tr>`).join('')}</tbody></table></div></section>
        <section class="card" aria-labelledby="staff-table-heading"><h2 id="staff-table-heading">${escape(copy.tableTitle)}</h2><div class="table-scroll" role="region" tabindex="0" aria-label="${escape(copy.tableTitle)}"><table id="staff-customer-table"><caption>${escape(copy.tableCaption)}</caption><thead><tr>${Object.values(
          copy.columns,
        )
          .map((label) => `<th scope="col">${escape(label)}</th>`)
          .join(
            '',
          )}</tr></thead><tbody>${analytics.rows.map((customer) => `<tr><th scope="row">${escape(customer.name)}<span class="small-label">${escape(customer.id)}</span></th><td><ul class="table-policies">${customer.policies.map((policy) => `<li>${escape(policy.label)}</li>`).join('')}</ul></td><td>${escape(knowledge[customer.caseId].title)}</td><td>${customer.preparation.completed} / ${customer.preparation.total}</td><td><details><summary>${customer.feedbackScore}/5 · ${escape(copy.feedbackDetailsLabel)}</summary><p class="fine-print">${escape(customer.feedbackText)}</p></details></td></tr>`).join('')}</tbody></table></div>${analytics.rows.length ? '' : `<p class="empty-state">${escape(copy.emptyLabel)}</p>`}</section>`;
    }
    workspace.onchange = (event) => {
      if (
        ['staff-policy-filter', 'staff-case-filter'].includes(event.target.id)
      )
        renderReport();
    };
    renderReport();
  }

  // Capture the static document shell once; dynamic text comes from local knowledge.
  const shellText = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (canonicalKnowledge.new_home.uiEnglish[node.textContent.trim()])
      shellText.push([node, node.textContent]);
  }
  const shellAttributes = [...document.querySelectorAll('[aria-label]')].map(
    (node) => [node, node.getAttribute('aria-label')],
  );
  const originalTitle = document.title;
  function updateLanguageShell() {
    document.documentElement.lang = language;
    document.title = text(originalTitle);
    shellText.forEach(([node, original]) => {
      node.textContent = original.replace(
        original.trim(),
        text(original.trim()),
      );
    });
    shellAttributes.forEach(([node, original]) =>
      node.setAttribute('aria-label', text(original)),
    );
    document
      .querySelectorAll('[data-language]')
      .forEach((button) =>
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.language === language),
        ),
      );
    document.querySelectorAll('a[href]').forEach((link) => {
      const raw = link.getAttribute('href');
      if (!/^\.\/(index|personnel)\.html/.test(raw)) return;
      const url = new URL(raw, location.href);
      if (language === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      link.setAttribute(
        'href',
        `./${url.pathname.split('/').pop()}${url.search}${url.hash}`,
      );
    });
  }
  function renderAudienceNav() {
    const experience = knowledge.new_home.experience;
    document.getElementById('audience-nav').innerHTML =
      `<span class="small-label">${escape(experience.roleLabel)}</span><a href="#tutustu" data-audience="visitor">${escape(experience.roles.visitor)}</a><a href="#asiakas" data-audience="customer">${escape(experience.roles.customer)}</a><a href="./personnel.html">${escape(experience.roles.staff)}</a>`;
  }
  document
    .querySelector('.language-switch')
    .addEventListener('click', (event) => {
      const button = event.target.closest('[data-language]');
      if (!button || language === button.dataset.language) return;
      if (dialog?.open) dialog.close();
      const filters =
        document.body.dataset.page === 'personnel'
          ? [
              document.getElementById('staff-policy-filter').value,
              document.getElementById('staff-case-filter').value,
            ]
          : null;
      setLanguage(button.dataset.language);
      const currentUrl = new URL(location.href);
      currentUrl.searchParams.set('lang', language);
      history.replaceState(null, '', currentUrl);
      draftRevision++;
      if (filters) {
        renderPersonnel();
        document.getElementById('staff-policy-filter').value = filters[0];
        document.getElementById('staff-case-filter').value = filters[1];
        document
          .getElementById('staff-policy-filter')
          .dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        renderAudienceNav();
        renderAudienceContext();
        renderNav();
        switchCase(state.activeCase);
      }
      updateLanguageShell();
      button.focus();
    });
  setLanguage(
    new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fi',
  );
  if (document.body.dataset.page === 'personnel') {
    renderPersonnel();
    updateLanguageShell();
    return;
  }
  renderAudienceNav();
  renderAudienceContext();
  window.addEventListener('hashchange', switchAudience);
  document
    .getElementById('audience-context')
    .addEventListener('change', (event) => {
      if (
        !event.target.dataset.portfolio ||
        !setPortfolio(state, event.target.dataset.portfolio)
      )
        return;
      renderNav();
      switchCase(state.activeCase);
    });

  nav.addEventListener('click', (event) => {
    const button = event.target.closest('[data-case]');
    if (button) switchCase(button.dataset.case);
  });
  workspace.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.info) {
      openInfo(button.dataset.info, button.dataset.infoCase);
      return;
    }
    if (button.hasAttribute('data-policy-questions')) {
      openPolicyQuestions();
      return;
    }
    if (button.hasAttribute('data-show-home-task')) {
      const input = workspace.querySelector(
        `[data-task="${button.dataset.taskTarget}"]`,
      );
      input.focus();
      input.scrollIntoView({ block: 'center' });
      return;
    }
    if (button.hasAttribute('data-show-pet-guidance')) {
      const heading = document.getElementById('pet-route-heading');
      heading.tabIndex = -1;
      heading.focus();
      heading.scrollIntoView({ block: 'start' });
      syncPetGuidanceFeedback();
    }
    if (button.hasAttribute('data-show-pricing')) {
      document.getElementById('pricing-feedback').hidden = true;
      document.body.classList.remove('pricing-feedback-visible');
      document.getElementById('pricing-heading').focus();
      document
        .getElementById('pricing-heading')
        .scrollIntoView({ block: 'start' });
    }
    if (button.dataset.case) {
      switchCase(button.dataset.case);
      workspace.focus();
    }
    if (button.id === 'copy-absence') {
      copyAbsence();
      return;
    }
    if (button.dataset.action === 'plumbing-help') openHelp();
    else if (button.dataset.action) openScenarioAction(button.dataset.action);
  });
  workspace.addEventListener('input', (event) => {
    if (event.target.id === 'pipework-year') {
      updateHome(state, 'pipeworkYear', event.target.valueAsNumber);
      updateHomeView();
    } else if (
      state.activeCase === 'absence' &&
      event.target.dataset.field === 'durationDays'
    ) {
      updateScenario(
        state,
        'absence',
        'durationDays',
        event.target.valueAsNumber,
      );
      updateAbsenceView();
    }
  });
  workspace.addEventListener('change', (event) => {
    const input = event.target;
    const caseId = state.activeCase;
    if (input.dataset.field && input.type !== 'range') {
      updateScenario(state, caseId, input.dataset.field, input.value);
      if (caseId === 'absence') updateAbsenceView(true);
      if (caseId === 'first_baby') updateBabyView(true);
      if (caseId === 'pet') updatePetView();
    }
    if (input.dataset.assign) {
      setAssignment(state, input.dataset.assign, input.checked);
      updateAbsenceView();
    }
    if (input.dataset.petField) {
      setPetSelection(
        state,
        input.dataset.petField,
        input.value,
        input.checked,
      );
      updatePetView();
    }
    if (input.dataset.observation) {
      setPetObservation(state, input.dataset.observation, input.value);
      updatePetView();
    }
    if (input.name === 'surface-year') {
      updateHome(state, 'surfaceYear', Number(input.value));
      updateHomeView();
    }
    if (input.id === 'unknown-pipework-year') {
      updateHome(
        state,
        'pipeworkYear',
        input.checked ? null : state.cases.new_home.lastKnownPipeworkYear,
      );
      updateHomeView();
    }
    if (input.dataset.task) {
      setTaskComplete(state, caseId, input.dataset.task, input.checked);
      const task = input.closest('.task');
      task.dataset.complete = String(input.checked);
      task.querySelector('.complete-label').hidden = !input.checked;
      const assignment = task.querySelector('[data-assign]');
      if (assignment) assignment.disabled = input.checked;
      if (caseId === 'new_home') {
        updateProgress();
        updateHomeView();
        updatePricingView(true);
      }
      if (caseId === 'absence') updateAbsenceView();
      if (caseId === 'first_baby') updateCaseProgress();
      if (caseId === 'pet') updatePetView();
    }
  });
  document
    .getElementById('audience-context')
    .addEventListener('click', (event) => {
      const button = event.target.closest('[data-info]');
      if (button) openInfo(button.dataset.info, button.dataset.infoCase);
    });
  dialog.addEventListener('click', (event) => {
    const button = event.target.closest('[data-use-pet-intro]');
    if (!button || !usePetIntro(state)) return;
    button.disabled = true;
    button.textContent = knowledge.pet.introOffer.usedLabel;
    const status = document.getElementById('intro-use-status');
    status.textContent = knowledge.pet.introOffer.usedText;
    status.tabIndex = -1;
    status.focus();
    updatePetView();
  });
  dialog.addEventListener('close', () => {
    if (
      dialog.dataset.case === 'pet' &&
      state.activeCase === 'pet' &&
      (document.activeElement === document.body ||
        dialog.contains(document.activeElement))
    ) {
      document.querySelector('#pet-route > button')?.focus();
    }
  });
  document
    .getElementById('close-dialog')
    .addEventListener('click', () => dialog.close());
  window.addEventListener('scroll', syncPetGuidanceFeedback, { passive: true });
  window.addEventListener('resize', syncPetGuidanceFeedback);
  window.addEventListener('resize', arrangeWorkspace);
  renderNav();
  switchCase(state.activeCase);
  updateLanguageShell();
})();
