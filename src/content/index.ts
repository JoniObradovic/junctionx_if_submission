import new_home from './scenarios/new_home.js';
import absence from './scenarios/absence.js';
import first_baby from './scenarios/first_baby.js';
import pet from './scenarios/pet.js';
import experience from './experience.js';
import { resolveContent } from '../locales/resolve.ts';
import type { Language } from '../app/navigation';
export const rawContent = { new_home, absence, first_baby, pet };
export const rawExperience = experience;
export function contentForLanguage(language: Language) {
  return {
    knowledge: resolveContent(rawContent, language),
    experience: resolveContent(experience, language),
  };
}
export const {
  knowledge: canonicalKnowledge,
  experience: canonicalExperience,
} = contentForLanguage('fi');
