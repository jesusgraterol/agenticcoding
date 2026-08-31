// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('publish-an-authorized-change recipe contract', () => {
  let recipe: string;

  beforeAll(async () => {
    recipe = await readFile(
      resolve(import.meta.dirname, 'publish-an-authorized-change.md'),
      'utf8',
    );
  });

  test('requires explicit publication authority and an exact destination', () => {
    expect(recipe).toContain('This instruction grants publication authority only');
    expect(recipe).toContain(
      'resolve the active branch, its exact push remote, and its destination',
    );
    expect(recipe).toContain('without assuming a default');
  });

  test('inspects the complete worktree and unpublished history before mutation', () => {
    expect(recipe).toContain('Inspect the complete uncommitted state and every unpublished commit');
    expect(recipe).toContain('commit by commit');
    expect(recipe).toContain('sensitive data');
    expect(recipe).toContain('unresolved review findings');
  });

  test('follows repository commit policy without prescribing one signature mechanism', () => {
    expect(recipe).toContain(
      "repository's message, sign-off, cryptographic-signature, and hook requirements",
    );
    expect(recipe).toContain('Do not weaken or bypass repository policy');
    expect(recipe).not.toContain('git commit -S');
  });

  test('publishes one explicit branch without rewriting history', () => {
    expect(recipe).toContain('explicit one-branch refspec');
    expect(recipe).toContain('Do not publish tags or additional refs');
    expect(recipe).toContain('Do not force, bypass hooks, amend, stash, reset, rebase');
    expect(recipe).toContain('preserve the local commit');
  });

  test('does not extend publication authority to deployment or releases', () => {
    expect(recipe).toContain('does not authorize deployment, release creation, tag publication');
    expect(recipe).toContain('under their own explicit authority boundaries');
  });
});
