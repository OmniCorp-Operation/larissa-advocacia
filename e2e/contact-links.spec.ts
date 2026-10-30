import { expect, test } from "@playwright/test";
import { contact } from "../src/config/contact";
import { dictionaries, locales, whatsappUrl } from "./locales";

for (const locale of locales) {
  test.describe(`CTAs em /${locale}`, () => {
    test("WhatsApp usa o numero do config e a mensagem no idioma da rota", async ({ page }) => {
      await page.goto(`/${locale}`);
      const { hero, contact: copy } = dictionaries[locale];

      await expect(page.locator("#hero").getByRole("link", { name: hero.ctaWhatsapp })).toHaveAttribute(
        "href",
        whatsappUrl(locale),
      );
      await expect(page.locator("#contact").getByRole("link", { name: copy.whatsappCta })).toHaveAttribute(
        "href",
        whatsappUrl(locale),
      );
    });

    test("telefone e e-mail do hero apontam para tel: e mailto:", async ({ page }) => {
      await page.goto(`/${locale}`);
      const { hero } = dictionaries[locale];

      await expect(page.getByRole("link", { name: hero.ctaCall })).toHaveAttribute(
        "href",
        contact.officePhone.href,
      );
      await expect(page.getByRole("link", { name: hero.ctaEmail })).toHaveAttribute(
        "href",
        `mailto:${contact.email}`,
      );
    });
  });
}

test("WhatsApp abre em nova aba com rel seguro", async ({ page }) => {
  await page.goto("/pt");

  const cta = page.getByRole("link", { name: dictionaries.pt.hero.ctaWhatsapp });

  await expect(cta).toHaveAttribute("target", "_blank");
  await expect(cta).toHaveAttribute("rel", /noopener/);
});

test("cartao de contato mostra telefone, fax e e-mail", async ({ page }) => {
  await page.goto("/pt");

  await expect(
    page.getByRole("link", { name: new RegExp(contact.officePhone.display) }),
  ).toHaveAttribute("href", contact.officePhone.href);
  await expect(page.getByText(contact.fax)).toBeVisible();
  await expect(page.getByRole("link", { name: contact.email })).toHaveAttribute(
    "href",
    `mailto:${contact.email}`,
  );
});
