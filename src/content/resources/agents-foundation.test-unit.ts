// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('Agentic Coding foundation contract', () => {
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

  test('defines agent-operated evidence and developer-governed acceptance', () => {
    expect(foundation).toContain('Evidence is agent-operated and developer-governed');
    expect(foundation).toContain('The agent carries the verification workload');
    expect(foundation).toContain(
      'The developer builds the system that makes the evidence trustworthy',
    );
    expect(foundation).toContain(
      'Direct developer code inspection is proportional and risk-triggered',
    );
    expect(foundation).toContain('retains the acceptance decision');
    expect(foundation).toContain('The agent verdict never authorizes acceptance by itself');
  });

  test('persists plans within narrow planning-only authority', () => {
    expect(foundation).toContain(
      '`coding-agent-planning/<unix-seconds>_<descriptive-slug>/plan.md`',
    );
    expect(foundation).toContain('reuse the same directory');
    expect(foundation).toContain('remove an existing `milestones.md`');
    expect(foundation).toContain('matches `plan.md` exactly');
    expect(foundation).toContain(
      'The developer decides whether `coding-agent-planning/` is tracked',
    );
    expect(foundation).toContain('The command itself is not implementation approval');
  });

  test('creates milestones only for useful implementation slices', () => {
    expect(foundation).toContain('at least two coherent implementation slices');
    expect(foundation).toContain('If the plan is one coherent scope');
    expect(foundation).toContain('do not create `milestones.md`');
    expect(foundation).toContain('Write the complete sequence to `milestones.md` beside `plan.md`');
    expect(foundation).toContain('Cover every plan deliverable');
    expect(foundation).toContain(
      'does not approve the plan, milestone sequence, or implementation',
    );
    expect(foundation).toContain('explicitly authorizes that milestone');
  });
});
