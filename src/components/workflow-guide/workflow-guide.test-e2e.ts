import { expect, test } from '@playwright/test';

const WORKFLOW_SKILLS = [
  'jg-brainstorm',
  'jg-plan',
  'jg-challenge-plan',
  'jg-challenge-session',
  'jg-breakdown',
  'jg-execute',
  'jg-debug',
  'jg-pause',
  'jg-review',
  'jg-push',
  'jg-review-session',
] as const;

// skills that support the workflow without being one of its steps, in display order
const SUPPORTING_SKILLS = ['jg-command', 'jg-feedback', 'jg-session'] as const;

test.use({ contextOptions: { reducedMotion: 'reduce' } });

test.describe('workflow guide', () => {
  test('presents every skill step with a link to its jg-skills page', async ({ page }) => {
    await page.goto('/workflow/');

    for (const skill of WORKFLOW_SKILLS) {
      const step = page.getByRole('article', { name: skill, exact: true });

      await expect(step.getByRole('heading', { level: 3, name: skill, exact: true })).toBeVisible();
      await expect(
        step.getByRole('link', { name: 'Full instructions on jg-skills (opens in a new tab)' }),
      ).toHaveAttribute('href', `https://jg-skills.jesusgraterol.dev/skills/${skill}/`);
      await expect(
        page
          .getByRole('navigation', { name: 'Workflow steps' })
          .getByRole('link', { name: skill, exact: true }),
      ).toHaveAttribute('href', `#${skill}`);
      await page
        .getByRole('navigation', { name: 'Workflow steps' })
        .getByRole('link', { name: skill, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp('#' + skill + '$', 'u'));
      await expect(
        step.getByRole('heading', { level: 3, name: skill, exact: true }),
      ).toBeInViewport();
    }

    await expect(page.getByRole('heading', { level: 3 })).toHaveText(WORKFLOW_SKILLS);
  });

  test('states the explicit-only verification limit beside the install command', async ({
    page,
  }) => {
    await page.goto('/workflow/');

    await expect(page.locator('#workflow-install-command')).toHaveText(
      'npx skills add jesusgraterol/jg-skills --skill "*" -y',
    );
    await expect(
      page.getByText(
        'Explicit-only invocation and implicit loading are verified with Claude Code and Codex.',
      ),
    ).toBeVisible();
  });

  test('lists the supporting skills with a link to each jg-skills page', async ({ page }) => {
    await page.goto('/workflow/');

    const skills = page.locator('#more-skills').getByRole('listitem');

    await expect(skills).toHaveCount(SUPPORTING_SKILLS.length);

    for (const [index, skill] of SUPPORTING_SKILLS.entries()) {
      const link = skills
        .nth(index)
        .getByRole('link', { name: `${skill} on jg-skills (opens in a new tab)` });

      await expect(link).toHaveAttribute(
        'href',
        `https://jg-skills.jesusgraterol.dev/skills/${skill}/`,
      );
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('switches jg-execute modes by keyboard while both stay in the page', async ({ page }) => {
    await page.goto('/workflow/');

    const execute = page.getByRole('article', { name: 'jg-execute', exact: true });
    const supervisedPanel = execute.locator('[data-execute-panel="supervised"]');
    const autonomousPanel = execute.locator('[data-execute-panel="autonomous"]');

    await expect(supervisedPanel).toBeVisible();
    await expect(autonomousPanel).toBeHidden();
    await expect(autonomousPanel).toContainText('It never weakens a test, check, or finding');

    await execute.getByRole('radio', { name: 'Supervised' }).focus();
    await page.keyboard.press('ArrowRight');

    await expect(execute.getByRole('radio', { name: 'Autonomous' })).toBeChecked();
    await expect(autonomousPanel).toBeVisible();
    await expect(supervisedPanel).toBeHidden();
    await expect(
      autonomousPanel.getByRole('list', {
        name: 'What an autonomous run repeats for each milestone',
      }),
    ).toContainText('Push');
  });
});

test.describe('workflow without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const colorScheme of ['light', 'dark'] as const) {
    test(
      colorScheme + ' keeps native mode switching and step anchors usable at 320px',
      async ({ page }) => {
        await page.emulateMedia({ colorScheme });
        await page.setViewportSize({ width: 320, height: 900 });
        await page.goto('/workflow/#jg-execute');
        const step = page.getByRole('article', { name: 'jg-execute', exact: true });
        await expect(
          step.getByRole('heading', { level: 3, name: 'jg-execute', exact: true }),
        ).toBeInViewport();
        await step.getByRole('radio', { name: 'Supervised', exact: true }).focus();
        await page.keyboard.press('ArrowRight');
        await expect(step.getByRole('radio', { name: 'Autonomous', exact: true })).toBeChecked();
        await expect(step.locator('[data-execute-panel="autonomous"]')).toBeVisible();
        await expect(step.locator('[data-execute-panel="supervised"]')).toBeHidden();
        await page.keyboard.press('ArrowLeft');
        await expect(step.locator('[data-execute-panel="supervised"]')).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          ),
        ).toBeLessThanOrEqual(0);
      },
    );
  }
});
