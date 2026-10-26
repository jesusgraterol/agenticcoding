import { expect, test } from '@playwright/test';

test.use({ contextOptions: { reducedMotion: 'reduce' } });

for (const colorScheme of ['light', 'dark'] as const) {
  test(
    colorScheme + ' preserves authored diff lines, their order and non-color markers at 320px',
    async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto('/workflow/#jg-debug');
      const step = page.getByRole('article', { name: 'jg-debug', exact: true });
      const artifact = step.getByRole('figure');
      await expect(artifact).toHaveCount(1);
      await expect(artifact).toHaveAccessibleName(/ Fixed$/u);
      const text = await artifact.getByRole('code').textContent();
      expect(text).not.toBeNull();
      let previous = -1;
      for (const line of [
        'Reproduce',
        'FAIL  rejects the previous key after rotation',
        'Fix: src/tokens/token-cache.ts',
        'const cacheKey = `token:${ownerId}`;',
        'const cacheKey = `token:${tokenHash}`;',
        'Verify',
        'PASS  rejects the previous key after rotation',
      ]) {
        const position = text!.indexOf(line);
        expect(position).toBeGreaterThan(previous);
        previous = position;
      }
      await expect(artifact.getByText('Removed:', { exact: true })).toBeAttached();
      await expect(artifact.getByText('Added:', { exact: true })).toBeAttached();
      await expect(artifact.getByText('-', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect(artifact.getByText('+', { exact: true })).toHaveAttribute('aria-hidden', 'true');
      await expect(artifact.getByRole('button')).toHaveCount(0);
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

  test(colorScheme + ' keeps the authored warning, paused and error labels', async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/workflow/');
    for (const [skill, name] of [
      ['jg-challenge-plan', 'Challenge Revision required'],
      ['jg-pause', 'Where things stand Paused'],
      ['jg-review', 'Review of 6 task files Not ready'],
    ] as const) {
      await expect(
        page.getByRole('article', { name: skill, exact: true }).getByRole('figure'),
      ).toHaveAccessibleName(name);
    }
  });
}
