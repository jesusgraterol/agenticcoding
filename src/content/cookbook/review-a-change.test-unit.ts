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
    expect(recipe).toContain('`review <target-branch>` for committed work');
  });

  test('binds each verdict to reproducible state and branch evidence', () => {
    expect(recipe).toContain('staging-insensitive fingerprint');
    expect(recipe).toContain('Refresh the relevant remote-tracking ref when available');
    expect(recipe).toContain('effective target and merge-base commits');
    expect(recipe).toContain('assess the prospective merge result');
  });

  test('separates focused test adequacy from broader regression execution', () => {
    expect(recipe).toContain('Evaluate focused test adequacy independently from test execution');
    expect(recipe).toContain('broader regression boundary');
    expect(recipe).toContain('material defect could survive every focused test');
  });

  test('uses explicit readiness verdicts and preserves developer authority', () => {
    expect(recipe).toContain('Ready to commit');
    expect(recipe).toContain('Ready to merge into [target branch]');
    expect(recipe).toContain('Not ready');
    expect(recipe).toContain('Review incomplete');
    expect(recipe).toContain('never authorizes developer acceptance or publication');
    expect(recipe).toContain('The developer uses the evidence to choose Correct');
    expect(recipe).toContain('Continue when an accepted milestone is complete');
    expect(recipe).toContain('Complete when the accepted state satisfies the task contract');
  });

  test('makes evidence agent-led and acceptance developer-owned', () => {
    expect(recipe).toContain('The agent should carry most of the operational burden');
    expect(recipe).toContain('challenge its interpretation of product intent');
    expect(recipe).toContain('Inspect code when evidence is weak');
    expect(recipe).toContain('never authorizes acceptance or publication');
  });
});
