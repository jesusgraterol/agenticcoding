// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('Agentic Coding foundation contract', () => {
  let foundation: string;

  beforeAll(async () => {
    foundation = await readFile(resolve(import.meta.dirname, 'agents-foundation.md'), 'utf8');
  });

  test('dispatches commands before ordinary task intent', () => {
    const commandDispatchIndex = foundation.indexOf(
      'Before classifying ordinary task intent, determine whether the developer clearly invoked a command',
    );
    const ordinaryIntentIndex = foundation.indexOf(
      'When no command is invoked, determine whether the developer requested',
    );

    expect(commandDispatchIndex).toBeGreaterThan(-1);
    expect(ordinaryIntentIndex).toBeGreaterThan(commandDispatchIndex);
    expect(foundation).toContain(
      'follow its executable workflow instead of reclassifying it as an ordinary request',
    );
  });

  test('defines an exact read-only challenge command', () => {
    expect(foundation).toContain('### `challenge plan [<plan-path-or-identifier>]`');
    expect(foundation).toContain('Require one concrete plan');
    expect(foundation).toContain('SHA-256 hash of its complete content');
    expect(foundation).toContain('Verify the hash again immediately before responding');
    expect(foundation).toContain(
      '`Plan at a glance`, `Material impact`, `Challenges`, `Developer decisions required`, and `Recommendation`',
    );
    expect(foundation).toContain('Keep the result at or below 1,000 words');
    expect(foundation).toContain('Challenge is read-only and advisory');
    expect(foundation).toContain('Any plan revision makes the challenge stale');
    expect(foundation).toContain('`No material concerns`');
    expect(foundation).toContain('`Plan revision required before proceeding`');
    expect(foundation).toContain('`Developer decision required before proceeding`');
    expect(foundation).toContain(
      'Use `Plan revision required before proceeding` whenever a material plan defect exists',
    );
    expect(foundation).toContain(
      'Use `Developer decision required before proceeding` only when the plan is otherwise sound',
    );
    expect(foundation).toContain('Use `No material concerns` only when neither condition applies');
  });

  test('defines uncommitted and branch review commands', () => {
    expect(foundation).toContain('### `review` and `review <target-branch>`');
    expect(foundation).toContain('For `review`, review the complete uncommitted worktree');
    expect(foundation).toContain('For `review <target-branch>`, require an active branch');
    expect(foundation).toContain('Refresh the relevant remote-tracking ref');
    expect(foundation).toContain('use an incomplete verdict when that uncertainty is material');
    expect(foundation).toContain('Account for target-side changes after the merge base');
    expect(foundation).toContain('assess the prospective merge result');
    expect(foundation).toContain('staging-insensitive fingerprint');
    expect(foundation).toContain('effective target and merge-base commits');
    expect(foundation).toContain(
      'Evaluate focused test adequacy separately from the affected broader regression suite',
    );
    expect(foundation).toContain('`Ready to merge into <target-branch>`');
    expect(foundation).toContain('`Review incomplete`');
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
    expect(foundation).toContain('After evaluating the verdict and evidence');
    expect(foundation).toContain('**Correct** when the evidence exposes a defect');
    expect(foundation).toContain('**Continue** when an accepted milestone is complete');
    expect(foundation).toContain(
      '**Complete** when the accepted state satisfies the task contract',
    );
    expect(foundation).toContain('Publication remains a separate authority after acceptance');
    expect(foundation).toContain(
      'The agent verdict never authorizes acceptance or publication by itself',
    );
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

  test('keeps publication under separate repository-specific authority', () => {
    expect(foundation).toContain('## Publication authority');
    expect(foundation).toContain(
      'Implementation, plan approval, milestone completion, review readiness, and developer acceptance do not authorize publication',
    );
    expect(foundation).toContain('does not define a universal `repo push` command');
    expect(foundation).not.toContain('### `repo push`');
  });
});
