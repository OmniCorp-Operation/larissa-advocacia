import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type BermanWordmarkProps = {
  className?: string;
};

// TODO: trocar pelo logo oficial quando a Berman Law Group autorizar o uso
export function BermanWordmark({ className }: BermanWordmarkProps) {
  return (
    <span className={cn("inline-flex flex-col font-display leading-none", className)}>
      <span className="sr-only">{site.brand}</span>
      <span aria-hidden="true" className="text-3xl font-semibold tracking-[0.22em]">
        BERMAN
      </span>
      <span aria-hidden="true" className="mt-1.5 text-sm font-medium tracking-[0.62em]">
        LAW GROUP
      </span>
    </span>
  );
}
