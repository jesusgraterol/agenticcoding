import { expect, test } from '@playwright/test';

test.use({ contextOptions: { reducedMotion: 'reduce' } });

for (const colorScheme of ['light', 'dark'] as const) {
  for (const width of [320, 1440]) {
    test(
      colorScheme + ' ' + width + 'px preserves the authored conversation and participant identity',
      async ({ page }) => {
        await page.emulateMedia({ colorScheme });
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/');
        const conversation = page.getByRole('list', {
          name: 'Example session: organization API keys, from idea to signed push',
          exact: true,
        });
        const messages = conversation.getByRole('article');
        await expect(messages).toHaveCount(10);
        for (let index = 0; index < 10; index += 1) {
          await expect(messages.nth(index)).toHaveAccessibleName(
            index % 2 === 0 ? 'You' : 'Coding agent',
          );
        }
        await expect(
          conversation.getByRole('article', { name: 'You', exact: true }).getByRole('code'),
        ).toHaveText(['jg-brainstorm', 'jg-plan', 'jg-execute', 'jg-review', 'jg-push']);
        await expect(messages.nth(0)).toContainText(
          'Organization API keys: a new table with its own CRUD endpoints?',
        );
        await expect(messages.nth(1)).toContainText(
          'src/tokens/ already owns hashing, scopes, and revocation. Give tokens an organization owner instead of a second table.',
        );
        await expect(messages.nth(9)).toContainText(
          'Signed commit 5b2e9a4 pushed to feature/org-api-keys.',
        );
        // decorative avatars identify both participants without adding a spoken image label
        await expect(conversation.locator('svg.lucide-user-round')).toHaveCount(5);
        await expect(conversation.locator('svg.lucide-bot')).toHaveCount(5);
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

test.describe('conversation without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('keeps the complete conversation and artifacts readable', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/');
    const conversation = page.getByRole('list', {
      name: 'Example session: organization API keys, from idea to signed push',
      exact: true,
    });
    await expect(conversation.getByRole('article')).toHaveCount(10);
    await expect(conversation).toContainText('# Plan: Organization API keys');
    await expect(conversation).toContainText('Ready to commit');
    await expect(conversation).toContainText(
      'Signed commit 5b2e9a4 pushed to feature/org-api-keys.',
    );
  });
});
