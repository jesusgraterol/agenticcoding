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
  '/cookbook/orient-to-a-codebase/',
  '/cookbook/plan-a-feature/',
  '/cookbook/challenge-a-plan/',
  '/cookbook/break-down-a-plan/',
  '/cookbook/execute-one-milestone/',
  '/cookbook/control-scope/',
  '/cookbook/synchronize-documentation/',
  '/cookbook/recover-from-agent-drift/',
  '/cookbook/investigate-a-failing-test/',
  '/cookbook/deepen-a-test-strategy/',
  '/cookbook/review-a-change/',
  '/cookbook/refine-coding-instructions/',
] as const;

/** Converts an OKLCH token to clipped linear-sRGB relative luminance. */
const calculateRelativeLuminance = (color: string): number => {
  const match = /^oklch\(\s*([\d.]+)(%)?\s+([\d.]+)\s+([\d.]+)(?:deg)?(?:\s*\/[^)]+)?\s*\)$/u.exec(
    color.trim(),
  );

  if (match === null) {
    throw new Error(`Expected an OKLCH color token, received: ${color}`);
  }

  const lightness = Number(match[1]) / (match[2] === '%' ? 100 : 1);
  const chroma = Number(match[3]);
  const hue = (Number(match[4]) * Math.PI) / 180;
  const labA = chroma * Math.cos(hue);
  const labB = chroma * Math.sin(hue);
  const lPrime = lightness + 0.3963377774 * labA + 0.2158037573 * labB;
  const mPrime = lightness - 0.1055613458 * labA - 0.0638541728 * labB;
  const sPrime = lightness - 0.0894841775 * labA - 1.291485548 * labB;
  const lValue = lPrime ** 3;
  const mValue = mPrime ** 3;
  const sValue = sPrime ** 3;
  const clampChannel = (channel: number): number => Math.min(1, Math.max(0, channel));
  const red = clampChannel(4.0767416621 * lValue - 3.3077115913 * mValue + 0.2309699292 * sValue);
  const green = clampChannel(
    -1.2684380046 * lValue + 2.6097574011 * mValue - 0.3413193965 * sValue,
  );
  const blue = clampChannel(-0.0041960863 * lValue - 0.7034186147 * mValue + 1.707614701 * sValue);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

