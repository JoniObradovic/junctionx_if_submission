import type { PremiumConfig } from './models';
const rate = (value: number) =>
  Number.isInteger(value) && value >= 0 && value < 10_000;

/** Fictional preview only. Each stage rounds remaining integer cents half-up. */
export function calculatePreventionPrice(
  completedTaskIds: Iterable<string> | null,
  module: PremiumConfig,
) {
  const config = module?.preventionIncentive;
  if (
    !config ||
    config.status !== 'illustrative' ||
    typeof config.policyId !== 'string' ||
    !config.policyId.trim() ||
    !Number.isSafeInteger(config.baseAnnualCents) ||
    config.baseAnnualCents <= 0 ||
    !rate(config.bundleDiscountBps) ||
    !rate(config.preventionCapBps) ||
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
  const actions = new Map<
    string,
    PremiumConfig['preventionIncentive']['eligibleActions'][number]
  >();
  const byTask = new Map<
    string,
    PremiumConfig['preventionIncentive']['eligibleActions'][number]
  >();
  for (const action of config.eligibleActions) {
    if (!action || typeof action.policyId !== 'string') return null;
    if (action.policyId !== config.policyId) continue;
    if (
      typeof action.id !== 'string' ||
      !action.id.trim() ||
      !taskIds.has(action.taskId) ||
      !rate(action.discountBps)
    )
      return null;
    const existing = actions.get(action.id) || byTask.get(action.taskId);
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
    byTask.set(action.taskId, action);
  }
  let preventionDiscountBps = 0,
    completedActionCount = 0;
  for (const action of actions.values()) {
    if (!completed.has(action.taskId)) continue;
    preventionDiscountBps = Math.min(
      config.preventionCapBps,
      preventionDiscountBps + action.discountBps,
    );
    completedActionCount++;
  }
  const applyRate = (cents: number, bps: number) =>
    Number((BigInt(cents) * BigInt(10_000 - bps) + 5_000n) / 10_000n);
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
    approval: 'not-assessed' as const,
  };
}
