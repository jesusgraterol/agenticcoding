// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { normalizeResourceText } from './utilities.ts';

describe('normalizeResourceText', () => {
  test.each([
    ['# Title', '# Title\n'],
    ['# Title\n\n', '# Title\n'],
    ['# Title\r\n\r\nBody\r\n', '# Title\n\nBody\n'],
  ])('normalizeResourceText(%o) -> %o', (sourceText, expectedText) => {
    expect(normalizeResourceText(sourceText)).toBe(expectedText);
  });
});
