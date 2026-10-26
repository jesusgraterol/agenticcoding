import { readFile } from 'node:fs/promises';

import { expect, test } from '@playwright/test';

// the full public resources and the actions each one intentionally offers
const RESOURCES = [
  {
    route: '/start/',
    raw: '/AGENTS.md',
    fileName: 'AGENTS.md',
    sourceId: 'agents-foundation-source',
    copyName: 'Copy AGENTS.md',
    allowDownload: true,
  },
  {
    route: '/refine/',
    raw: '/refine.txt',
    fileName: 'refine.txt',
    sourceId: 'refinement-prompt-source',
    copyName: 'Copy refinement prompt',
    allowDownload: false,
  },
] as const;

test.use({ contextOptions: { reducedMotion: 'reduce' } });

for (const colorScheme of ['light', 'dark'] as const) {
  for (const resource of RESOURCES) {
    test(
      colorScheme +
        ' ' +
        resource.route +
        ' preserves full source, exact copying and resource actions at 320px',
      async ({ page, context, request }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);
        await page.emulateMedia({ colorScheme });
        await page.setViewportSize({ width: 320, height: 900 });
        await page.goto(resource.route);
        const response = await request.get(resource.raw);
        expect(response.status()).toBe(200);
        const rawText = await response.text();
        const source = page.locator('#' + resource.sourceId);
        expect(await source.textContent()).toBe(rawText);
        const preview = page.getByRole('figure').filter({ has: source });
        const copy = preview.getByRole('button');
        await expect(copy).toHaveCount(1);
        await expect(copy).toHaveAccessibleName(resource.copyName);
        await copy.click();
        await expect(copy).toHaveAttribute('data-copy-state', 'success');
        expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(rawText);
        const rawLink = preview.getByRole('link', {
          name: 'View raw (opens in a new tab)',
          exact: true,
        });
        await expect(rawLink).toHaveAttribute('href', resource.raw);
        await expect(rawLink).toHaveAttribute('target', '_blank');
        const download = preview.getByRole('link', { name: 'Download', exact: true });
        if (resource.allowDownload) {
          await expect(download).toHaveAttribute('download', resource.fileName);
          const pendingDownload = page.waitForEvent('download');
          await download.click();
          const result = await pendingDownload;
          expect(result.suggestedFilename()).toBe(resource.fileName);
          expect(await readFile(await result.path(), 'utf8')).toBe(rawText);
        } else {
          await expect(download).toHaveCount(0);
        }
        const sourceRegion = preview.getByRole('region', {
          name: resource.fileName + ' source',
          exact: true,
        });
        await rawLink.focus();
        await page.keyboard.press('Tab');
        await expect(sourceRegion).toBeFocused();
        await expect(sourceRegion).not.toHaveCSS('outline-style', 'none');
        await page.keyboard.press('End');
        await expect
          .poll(() => sourceRegion.evaluate((element) => element.scrollTop))
          .toBeGreaterThan(0);
        await page.evaluate(async () => {
          await document.fonts.ready;
        });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          ),
        ).toBeLessThanOrEqual(0);
      },
    );
  }
}

test.describe('resources without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const colorScheme of ['light', 'dark'] as const) {
    test(
      colorScheme + ' keeps both full sources and their raw links available',
      async ({ page, request }) => {
        await page.emulateMedia({ colorScheme });
        await page.setViewportSize({ width: 320, height: 900 });
        for (const resource of RESOURCES) {
          await page.goto(resource.route);
          const source = page.locator('#' + resource.sourceId);
          const response = await request.get(resource.raw);
          expect(response.status()).toBe(200);
          expect(await source.textContent()).toBe(await response.text());
          const preview = page.getByRole('figure').filter({ has: source });
          await expect(preview.getByRole('button')).toHaveCount(0);
          await expect(
            preview.getByRole('link', { name: 'View raw (opens in a new tab)', exact: true }),
          ).toHaveAttribute('href', resource.raw);
        }
      },
    );
  }
});
