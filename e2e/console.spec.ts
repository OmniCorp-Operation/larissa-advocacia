import { expect, test } from "@playwright/test";
import { collectConsoleErrors } from "./helpers";
import { dictionaries, locales } from "./locales";

const themes = ["light", "dark"] as const;

for (const locale of locales) {
  for (const theme of themes) {
    test(`/${locale} no tema ${theme} nao gera erros nem aviso de script tag no console`, async ({
      page,
    }) => {
      const messages: string[] = [];
      page.on("console", (message) => messages.push(message.text()));
      const errors = collectConsoleErrors(page);
      await page.addInitScript((value) => localStorage.setItem("theme", value), theme);

      await page.goto(`/${locale}`);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        dictionaries[locale].hero.headlineMain,
      );
      await page.getByRole("contentinfo").scrollIntoViewIfNeeded();

      await expect(page.locator("html")).toHaveClass(theme === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b)/);
      expect(errors).toEqual([]);
      expect(messages.filter((text) => text.includes("Encountered a script tag"))).toEqual([]);
    });
  }
}
