import { describe, it, expect } from 'vitest';
import { canonicalKnowledge } from '../../src/content/index.js';
const validDate = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(value).toISOString().slice(0, 10) === value;
describe('content references and translation applicability', () => {
  for (const [id, content] of Object.entries(canonicalKnowledge)) {
    it(`${id}: sources, evidence and task identities resolve`, () => {
      const sources = new Set(content.sources.map((source) => source.id));
      expect(sources.size).toBe(content.sources.length);
      expect(new Set(content.tasks.map((task) => task.id)).size).toBe(
        content.tasks.length,
      );
      for (const source of content.sources) {
        expect(new URL(source.url).protocol).toBe('https:');
        expect(source.limitation.trim().length).toBeGreaterThan(0);
        expect(validDate(source.checkedAt)).toBe(true);
      }
      const visit = (node: unknown): void => {
        if (!node || typeof node !== 'object') return;
        if ('sourceIds' in node) {
          const evidence = node as {
            sourceIds: string[];
            status: string;
            limitation: string;
          };
          expect(['verified', 'illustrative', 'unverified']).toContain(
            evidence.status,
          );
          expect(evidence.limitation.trim().length).toBeGreaterThan(0);
          for (const sourceId of evidence.sourceIds)
            expect(sources.has(sourceId)).toBe(true);
        }
        for (const child of Object.values(node)) visit(child);
      };
      visit(content);
    });
    it(`${id}: every English override resolves to an existing string`, () => {
      for (const [path, translation] of Object.entries(content.english)) {
        let node: unknown = content;
        for (const key of path.split('.'))
          node = (node as Record<string, unknown>)[key];
        expect(typeof node, path).toBe('string');
        expect(translation.trim().length, path).toBeGreaterThan(0);
      }
    });
  }
  it('does not invent measured claim-success rates or real prevention offers', () => {
    expect(
      canonicalKnowledge.new_home.claimsGuidance.observedSuccessRatePercent,
    ).toBeNull();
    expect(canonicalKnowledge.new_home.preventionIncentive.status).toBe(
      'illustrative',
    );
    expect(canonicalKnowledge.pet.introOffer.status).toBe('illustrative');
  });
});
