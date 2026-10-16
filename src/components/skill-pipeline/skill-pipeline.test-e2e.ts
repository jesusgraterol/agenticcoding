import { expect, test } from '@playwright/test';

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
      '/workflow/#jg-breakdown',
      '/workflow/#jg-execute',
      '/workflow/#jg-debug',
      '/workflow/#jg-pause',
      '/workflow/#jg-review',
      '/workflow/#jg-push',
    ]);
  });

  test('switches who runs review and push by keyboard while both modes stay in the page', async ({
    page,
  }) => {
    await page.goto('/');

    const shipStage = page.locator('[data-pipeline-stage="ship"]');
    const supervisedNote = shipStage.getByText('You run these yourself when you are ready.');
    const autonomousNote = shipStage.getByText(
      'jg-execute auto runs these after each milestone, within its stop conditions.',
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
