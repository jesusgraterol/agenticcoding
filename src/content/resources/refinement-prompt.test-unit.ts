// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('refinement prompt governance contract', () => {
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
    expect(prompt).toContain('command names, activation conditions, permissions');
    expect(prompt).toContain('representative failure scenarios');
    expect(prompt).toContain('checks and scenarios evaluated, their results, and checks not run');
  });
});
