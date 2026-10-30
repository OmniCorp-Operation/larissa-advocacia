import { expect, test } from "@playwright/test";
import { dictionaries, locales } from "./locales";

test.use({ reducedMotion: "reduce" });

for (const locale of locales) {
  test(`/${locale} renderiza sem erros no console com reduced motion`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(`/${locale}`);
    await page.getByRole("contentinfo").scrollIntoViewIfNeeded();

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      dictionaries[locale].hero.headlineMain,
    );
    expect(errors).toEqual([]);
  });
}
