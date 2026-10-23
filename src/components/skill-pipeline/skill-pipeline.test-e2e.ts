import { expect, test } from '@playwright/test';

test.use({ contextOptions: { reducedMotion: 'reduce' } });

test.describe('skill pipeline', () => {
  test('links every workflow skill to its step on the workflow page', async ({ page }) => {
    await page.goto('/');

    const pipelineLinks = page.locator('[data-pipeline-stage] a[href^="/workflow/#"]');

    expect(
      await pipelineLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href'))),
    ).toStrictEqual([
      '/workflow/#jg-brainstorm',
      '/workflow/#jg-plan',
      '/workflow/#jg-challenge-plan',
      '/workflow/#jg-challenge-session',
      '/workflow/#jg-breakdown',
      '/workflow/#jg-execute',
      '/workflow/#jg-debug',
      '/workflow/#jg-pause',
      '/workflow/#jg-review',
      '/workflow/#jg-push',
      '/workflow/#jg-review-session',
    ]);
  });

  test('switches who runs review and push by keyboard while both modes stay in the page', async ({
    page,
  }) => {
    await page.goto('/');

    const shipStage = page.locator('[data-pipeline-stage="ship"]');
    const supervisedNote = shipStage.getByText('You run these yourself when you are ready.');
    const autonomousNote = shipStage.getByText(
      'jg-execute auto runs jg-review and jg-push after each milestone, within its stop conditions.',
    );
    const executeLink = page.locator(
      '[data-pipeline-stage="build"] a[href="/workflow/#jg-execute"]',
    );

    await expect(supervisedNote).toBeVisible();
    await expect(autonomousNote).toBeAttached();
    await expect(autonomousNote).toBeHidden();
    await expect(executeLink).toHaveAccessibleName('jg-execute');

    await page.getByRole('radio', { name: 'Supervised' }).focus();
    await page.keyboard.press('ArrowRight');

    await expect(page.getByRole('radio', { name: 'Autonomous' })).toBeChecked();
    await expect(autonomousNote).toBeVisible();
    await expect(supervisedNote).toBeHidden();
    await expect(executeLink).toHaveAccessibleName('jg-execute auto');
    await expect(
      page.getByText('In an autonomous run, the review gate settles each milestone'),
    ).toBeVisible();
  });
});

test.describe('pipeline without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const colorScheme of ['light', 'dark'] as const) {
    test(
      colorScheme + ' preserves ordered skill links and both native modes at 320px',
      async ({ page }) => {
        await page.emulateMedia({ colorScheme });
        await page.setViewportSize({ width: 320, height: 900 });
        await page.goto('/');
        const pipeline = page.locator('[data-pipeline-stage]');
        for (const label of ['Plan skills', 'Build skills', 'Ship skills']) {
          await expect(page.getByRole('list', { name: label, exact: true })).toBeVisible();
        }
        await page.getByRole('radio', { name: 'Supervised', exact: true }).focus();
        await page.keyboard.press('ArrowRight');
        await expect(page.getByRole('radio', { name: 'Autonomous', exact: true })).toBeChecked();
        await expect(
          pipeline.getByRole('link', { name: 'jg-execute auto', exact: true }),
        ).toHaveAttribute('href', '/workflow/#jg-execute');
        await page.keyboard.press('ArrowLeft');
        await expect(pipeline.getByRole('link', { name: 'jg-execute', exact: true })).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          ),
        ).toBeLessThanOrEqual(0);
      },
    );
  }
});
