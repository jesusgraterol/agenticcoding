// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, test } from 'vitest';

import { normalizeResourceText } from '../src/utilities/resource-text/utilities.ts';
import { verifyBuild } from './verify-build.ts';

const repositoryRoot = resolve(import.meta.dirname, '..');

/** Extracts the Markdown body below the canonical frontmatter block. */
const extractMarkdownBody = (sourceText: string): string => {
  const frontmatterEnd = sourceText.indexOf('\n---\n', 4);

  if (!sourceText.startsWith('---\n') || frontmatterEnd < 0) {
    throw new Error('Canonical resource frontmatter is malformed.');
  }

  return sourceText.slice(frontmatterEnd + 5).replace(/^\n/, '');
};

describe('static build artifact', () => {
  test('contains required routes, metadata, valid links, and no test files', async () => {
    await expect(verifyBuild()).resolves.toBeUndefined();
  });

  test.each([
    ['src/content/resources/agents-foundation.md', 'dist/AGENTS.md'],
    ['src/content/resources/refinement-prompt.md', 'dist/refine.txt'],
  ])('keeps %s synchronized with %s', async (sourcePath, artifactPath) => {
    const [sourceText, artifactText] = await Promise.all([
      readFile(resolve(repositoryRoot, sourcePath), 'utf8'),
      readFile(resolve(repositoryRoot, artifactPath), 'utf8'),
    ]);

    expect(artifactText).toBe(normalizeResourceText(extractMarkdownBody(sourceText)));
  });

  test('publishes every required cookbook recipe', async () => {
    const sitemap = await readFile(resolve(repositoryRoot, 'dist/sitemap-0.xml'), 'utf8');
    const expectedSlugs = [
      'plan-a-feature',
      'challenge-a-plan',
      'break-down-a-plan',
      'execute-one-milestone',
      'review-a-change',
      'investigate-a-failing-test',
      'control-scope',
      'refine-coding-instructions',
    ];

    for (const slug of expectedSlugs) {
      expect(sitemap).toContain(`/cookbook/${slug}/`);
    }
  });

  test('publishes an LLM index synchronized with every cookbook recipe', async () => {
    const llmsText = await readFile(resolve(repositoryRoot, 'dist/llms.txt'), 'utf8');
    const expectedSlugs = [
      'plan-a-feature',
      'challenge-a-plan',
      'break-down-a-plan',
      'execute-one-milestone',
      'review-a-change',
      'investigate-a-failing-test',
      'control-scope',
      'refine-coding-instructions',
    ];

    expect(llmsText).toContain(
      '[AGENTS.md foundation](https://agenticcoding.jesusgraterol.dev/AGENTS.md)',
    );
    expect(llmsText).toContain(
      '[Instruction refinement prompt](https://agenticcoding.jesusgraterol.dev/refine.txt)',
    );

    for (const slug of expectedSlugs) {
      expect(llmsText).toContain(`/cookbook/${slug}/`);
    }
  });
});
