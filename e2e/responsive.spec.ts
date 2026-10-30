import { expect, test } from "@playwright/test";
import { locales } from "./locales";

test.use({ viewport: { width: 375, height: 812 } });

for (const locale of locales) {
  test(`/${locale} nao tem scroll horizontal em 375px`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await page.getByRole("contentinfo").scrollIntoViewIfNeeded();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    expect(overflow).toBeLessThanOrEqual(0);
  });
}
