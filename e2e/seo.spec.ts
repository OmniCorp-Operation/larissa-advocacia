import { expect, test } from "@playwright/test";
import { dictionaries, locales } from "./locales";

for (const locale of locales) {
  test.describe(`SEO em /${locale}`, () => {
    test("title, description e Open Graph vem do dicionario do idioma", async ({ page }) => {
      await page.goto(`/${locale}`);
      const { title, description, ogLocale } = dictionaries[locale].meta;

      await expect(page).toHaveTitle(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", ogLocale);
    });

    test("canonical e hreflang apontam para os tres idiomas e x-default", async ({
      page,
      baseURL,
    }) => {
      await page.goto(`/${locale}`);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${baseURL}/${locale}`,
      );
      for (const alternate of locales) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${alternate}"]`),
        ).toHaveAttribute("href", `${baseURL}/${alternate}`);
      }
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        "href",
        `${baseURL}`,
      );
    });
  });
}