/** Calculates the WCAG contrast ratio between two OKLCH color tokens. */
const calculateContrastRatio = (firstColor: string, secondColor: string): number => {
  const firstLuminance = calculateRelativeLuminance(firstColor);
  const secondLuminance = calculateRelativeLuminance(secondColor);
  const lighterLuminance = Math.max(firstLuminance, secondLuminance);
  const darkerLuminance = Math.min(firstLuminance, secondLuminance);

  return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
};

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
      await expect(page.locator('link[rel="describedby"]')).toHaveAttribute(
        'href',
        'https://agenticcoding.jesusgraterol.dev/llms.txt',
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'index, follow, max-image-preview:large',
      );
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        'content',
        new RegExp(`${route.replaceAll('/', '\\/')}$`),
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        'https://agenticcoding.jesusgraterol.dev/og/agentic-coding.png',
      );
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
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
    await expect(page.getByText(/Agent-operated\. Developer-governed\./u)).toBeVisible();
    await expect(page.getByText('repository-maturity.system', { exact: true })).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Code inspection becomes a response to risk, not a permanent ritual.',
      }),
    ).toBeVisible();
    await expect(page.getByText('scope-map', { exact: true })).toBeVisible();
  });

  test('cookbook routes developers from a live situation to an actionable recipe', async ({
    page,
  }) => {
    await page.goto('/cookbook/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Choose the conversation your work needs.' }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What is happening right now?' })).toBeVisible();
    await expect(page.getByRole('link', { name: /The codebase is new to me/u })).toHaveAttribute(
      'href',
      '/cookbook/orient-to-a-codebase/',
    );
    await expect(page.getByRole('link', { name: /The agent has drifted/u })).toHaveAttribute(
      'href',
      '/cookbook/recover-from-agent-drift/',
    );

    await page.getByRole('link', { name: /I need a plan/u }).click();

    await expect(page).toHaveURL('/cookbook/plan-a-feature/');
    await expect(page.getByRole('heading', { name: 'Working prompt' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Worked example' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Useful follow-ups' })).toBeVisible();
  });

  test('cookbook index and working prompt do not overflow at 320 pixels', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });

    for (const route of ['/cookbook/', '/cookbook/plan-a-feature/'] as const) {
      await page.goto(route);

      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
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

  test('comparison table scrolls internally instead of flattening at 320 pixels', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/');

    const comparison = page.getByRole('region', { name: 'Coding mode comparison' });

    await expect(comparison.getByRole('columnheader', { name: 'Dimension' })).toBeVisible();
    await expect(comparison.getByRole('columnheader', { name: 'Agentic Coding' })).toBeVisible();

    const dimensions = await comparison.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.clientWidth);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);

    await comparison.focus();
    await expect(comparison).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect
      .poll(() => comparison.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0);
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

  test('publishes the LLM index and raw-resource discovery links', async ({ page, request }) => {
    const llmsResponse = await request.get('/llms.txt');
    const llmsText = await llmsResponse.text();

    expect(llmsResponse.status()).toBe(200);
    expect(llmsResponse.headers()['content-type']).toContain('text/plain');
    expect(llmsText).toMatch(/^# Agentic Coding\n\n> .+\n/u);
    expect(llmsText).toContain(
      '[AGENTS.md foundation](https://agenticcoding.jesusgraterol.dev/AGENTS.md)',
    );
    expect(llmsText).toContain(
      '[Plan a feature](https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/)',
    );

    await page.goto('/start/');
    await expect(page.locator('link[rel="alternate"]')).toHaveAttribute(
      'href',
      'https://agenticcoding.jesusgraterol.dev/AGENTS.md',
    );
    await expect(page.locator('link[rel="alternate"]')).toHaveAttribute('type', 'text/markdown');

    await page.goto('/refine/');
    await expect(page.locator('link[rel="alternate"]')).toHaveAttribute(
      'href',
      'https://agenticcoding.jesusgraterol.dev/refine.txt',
    );
    await expect(page.locator('link[rel="alternate"]')).toHaveAttribute('type', 'text/plain');
  });

  test('copy controls write the exact visible source and report success', async ({
    context,
    page,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    for (const copySource of [
      { pagePath: '/start/', sourceId: 'agents-foundation-source' },
      { pagePath: '/cookbook/plan-a-feature/', sourceId: 'plan-a-feature-prompt' },
    ] as const) {
      await page.goto(copySource.pagePath);

      const sourceText = await readTextContent(page, `#${copySource.sourceId}`);
      const copyControl = page.locator(`button[data-copy-source="${copySource.sourceId}"]`);

      await copyControl.click();

      await expect(copyControl).toHaveAttribute('data-copy-state', 'success');
      await expect(copyControl).toContainText('Copied');
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(sourceText);
    }
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

  test('top navigation visibly identifies the current route', async ({ page }) => {
    const routeCases = [
      { currentLinkName: 'Refine', inactiveLinkName: 'Cookbook', route: '/refine/' },
      {
        currentLinkName: 'Cookbook',
        inactiveLinkName: 'Refine',
        route: '/cookbook/plan-a-feature/',
      },
      { currentLinkName: 'Start', inactiveLinkName: 'Refine', route: '/start/' },
    ] as const;

    for (const routeCase of routeCases) {
      await page.goto(routeCase.route);

      const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });

      expect(await primaryNavigation.locator('a[href^="/"]').allTextContents()).toStrictEqual([
        'Start',
        'Refine',
        'Cookbook',
      ]);

      const currentLink = primaryNavigation.getByRole('link', {
        name: routeCase.currentLinkName,
        exact: true,
      });
      const inactiveLink = primaryNavigation.getByRole('link', {
        name: routeCase.inactiveLinkName,
        exact: true,
      });

      await expect(currentLink).toHaveAttribute('aria-current', 'page');
      await expect(inactiveLink).not.toHaveAttribute('aria-current');

      const presentations = await Promise.all([
        currentLink.evaluate((element) => {
          const styles = getComputedStyle(element);

          return { backgroundColor: styles.backgroundColor, borderColor: styles.borderColor };
        }),
        inactiveLink.evaluate((element) => {
          const styles = getComputedStyle(element);

          return { backgroundColor: styles.backgroundColor, borderColor: styles.borderColor };
        }),
      ]);

      expect(presentations[0]).not.toStrictEqual(presentations[1]);
    }

    await page.goto('/refine/');

    const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });
    const inactivePresentations = await Promise.all(
      ['Start', 'Cookbook'].map((linkName) =>
        primaryNavigation.getByRole('link', { name: linkName, exact: true }).evaluate((element) => {
          const styles = getComputedStyle(element);

          return { backgroundColor: styles.backgroundColor, borderColor: styles.borderColor };
        }),
      ),
    );

    expect(inactivePresentations[0]).toStrictEqual(inactivePresentations[1]);

    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Agentic Coding home' })).not.toHaveAttribute(
      'aria-current',
    );
    await expect(
      page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', {
        name: 'Start',
        exact: true,
      }),
    ).not.toHaveAttribute('aria-current');
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

    await page.goto('/cookbook/plan-a-feature/');
    await page.getByLabel('Open navigation menu').click();

    const currentCookbookLink = page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Cookbook', exact: true });

    await expect(currentCookbookLink).toHaveAttribute('aria-current', 'page');
  });

  test('shows accessible progress during delayed client navigation and hides it after success', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');

    const progress = page.getByRole('progressbar', {
      includeHidden: true,
      name: 'Page navigation progress',
    });
    const delayedRequest = Promise.withResolvers<void>();

    await expect(progress).toBeHidden();
    await page.route(
      '**/start/',
      async (route) => {
        await delayedRequest.promise;
        await route.continue();
      },
      { times: 1 },
    );

    const navigation = page.getByRole('link', { name: 'Start', exact: true }).first().click();

    await expect(progress).toBeVisible();
    await expect(progress).toHaveAttribute('aria-valuetext', 'Loading next page');
    expect((await progress.boundingBox())?.width).toBe(320);

    const accessibilityResults = await new AxeBuilder({ page })
      .include('[data-navigation-progress]')
      .analyze();

    expect(accessibilityResults.violations).toStrictEqual([]);

    delayedRequest.resolve();
    await navigation;
    await expect(page).toHaveURL('/start/');
    await expect(progress).toBeHidden();
  });

  test('cleans up progress after failed and interrupted navigation and across browser history', async ({
    page,
  }) => {
    await page.goto('/');

    const progress = page.getByRole('progressbar', {
      includeHidden: true,
      name: 'Page navigation progress',
    });

    await page.evaluate(() => {
      type IFailedPreparationEvent = Event & { loader: () => Promise<void> };
      type IFailedPreparationWindow = Window & {
        __agenticCodingFailedNavigationPreparation?: IFailedPreparationEvent;
      };
      const preparationEvent = new Event('astro:before-preparation') as IFailedPreparationEvent;

      preparationEvent.loader = (): Promise<void> =>
        Promise.reject(new Error('Deliberate navigation preparation failure.'));
      (window as IFailedPreparationWindow).__agenticCodingFailedNavigationPreparation =
        preparationEvent;
      document.dispatchEvent(preparationEvent);
    });

    await expect(progress).toBeVisible();
    await page.evaluate(async () => {
      type IFailedPreparationEvent = Event & { loader: () => Promise<void> };
      type IFailedPreparationWindow = Window & {
        __agenticCodingFailedNavigationPreparation?: IFailedPreparationEvent;
      };
      const failedPreparationWindow = window as IFailedPreparationWindow;
      const preparationEvent = failedPreparationWindow.__agenticCodingFailedNavigationPreparation;

      if (preparationEvent === undefined) {
        throw new Error('The failed navigation preparation event is unavailable.');
      }

      try {
        await preparationEvent.loader();
      } catch {
        // the rejected loader is the expected navigation failure under test
      }

      delete failedPreparationWindow.__agenticCodingFailedNavigationPreparation;
    });
    await expect(progress).toBeHidden();

    const interruptedRequest = Promise.withResolvers<void>();

    await page.route(
      '**/start/',
      async (route) => {
        await interruptedRequest.promise;
        await route.continue();
      },
      { times: 1 },
    );

    const interruptedNavigation = page
      .getByRole('link', { name: 'Start', exact: true })
      .first()
      .click();

    await expect(progress).toBeVisible();
    await page.getByRole('link', { name: 'Cookbook', exact: true }).first().click();
    await expect(page).toHaveURL('/cookbook/');
    await expect(progress).toBeHidden();

    interruptedRequest.resolve();
    await interruptedNavigation;
    await expect(page).toHaveURL('/cookbook/');

    await page.getByRole('link', { name: 'Start', exact: true }).first().click();
    await expect(page).toHaveURL('/start/');
    await expect(progress).toBeHidden();

    await page.goBack();
    await expect(page).toHaveURL('/cookbook/');
    await expect(progress).toBeHidden();

    await page.goForward();
    await expect(page).toHaveURL('/start/');
    await expect(progress).toBeHidden();
  });

  test('uses sufficient navigation progress contrast in light and dark themes', async ({
    page,
  }) => {
    await page.goto('/');

    const progress = page.locator('[data-navigation-progress]');
    const indicator = progress.locator('[data-navigation-progress-indicator]');

    for (const theme of ['light', 'dark'] as const) {
      await page.locator('html').evaluate((root, activeTheme) => {
        root.classList.remove('light', 'dark');
        root.classList.add(activeTheme);
      }, theme);

      const colors = await progress.evaluate((progressElement) => {
        const indicatorElement = progressElement.querySelector<HTMLElement>(
          '[data-navigation-progress-indicator]',
        );
        const rootStyles = getComputedStyle(document.documentElement);

        if (indicatorElement === null) {
          throw new Error('The navigation progress indicator is unavailable.');
        }

        return {
          backgroundToken: rootStyles.getPropertyValue('--background'),
          foregroundToken: rootStyles.getPropertyValue('--foreground'),
          indicatorColor: getComputedStyle(indicatorElement).backgroundColor,
          pageBackground: getComputedStyle(document.body).backgroundColor,
          pageForeground: getComputedStyle(document.body).color,
          trackColor: getComputedStyle(progressElement).backgroundColor,
        };
      });

      expect(colors.indicatorColor).toBe(colors.pageForeground);
      expect(colors.trackColor).toBe(colors.pageBackground);
      expect(
        calculateContrastRatio(colors.foregroundToken, colors.backgroundToken),
      ).toBeGreaterThanOrEqual(3);
      await expect(indicator).toHaveCSS('background-color', colors.pageForeground);
    }
  });

  test('shows a static navigation segment when reduced motion is preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const delayedRequest = Promise.withResolvers<void>();

    await page.route(
      '**/start/',
      async (route) => {
        await delayedRequest.promise;
        await route.continue();
      },
      { times: 1 },
    );

    const navigation = page.getByRole('link', { name: 'Start', exact: true }).first().click();
    const progress = page.getByRole('progressbar', { name: 'Page navigation progress' });
    const indicator = progress.locator('[data-navigation-progress-indicator]');

    await expect(progress).toBeVisible();

    const initialPresentation = await indicator.evaluate((element) => {
      const styles = getComputedStyle(element);

      return {
        animationName: styles.animationName,
        opacity: styles.opacity,
        transform: styles.transform,
      };
    });
    const progressBounds = await progress.boundingBox();
    const indicatorBounds = await indicator.boundingBox();

    await page.waitForTimeout(100);

    expect(initialPresentation.animationName).toBe('none');
    expect(initialPresentation.opacity).toBe('1');
    expect(initialPresentation.transform).not.toBe('none');
    expect(await indicator.evaluate((element) => getComputedStyle(element).transform)).toBe(
      initialPresentation.transform,
    );
    expect(indicatorBounds?.width).toBeGreaterThan((progressBounds?.width ?? 0) * 0.2);
    expect(indicatorBounds?.width).toBeLessThan((progressBounds?.width ?? 0) * 0.4);

    delayedRequest.resolve();
    await navigation;
    await expect(progress).toBeHidden();
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
