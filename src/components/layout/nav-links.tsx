"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import type { NavSectionId } from "@/config/sections";
import { cn } from "@/lib/utils";

type NavLink = {
  id: NavSectionId;
  label: string;
};

type NavLinksProps = {
  label: string;
  links: NavLink[];
  className?: string;
};

export function NavLinks({ label, links, className }: NavLinksProps) {
  const activeSection = useActiveSection();

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-1">
        {links.map(({ id, label: linkLabel }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-bold text-foreground/80 transition-colors hover:text-primary",
                activeSection === id && "text-primary",
              )}
            >
              {linkLabel}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300",
                  activeSection === id && "scale-x-100",
                )}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
