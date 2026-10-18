import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { chromium } from '@playwright/test';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const templatePath = resolve(scriptDirectory, 'open-graph-template.html');
const outputPath = resolve(scriptDirectory, '../public/og/agentic-coding.png');
const faviconPath = resolve(scriptDirectory, '../public/favicon.svg');

/**
 * Writes jg-personal-astro-ui's Agentic Coding mark to `favicon.svg`, which the template draws, then
 * generates the deterministic 1200 × 630 social image from the branded HTML template.
 */
const generateOpenGraphImage = async (): Promise<void> => {
  const markSvg = await readFile(
    fileURLToPath(import.meta.resolve('jg-personal-astro-ui/agentic-coding-mark.svg')),
    'utf8',
  );
  await writeFile(faviconPath, markSvg);
  await mkdir(dirname(outputPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

    await page.goto(pathToFileURL(templatePath).toString());
    await page.evaluate(async () => document.fonts.ready);
    await page.locator('.canvas').screenshot({ path: outputPath });
  } finally {
    await browser.close();
  }
};

await generateOpenGraphImage();
