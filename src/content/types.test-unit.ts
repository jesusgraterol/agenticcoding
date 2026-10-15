// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { CookbookEntrySchema, TranscriptMessageSchema } from './types.ts';

const BASE_ENTRY = {
  category: 'planning',
  description: 'Turn a requirement into an implementation strategy.',
  draft: false,
  featured: true,
  order: 1,
  prompt: 'Plan this feature.',
  relatedSlugs: [],
  slug: 'plan-a-feature',
  title: 'Plan a feature',
} as const;

describe('CookbookEntrySchema', () => {
  test.each([
    ['2026-08-19', '2026-08-19'],
    ['2026-08-19', '2026-08-24'],
  ])('accepts publishedAt %s with updatedAt %s', (publishedAt, updatedAt) => {
    expect(CookbookEntrySchema.safeParse({ ...BASE_ENTRY, publishedAt, updatedAt }).success).toBe(
      true,
    );
  });

  test('rejects an update date before the publication date', () => {
    const result = CookbookEntrySchema.safeParse({
      ...BASE_ENTRY,
      publishedAt: '2026-08-24',
      updatedAt: '2026-08-19',
    });

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.error.issues.map(({ message, path }) => ({ message, path }))).toStrictEqual([
      {
        message: 'updatedAt must not precede publishedAt',
        path: ['updatedAt'],
      },
    ]);
  });
});

describe('TranscriptMessageSchema', () => {
  test.each([
    ['an invocation', { invocation: 'jg-plan' }],
    ['text', { text: 'Plan saved. Approve it to start.' }],
    ['an artifact', { artifact: { lines: [{ kind: 'text', text: 'Done' }], title: 'Report' } }],
  ])('TranscriptMessageSchema.safeParse(message with only %s) -> success', (_content, message) => {
    expect(TranscriptMessageSchema.safeParse({ speaker: 'agent', ...message }).success).toBe(true);
  });

  test('rejects a message with no content', () => {
    const result = TranscriptMessageSchema.safeParse({ speaker: 'developer' });

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.error.issues.map(({ message }) => message)).toStrictEqual([
      'A transcript message needs an artifact, an invocation, or text',
    ]);
  });
});
