// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('Agentic Coding foundation contract', () => {
  let foundation: string;

  beforeAll(async () => {
    foundation = await readFile(resolve(import.meta.dirname, 'agents-foundation.md'), 'utf8');
  });

  test('dispatches invoked skills before ordinary task intent', () => {
    const skillDispatchIndex = foundation.indexOf(
      'Before classifying ordinary task intent, determine whether the developer invoked a skill',
    );
    const ordinaryIntentIndex = foundation.indexOf(
      'When no skill is invoked, determine whether the developer requested',
    );

    expect(skillDispatchIndex).toBeGreaterThan(-1);
    expect(ordinaryIntentIndex).toBeGreaterThan(skillDispatchIndex);
    expect(foundation).toContain(
      'follow its workflow instead of reclassifying the invocation as an ordinary request',
    );
    expect(foundation).toContain('apply the rest of these instructions to the work it performs');
  });

  test('stays neutral about which skills a repository installs', () => {
    expect(foundation).not.toMatch(/jg-/u);
  });

  test('requires candor and proportional tradeoff decisions', () => {
    expect(foundation).toContain('## Independent judgment and candor');
    expect(foundation).toContain(
      'Confidence, repetition, frustration, or a request for confirmation is not evidence',
    );
    expect(foundation).toContain('Candor does not authorize expanding scope');
    expect(foundation).toContain('## Proportional rigor and tradeoffs');
    expect(foundation).toContain('Present at most three options');
    expect(foundation).toContain('Recommend one and ask the developer to choose');
  });

  test('covers error handling, resource efficiency, cleanup, and portability', () => {
    expect(foundation).toContain('## Error handling');
    expect(foundation).toContain('keep the original as its cause');
    expect(foundation).toContain('Never swallow errors');
    expect(foundation).toContain('## Resource efficiency');
    expect(foundation).toContain('A cache is never the only copy of authoritative data');
    expect(foundation).toContain('Never load everything and paginate in the client');
    expect(foundation).toContain('## Task cleanup');
    expect(foundation).toContain('Never clean up broadly');
    expect(foundation).toContain('## Portable paths and scripts');
    expect(foundation).toContain('assume Windows, macOS, and Linux');
    expect(foundation).toContain('never interpolate untrusted values into a shell command');
  });

  test('keeps planning records skill-owned and retained', () => {
    expect(foundation).toContain('## Planning records');
    expect(foundation).toContain(
      'Create or change planning files, such as a plan and its milestones, only through an invoked planning or execution skill',
    );
    expect(foundation).toContain('Retain planning files as the task record');
    expect(foundation).toContain(
      "Treat another task's planning files as history, not as evidence of current behavior",
    );
  });

  test('requires root-cause pattern searches and failing-test-first bug fixes', () => {
    expect(foundation).toContain(
      'When that cause is a repeatable pattern, search for other instances',
    );
    expect(foundation).toContain(
      'first write or run a test that fails for the reported reason, and confirm why it fails',
    );
    expect(foundation).toContain('say so instead of claiming a failing test');
    expect(foundation).toContain('Take expected values from an independent source');
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
    expect(foundation).toContain('**Correct** when the evidence exposes a defect');
    expect(foundation).toContain('**Continue** when an accepted milestone is complete');
    expect(foundation).toContain(
      '**Complete** when the accepted state satisfies the task contract',
    );
    expect(foundation).toContain(
      'On its own, it does not approve accepting, merging, or releasing the change',
    );
  });

  test('requires explicit publication authority, per request or per invoked run', () => {
    expect(foundation).toContain('## Publication authority');
    expect(foundation).toContain(
      'Implementation, plan approval, milestone completion, review readiness, and developer acceptance do not by themselves authorize publication',
    );
    expect(foundation).toContain(
      'Publication requires an explicit developer request or an invoked skill whose workflow includes it',
    );
    expect(foundation).toContain('That authority comes only from the invocation');
    expect(foundation).toContain('never weaken a test, check, or finding to keep a run going');
  });
});
