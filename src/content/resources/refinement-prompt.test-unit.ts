// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('refinement prompt governance contract', { tags: ['full'] }, () => {
  let prompt: string;

  beforeAll(async () => {
    prompt = await readFile(resolve(import.meta.dirname, 'refinement-prompt.md'), 'utf8');
  });

  test('preserves the complete inspection, proposal, approval, editing, and audit workflow', () => {
    for (const stage of [
      '## Stage 1: Inspect before proposing',
      '## Stage 2: Collaborate interactively',
      '## Stage 3: Present a preservation-first proposal',
      '## Stage 4: Obtain explicit approval',
      '## Stage 5: Apply minimal approved edits',
      '## Stage 6: Audit the result',
    ]) {
      expect(prompt).toContain(stage);
    }
  });

  test('requires reviewable proposal IDs and supports partial approval', () => {
    expect(prompt).toContain('assign a stable proposal ID');
    expect(prompt).toContain('provide the exact proposed rule text or a reviewable patch preview');
    expect(prompt).toContain('approve, reject, or amend individual proposal IDs');
    expect(prompt).toContain('Unapproved or unresolved items remain out of scope');
  });

  test('protects instruction ownership, existing work, and external-action boundaries', () => {
    expect(prompt).toContain('whether a file is authoritative, mirrored, generated, protected');
    expect(prompt).toContain('preserve pre-existing worktree changes');
    expect(prompt).toContain("follow the repository's required handoff");
    expect(prompt).toContain('Approval to edit instruction files does not authorize commits');
  });

  test('requires operational verification of the resulting instruction system', () => {
    expect(prompt).toContain('filenames, locations, scopes, frontmatter, glob patterns');
    expect(prompt).toContain('skill and command names, invocation conditions, permissions');
    expect(prompt).toContain('representative failure scenarios');
    expect(prompt).toContain('checks and scenarios evaluated, their results, and checks not run');
  });

  test('keeps instruction files consistent with installed workflow skills', () => {
    expect(prompt).toContain('installed agent skills that define workflows');
    expect(prompt).toContain(
      'instruction files do not duplicate or contradict workflows that installed skills define',
    );
    expect(prompt).toContain('installed implicit skills that hold stack-specific standards');
    expect(prompt).toContain(
      'the instructions state how they rank against installed implicit skills and do not restate a skill',
    );
  });

  test('collects material decisions in one numbered message', () => {
    expect(prompt).toContain(
      'Ask about the decisions that would materially change the proposal in one numbered message, each question with your recommended answer',
    );
    expect(prompt).not.toContain('one focused question at a time');
  });

  test('injects explicit publication authority and the current engineering values', () => {
    expect(prompt).toContain(
      'explicit authority for external actions, granted per action or per explicitly invoked autonomous run',
    );
    expect(prompt).toContain('unambiguous skill or command invocation');
    expect(prompt).toContain('retained as the task record');
    expect(prompt).toContain('start from a test failing for the reported reason');
    expect(prompt).toContain('whenever a root cause is a repeatable pattern');
    expect(prompt).toContain('candor without flattery');
    expect(prompt).toContain('presented as a few options for the developer to choose');
    expect(prompt).toContain('error handling that fails loudly, preserves causes');
    expect(prompt).toContain('growth-capable collections bounded at the source');
    expect(prompt).toContain('cleanup of task-owned processes and temporary files');
    expect(prompt).toContain('portable paths and scripts');
    expect(prompt).toContain('coding-instruction files changed only on explicit request');
    expect(prompt).toContain('or as a necessary step of an explicitly requested delivery');
    expect(prompt).toContain(
      'implicit skills that hold stack-specific standards, read when they match',
    );
    expect(prompt).toContain("the repository's testing guidelines first, with floors");
    expect(prompt).toContain('deterministic tests that wait for conditions');
    expect(prompt).toContain('validated at its boundary with the repository');
    expect(prompt).toContain('no guessed or placeholder contracts');
    expect(prompt).toContain('at-least-once delivery, authenticated payloads, and bounded retries');
  });

  test('does not impose a schema library, test runner, timing values, or named skills', () => {
    expect(prompt).toContain(
      '- a specific schema library, test runner, or retry and timeout values',
    );
    expect(prompt).toContain('- specific named skills');
    expect(prompt).not.toMatch(/jg-/u);
  });
});
