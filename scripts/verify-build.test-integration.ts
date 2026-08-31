// @vitest-environment node
import { strict as assert } from 'node:assert';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { normalizeResourceText } from '../src/utilities/resource-text/utilities.ts';
import { verifyBuild } from './verify-build.ts';

const repositoryRoot = resolve(import.meta.dirname, '..');
const BUILD_DIRECTORY = resolve(repositoryRoot, 'dist');
const TEMPORARY_ROOT_PREFIX = 'agentic-coding-verify-build-';
const STRUCTURED_DATA_PATTERN = /<script type="application\/ld\+json">[^<]+<\/script>/u;

// contracts for minimally corrupted build fixtures.
type IBuildMutation = (buildDirectory: string) => Promise<void>;
type IBuildFailureCase = [
  caseName: string,
  expectedMessage: string,
  mutation: IBuildMutation,
  expectsSyntaxErrorCause: boolean,
];

let temporaryRoot: string | undefined;
let fixtureIndex = 0;

/** Resolves one fixture artifact while enforcing the disposable build boundary. */
const resolveBuildFile = (buildDirectory: string, relativePath: string): string => {
  const filePath = resolve(buildDirectory, relativePath);
  const pathFromBuildDirectory = relative(buildDirectory, filePath);

  assert.ok(
    pathFromBuildDirectory !== '..' &&
      !pathFromBuildDirectory.startsWith(`..${sep}`) &&
      !isAbsolute(pathFromBuildDirectory),
  );

  return filePath;
};

/** Replaces one required fragment in a disposable build artifact. */
const replaceBuildFileText = async (
  buildDirectory: string,
  relativePath: string,
  searchValue: string | RegExp,
  replacement: string,
): Promise<void> => {
  const filePath = resolveBuildFile(buildDirectory, relativePath);
  const sourceText = await readFile(filePath, 'utf8');
  const mutatedText = sourceText.replace(searchValue, replacement);

  assert.notEqual(mutatedText, sourceText);
  await writeFile(filePath, mutatedText, 'utf8');
};

/** Copies the first matching metadata element between disposable HTML artifacts. */
const duplicateFirstMarkupMatch = async (
  buildDirectory: string,
  sourceRelativePath: string,
  targetRelativePath: string,
  pattern: RegExp,
): Promise<void> => {
  const sourcePath = resolveBuildFile(buildDirectory, sourceRelativePath);
  const targetPath = resolveBuildFile(buildDirectory, targetRelativePath);
  const [sourceText, targetText] = await Promise.all([
    readFile(sourcePath, 'utf8'),
    readFile(targetPath, 'utf8'),
  ]);
  const sourceMatch = sourceText.match(pattern)?.[0];
  const targetMatch = targetText.match(pattern)?.[0];

  assert.ok(sourceMatch);
  assert.ok(targetMatch);
  assert.notEqual(sourceMatch, targetMatch);

  await writeFile(targetPath, targetText.replace(targetMatch, sourceMatch), 'utf8');
};

/** Checks that a temporary root is the exact disposable directory shape this suite creates. */
const isDisposableTemporaryRoot = (directoryPath: string): boolean =>
  dirname(resolve(directoryPath)) === resolve(tmpdir()) &&
  basename(directoryPath).startsWith(TEMPORARY_ROOT_PREFIX);

/** Copies the successful production artifact into one isolated corruption fixture. */
const createBuildFixture = async (): Promise<string> => {
  assert.ok(temporaryRoot);

  const fixtureDirectory = resolve(temporaryRoot, `case-${String(fixtureIndex).padStart(2, '0')}`);
  fixtureIndex += 1;

  assert.equal(dirname(fixtureDirectory), temporaryRoot);
  await cp(BUILD_DIRECTORY, fixtureDirectory, {
    errorOnExist: true,
    force: false,
    recursive: true,
  });

  return fixtureDirectory;
};

/**
 * Extracts the Markdown body below the canonical frontmatter block.
 * @throws
 * - Canonical resource frontmatter is malformed.
 */
const extractMarkdownBody = (sourceText: string): string => {
  const frontmatterEnd = sourceText.indexOf('\n---\n', 4);

  if (!sourceText.startsWith('---\n') || frontmatterEnd < 0) {
    throw new Error('Canonical resource frontmatter is malformed.');
  }

  return sourceText.slice(frontmatterEnd + 5).replace(/^\n/, '');
};

