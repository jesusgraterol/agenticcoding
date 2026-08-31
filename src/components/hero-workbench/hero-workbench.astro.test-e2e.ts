import { expect, test } from '@playwright/test';

test('balances workbench blocks across laptop and wide-desktop layouts', async ({ page }) => {
  await page.goto('/');

  const workbench = page.locator('figure').filter({ hasText: 'change/organization-api-keys' });
  const workItems = workbench.locator('ol > li');

  await expect(workItems).toHaveCount(4);

  await page.setViewportSize({ width: 1024, height: 900 });
  const laptopRows = await workItems.evaluateAll((items) =>
    items.map((item) => Math.round(item.getBoundingClientRect().top)),
  );
  const laptopDescriptionHeights = await workItems
    .locator('p')
    .evaluateAll((descriptions) =>
      descriptions.map((description) => Math.round(description.getBoundingClientRect().height)),
    );

  expect(laptopRows[0]).toBe(laptopRows[1]);
  expect(laptopRows[2]).toBe(laptopRows[3]);
  expect(laptopRows[2]).toBeGreaterThan(laptopRows[0] ?? 0);
  expect(new Set(laptopDescriptionHeights).size).toBe(1);

  await page.setViewportSize({ width: 1440, height: 900 });
  const desktopRows = await workItems.evaluateAll((items) =>
    items.map((item) => Math.round(item.getBoundingClientRect().top)),
  );
  const desktopDescriptionHeights = await workItems
    .locator('p')
    .evaluateAll((descriptions) =>
      descriptions.map((description) => Math.round(description.getBoundingClientRect().height)),
    );

  expect(new Set(desktopRows).size).toBe(1);
  expect(new Set(desktopDescriptionHeights).size).toBe(1);
});
