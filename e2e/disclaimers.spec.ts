import { expect, test } from "@playwright/test";
import { dictionaries, locales } from "./locales";

const role = "Paralegal | Non attorney";

for (const locale of locales) {
  test.describe(`/${locale}`, () => {
    test("cargo Paralegal | Non attorney aparece no topo e no rodape", async ({ page }) => {
      await page.goto(`/${locale}`);

      await expect(page.getByRole("banner").getByText(role)).toBeVisible();
      await expect(page.getByRole("contentinfo").getByText(role)).toBeVisible();
    });

    test("rodape mostra disclaimers e Attorney Advertising no idioma da rota", async ({ page }) => {
      await page.goto(`/${locale}`);
      const footer = page.getByRole("contentinfo");
      const { disclaimerRole, disclaimerInfo, attorneyAdvertising } = dictionaries[locale].footer;

      await expect(footer.getByText(disclaimerRole)).toBeVisible();
      await expect(footer.getByText(disclaimerInfo)).toBeVisible();
      await expect(footer.getByText(attorneyAdvertising)).toBeVisible();
    });
  });
}