describe('static build artifact', () => {
  beforeAll(async () => {
    temporaryRoot = await mkdtemp(join(tmpdir(), TEMPORARY_ROOT_PREFIX));
    assert.ok(isDisposableTemporaryRoot(temporaryRoot));
  });

  afterAll(async () => {
    if (!temporaryRoot) return;

    assert.ok(isDisposableTemporaryRoot(temporaryRoot));
    await rm(temporaryRoot, { force: true, recursive: true });
  });

  test('contains required routes, metadata, valid links, and no test files', async () => {
    await expect(verifyBuild()).resolves.toBeUndefined();
  });

  test.each([
    [
      'missing structured data',
      'Missing structured data in index.html',
      async (buildDirectory) =>
        replaceBuildFileText(buildDirectory, 'index.html', STRUCTURED_DATA_PATTERN, ''),
      false,
    ],
    [
      'invalid structured data',
      'Invalid structured data in index.html',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'index.html',
          STRUCTURED_DATA_PATTERN,
          '<script type="application/ld+json">{invalid</script>',
        ),
      true,
    ],
    [
      'non-object structured data',
      'Structured data is not an object in index.html',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'index.html',
          STRUCTURED_DATA_PATTERN,
          '<script type="application/ld+json">[]</script>',
        ),
      false,
    ],
    [
      'invalid structured data graph',
      'Structured data graph is invalid in index.html',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'index.html',
          STRUCTURED_DATA_PATTERN,
          '<script type="application/ld+json">{"@graph":[null]}</script>',
        ),
      false,
    ],
    [
      'emitted test file',
      'Production build contains a test file: emitted.test-unit.ts',
      async (buildDirectory) =>
        writeFile(
          resolveBuildFile(buildDirectory, 'emitted.test-unit.ts'),
          '// disposable emitted test fixture\n',
          'utf8',
        ),
      false,
    ],
    [
      'missing required metadata',
      'Missing required metadata in index.html: <meta name="description" content="[^"]+"',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'index.html',
          /<meta name="description" content="[^"]+">/u,
          '',
        ),
      false,
    ],
    [
      'duplicate page description',
      'Missing or duplicate page description in cookbook/challenge-a-plan/index.html',
      async (buildDirectory) =>
        duplicateFirstMarkupMatch(
          buildDirectory,
          'cookbook/break-down-a-plan/index.html',
          'cookbook/challenge-a-plan/index.html',
          /<meta name="description" content="[^"]+">/u,
        ),
      false,
    ],
    [
      'duplicate page title',
      'Missing or duplicate page title in cookbook/challenge-a-plan/index.html',
      async (buildDirectory) =>
        duplicateFirstMarkupMatch(
          buildDirectory,
          'cookbook/break-down-a-plan/index.html',
          'cookbook/challenge-a-plan/index.html',
          /<title>[^<]+<\/title>/u,
        ),
      false,
    ],
    [
      'missing sitemap canonical',
      'Canonical URL is missing from the sitemap: https://agenticcoding.jesusgraterol.dev/start/',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'sitemap-0.xml',
          '<loc>https://agenticcoding.jesusgraterol.dev/start/</loc>',
          '',
        ),
      false,
    ],
    [
      'mismatched page structured data',
      'Structured data does not match the canonical page in index.html',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'index.html',
          STRUCTURED_DATA_PATTERN,
          '<script type="application/ld+json">{"@type":"WebSite","url":"https://agenticcoding.jesusgraterol.dev/mismatch/","description":"Mismatch"}</script>',
        ),
      false,
    ],
    [
      'incomplete article structured data',
      'Article structured data is incomplete in start/index.html',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'start/index.html',
          STRUCTURED_DATA_PATTERN,
          '<script type="application/ld+json">{"@type":"Article","url":"https://agenticcoding.jesusgraterol.dev/start/","description":"Incomplete"}</script>',
        ),
      false,
    ],
    [
      'incomplete breadcrumb hierarchy',
      'Breadcrumb hierarchy is incomplete in start/index.html',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'start/index.html',
          '<nav aria-label="Breadcrumb">',
          '<nav aria-label="Trail">',
        ),
      false,
    ],
    [
      'broken page link',
      'Broken internal link in index.html: /missing-route/ -> missing-route/index.html',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'index.html',
          '</body>',
          '<a href="/missing-route/">Broken fixture link</a></body>',
        ),
      false,
    ],
    [
      'indexable custom 404',
      'The custom 404 page must remain excluded from search indexes.',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          '404.html',
          '<meta name="robots" content="noindex, follow">',
          '<meta name="robots" content="index, follow">',
        ),
      false,
    ],
    [
      'invalid llms.txt structure',
      'llms.txt does not follow the required project index structure.',
      async (buildDirectory) =>
        replaceBuildFileText(buildDirectory, 'llms.txt', '## Core resources', '## Resources'),
      false,
    ],
    [
      'broken llms.txt link',
      'Broken internal llms.txt link: https://agenticcoding.jesusgraterol.dev/missing-route/ -> missing-route/index.html',
      async (buildDirectory) =>
        replaceBuildFileText(
          buildDirectory,
          'llms.txt',
          '\n## Optional\n',
          '\n- [Missing route](https://agenticcoding.jesusgraterol.dev/missing-route/)\n\n## Optional\n',
        ),
      false,
    ],
  ] satisfies IBuildFailureCase[])(
    'verifyBuild(%s) -> %s',
    async (_caseName, expectedMessage, mutation, expectsSyntaxErrorCause) => {
      const buildDirectory = await createBuildFixture();
      await mutation(buildDirectory);

      let failure: unknown;

      try {
        await verifyBuild(buildDirectory);
      } catch (error) {
        failure = error;
      }

      expect(failure).toBeInstanceOf(Error);
      assert.ok(failure instanceof Error);
      expect(failure.message).toBe(expectedMessage);

      if (expectsSyntaxErrorCause) {
        expect(failure.cause).toBeInstanceOf(SyntaxError);
      }
    },
  );

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
      'orient-to-a-codebase',
      'plan-a-feature',
      'challenge-a-plan',
      'break-down-a-plan',
      'execute-one-milestone',
      'control-scope',
      'synchronize-documentation',
      'recover-from-agent-drift',
      'investigate-a-failing-test',
      'deepen-a-test-strategy',
      'review-a-change',
      'refine-coding-instructions',
      'publish-an-authorized-change',
    ];

    for (const slug of expectedSlugs) {
      expect(sitemap).toContain(`/cookbook/${slug}/`);
    }
  });

  test('publishes an LLM index synchronized with every cookbook recipe', async () => {
    const llmsText = await readFile(resolve(repositoryRoot, 'dist/llms.txt'), 'utf8');
    const expectedSlugs = [
      'orient-to-a-codebase',
      'plan-a-feature',
      'challenge-a-plan',
      'break-down-a-plan',
      'execute-one-milestone',
      'control-scope',
      'synchronize-documentation',
      'recover-from-agent-drift',
      'investigate-a-failing-test',
      'deepen-a-test-strategy',
      'review-a-change',
      'refine-coding-instructions',
      'publish-an-authorized-change',
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
