import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

const narrowViewportQuery = "(max-width: 767px)";
const narrowViewportStrength = 0.55;

function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(narrowViewportQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(narrowViewportQuery).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useParallaxStrength(): number {
  const prefersReducedMotion = useReducedMotion();
  const isNarrowViewport = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (prefersReducedMotion) return 0;
  return isNarrowViewport ? narrowViewportStrength : 1;
}
