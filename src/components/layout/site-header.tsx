import { getTranslations } from "next-intl/server";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { CtaLink } from "@/components/shared/cta-link";
import { navSectionIds } from "@/config/sections";
import { site } from "@/config/site";
import { buildWhatsappUrl } from "@/lib/contact-links";
import type { Locale } from "@/lib/i18n";
import { HeaderShell } from "./header-shell";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  locale: Locale;
};

export async function SiteHeader({ locale }: SiteHeaderProps) {
  const [t, common, root] = await Promise.all([
    getTranslations("nav"),
    getTranslations("common"),
    getTranslations(),
  ]);
  const links = navSectionIds.map((id) => ({ id, label: t(id) }));
  const whatsappHref = buildWhatsappUrl(root("whatsappMessage"));

  return (
    <HeaderShell>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <a href="#hero" className="mr-auto flex flex-col leading-none lg:mr-0">
          <span className="font-display text-[1.45rem] font-semibold tracking-tight text-primary sm:text-2xl">
            {site.name}
          </span>
          <span className="mt-1 text-[0.7rem] font-bold text-muted-foreground sm:text-xs">
            {site.role}
          </span>
        </a>

        <NavLinks label={t("label")} links={links} className="mx-auto hidden lg:block" />

        <ThemeToggle label={t("themeToggle")} />
        <div className="hidden lg:block">
          <LanguageSwitcher current={locale} label={common("languageSwitcherLabel")} />
        </div>
        <CtaLink
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="nav-whatsapp"
          className="ml-1 hidden h-10 gap-2 rounded-full px-5 text-sm font-bold lg:inline-flex"
        >
          <WhatsappIcon className="size-4" />
          {t("cta")}
          <span className="sr-only">{common("opensInNewTab")}</span>
        </CtaLink>
        <CtaLink
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="nav-whatsapp-compact"
          className="size-10 rounded-full p-0 lg:hidden"
        >
          <WhatsappIcon className="size-5" />
          <span className="sr-only">
            {t("cta")} {common("opensInNewTab")}
          </span>
        </CtaLink>
        <MobileMenu
          locale={locale}
          links={links}
          whatsappHref={whatsappHref}
          labels={{
            open: t("openMenu"),
            close: t("closeMenu"),
            title: t("menuTitle"),
            description: t("menuDescription"),
            navigation: t("label"),
            language: common("languageSwitcherLabel"),
            whatsapp: t("cta"),
            opensInNewTab: common("opensInNewTab"),
          }}
        />
      </div>
    </HeaderShell>
  );
}
