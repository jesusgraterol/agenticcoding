// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { formatIsoDate } from './utilities.ts';

describe('formatIsoDate', () => {
  test.each([
    [new Date('2026-08-19T00:00:00.000Z'), '2026-08-19'],
    [new Date('2026-08-19T23:59:59.999Z'), '2026-08-19'],
  ])('formatIsoDate(%s) -> %s', (date, expectedDate) => {
    expect(formatIsoDate(date)).toBe(expectedDate);
  });
});
