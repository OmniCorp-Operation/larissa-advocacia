"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeaderShellProps = {
  children: ReactNode;
};

const solidAfterPx = 24;

export function HeaderShell({ children }: HeaderShellProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const [isSolid, setIsSolid] = useState(false);
  const readingProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (value) => setIsSolid(value > solidAfterPx));

  return (
    <header
      data-solid={isSolid}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        isSolid
          ? "bg-background/80 shadow-[0_1px_0_var(--border)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      {children}
      <motion.div
        aria-hidden="true"
        data-testid="reading-progress"
        style={{ scaleX: readingProgress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
      />
    </header>
  );
}
