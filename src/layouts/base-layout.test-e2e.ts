import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const ACCESSIBILITY_ROUTES = [
  '/',
  '/start/',
  '/refine/',
  '/cookbook/',
  '/cookbook/plan-a-feature/',
] as const;

const DARK_ACCESSIBILITY_ROUTES = [
  '/',
  '/start/',
  '/refine/',
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

  for (const route of DARK_ACCESSIBILITY_ROUTES) {
    test(`${route} has no automatically detectable dark-theme accessibility violations`, async ({
      page,
    }) => {
      await page.goto(route);
      await page.getByRole('button', { name: 'Use dark theme' }).first().click();

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toStrictEqual([]);
    });
  }

  test('homepage communicates the full operating model', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'A disciplined way to build software with coding agents.',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'The difference is control, not line count.' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Plan together. Execute in bounded slices.' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Clear systems earn wider delegation.' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Wide context. Narrow authority.' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'The first benefit is speed. The lasting benefit should be better software.',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Built through real project work.' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Give the work a stronger operating system.' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore moldea' })).toHaveAttribute(
      'href',
      'https://moldea.ai/',
    );
    await expect(page.getByText('controlled execution', { exact: true })).toBeVisible();
    await expect(page.getByText('repository-maturity.system', { exact: true })).toBeVisible();
    await expect(page.getByText('scope-map', { exact: true })).toBeVisible();
  });

  for (const viewportWidth of [320, 768, 1440] as const) {
    test(`homepage has no horizontal overflow at ${viewportWidth} pixels`, async ({ page }) => {
      await page.setViewportSize({ width: viewportWidth, height: 900 });
      await page.goto('/');

      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    });
  }

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

    const lightMoldeaLogo = page.locator('[data-moldea-logo="light"]');
    const darkMoldeaLogo = page.locator('[data-moldea-logo="dark"]');

    await expect(lightMoldeaLogo).toBeVisible();
    await expect(darkMoldeaLogo).toBeHidden();

    await page.getByRole('button', { name: 'Use dark theme' }).first().click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'dark');
    await expect(page.getByRole('button', { name: 'Use light theme' }).first()).toBeVisible();
    await expect(lightMoldeaLogo).toBeHidden();
    await expect(darkMoldeaLogo).toBeVisible();

    await page.reload();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('button', { name: 'Use light theme' }).first()).toBeVisible();

    await page.getByRole('button', { name: 'Use light theme' }).first().click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'light');
    await expect(lightMoldeaLogo).toBeVisible();
    await expect(darkMoldeaLogo).toBeHidden();
  });

  test('mobile navigation is keyboard accessible at 320 pixels without page overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Agentic Coding home' })).toContainText(
      'Agentic Coding',
    );

    const menu = page.getByLabel('Open navigation menu');
    await menu.focus();
    await page.keyboard.press('Enter');

    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });

    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole('link', { name: 'Start', exact: true })).toBeVisible();
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
