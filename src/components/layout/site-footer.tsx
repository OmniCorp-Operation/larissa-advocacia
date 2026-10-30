import { getTranslations } from "next-intl/server";
import { BermanWordmark } from "@/components/shared/berman-wordmark";
import { site } from "@/config/site";

export async function SiteFooter() {
  const [contact, footer] = await Promise.all([
    getTranslations("contact"),
    getTranslations("footer"),
  ]);

  return (
    <footer className="bg-brand-deep text-brand-deep-foreground">
      <div aria-hidden="true" className="road-dash-x h-1.5 text-lilac/40" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-24 lg:px-12">
        <div>
          <p className="font-soft font-display text-5xl font-medium leading-none tracking-tight">
            {site.name}
          </p>
          <p className="mt-4 font-bold text-brand-deep-foreground/90">{site.role}</p>
          <BermanWordmark className="mt-10" />
          <p className="mt-4 text-sm text-brand-deep-foreground/80">{contact("office")}</p>
        </div>
        <div className="max-w-prose space-y-4 text-sm leading-relaxed text-brand-deep-foreground/80">
          <p>{footer("disclaimerRole")}</p>
          <p>{footer("disclaimerInfo")}</p>
          <p className="font-bold text-brand-deep-foreground">{footer("attorneyAdvertising")}</p>
        </div>
      </div>
    </footer>
  );
}
