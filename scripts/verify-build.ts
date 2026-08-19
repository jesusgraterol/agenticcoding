import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { SITE_CONFIG } from '../src/site.config.ts';

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
  'llms.txt',
  'moldea/logo-dark.png',
  'moldea/logo-light.png',
  'og/agentic-coding.png',
  'robots.txt',
  'sitemap-index.xml',
] as const;

/** Escapes a literal value before interpolating it into a regular expression. */
const escapeRegularExpression = (input: string): string =>
  input.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');

/** Checks whether an unknown JSON value is an object record. */
const isRecord = (input: unknown): input is Record<string, unknown> =>
  typeof input === 'object' && input !== null && !Array.isArray(input);

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

/** Resolves a generated HTML artifact to its canonical public URL. */
const resolveCanonicalUrl = (htmlPath: string): string => {
  if (htmlPath === 'index.html') return new URL('/', SITE_CONFIG.url).toString();

  const routePath = htmlPath.endsWith('/index.html')
    ? `/${htmlPath.slice(0, -'index.html'.length)}`
    : `/${htmlPath}`;

  return new URL(routePath, SITE_CONFIG.url).toString();
};

/** Parses the single page-level JSON-LD object from generated HTML. */
const parseStructuredData = (html: string, htmlPath: string): Record<string, unknown> => {
  const serializedStructuredData = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/u,
  )?.[1];

  if (!serializedStructuredData) {
    throw new Error(`Missing structured data in ${htmlPath}`);
  }

  let structuredData: unknown;

  try {
    structuredData = JSON.parse(serializedStructuredData);
  } catch (error) {
    throw new Error(`Invalid structured data in ${htmlPath}`, { cause: error });
  }

  if (!isRecord(structuredData)) {
    throw new Error(`Structured data is not an object in ${htmlPath}`);
  }

  return structuredData;
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
  const titles = new Set<string>();
  const sitemapFiles = buildFiles.filter((filePath) => /^sitemap-\d+\.xml$/u.test(filePath));
  const llmsTextUrl = new URL('/llms.txt', SITE_CONFIG.url).toString();
  const openGraphImageUrl = new URL(SITE_CONFIG.openGraph.image, SITE_CONFIG.url).toString();
  const sitemap = (
    await Promise.all(
      sitemapFiles.map(async (sitemapPath) =>
        readFile(resolve(buildDirectory, sitemapPath), 'utf8'),
      ),
    )
  ).join('\n');

  for (const htmlPath of publicHtmlFiles) {
    const html = await readFile(resolve(buildDirectory, htmlPath), 'utf8');
    const canonicalUrl = resolveCanonicalUrl(htmlPath);
    const expectedStructuredDataType =
      htmlPath === 'index.html'
        ? 'WebSite'
        : htmlPath === 'cookbook/index.html'
          ? 'CollectionPage'
          : 'Article';
    const expectedOpenGraphType = expectedStructuredDataType === 'Article' ? 'article' : 'website';
    const requiredPatterns = [
      new RegExp(`<html lang="${escapeRegularExpression(SITE_CONFIG.language)}">`, 'u'),
      /<title>[^<]+<\/title>/u,
      /<meta name="description" content="[^"]+"/u,
      new RegExp(
        `<meta name="author" content="${escapeRegularExpression(SITE_CONFIG.author.name)}"`,
        'u',
      ),
      /<meta name="robots" content="index, follow, max-image-preview:large"/u,
      new RegExp(`<link rel="canonical" href="${escapeRegularExpression(canonicalUrl)}"`, 'u'),
      new RegExp(`<link rel="describedby" href="${escapeRegularExpression(llmsTextUrl)}"`, 'u'),
      new RegExp(
        `<meta property="og:locale" content="${escapeRegularExpression(SITE_CONFIG.openGraph.locale)}"`,
        'u',
      ),
      new RegExp(`<meta property="og:type" content="${expectedOpenGraphType}"`, 'u'),
      /<meta property="og:title" content="[^"]+"/u,
      /<meta property="og:description" content="[^"]+"/u,
      new RegExp(`<meta property="og:url" content="${escapeRegularExpression(canonicalUrl)}"`, 'u'),
      new RegExp(
        `<meta property="og:image" content="${escapeRegularExpression(openGraphImageUrl)}"`,
        'u',
      ),
      new RegExp(
        `<meta property="og:image:secure_url" content="${escapeRegularExpression(openGraphImageUrl)}"`,
        'u',
      ),
      new RegExp(
        `<meta property="og:image:type" content="${escapeRegularExpression(SITE_CONFIG.openGraph.imageType)}"`,
        'u',
      ),
      /<meta property="og:image:alt" content="[^"]+"/u,
      /<meta name="twitter:card" content="summary_large_image"/u,
      /<meta name="twitter:title" content="[^"]+"/u,
      /<meta name="twitter:description" content="[^"]+"/u,
      new RegExp(
        `<meta name="twitter:image" content="${escapeRegularExpression(openGraphImageUrl)}"`,
        'u',
      ),
      /<meta name="twitter:image:alt" content="[^"]+"/u,
    ];

    for (const pattern of requiredPatterns) {
      if (!pattern.test(html)) {
        throw new Error(`Missing required metadata in ${htmlPath}: ${pattern.source}`);
      }
    }

    const description = html.match(/<meta name="description" content="([^"]+)"/u)?.[1];
    const title = html.match(/<title>([^<]+)<\/title>/u)?.[1];

    if (!description || descriptions.has(description)) {
      throw new Error(`Missing or duplicate page description in ${htmlPath}`);
    }

    if (!title || titles.has(title)) {
      throw new Error(`Missing or duplicate page title in ${htmlPath}`);
    }

    descriptions.add(description);
    titles.add(title);

    if (!sitemap.includes(`<loc>${canonicalUrl}</loc>`)) {
      throw new Error(`Canonical URL is missing from the sitemap: ${canonicalUrl}`);
    }

    const structuredData = parseStructuredData(html, htmlPath);

    if (
      structuredData['@type'] !== expectedStructuredDataType ||
      structuredData['url'] !== canonicalUrl ||
      typeof structuredData['description'] !== 'string'
    ) {
      throw new Error(`Structured data does not match the canonical page in ${htmlPath}`);
    }

    if (expectedStructuredDataType === 'Article') {
      const mainEntityOfPage = structuredData['mainEntityOfPage'];

      if (
        !isRecord(mainEntityOfPage) ||
        mainEntityOfPage['@id'] !== canonicalUrl ||
        typeof structuredData['headline'] !== 'string' ||
        typeof structuredData['dateModified'] !== 'string'
      ) {
        throw new Error(`Article structured data is incomplete in ${htmlPath}`);
      }
    }

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

  const notFoundHtml = await readFile(resolve(buildDirectory, '404.html'), 'utf8');

  if (!notFoundHtml.includes('<meta name="robots" content="noindex, follow">')) {
    throw new Error('The custom 404 page must remain excluded from search indexes.');
  }

  const llmsText = await readFile(resolve(buildDirectory, 'llms.txt'), 'utf8');

  if (
    !llmsText.startsWith(`# ${SITE_CONFIG.name}\n\n> `) ||
    !llmsText.includes('\n## Core resources\n') ||
    !llmsText.includes('\n## Cookbook recipes\n')
  ) {
    throw new Error('llms.txt does not follow the required project index structure.');
  }

  const llmsLinks = [...llmsText.matchAll(/\[[^\]]+\]\((https:\/\/[^)]+)\)/gu)].map(
    (match) => match[1],
  );

  for (const link of llmsLinks) {
    if (!link) continue;

    const url = new URL(link);

    if (url.origin !== new URL(SITE_CONFIG.url).origin) continue;

    const artifactPath = resolveInternalArtifact(url.pathname);

    if (!buildFiles.includes(artifactPath)) {
      throw new Error(`Broken internal llms.txt link: ${link} -> ${artifactPath}`);
    }
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await verifyBuild();
}
