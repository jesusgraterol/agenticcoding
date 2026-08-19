// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { calculateReadingTime } from './utilities.ts';

describe('calculateReadingTime', () => {
  test.each([
    ['', 1],
    ['one concise recipe', 1],
    [`${'word '.repeat(220)}`, 1],
    [`${'word '.repeat(221)}`, 2],
  ])('calculateReadingTime(%o) -> %d', (body, expectedMinutes) => {
    expect(calculateReadingTime(body)).toBe(expectedMinutes);
  });
});
