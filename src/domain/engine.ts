import type { canonicalExperience } from '../content/index.ts';
import {
  caseIds,
  type Knowledge,
  type CaseId,
  type AppState,
  type Task,
  type PremiumConfig,
} from './models';
import { calculatePreventionPrice } from './pricing';
export { caseIds } from './models';
export type { CaseId, Audience, AppState } from './models';

export function createDomain(
  knowledge: Knowledge,
  experience: typeof canonicalExperience,
) {
  function calculateDeduction(
    year: number | null,
    module = knowledge.new_home,
  ) {
    const control = module.controls.find((item) => item.id === 'pipeworkYear');
    if (
      !control ||
      typeof control.min !== 'number' ||
      typeof control.max !== 'number' ||
      typeof year !== 'number' ||
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
    return band
      ? {
          age,
          deductionPercent: band.deductionPercent,
          remainingPercent: 100 - band.deductionPercent,
          coverageKnown: false as const,
        }
      : null;
  }
  function createState(audience: string = 'visitor'): AppState {
    const home = structuredClone(knowledge.new_home.defaults);
    const absence = structuredClone(knowledge.absence.defaults);
    const baby = structuredClone(knowledge.first_baby.defaults);
    const pet = structuredClone(knowledge.pet.defaults);
    return {
      activeCase: 'new_home',
      audience: audience === 'customer' ? 'customer' : 'visitor',
      portfolioId: 'multi',
      cases: {
        new_home: {
          ...home,
          completedTaskIds: new Set(home.completedTaskIds),
          lastKnownPipeworkYear: home.pipeworkYear,
        },
        absence: {
          ...absence,
          completedTaskIds: new Set(absence.completedTaskIds),
          assignedTaskIds: new Set(absence.assignedTaskIds),
        },
        first_baby: {
          ...baby,
          completedTaskIds: new Set(baby.completedTaskIds),
        },
        pet: {
          ...pet,
          completedTaskIds: new Set(pet.completedTaskIds),
          introContactUsed: false,
        },
      },
    };
  }
  function currentPolicies(state: AppState) {
    if (state.audience !== 'customer') return [];
    const portfolio = experience.portfolios.find(
      (item) => item.id === state.portfolioId,
    );
    return portfolio
      ? [...portfolio.policies, ...(state.extraPolicies || [])]
      : [];
  }
  const hasPolicy = (state: AppState, type: string) =>
    currentPolicies(state).some((policy) => policy.type === type);
  function applicableTasks(state: AppState, caseId: CaseId): Task[] {
    const context = state.cases[caseId];
    return (knowledge[caseId].tasks as Task[]).filter(
      (task) =>
        Object.entries(task.when || {}).every(
          ([field, value]) => Reflect.get(context, field) === value,
        ) &&
        (!task.requiresPolicyType || hasPolicy(state, task.requiresPolicyType)),
    );
  }
  const visibleTasks = (state: AppState, caseId: CaseId) =>
    applicableTasks(state, caseId).filter(
      (task) =>
        caseId !== 'first_baby' ||
        state.cases.first_baby.category === 'all' ||
        task.category === state.cases.first_baby.category,
    );
  function readiness(state: AppState, caseId: CaseId) {
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
  function setTaskComplete(
    state: AppState,
    caseId: CaseId,
    taskId: string,
    complete: boolean,
  ) {
    if (!knowledge[caseId].tasks.some((task) => task.id === taskId))
      return false;
    if (complete) state.cases[caseId].completedTaskIds.add(taskId);
    else state.cases[caseId].completedTaskIds.delete(taskId);
    return true;
  }
  function updateHome(state: AppState, field: string, value: number | null) {
    const home = state.cases.new_home;
    if (field === 'pipeworkYear') {
      home.pipeworkYear = calculateDeduction(value) ? value : null;
      if (home.pipeworkYear !== null)
        home.lastKnownPipeworkYear = home.pipeworkYear;
    } else if (field === 'surfaceYear') {
      const control = knowledge.new_home.controls.find(
        (item) => item.id === field,
      );
      if (
        control &&
        control.options &&
        control.options.some((option) => option.value === value)
      )
        home.surfaceYear = value!;
    }
  }
  function updateScenario(
    state: AppState,
    caseId: CaseId,
    field: string,
    value: unknown,
  ) {
    const control = knowledge[caseId].controls.find(
      (item) => item.id === field,
    );
    if (!control) return false;
    if (
      (control.type === 'choice' &&
        control.options &&
        control.options.some((option) => option.value === value)) ||
      (control.type === 'range' &&
        'min' in control &&
        typeof control.min === 'number' &&
        typeof control.max === 'number' &&
        typeof value === 'number' &&
        Number.isInteger(value) &&
        value >= control.min &&
        value <= control.max)
    ) {
      Reflect.set(state.cases[caseId], field, value);
      return true;
    }
    return false;
  }
  function absenceTrip(state: AppState) {
    const context = state.cases.absence;
    const control = knowledge.absence.controls.find(
      (item) => item.id === 'durationDays',
    );
    const dates: Record<string, string> =
      knowledge.absence.rules.tripDates.departureBySeason;
    const departure = dates[context.season];
    if (
      !departure ||
      !control ||
      typeof control.min !== 'number' ||
      typeof control.max !== 'number' ||
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
  function absencePriority(state: AppState, task: Task) {
    const rule = knowledge.absence.rules.priorityEscalation;
    return absenceTrip(state) &&
      state.cases.absence.durationDays > rule.durationDaysGreaterThan &&
      rule.taskIds.includes(task.id)
      ? rule.priority
      : task.priority;
  }
  function setAssignment(state: AppState, taskId: string, assigned: boolean) {
    if (
      !visibleTasks(state, 'absence').find((item) => item.id === taskId)
        ?.delegatable
    )
      return false;
    if (assigned) state.cases.absence.assignedTaskIds.add(taskId);
    else state.cases.absence.assignedTaskIds.delete(taskId);
    return true;
  }
  function setPetSelection(
    state: AppState,
    field: string,
    id: string,
    selected: boolean,
  ) {
    const entries =
      field === 'symptomIds'
        ? knowledge.pet.symptoms
        : field === 'emergencySignIds'
          ? knowledge.pet.emergencySigns
          : [];
    if (
      !entries.some((item) => item.id === id) ||
      (field !== 'symptomIds' && field !== 'emergencySignIds')
    )
      return false;
    const values = new Set(state.cases.pet[field]);
    if (selected) values.add(id);
    else values.delete(id);
    state.cases.pet[field] = [...values];
    return true;
  }
  function setPetObservation(state: AppState, id: string, value: string) {
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
  function petRoute(state: AppState) {
    const context = state.cases.pet,
      rule = knowledge.pet.rules.routing,
      symptoms = new Set(context.symptomIds || []);
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
    return 'contact';
  }
  function petServiceAccess(state: AppState) {
    if (state.audience !== 'customer') return 'unknown';
    const portfolio = experience.portfolios.find(
      (item) => item.id === state.portfolioId,
    );
    return !portfolio
      ? 'unknown'
      : portfolio.policies.some((policy) =>
            knowledge.pet.service.eligibleInsuranceTypes.includes(policy.type),
          )
        ? 'included'
        : 'notIncluded';
  }
  const petIntroAvailable = (state: AppState) =>
    petServiceAccess(state) === 'notIncluded' &&
    !state.cases.pet.introContactUsed &&
    petRoute(state) !== 'emergency';
  function usePetIntro(state: AppState) {
    if (!petIntroAvailable(state)) return false;
    state.cases.pet.introContactUsed = true;
    return true;
  }
  function petPrimaryAction(state: AppState) {
    const route = petRoute(state);
    if (petIntroAvailable(state))
      return (
        knowledge.pet.actions.find((action) => action.id === 'intro-help') ||
        null
      );
    const mapping =
      petServiceAccess(state) === 'included'
        ? knowledge.pet.rules.routing.insuredActionByRoute
        : knowledge.pet.rules.routing.primaryActionByRoute;
    return (
      knowledge.pet.actions.find(
        (action) =>
          action.id === mapping[route] && action.allowedRoutes.includes(route),
      ) || null
    );
  }
  function setPortfolio(state: AppState, id: string) {
    if (
      state.audience !== 'customer' ||
      !experience.portfolios.some((item) => item.id === id)
    )
      return false;
    state.portfolioId = id;
    return true;
  }
  function calculateHomePrice(state: AppState) {
    const module = knowledge.new_home;
    const portfolio = experience.portfolios.find(
      (item) => item.id === state.portfolioId,
    );
    if (state.audience === 'customer' && !portfolio) return null;
    const bundleDiscountBps =
      state.audience === 'customer' ? portfolio!.demoBundleDiscountBps : 0;
    return calculatePreventionPrice(state.cases.new_home.completedTaskIds, {
      ...module,
      preventionIncentive: { ...module.preventionIncentive, bundleDiscountBps },
    });
  }
  function homeGuidance(state: AppState) {
    const completed = state.cases.new_home.completedTaskIds;
    const result = calculateDeduction(state.cases.new_home.pipeworkYear);
    const pending = knowledge.new_home.tasks.filter(
      (task) => !completed.has(task.id),
    );
    const nextTask =
      ((!result || result.deductionPercent > 0) &&
        pending.find((task) => task.id === 'professional-review')) ||
      pending.find((task) => task.id !== 'professional-review') ||
      pending[0] ||
      null;
    return { result, nextTask };
  }
  function staffAnalytics({ policyType = 'all', caseId = 'all' } = {}) {
    const copy = experience.staff;
    if (
      (policyType !== 'all' &&
        !copy.policyTypes.some((item) => item.id === policyType)) ||
      (caseId !== 'all' && !caseIds.some((id) => id === caseId))
    )
      return null;
    const rows = copy.customers
      .map(
        (
          customer: (typeof copy.customers)[number] & {
            extraPolicies?: AppState['extraPolicies'];
          },
        ) => {
          const example = createState('customer');
          example.portfolioId = customer.portfolioId;
          example.extraPolicies = customer.extraPolicies || [];
          const id = customer.caseId as CaseId;
          example.cases[id].completedTaskIds = new Set(
            customer.completedTaskIds,
          );
          return {
            ...customer,
            policies: currentPolicies(example),
            preparation: readiness(example, id),
          };
        },
      )
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
      byCase: caseIds.map((id) => {
        const customers = rows.filter((item) => item.caseId === id);
        return {
          id,
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
  return {
    calculateDeduction,
    createState,
    currentPolicies,
    hasPolicy,
    applicableTasks,
    visibleTasks,
    readiness,
    setTaskComplete,
    updateHome,
    updateScenario,
    absenceTrip,
    absencePriority,
    setAssignment,
    setPetSelection,
    setPetObservation,
    petRoute,
    petServiceAccess,
    petIntroAvailable,
    usePetIntro,
    petPrimaryAction,
    setPortfolio,
    calculateHomePrice,
    homeGuidance,
    staffAnalytics,
    petAction: (state: AppState, id: string) => {
      const action = petPrimaryAction(state);
      return action?.id === id ? action : null;
    },
    calculatePreventionPrice: (
      ids: Iterable<string> | null,
      module: PremiumConfig = knowledge.new_home,
    ) => calculatePreventionPrice(ids, module),
  };
}
