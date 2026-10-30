import { expect, test } from "@playwright/test";
import { collectConsoleErrors } from "./helpers";

test.use({ colorScheme: "light", viewport: { width: 1280, height: 800 } });

test("toggle alterna para o tema escuro e volta ao claro", async ({ page }) => {
  await page.goto("/pt");
  const html = page.locator("html");
  const toggle = page.getByTestId("theme-toggle");

  await expect(html).not.toHaveClass(/\bdark\b/);
  await toggle.click();
  await expect(html).toHaveClass(/\bdark\b/);
  await toggle.click();
  await expect(html).not.toHaveClass(/\bdark\b/);
});

test("escolha do tema persiste em localStorage e apos reload sem erro de console", async ({
  page,
}) => {
  const errors = collectConsoleErrors(page);
  await page.goto("/pt");

  await page.getByTestId("theme-toggle").click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

  await page.reload();

  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  expect(errors).toEqual([]);
});

test("sem escolha salva o tema segue o sistema", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/pt");

  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
});
