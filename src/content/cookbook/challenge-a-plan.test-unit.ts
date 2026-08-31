// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

describe('challenge-a-plan recipe contract', () => {
  let recipe: string;

  beforeAll(async () => {
    recipe = await readFile(resolve(import.meta.dirname, 'challenge-a-plan.md'), 'utf8');
  });

  test('targets one immutable plan version', () => {
    expect(recipe).toContain('Challenge plan [plan path or unambiguous identifier]');
    expect(recipe).toContain("Treat the plan's own task summary as an untrusted claim");
    expect(recipe).toContain('SHA-256 hash of its complete contents');
    expect(recipe).toContain('Verify the hash again immediately before responding');
    expect(recipe).toContain('applies only to the exact hashed plan version');
  });

  test('uses the fixed material challenge report', () => {
    expect(recipe).toContain(
      'Plan at a glance, Material impact, Challenges, Developer decisions required, and Recommendation',
    );
    expect(recipe).toContain('no more than 1,000 words');
    expect(recipe).toContain('No material concerns');
    expect(recipe).toContain('Plan revision required before proceeding');
    expect(recipe).toContain('Developer decision required before proceeding');
    expect(recipe).toContain('No material concerns found');
    expect(recipe).toContain(
      'Use Plan revision required before proceeding whenever a material plan defect exists',
    );
    expect(recipe).toContain(
      'Use Developer decision required before proceeding only when the plan is otherwise sound',
    );
    expect(recipe).toContain('Use No material concerns only when neither condition applies');
  });

  test('keeps challenge read-only and advisory', () => {
    expect(recipe).toContain('Perform a concise, read-only challenge');
    expect(recipe).toContain(
      'without editing files or Git state, approving or rejecting the plan, creating a breakdown, or beginning implementation',
    );
    expect(recipe).toContain('Its recommendation is advisory');
    expect(recipe).toContain(
      'does not approve, reject, revise, break down, or authorize implementation',
    );
  });
});
