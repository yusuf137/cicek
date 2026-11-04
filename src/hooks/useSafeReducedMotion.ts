"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function snapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Sunucuda ve hidrasyonda false döner, sonra gerçek tercihi okur.
 * Böylece hareket azaltma ağacı sunucuyla çelişmez.
 */
export function useSafeReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
