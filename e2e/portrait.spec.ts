import { expect, test } from "@playwright/test";
import { dictionaries, locales } from "./locales";

for (const locale of locales) {
  test(`retrato real aparece no hero e no sobre com alt em /${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const { hero, about } = dictionaries[locale];

    const heroPortrait = page.locator("#hero").getByRole("img", { name: hero.photoAlt });
    const aboutPortrait = page.locator("#about").getByRole("img", { name: about.photoAlt });

    for (const portrait of [heroPortrait, aboutPortrait]) {
      await portrait.scrollIntoViewIfNeeded();
      await expect(portrait).toBeVisible();
      await expect(portrait).toHaveJSProperty("complete", true);
      expect(await portrait.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      expect(decodeURIComponent((await portrait.getAttribute("src")) ?? "")).toContain("larissa-retrato");
    }
  });
}
