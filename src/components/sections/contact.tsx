import { Mail, Phone, Scale, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { Reveal } from "@/components/parallax/reveal";
import { BermanWordmark } from "@/components/shared/berman-wordmark";
import { CtaLink } from "@/components/shared/cta-link";
import { contact } from "@/config/contact";
import { buildWhatsappUrl, emailUrl, phoneUrl } from "@/lib/contact-links";

type ContactRowProps = {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
};

const linkClassName =
  "[overflow-wrap:anywhere] underline decoration-primary/30 decoration-2 underline-offset-8 transition-colors hover:decoration-primary";

function ContactRow({ icon: Icon, label, children }: ContactRowProps) {
  return (
    <li className="flex items-start gap-5 py-7 sm:gap-6 sm:py-8">
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-sm font-bold text-muted-foreground">{label}</p>
        <div className="mt-1 font-display text-2xl font-medium sm:text-3xl">{children}</div>
      </div>
    </li>
  );
}

export async function Contact() {
  const [t, common, root] = await Promise.all([
    getTranslations("contact"),
    getTranslations("common"),
    getTranslations(),
  ]);

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-16 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-24 lg:px-12">
        <div>
          <Reveal>
            <h2
              id="contact-title"
              className="font-soft text-balance font-display text-5xl font-medium leading-[1.02] tracking-tight text-primary sm:text-6xl"
            >
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">{t("intro")}</p>
            <CtaLink
              href={buildWhatsappUrl(root("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 h-14 w-full gap-3 rounded-full px-8 text-lg font-bold sm:w-auto"
            >
              <WhatsappIcon className="size-6" />
              {t("whatsappCta")}
              <span className="sr-only">{common("opensInNewTab")}</span>
            </CtaLink>
          </Reveal>

          <Reveal delay={0.15} className="mt-14">
            <div className="flex flex-col gap-10 rounded-[2rem] bg-brand-deep p-8 text-brand-deep-foreground sm:p-10">
              <BermanWordmark />
              <p className="text-lg font-semibold">{t("office")}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="divide-y divide-border border-y border-border lg:mt-3">
            <ContactRow icon={Phone} label={t("phoneLabel")}>
              <p className="font-sans text-sm font-bold text-muted-foreground">{t("officePrefix")}</p>
              <a href={phoneUrl} className={linkClassName}>
                {contact.officePhone.display}
              </a>
              <p className="mt-3 font-sans text-base font-semibold text-foreground/80">
                {t("faxPrefix")}: {contact.fax}
              </p>
            </ContactRow>
            <ContactRow icon={Mail} label={t("emailLabel")}>
              <a href={emailUrl} className={linkClassName}>
                {contact.email}
              </a>
            </ContactRow>
            <ContactRow icon={Scale} label={t("websiteLabel")}>
              <a
                href={contact.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                {contact.website.display}
                <span className="sr-only">{common("opensInNewTab")}</span>
              </a>
            </ContactRow>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
