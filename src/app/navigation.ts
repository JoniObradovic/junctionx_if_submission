import { caseIds, type CaseId, type Audience } from '../domain/engine';
export type Language = 'fi' | 'en';
export type PortfolioId = 'multi' | 'home' | 'family';
export interface Navigation {
  language: Language;
  audience: Audience;
  caseId: CaseId;
  portfolioId: PortfolioId;
}
const portfolioIds = ['multi', 'home', 'family'] as const;
export function parseNavigation(url: URL): Navigation {
  const scenario = url.searchParams.get('case');
  const portfolio = url.searchParams.get('portfolio');
  return {
    language: url.searchParams.get('lang') === 'en' ? 'en' : 'fi',
    audience: url.hash === '#asiakas' ? 'customer' : 'visitor',
    caseId: caseIds.find((id) => id === scenario) || 'new_home',
    portfolioId: portfolioIds.find((id) => id === portfolio) || 'multi',
  };
}
export function navigationUrl(current: URL, next: Navigation): URL {
  const url = new URL(current);
  url.search = '';
  url.searchParams.set('lang', next.language);
  if (next.caseId !== 'new_home') url.searchParams.set('case', next.caseId);
  if (next.audience === 'customer' && next.portfolioId !== 'multi')
    url.searchParams.set('portfolio', next.portfolioId);
  url.hash = next.audience === 'customer' ? 'asiakas' : 'tutustu';
  return url;
}
