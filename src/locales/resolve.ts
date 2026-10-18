import type { Language } from '../app/navigation';
export interface LocalizedText {
  fi: string;
  en: string;
}
export type Resolved<T> = T extends LocalizedText
  ? string
  : T extends (infer V)[]
    ? Resolved<V>[]
    : T extends object
      ? { [K in keyof T]: Resolved<T[K]> }
      : T;
export function resolveContent<T>(value: T, language: Language): Resolved<T> {
  if (Array.isArray(value))
    return value.map((item) => resolveContent(item, language)) as Resolved<T>;
  if (value && typeof value === 'object') {
    if (
      'fi' in value &&
      'en' in value &&
      typeof value.fi === 'string' &&
      typeof value.en === 'string'
    )
      return value[language] as Resolved<T>;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        resolveContent(item, language),
      ]),
    ) as Resolved<T>;
  }
  return value as Resolved<T>;
}
