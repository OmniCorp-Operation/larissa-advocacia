import { getTranslations } from "next-intl/server";
import { stepIds } from "@/config/steps";
import { HowSteps } from "./how-steps";

export async function HowItWorks() {
  const t = await getTranslations("how");
  const steps = stepIds.map((id) => ({
    id,
    title: t(`steps.${id}.title`),
    text: t(`steps.${id}.text`),
  }));

  return (
    <section id="how" aria-labelledby="how-title" className="py-24 lg:py-32">
      <HowSteps steps={steps}>
        <h2
          id="how-title"
          className="font-soft text-balance font-display text-5xl font-medium leading-[1.02] tracking-tight text-primary sm:text-6xl"
        >
          {t("title")}
        </h2>
        <p className="mt-5 max-w-sm text-lg text-muted-foreground">{t("intro")}</p>
      </HowSteps>
    </section>
  );
}
