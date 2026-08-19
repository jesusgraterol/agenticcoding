import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const ACCESSIBILITY_ROUTES = [
  '/',
  '/start/',
  '/refine/',
  '/cookbook/',
  '/cookbook/plan-a-feature/',
] as const;

const REQUIRED_ROUTES = [
  '/',
  '/start/',
  '/refine/',
  '/cookbook/',
  '/cookbook/plan-a-feature/',
  '/cookbook/challenge-a-plan/',
  '/cookbook/break-down-a-plan/',
  '/cookbook/execute-one-milestone/',
  '/cookbook/review-a-change/',
  '/cookbook/investigate-a-failing-test/',
  '/cookbook/control-scope/',
  '/cookbook/refine-coding-instructions/',
] as const;

/** Reads browser text without normalizing its whitespace. */
const readTextContent = async (page: Page, selector: string): Promise<string> =>
  page.locator(selector).evaluate((element) => element.textContent ?? '');

test.describe('production website', () => {
  for (const route of REQUIRED_ROUTES) {
    test(`${route} returns a complete HTML document`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.status()).toBe(200);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        new RegExp(`${route.replaceAll('/', '\\/')}$`),
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        'https://agenticcoding.jesusgraterol.dev/og/agentic-coding.png',
      );
    });
  }

  for (const route of ACCESSIBILITY_ROUTES) {
    test(`${route} has no automatically detectable accessibility violations`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toStrictEqual([]);
    });
  }

  test('dark theme has no automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Color theme').first().selectOption('dark');

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toStrictEqual([]);
  });

  test('homepage communicates the full operating model', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'More leverage. Same responsibility.' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'The difference is control, not line count.' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Plan → Breakdown → Execute → Review' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Capability is not a substitute for a clear engineering system.',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Demonstrate → Codify → Delegate → Verify' }),
    ).toBeVisible();
  });

  test('raw resources exactly match their rendered copy sources', async ({ page, request }) => {
    for (const resource of [
      {
        mediaType: 'text/markdown',
        pagePath: '/start/',
        rawPath: '/AGENTS.md',
        source: '#agents-foundation-source',
      },
      {
        mediaType: 'text/plain',
        pagePath: '/refine/',
        rawPath: '/refine.txt',
        source: '#refinement-prompt-source',
      },
    ]) {
      await page.goto(resource.pagePath);

      const renderedText = await readTextContent(page, resource.source);
      const rawResponse = await request.get(resource.rawPath);

      expect(rawResponse.status()).toBe(200);
      expect(rawResponse.headers()['content-type']).toContain(resource.mediaType);
      expect(await rawResponse.text()).toBe(renderedText);
    }
  });

  test('copy controls write the exact visible source and report success', async ({
    context,
    page,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/start/');

    const sourceText = await readTextContent(page, '#agents-foundation-source');
    const copyControl = page.locator('button[data-copy-source="agents-foundation-source"]');

    await copyControl.click();

    await expect(copyControl).toHaveAttribute('data-copy-state', 'success');
    await expect(copyControl).toContainText('Copied');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(sourceText);
  });

  test('copy controls expose a useful failure state', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: undefined,
      });
    });
    await page.goto('/refine/');

    const copyControl = page.locator('button[data-copy-source="refinement-prompt-source"]');
    await copyControl.click();

    await expect(copyControl).toHaveAttribute('data-copy-state', 'error');
    await expect(copyControl).toContainText('Copy failed');
    await expect(page.locator('#refinement-prompt-source-copy-status')).toHaveText(
      'Copy failed. Use the raw view instead.',
    );
  });

  test('theme preference persists and resolves before reload completes', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Color theme').first().selectOption('dark');
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'dark');

    await page.reload();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByLabel('Color theme').first()).toHaveValue('dark');

    await page.getByLabel('Color theme').first().selectOption('light');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('mobile navigation is keyboard accessible at 320 pixels without page overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');

    const menu = page.getByText('Menu', { exact: true });
    await menu.focus();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Start', exact: true })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  });

  test('reduced-motion users do not receive animated scrolling or transitions', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const behavior = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const link = getComputedStyle(document.querySelector('a[href="/start/"]') as HTMLElement);

      return {
        scrollBehavior: root.scrollBehavior,
        transitionDuration: link.transitionDuration,
      };
    });

    expect(behavior.scrollBehavior).toBe('auto');
    expect(Number.parseFloat(behavior.transitionDuration)).toBeLessThanOrEqual(0.001);
  });
});
