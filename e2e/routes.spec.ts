import { expect, test } from "@playwright/test";
import { dictionaries, locales } from "./locales";

for (const locale of locales) {
  test.describe(`/${locale}`, () => {
    test("renderiza com html lang e headline no idioma da rota", async ({ page }) => {
      await page.goto(`/${locale}`);

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        dictionaries[locale].hero.headlineMain,
      );
    });

    test("mostra os titulos das secoes no idioma da rota", async ({ page }) => {
      await page.goto(`/${locale}`);

      const { how, about, contact } = dictionaries[locale];
      for (const title of [how.title, about.title, contact.title]) {
        await expect(page.getByRole("heading", { level: 2, name: title })).toBeVisible();
      }
    });
  });
}

test("idioma desconhecido na rota responde 404", async ({ page }) => {
  const response = await page.goto("/fr");

  expect(response?.status()).toBe(404);
});
