// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('break-down-a-plan recipe contract', () => {
  let recipe: string;

  beforeAll(async () => {
    recipe = await readFile(resolve(import.meta.dirname, 'break-down-a-plan.md'), 'utf8');
  });

  test('creates milestones only when decomposition is useful', () => {
    expect(recipe).toContain('at least two coherent implementation slices');
    expect(recipe).toContain('If it is one coherent scope, do not create milestones.md');
    expect(recipe).toContain('Cover every plan requirement in the visible sequence');
    expect(recipe).toContain('Write the complete sequence to milestones.md beside plan.md');
    expect(recipe).toContain('This planning file is the only authorized write');
    expect(recipe).toContain('present the exact milestones.md body');
    expect(recipe).toContain('each milestone requires separate authorization');
  });
});
