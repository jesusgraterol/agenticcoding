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

test.describe('workflow guide', () => {
  test('presents every skill step with a link to its jg-skills page', async ({ page }) => {
    await page.goto('/workflow/');

    for (const skill of WORKFLOW_SKILLS) {
      const step = page.locator(`article#${skill}`);

      await expect(step.getByRole('heading', { level: 3, name: skill, exact: true })).toBeVisible();
      await expect(
        step.getByRole('link', { name: 'Full instructions on jg-skills (opens in a new tab)' }),
      ).toHaveAttribute('href', `https://jg-skills.jesusgraterol.dev/skills/${skill}/`);
      await expect(
        page
          .getByRole('navigation', { name: 'Workflow steps' })
          .getByRole('link', { name: skill, exact: true }),
      ).toHaveAttribute('href', `#${skill}`);
    }

    await expect(page.locator('article[id^="jg-"]')).toHaveCount(WORKFLOW_SKILLS.length);
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

    const execute = page.locator('article#jg-execute');
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
