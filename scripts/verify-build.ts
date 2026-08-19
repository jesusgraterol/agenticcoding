import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DEFAULT_BUILD_DIRECTORY = resolve(repositoryRoot, 'dist');
const REQUIRED_BUILD_PATHS = [
  'index.html',
  '404.html',
  'AGENTS.md',
  'refine.txt',
  'start/index.html',
  'refine/index.html',
  'cookbook/index.html',
  'favicon.svg',
  'moldea/logo-dark.png',
  'moldea/logo-light.png',
  'og/agentic-coding.png',
  'robots.txt',
  'sitemap-index.xml',
] as const;

/** Lists every file below a build directory using stable relative paths. */
const listBuildFiles = async (
  directoryPath: string,
  rootPath = directoryPath,
): Promise<string[]> => {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directoryPath, entry.name);

      return entry.isDirectory()
        ? listBuildFiles(entryPath, rootPath)
        : [relative(rootPath, entryPath)];
    }),
  );

  return files.flat().toSorted();
};

/** Resolves one root-relative site URL to its expected static artifact path. */
const resolveInternalArtifact = (href: string): string => {
  const path = href.split(/[?#]/u, 1)[0] ?? '/';

  if (path === '/') return 'index.html';
  if (extname(path)) return path.slice(1);

  return `${path.replace(/^\//u, '').replace(/\/$/u, '')}/index.html`;
};

/**
 * Verifies required routes, metadata, internal links, and production-build exclusions.
 * @param buildDirectory The static artifact directory to inspect.
 * @returns A promise that resolves when the artifact satisfies the project contract.
 * @throws
 * - If a required file, metadata contract, internal link target, or build exclusion is invalid
 */
export const verifyBuild = async (buildDirectory = DEFAULT_BUILD_DIRECTORY): Promise<void> => {
  const buildFiles = await listBuildFiles(buildDirectory);

  await Promise.all(
    REQUIRED_BUILD_PATHS.map(async (requiredPath) => access(resolve(buildDirectory, requiredPath))),
  );

  const emittedTestFile = buildFiles.find((filePath) =>
    /\.test-(?:unit|integration|e2e|bench)\./u.test(filePath),
  );

  if (emittedTestFile) {
    throw new Error(`Production build contains a test file: ${emittedTestFile}`);
  }

  const htmlFiles = buildFiles.filter((filePath) => filePath.endsWith('.html'));
  const publicHtmlFiles = htmlFiles.filter((filePath) => filePath !== '404.html');
  const descriptions = new Set<string>();

  for (const htmlPath of publicHtmlFiles) {
    const html = await readFile(resolve(buildDirectory, htmlPath), 'utf8');
    const requiredPatterns = [
      /<title>[^<]+<\/title>/u,
      /<meta name="description" content="[^"]+"/u,
      /<link rel="canonical" href="https:\/\/agenticcoding\.jesusgraterol\.dev[^"]*"/u,
      /<meta property="og:title" content="[^"]+"/u,
      /<meta property="og:image" content="https:\/\/agenticcoding\.jesusgraterol\.dev\/og\/agentic-coding\.png"/u,
      /<meta name="twitter:card" content="summary_large_image"/u,
    ];

    for (const pattern of requiredPatterns) {
      if (!pattern.test(html)) {
        throw new Error(`Missing required metadata in ${htmlPath}: ${pattern.source}`);
      }
    }

    const description = html.match(/<meta name="description" content="([^"]+)"/u)?.[1];

    if (!description || descriptions.has(description)) {
      throw new Error(`Missing or duplicate page description in ${htmlPath}`);
    }

    descriptions.add(description);

    const internalLinks = [...html.matchAll(/href="(\/(?!\/)[^"]*)"/gu)].map(
      (match) => match[1] ?? '/',
    );

    for (const href of internalLinks) {
      if (href.startsWith('/#')) continue;

      const artifactPath = resolveInternalArtifact(href);

      if (!buildFiles.includes(artifactPath)) {
        throw new Error(`Broken internal link in ${htmlPath}: ${href} -> ${artifactPath}`);
      }
    }
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await verifyBuild();
}
