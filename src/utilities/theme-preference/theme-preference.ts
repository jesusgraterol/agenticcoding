import { THEME_PREFERENCES } from './constants.ts';
import type { IResolvedTheme, IThemePreference } from './types.ts';

/**
 * Parses an unknown stored value into a supported theme preference.
 * @param storedPreference The untrusted persisted preference.
 * @returns The supported preference or the system default.
 */
export const parseThemePreference = (storedPreference: unknown): IThemePreference =>
  typeof storedPreference === 'string' &&
  THEME_PREFERENCES.includes(storedPreference as IThemePreference)
    ? (storedPreference as IThemePreference)
    : 'system';

/**
 * Resolves a preference into the concrete theme applied to the document.
 * @param preference The supported theme preference.
 * @param doesSystemPreferDark Whether the operating system currently prefers dark mode.
 * @returns The concrete light or dark theme.
 */
export const resolveThemePreference = (
  preference: IThemePreference,
  doesSystemPreferDark: boolean,
): IResolvedTheme =>
  preference === 'system' ? (doesSystemPreferDark ? 'dark' : 'light') : preference;
