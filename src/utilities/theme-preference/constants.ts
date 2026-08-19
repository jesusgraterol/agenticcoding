import type { IThemePreference } from './types.ts';

// persisted theme values accepted from browser storage and controls.
export const THEME_PREFERENCES = [
  'system',
  'light',
  'dark',
] as const satisfies readonly IThemePreference[];

// browser storage key dedicated to the explicit theme preference.
export const THEME_STORAGE_KEY = 'agentic-coding-theme';
