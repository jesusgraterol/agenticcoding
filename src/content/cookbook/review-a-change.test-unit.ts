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

  test('makes evidence agent-led and acceptance developer-owned', () => {
    expect(recipe).toContain('The agent should carry most of the operational burden');
    expect(recipe).toContain('challenge its interpretation of product intent');
    expect(recipe).toContain('Inspect code when evidence is weak');
    expect(recipe).toContain('never authorizes acceptance');
  });
});
