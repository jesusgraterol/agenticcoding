// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('deepen-a-test-strategy recipe contract', () => {
  let recipe: string;

  beforeAll(async () => {
    recipe = await readFile(resolve(import.meta.dirname, 'deepen-a-test-strategy.md'), 'utf8');
  });

  test('requires independent evidence for correlated implementation risk', () => {
    expect(recipe).toContain('implementation and tests share the same assumption');
    expect(recipe).toContain('property-based or fuzz tests');
    expect(recipe).toContain('mutation testing');
    expect(recipe).toContain('contract or differential tests');
    expect(recipe).toContain('Invest in the verification system the agent will operate');
  });
});
