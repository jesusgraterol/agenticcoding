import { expect, test, type Locator } from '@playwright/test';

// both cards, in display order, with the jg-skills section each one opens
const CARDS = [
  {
    destination: 'jg-skills.jesusgraterol.dev/#skills',
    href: 'https://jg-skills.jesusgraterol.dev/#skills',
    title: 'Browse the skills',
  },
  {
    destination: 'jg-skills.jesusgraterol.dev/#install',
    href: 'https://jg-skills.jesusgraterol.dev/#install',
    title: 'Install them',
  },
] as const;

/**
 * Reads the top edge of an element in page coordinates.
 * @param locator The element to measure.
 * @returns Its distance from the top of the page, in pixels.
 */
const topOf = async (locator: Locator): Promise<number> =>
  locator.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);

/**
 * Reads an element's box in page coordinates, so scrolling between two reads does not change it.
 * @param locator The element to measure.
 * @returns Its position from the page's top-left corner, and its size, in pixels.
 */
const pageBoxOf = async (
  locator: Locator,
): Promise<{ height: number; width: number; x: number; y: number }> =>
  locator.evaluate((element) => {
    const { height, left, top, width } = element.getBoundingClientRect();

    return { height, width, x: left + window.scrollX, y: top + window.scrollY };
  });

test.describe('skills bridge', () => {
  test('closes the home page between Put it into practice and the coding-agent strip', async ({
    page,
  }) => {
    await page.goto('/');

    const section = page.locator('#skills');

    await expect(
      section.getByRole('heading', { level: 2, name: 'Give your agent a workflow to run.' }),
    ).toBeVisible();
    expect(await topOf(page.locator('section[aria-labelledby="resources-title"]'))).toBeLessThan(
      await topOf(section),
    );
    expect(await topOf(section)).toBeLessThan(
      await topOf(page.locator('section[aria-labelledby="coding-agent-strip-title"]')),
    );
  });

  test('connects AGENTS.md and jg-skills in its strip', async ({ page }) => {
    await page.goto('/');

    const items = page.locator('[data-skills-bridge-strip]').getByRole('listitem');

    // the decorative connector between the two items stays out of the accessibility tree
    await expect(items).toHaveCount(2);
    await expect(items.nth(0).locator('code')).toHaveText('AGENTS.md');
    await expect(items.nth(0)).toContainText('Sets the standards');
    await expect(items.nth(1).locator('code')).toHaveText('jg-skills');
    await expect(items.nth(1)).toContainText('Runs the workflow');
  });

  test('links each card to its section on jg-skills in a new tab', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator('[data-skills-bridge-card]');

    await expect(cards).toHaveCount(CARDS.length);

    for (const [index, { destination, href, title }] of CARDS.entries()) {
      const card = cards.nth(index);
      const link = card.getByRole('link', { name: `${title} (opens in a new tab)` });

      await expect(card.getByRole('heading', { level: 3 })).toHaveText(
        `${title} (opens in a new tab)`,
      );
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link.locator('.lucide-arrow-up-right')).toHaveCount(1);
      await expect(card.locator('[data-skills-bridge-destination]')).toHaveText(destination);
    }
  });

  test('copies the install command from the install card', async ({ context, page }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    const installCard = page.locator('[data-skills-bridge-card]').nth(1);
    // the card's only button; its accessible name changes to "Copied" while it reports success
    const copyControl = installCard.getByRole('button');

    await expect(installCard.locator('#skills-bridge-install-command')).toHaveText(
      'npx skills add jesusgraterol/jg-skills --skill "*" -y',
    );
    await expect(installCard).toContainText(
      'Explicit-only invocation and implicit loading are verified with Claude Code and Codex.',
    );
    await expect(copyControl).toHaveAccessibleName('Copy install command');

    await copyControl.click();

    await expect(copyControl).toHaveAttribute('data-copy-state', 'success');
    await expect(copyControl).toHaveAccessibleName('Copied');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'npx skills add jesusgraterol/jg-skills --skill "*" -y',
    );
  });

  test('keeps the install card still while the copy label changes', async ({ context, page }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    const installCard = page.locator('[data-skills-bridge-card]').nth(1);
    const copyControl = installCard.getByRole('button');

    // the short "Copied" label once let the button rejoin the caption's row and shrink the card
    const cardBefore = await pageBoxOf(installCard);
    const buttonBefore = await pageBoxOf(copyControl);

    await copyControl.click();
    await expect(copyControl).toHaveAccessibleName('Copied');

    expect(await pageBoxOf(installCard)).toStrictEqual(cardBefore);
    expect(await pageBoxOf(copyControl)).toStrictEqual(buttonBefore);
  });

  test('places the cards side by side on wide screens and stacks them on narrow ones', async ({
    page,
  }) => {
    const cards = page.locator('[data-skills-bridge-card]');

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    expect(await topOf(cards.nth(1))).toBe(await topOf(cards.nth(0)));

    await page.setViewportSize({ width: 320, height: 720 });

    const firstBottom = await cards
      .nth(0)
      .evaluate((element) => element.getBoundingClientRect().bottom + window.scrollY);

    expect(await topOf(cards.nth(1))).toBeGreaterThan(firstBottom);
  });

  test('shows a focus ring when a card link has keyboard focus', async ({ page }) => {
    await page.goto('/');

    const [browseCard, installCard] = [
      page.locator('[data-skills-bridge-card]').nth(0),
      page.locator('[data-skills-bridge-card]').nth(1),
    ];

    // the whole-card link hides its own outline, so the card draws the ring around itself
    await browseCard.getByRole('link').focus();

    expect(await browseCard.evaluate((element) => element.matches(':has(:focus-visible)'))).toBe(
      true,
    );
    expect(await browseCard.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe(
      'solid',
    );

    // the install card's title link keeps its own outline, because the card also holds a button
    const installLink = installCard.getByRole('link');

    await installLink.focus();

    expect(await installLink.evaluate((element) => element.matches(':focus-visible'))).toBe(true);
    expect(await installLink.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe(
      'solid',
    );
  });
});
