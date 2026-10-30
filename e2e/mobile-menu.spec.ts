import { expect, test } from "@playwright/test";
import { dictionaries } from "./locales";

test.use({ viewport: { width: 375, height: 812 } });

const { nav } = dictionaries.pt;

test("menu mobile abre pelo botao e fecha pelo botao Fechar menu", async ({ page }) => {
  await page.goto("/pt");
  const menu = page.getByTestId("mobile-menu");

  await expect(menu).toBeHidden();
  await page.getByTestId("mobile-menu-trigger").click();
  await expect(menu).toBeVisible();

  await menu.getByRole("button", { name: nav.closeMenu }).click();
  await expect(menu).toBeHidden();
});

test("menu mobile fecha com Escape", async ({ page }) => {
  await page.goto("/pt");

  await page.getByTestId("mobile-menu-trigger").click();
  await expect(page.getByTestId("mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(page.getByTestId("mobile-menu")).toBeHidden();
});

test("link do menu mobile leva a secao e fecha o menu", async ({ page }) => {
  await page.goto("/pt");

  await page.getByTestId("mobile-menu-trigger").click();
  await page.getByTestId("mobile-menu").getByRole("link", { name: nav.contact }).click();

  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByTestId("mobile-menu")).toBeHidden();
  await expect(page.locator("#contact")).toBeInViewport();
});
