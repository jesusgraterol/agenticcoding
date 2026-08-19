// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('review-a-change recipe contract', () => {
  let recipe: string;

  beforeAll(async () => {
    recipe = await readFile(resolve(import.meta.dirname, 'review-a-change.md'), 'utf8');
  });

  test('recommends both agent review commands', () => {
    expect(recipe).toContain('prefer `review` for the complete uncommitted worktree');
    expect(recipe).toContain('`review <branch-name>` for committed work');
  });

  test('keeps developer review as the acceptance gate', () => {
    expect(recipe).toContain('After the agent review, inspect the change');
    expect(recipe).toContain('Act as the pull request reviewer');
    expect(recipe).toContain('never replaces developer review');
  });
});
