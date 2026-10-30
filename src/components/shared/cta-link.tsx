"use client";

import type { VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLinkProps = HTMLMotionProps<"a"> & VariantProps<typeof buttonVariants>;

export function CtaLink({ variant, size, className, ...props }: CtaLinkProps) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={cn(
        buttonVariants({ variant, size }),
        variant === undefined || variant === "default" ? "cta-shine" : "",
        className,
      )}
      {...props}
    />
  );
}
