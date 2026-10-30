import { useEffect, useState } from "react";
import { sectionIds, type SectionId } from "@/config/sections";

const readingLineMargin = "-40% 0px -55% 0px";

export function useActiveSection(): SectionId | null {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = sectionIds.find((sectionId) => sectionId === entry.target.id);
          if (entry.isIntersecting && id) setActiveSection(id);
        }
      },
      { rootMargin: readingLineMargin },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
