"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SOFT_EASE } from "@/lib/flowers";

type MoonWishProps = {
  show: boolean;
};

/** Aya dokununca altta beliren kısa dilek cümlesi. */
export function MoonWish({ show }: MoonWishProps) {
  const reduced = useSafeReducedMotion();

  return (
    <AnimatePresence>
      {show ? (
        <motion.p
          key="moon-wish"
          role="status"
          className="pointer-events-none absolute inset-x-0 z-50 mx-auto max-w-[18.5rem] px-4 text-balance text-center font-serif text-[clamp(1.02rem,3.8vw,1.35rem)] italic leading-snug text-[#f6ebef] min-[380px]:max-w-md"
          style={{
            bottom: "max(3.5rem, calc(env(safe-area-inset-bottom) + 2.8rem))",
            textShadow: "0 2px 16px rgba(8, 6, 20, 0.55)",
          }}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : 6 }}
          transition={{ duration: reduced ? 0.2 : 0.8, ease: SOFT_EASE }}
        >
          Bir dilek tut… Benimki zaten gerçekleşti. ❤️
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
