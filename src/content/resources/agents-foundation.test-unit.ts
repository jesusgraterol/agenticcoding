// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('Agentic Coding foundation review contract', () => {
  let foundation: string;

  beforeAll(async () => {
    foundation = await readFile(resolve(import.meta.dirname, 'agents-foundation.md'), 'utf8');
  });

  test('defines uncommitted and branch review commands', () => {
    expect(foundation).toContain('### `review` and `review <branch-name>`');
    expect(foundation).toContain('For `review`, review the complete uncommitted worktree');
    expect(foundation).toContain('For `review <branch-name>`, require an active branch');
    expect(foundation).toContain('Refresh the relevant remote-tracking ref');
    expect(foundation).toContain('use an incomplete verdict when that uncertainty is material');
    expect(foundation).toContain('Account for target-side changes after the merge base');
    expect(foundation).toContain('assess the prospective merge result');
    expect(foundation).toContain('`Ready to merge into <branch-name>`');
  });

  test('requires agent review and developer review', () => {
    expect(foundation).toContain('Every implementation review requires both layers');
    expect(foundation).toContain('**Agent review:**');
    expect(foundation).toContain('**Developer review:**');
    expect(foundation).toContain('Neither review layer substitutes for the other');
  });
});
