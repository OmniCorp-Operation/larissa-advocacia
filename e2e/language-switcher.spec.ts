import { expect, test } from "@playwright/test";
import { dictionaries } from "./locales";

test.describe("dropdown em 1280px", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("opcoes so aparecem depois de abrir e a atual tem aria-current", async ({ page }) => {
    await page.goto("/es");
    const trigger = page.getByTestId("language-switcher");

    await expect(page.getByTestId("language-option-en")).toHaveCount(0);
    await trigger.click();

    await expect(page.getByTestId("language-option-es")).toHaveAttribute("aria-current", "page");
    await expect(page.getByTestId("language-option-pt")).not.toHaveAttribute("aria-current");
    await expect(page.getByTestId("language-option-en")).not.toHaveAttribute("aria-current");
  });

  test("o botao expoe o nome acessivel do idioma", async ({ page }) => {
    await page.goto("/pt");

    await expect(page.getByTestId("language-switcher")).toHaveAccessibleName(
      dictionaries.pt.common.languageSwitcherLabel,
    );
  });

  test("escolher EN troca para a rota /en no idioma ingles", async ({ page }) => {
    await page.goto("/pt");

    await page.getByTestId("language-switcher").click();
    await page.getByTestId("language-option-en").click();

    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      dictionaries.en.hero.headlineMain,
    );
  });

  test("trocar de idioma na secao de contato preserva a ancora", async ({ page }) => {
    await page.goto("/pt");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    await page.getByTestId("language-switcher").click();
    const spanish = page.getByTestId("language-option-es");
    await expect(spanish).toHaveAttribute("href", "/es#contact");
    await spanish.click();

    await expect(page).toHaveURL(/\/es#contact$/);
  });
});

test.describe("sheet em 375px", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("o seletor do dropdown fica oculto e a troca acontece no sheet", async ({ page }) => {
    await page.goto("/pt");
    await expect(page.getByTestId("language-switcher")).toBeHidden();

    await page.getByTestId("mobile-menu-trigger").click();
    const menu = page.getByTestId("mobile-menu");

    await expect(menu.getByRole("link", { name: /Português/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(menu.getByRole("link", { name: /English/ })).not.toHaveAttribute("aria-current");
  });

  test("escolher Espanol no sheet troca para /es e fecha o menu", async ({ page }) => {
    await page.goto("/pt");

    await page.getByTestId("mobile-menu-trigger").click();
    await page.getByTestId("mobile-menu").getByRole("link", { name: /Español/ }).click();

    await expect(page).toHaveURL(/\/es$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByTestId("mobile-menu")).toBeHidden();
  });
});
