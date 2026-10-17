import { expect, test } from 'vitest';
import { navigationUrl, parseNavigation } from '../../src/app/navigation';
test('normalizes malformed navigation and supports existing role hashes', () => {
  expect(
    parseNavigation(
      new URL(
        'https://demo.test/?lang=other&case=nope&portfolio=missing#asiakas',
      ),
    ),
  ).toEqual({
    language: 'fi',
    audience: 'customer',
    caseId: 'new_home',
    portfolioId: 'multi',
  });
  expect(
    parseNavigation(
      new URL('https://demo.test/?lang=en&case=pet&portfolio=home#asiakas'),
    ),
  ).toEqual({
    language: 'en',
    audience: 'customer',
    caseId: 'pet',
    portfolioId: 'home',
  });
});
test('round trips only shareable state, never task or health inputs', () => {
  const current = new URL(
    'https://demo.test/project/index.html?observations=secret&tasks=secret',
  );
  const next = {
    language: 'en',
    audience: 'customer',
    caseId: 'pet',
    portfolioId: 'home',
  } as const;
  const url = navigationUrl(current, next);
  expect(url.pathname).toBe('/project/index.html');
  expect(url.searchParams.has('observations')).toBe(false);
  expect(url.searchParams.has('tasks')).toBe(false);
  expect(parseNavigation(url)).toEqual(next);
});
