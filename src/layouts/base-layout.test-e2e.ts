import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const ACCESSIBILITY_ROUTES = [
  '/',
  '/start/',
  '/refine/',
  '/workflow/',
  '/cookbook/',
  '/cookbook/control-scope/',
] as const;

const DARK_ACCESSIBILITY_ROUTES = [
  '/',
  '/start/',
  '/refine/',
  '/workflow/',
  '/cookbook/control-scope/',
] as const;

const REQUIRED_ROUTES = [
  '/',
  '/start/',
  '/refine/',
  '/workflow/',
  '/cookbook/',
  '/cookbook/orient-to-a-codebase/',
  '/cookbook/control-scope/',
  '/cookbook/synchronize-documentation/',
  '/cookbook/recover-from-agent-drift/',
  '/cookbook/deepen-a-test-strategy/',
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

      if (route !== '/') {
        const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });

        await expect(breadcrumb).toBeVisible();
        await expect(breadcrumb.locator('[aria-current="page"]')).toHaveCount(1);
      }

      if (route !== '/' && route !== '/cookbook/') {
        await expect(page.locator('meta[property="article:published_time"]')).toHaveCount(1);
        await expect(page.locator('meta[property="article:modified_time"]')).toHaveCount(1);
        await expect(page.locator('time[datetime]')).not.toHaveCount(0);
      }
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
      page.getByRole('heading', { name: 'Reliable delegation has layers.' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Plan together. Build in slices. Publish on your terms.',
      }),
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
    await expect(
      page.getByRole('link', { name: 'moldea on GitHub (opens in a new tab)' }),
    ).toHaveAttribute('href', 'https://github.com/moldea-ai');
    await expect(
      page.getByRole('link', { name: 'Agent Skill documentation (opens in a new tab)' }),
    ).toHaveAttribute('href', 'https://skill.moldea.ai/');
    await expect(
      page.getByRole('link', { name: 'Packages documentation (opens in a new tab)' }),
    ).toHaveAttribute('href', 'https://packages.moldea.ai/');
    await expect(page.getByText('In development', { exact: true })).toBeVisible();
    await expect(page.getByText('Git-native project context for coding agents.')).toBeVisible();
    await expect(page.getByText(/Skills run\s+the workflow\./u)).toBeVisible();

    const heroSession = page.getByRole('list', {
      name: 'Example session: organization API keys, from idea to signed push',
    });

    await expect(heroSession).toContainText('jg-brainstorm');
    await expect(heroSession).toContainText('Ready to commit');
    await expect(heroSession).toContainText('Signed commit 5b2e9a4 pushed');
    await expect(page.getByText('engineering-contract.layers', { exact: true })).toBeVisible();
    await expect(page.getByText(/^LAYER \d{2}$/u)).toHaveCount(6);

    for (const stage of ['Plan', 'Build', 'Ship'] as const) {
      await expect(page.getByRole('heading', { level: 3, name: stage, exact: true })).toBeVisible();
    }

    await expect(page.getByRole('link', { name: /^jg-challenge-plan/u })).toHaveAttribute(
      'href',
      '/workflow/#jg-challenge-plan',
    );
    await expect(page.getByText('Correct', { exact: true })).toBeVisible();
    await expect(page.getByText('Continue', { exact: true })).toBeVisible();
    await expect(page.getByText('Complete', { exact: true })).toBeVisible();
    await expect(page.getByText('Publish only when explicitly authorized:')).toBeVisible();
    await expect(page.getByText('repository-maturity.system', { exact: true })).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'From supervised milestones to autonomous runs, never to free rein.',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Code inspection becomes a response to risk, not a permanent ritual.',
      }),
    ).toBeVisible();
    await expect(page.getByText('scope-map', { exact: true })).toBeVisible();
  });

  test('start page publishes the current foundation version and skill dispatch', async ({
    page,
  }) => {
    await page.goto('/start/');

    await expect(page.getByText('Version 1.1.0', { exact: true })).toBeVisible();
    await expect(page.locator('time[datetime="2026-10-15"]').first()).toBeVisible();
    await expect(page.locator('#agents-foundation-source')).toContainText(
      'determine whether the developer invoked a skill',
    );
  });

  test('refine page publishes the current refinement prompt version', async ({ page }) => {
    await page.goto('/refine/');

    await expect(page.getByText('Version 1.1.0', { exact: true })).toBeVisible();
    await expect(page.locator('#refinement-prompt-source')).toContainText(
      'installed agent skills that define workflows',
    );
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

    await expect(page.getByRole('link', { name: /I need a plan/u })).toHaveAttribute(
      'href',
      '/workflow/#jg-plan',
    );
    await expect(page.getByRole('link', { name: /Something is broken/u })).toHaveAttribute(
      'href',
      '/workflow/#jg-debug',
    );

    await page.getByRole('link', { name: /The agent has drifted/u }).click();

    await expect(page).toHaveURL('/cookbook/recover-from-agent-drift/');
    await expect(page.getByText(/^The agent went past a checkpoint/u)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Example', exact: true })).toBeVisible();
    await expect(
      page.getByRole('list', { name: 'Example conversation: Recover from agent drift' }),
    ).toContainText('Recovery audit');
    await expect(page.getByRole('heading', { name: 'Working prompt' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What good looks like' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'If the result drifts' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Warning signs' })).toBeVisible();
  });

  for (const colorScheme of ['light', 'dark'] as const) {
    test(
      colorScheme + ' preserves recipe metadata and related navigation at 320px',
      async ({ page }) => {
        await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
        await page.setViewportSize({ width: 320, height: 900 });
        await page.goto('/cookbook/control-scope/');
        await expect(
          page.getByRole('heading', { level: 1, name: 'Control scope', exact: true }),
        ).toBeVisible();
        await expect(page.getByText('Published October 15, 2026')).toBeVisible();
        await expect(page.getByText(/^\d+ min read$/u)).toBeVisible();
        const related = page.getByRole('complementary', { name: 'Related recipes' });
        await expect(related.getByRole('link')).toHaveCount(2);
        await expect(related.getByRole('link', { name: /Orient to a codebase/u })).toHaveAttribute(
          'href',
          '/cookbook/orient-to-a-codebase/',
        );
        await expect(
          related.getByRole('link', { name: /Recover from agent drift/u }),
        ).toHaveAttribute('href', '/cookbook/recover-from-agent-drift/');
        await page.evaluate(async () => {
          await document.fonts.ready;
        });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          ),
        ).toBeLessThanOrEqual(0);
        await page.getByRole('link', { name: 'Back to the cookbook', exact: true }).click();
        await expect(page).toHaveURL('/cookbook/');
      },
    );
  }

  test('content pages do not overflow at 320 pixels', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });

    for (const route of [
      '/cookbook/',
      '/cookbook/control-scope/',
      '/workflow/',
      '/start/',
    ] as const) {
      await page.goto(route);

      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
  });

  test('engineering contract preserves its ordered layers at 320 pixels', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/');

    const engineeringContract = page
      .getByText('engineering-contract.layers', {
        exact: true,
      })
      .locator('..');
    const contractFigure = engineeringContract.locator('..');

    await expect(contractFigure.locator('ol > li')).toHaveCount(6);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
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
    expect(llmsText).toContain('[Workflow](https://agenticcoding.jesusgraterol.dev/workflow/)');
    expect(llmsText).toContain(
      '[Control scope](https://agenticcoding.jesusgraterol.dev/cookbook/control-scope/)',
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
      // the foundation copies its raw file, which matches the rendered source exactly
      {
        button: 'button[data-copy-url="/AGENTS.md"]',
        pagePath: '/start/',
        sourceId: 'agents-foundation-source',
      },
      {
        button: 'button[data-copy-source="control-scope-prompt"]',
        pagePath: '/cookbook/control-scope/',
        sourceId: 'control-scope-prompt',
      },
      {
        button: 'button[data-copy-source="workflow-install-command"]',
        pagePath: '/workflow/',
        sourceId: 'workflow-install-command',
      },
    ] as const) {
      await page.goto(copySource.pagePath);

      const sourceText = await readTextContent(page, `#${copySource.sourceId}`);
      const copyControl = page.locator(copySource.button);

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

    const copyControl = page.locator('button[data-copy-url="/refine.txt"]');
    await copyControl.click();

    // the package's guidance for a browser without a clipboard, which links to the raw file
    const guidance =
      "This browser can't copy from this page. Open the link below and copy the text there.";
    const wrapper = copyControl.locator('xpath=..');

    await expect(copyControl).toHaveAttribute('data-copy-state', 'error');
    await expect(copyControl).toContainText('Copy failed');
    await expect(wrapper.locator('[data-copy-status]')).toHaveText(guidance);
    await expect(wrapper.locator('[data-copy-hint] a')).toHaveAttribute('href', '/refine.txt');
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
        route: '/cookbook/control-scope/',
      },
      { currentLinkName: 'Start', inactiveLinkName: 'Refine', route: '/start/' },
      { currentLinkName: 'Workflow', inactiveLinkName: 'Start', route: '/workflow/' },
    ] as const;

    for (const routeCase of routeCases) {
      await page.goto(routeCase.route);

      const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });

      expect(await primaryNavigation.locator('a[href^="/"]').allTextContents()).toStrictEqual([
        'Start',
        'Workflow',
        'Refine',
        'Cookbook',
      ]);
      await expect(
        primaryNavigation.getByRole('link', { name: 'Skills (opens in a new tab)' }),
      ).toHaveAttribute('href', 'https://jg-skills.jesusgraterol.dev/');

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
      await expect(primaryNavigation.locator('[aria-current]')).toHaveCount(1);
    }

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

    const menu = page.getByLabel('Navigation menu');
    await menu.focus();
    await page.keyboard.press('Enter');

    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });

    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole('link', { name: 'Start', exact: true })).toBeVisible();
    await expect(
      mobileNavigation.getByRole('link', { name: 'Workflow', exact: true }),
    ).toBeVisible();
    await expect(
      mobileNavigation.getByRole('link', { name: 'Skills (opens in a new tab)' }),
    ).toHaveAttribute('href', 'https://jg-skills.jesusgraterol.dev/');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);

    await page.goto('/cookbook/control-scope/');
    await page.getByLabel('Navigation menu').click();

    const currentCookbookLink = page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Cookbook', exact: true });

    await expect(currentCookbookLink).toHaveAttribute('aria-current', 'page');
  });

  test('shows accessible progress during a slow navigation and leaves it behind with the page', async ({
    page,
  }) => {
    await page.goto('/');

    const progress = page.getByRole('progressbar', {
      includeHidden: true,
      name: 'Loading the next page',
    });

    await expect(progress).toBeHidden();

    // the bar as it shows, checked for accessibility, then hidden again
    await progress.evaluate((element: HTMLElement) => {
      element.hidden = false;
    });
    expect((await progress.boundingBox())?.width).toBe(1280);
    expect(
      (await new AxeBuilder({ page }).include('[data-navigation-progress]').analyze()).violations,
    ).toStrictEqual([]);
    await progress.evaluate((element: HTMLElement) => {
      element.hidden = true;
    });

    // the old page records when the bar shows, since the test can't read a page mid-navigation.
    // Removing the speculation rules cancels the prerender a hover starts, which the held route
    // can't intercept, so the click makes a normal, slow navigation
    await page.evaluate(() => {
      document.querySelector('script[type="speculationrules"]')?.remove();
      const bar = document.querySelector<HTMLElement>('[data-navigation-progress]');
      let clickedAt = 0;

      sessionStorage.removeItem('progress-shown-after');
      document.addEventListener(
        'click',
        () => {
          clickedAt = performance.now();
        },
        { capture: true },
      );
      new MutationObserver(() => {
        if (bar !== null && !bar.hidden) {
          sessionStorage.setItem('progress-shown-after', String(performance.now() - clickedAt));
        }
      }).observe(bar as Node, { attributes: true });
    });
    await page.route(
      '**/start/',
      async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        await route.continue();
      },
      { times: 1 },
    );

    await page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Start', exact: true })
      .click();
    await expect(page).toHaveURL('/start/');

    // it waited 150 ms, then showed before the slow page arrived, which starts without it
    expect(
      Number(await page.evaluate(() => sessionStorage.getItem('progress-shown-after'))),
    ).toBeGreaterThanOrEqual(150);
    await expect(progress).toBeHidden();
  });

  test('cleans up progress after interrupted navigation and across browser history', async ({
    page,
  }) => {
    await page.goto('/');

    const progress = page.getByRole('progressbar', {
      includeHidden: true,
      name: 'Loading the next page',
    });
    const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });
    const interruptedRequest = Promise.withResolvers<void>();

    await page.route(
      '**/start/',
      async (route) => {
        await interruptedRequest.promise;
        await route.continue();
      },
      { times: 1 },
    );

    // a second click replaces the held navigation, and the page it reaches has no bar showing
    await primaryNavigation.getByRole('link', { name: 'Start', exact: true }).click();
    await primaryNavigation.getByRole('link', { name: 'Cookbook', exact: true }).click();
    await expect(page).toHaveURL('/cookbook/');
    await expect(progress).toBeHidden();
    interruptedRequest.resolve();

    await primaryNavigation.getByRole('link', { name: 'Start', exact: true }).click();
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
    const indicator = progress.locator('.jg-navigation-progress-indicator');

    for (const theme of ['light', 'dark'] as const) {
      await page.locator('html').evaluate((root, activeTheme) => {
        root.classList.remove('light', 'dark');
        root.classList.add(activeTheme);
      }, theme);

      const colors = await progress.evaluate((progressElement) => {
        const indicatorElement = progressElement.querySelector<HTMLElement>(
          '.jg-navigation-progress-indicator',
        );
        const rootStyles = getComputedStyle(document.documentElement);

        if (indicatorElement === null) {
          throw new Error('The navigation progress indicator is unavailable.');
        }

        return {
          backgroundToken: rootStyles.getPropertyValue('--jg-background'),
          foregroundToken: rootStyles.getPropertyValue('--jg-foreground'),
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

  test('keeps text selection visible on page and inverse surfaces in both themes', async ({
    page,
  }) => {
    await page.goto('/');

    for (const theme of ['light', 'dark'] as const) {
      await page.locator('html').evaluate((root, activeTheme) => {
        root.classList.remove('light', 'dark');
        root.classList.add(activeTheme);
      }, theme);

      const colors = await page.evaluate(() => {
        const primaryText = document.querySelector<HTMLElement>('.bg-inverse p');
        const colorProbe = document.createElement('span');

        if (primaryText === null) {
          throw new Error('Inverse-surface text is unavailable for selection verification.');
        }

        const primarySurface = primaryText.closest<HTMLElement>('.bg-inverse');

        if (primarySurface === null) {
          throw new Error('An inverse surface is unavailable for selection verification.');
        }

        colorProbe.style.backgroundColor = 'var(--jg-accent)';
        colorProbe.style.color = 'var(--jg-accent-foreground)';
        document.body.append(colorProbe);

        const rootStyles = getComputedStyle(document.documentElement);
        const primarySelectionStyles = getComputedStyle(primaryText, '::selection');
        const selectionStyles = getComputedStyle(document.documentElement, '::selection');
        const probeStyles = getComputedStyle(colorProbe);
        const result = {
          accentForegroundToken: rootStyles.getPropertyValue('--jg-accent-foreground'),
          accentToken: rootStyles.getPropertyValue('--jg-accent'),
          inverseAccentToken: rootStyles.getPropertyValue('--jg-inverse-accent'),
          pageBackground: getComputedStyle(document.body).backgroundColor,
          pageBackgroundToken: rootStyles.getPropertyValue('--jg-background'),
          primaryBackground: getComputedStyle(primarySurface).backgroundColor,
          primarySelectionBackground: primarySelectionStyles.backgroundColor,
          primarySelectionForeground: primarySelectionStyles.color,
          primaryToken: rootStyles.getPropertyValue('--jg-inverse'),
          selectionBackground: selectionStyles.backgroundColor,
          selectionForeground: selectionStyles.color,
          tokenBackground: probeStyles.backgroundColor,
          tokenForeground: probeStyles.color,
        };

        colorProbe.remove();

        return result;
      });

      expect(colors.selectionBackground).toBe(colors.tokenBackground);
      expect(colors.selectionForeground).toBe(colors.tokenForeground);
      expect(colors.selectionBackground).not.toBe(colors.pageBackground);
      expect(colors.selectionBackground).not.toBe(colors.primaryBackground);
      expect(colors.primarySelectionBackground).toBe(colors.tokenBackground);
      expect(colors.primarySelectionForeground).toBe(colors.tokenForeground);
      expect(colors.primarySelectionBackground).not.toBe(colors.primaryBackground);
      expect(
        calculateContrastRatio(colors.accentToken, colors.pageBackgroundToken),
      ).toBeGreaterThanOrEqual(3);
      expect(
        calculateContrastRatio(colors.accentToken, colors.primaryToken),
      ).toBeGreaterThanOrEqual(3);
      expect(
        calculateContrastRatio(colors.accentToken, colors.accentForegroundToken),
      ).toBeGreaterThanOrEqual(4.5);
      // the inverse surface's own accent, as its panels use it for text
      expect(
        calculateContrastRatio(colors.inverseAccentToken, colors.primaryToken),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        calculateContrastRatio(colors.primarySelectionBackground, colors.primaryBackground),
      ).toBeGreaterThanOrEqual(3);
      expect(
        calculateContrastRatio(
          colors.primarySelectionBackground,
          colors.primarySelectionForeground,
        ),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  test('shows a still bar a third wide when reduced motion is preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const progress = page.getByRole('progressbar', {
      includeHidden: true,
      name: 'Loading the next page',
    });
    const indicator = progress.locator('.jg-navigation-progress-indicator');

    await progress.evaluate((element: HTMLElement) => {
      element.hidden = false;
    });

    const presentation = await indicator.evaluate((element) => {
      const styles = getComputedStyle(element);

      return { animationName: styles.animationName, opacity: styles.opacity };
    });
    const progressBounds = await progress.boundingBox();
    const indicatorBounds = await indicator.boundingBox();

    expect(presentation).toStrictEqual({ animationName: 'none', opacity: '1' });
    expect(indicatorBounds?.width).toBeCloseTo((progressBounds?.width ?? 0) / 3, 0);
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
