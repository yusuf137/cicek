"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SOFT_EASE } from "@/lib/flowers";

type NightWhisperProps = {
  show: boolean;
};

/** Geceye geçince altta kısa süre görünen cümle. */
export function NightWhisper({ show }: NightWhisperProps) {
  const reduced = useSafeReducedMotion();

  return (
    <AnimatePresence>
      {show ? (
        <motion.p
          key="night-whisper"
          className="pointer-events-none absolute inset-x-0 z-50 px-5 text-center font-serif text-[clamp(1.02rem,3.6vw,1.35rem)] italic leading-snug text-[#f6ebef]"
          style={{
            bottom: "max(3.5rem, calc(env(safe-area-inset-bottom) + 2.8rem))",
            textShadow: "0 2px 16px rgba(8, 6, 20, 0.55)",
          }}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : 8 }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: SOFT_EASE }}
        >
          Gündüzüm de sensin, gecem de… ❤️
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
