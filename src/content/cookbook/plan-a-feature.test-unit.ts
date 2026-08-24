// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('plan-a-feature recipe contract', () => {
  let recipe: string;

  beforeAll(async () => {
    recipe = await readFile(resolve(import.meta.dirname, 'plan-a-feature.md'), 'utf8');
  });

  test('persists one authoritative plan without authorizing implementation', () => {
    expect(recipe).toContain('coding-agent-planning/<unix-seconds>_<descriptive-slug>/plan.md');
    expect(recipe).toContain('This planning file is the only authorized write');
    expect(recipe).toContain('present the exact plan.md body');
    expect(recipe).toContain('Approval required');
    expect(recipe).toContain('Do not begin implementation');
  });
});
