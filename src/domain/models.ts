import type { canonicalKnowledge } from '../content/index.js';

export type Knowledge = typeof canonicalKnowledge;
export const caseIds = ['new_home', 'absence', 'first_baby', 'pet'] as const;
export type CaseId = (typeof caseIds)[number];
export type Audience = 'visitor' | 'customer';
type Completed = { completedTaskIds: Set<string> };
export interface AppState {
  activeCase: CaseId;
  audience: Audience;
  portfolioId: string;
  extraPolicies?: { type: string; label: string }[];
  cases: {
    new_home: Omit<
      Knowledge['new_home']['defaults'],
      'completedTaskIds' | 'pipeworkYear'
    > &
      Completed & {
        pipeworkYear: number | null;
        lastKnownPipeworkYear: number;
      };
    absence: Omit<
      Knowledge['absence']['defaults'],
      'completedTaskIds' | 'assignedTaskIds'
    > &
      Completed & { assignedTaskIds: Set<string> };
    first_baby: Omit<Knowledge['first_baby']['defaults'], 'completedTaskIds'> &
      Completed;
    pet: Omit<
      Knowledge['pet']['defaults'],
      'completedTaskIds' | 'observations' | 'emergencySignIds'
    > &
      Completed & {
        emergencySignIds: string[];
        observations: Record<string, string>;
        introContactUsed: boolean;
      };
  };
}
export interface Task {
  id: string;
  title: string;
  priority: string;
  when?: Record<string, unknown>;
  requiresPolicyType?: string;
  category?: string;
  delegatable?: boolean;
}
export interface PremiumConfig {
  preventionIncentive: {
    status: string;
    policyId: string;
    baseAnnualCents: number;
    bundleDiscountBps: number;
    preventionCapBps: number;
    rounding: string;
    eligibleActions: {
      id: string;
      policyId: string;
      taskId: string;
      discountBps: number;
    }[];
  };
  tasks: { id: string }[];
}
