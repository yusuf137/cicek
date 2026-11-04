"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SOFT_EASE, TIMELINE } from "@/lib/flowers";

export function SiteFooter() {
  const reduced = useSafeReducedMotion();

  return (
    <motion.footer
      className="pointer-events-none absolute inset-x-0 bottom-[max(0.85rem,env(safe-area-inset-bottom))] z-40 text-center"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 1, delay: TIMELINE.footerDelay, ease: SOFT_EASE }
      }
    >
      <p className="garden-footer-pill inline-block rounded-full px-3 py-1 text-xs tracking-wide backdrop-blur-[2px] sm:text-sm">
        Bu sayfa sevgiyle hazırlandı.
      </p>
    </motion.footer>
  );
}
