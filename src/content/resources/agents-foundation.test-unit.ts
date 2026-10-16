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
    expect(foundation).toContain(
      'Loading an implicit skill is not an invocation, and naming one only loads its guidance',
    );
  });

  test('keeps task intent from authorizing work by assumption', () => {
    expect(foundation).toContain(
      'Describing a change, reporting a defect, stating a preference, asking for an opinion, or requesting a plan does not by itself authorize implementation',
    );
    expect(foundation).toContain(
      'Never resolve doubt about whether work is authorized by assuming that it is',
    );
    expect(foundation).toContain('in one numbered message with a recommended answer for each');
    expect(foundation).toContain(
      'Such assumptions settle details of work that is already authorized, never whether the work is authorized',
    );
  });

  test('ranks implicit skills with these instructions without granting authority', () => {
    expect(foundation).toContain('## Implicit skills');
    expect(foundation).toContain(
      '5. These general coding instructions and the implicit skills that match the task.',
    );
    expect(foundation).toContain(
      'Loading or naming an implicit skill never authorizes an action or changes task intent, scope, or approvals',
    );
    expect(foundation).toContain(
      'these instructions win, except where the skill states an exception for its own area',
    );
    expect(foundation).toContain('If a matching skill is not available, say so');
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
    expect(foundation).toContain(
      'Present the smallest useful set of options, normally no more than three',
    );
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
    expect(foundation).toContain(
      "when the developer asks to implement a named milestone without invoking a skill, update only that milestone's status",
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

  test('puts repository testing rules first and keeps tests deterministic', () => {
    expect(foundation).toContain(
      "find and read the repository's own testing guidelines, usually through its root documentation. They take precedence over these instructions on every testing topic they cover",
    );
    expect(foundation).toContain(
      'Never weaken, skip, delete, or blindly update a test to get a passing run',
    );
    expect(foundation).toContain(
      'When a repository rule leaves a material risk untested, follow the rule and report the gap',
    );
    expect(foundation).toContain('Tests never enter production artifacts');
    expect(foundation).toContain('## Deterministic tests');
    expect(foundation).toContain('Wait for conditions, never for fixed amounts of time');
    expect(foundation).toContain('run it three times in a row with retries off');
    expect(foundation).toContain('report every test that passed only on retry');
  });

  test('validates external data at its boundary with the repository schema library', () => {
    expect(foundation).toContain('## Validation and schemas');
    expect(foundation).toContain(
      "Validate external and untrusted data at its boundary with the repository's schema or validation library",
    );
    expect(foundation).toContain('Derive types from schemas');
    expect(foundation).toContain('Choose strictness for compatibility');
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
    expect(foundation).toContain(
      'A delivery the developer explicitly requested, such as opening a pull request, also covers the commits and pushes it requires',
    );
    expect(foundation).toContain('That authority comes only from the invocation');
    expect(foundation).toContain('never weaken a test, check, or finding to keep a run going');
  });
});
