import { describe, it, expect } from 'vitest';
import {
  canonicalKnowledge,
  rawContent,
  rawExperience,
  contentForLanguage,
} from '../../src/content/index.ts';
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

it('bilingual fields travel with their record and require both nonempty languages', () => {
  const visit = (value: unknown): void => {
    if (!value || typeof value !== 'object') return;
    if ('fi' in value || 'en' in value) {
      expect(Object.keys(value).sort()).toEqual(['en', 'fi']);
      for (const text of Object.values(value))
        expect(typeof text === 'string' && text.trim().length > 0).toBe(true);
    } else for (const child of Object.values(value)) visit(child);
  };
  visit(rawContent);
  visit(rawExperience);
  const fi = contentForLanguage('fi'),
    en = contentForLanguage('en');
  for (const id of Object.keys(fi.knowledge) as (keyof typeof fi.knowledge)[]) {
    expect(en.knowledge[id].tasks.map((task) => task.id)).toEqual(
      fi.knowledge[id].tasks.map((task) => task.id),
    );
    expect(en.knowledge[id].defaults).toEqual(fi.knowledge[id].defaults);
    expect(en.knowledge[id].controls.map((control) => control.id)).toEqual(
      fi.knowledge[id].controls.map((control) => control.id),
    );
  }
});

it('shell annotations and both UI catalogues use known semantic keys', async () => {
  const { fi, en } = await import('../../src/locales/catalogue');
  const { readFileSync } = await import('node:fs');
  expect(Object.keys(en).sort()).toEqual(Object.keys(fi).sort());
  for (const html of ['index.html', 'personnel.html']) {
    const source = readFileSync(
      new URL('../../' + html, import.meta.url),
      'utf8',
    );
    for (const match of source.matchAll(/data-i18n(?:-aria-label)?="([^"]+)"/g))
      expect(Object.hasOwn(fi, match[1]), match[1]).toBe(true);
  }
});
