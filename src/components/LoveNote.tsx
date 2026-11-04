"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SOFT_EASE, TIMELINE } from "@/lib/flowers";

/** Köşeye bırakılmış küçük bir not. */
export function LoveNote() {
  const reduced = useSafeReducedMotion();

  return (
    <motion.aside
      className="garden-note pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[max(0.75rem,env(safe-area-inset-top))] z-40 w-max max-w-[calc(100vw-5.75rem)] -rotate-2 rounded-2xl border px-4 py-3 shadow-[0_10px_28px_rgba(120,80,80,0.08)] backdrop-blur-sm"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 1, delay: TIMELINE.noteDelay, ease: SOFT_EASE }
      }
    >
      <span className="garden-line mb-1.5 block h-px w-8" aria-hidden />
      <p className="garden-note-ink font-serif text-[1.15rem] italic leading-snug min-[380px]:text-[1.3rem] sm:text-[1.45rem]">
        İyi ki varsın ❤️
      </p>
    </motion.aside>
  );
}
