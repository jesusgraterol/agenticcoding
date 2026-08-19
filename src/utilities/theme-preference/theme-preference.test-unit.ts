// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { parseThemePreference, resolveThemePreference } from './theme-preference.ts';

describe('parseThemePreference', () => {
  test.each([
    ['light', 'light'],
    ['dark', 'dark'],
    ['system', 'system'],
    ['sepia', 'system'],
    [undefined, 'system'],
  ])('parseThemePreference(%o) -> %s', (storedPreference, expectedPreference) => {
    expect(parseThemePreference(storedPreference)).toBe(expectedPreference);
  });
});

describe('resolveThemePreference', () => {
  test.each([
    ['light', false, 'light'],
    ['light', true, 'light'],
    ['dark', false, 'dark'],
    ['dark', true, 'dark'],
    ['system', false, 'light'],
    ['system', true, 'dark'],
  ] as const)(
    'resolveThemePreference(%s, %s) -> %s',
    (preference, doesSystemPreferDark, expectedTheme) => {
      expect(resolveThemePreference(preference, doesSystemPreferDark)).toBe(expectedTheme);
    },
  );
});
