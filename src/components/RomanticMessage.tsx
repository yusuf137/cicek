"use client";

import { motion } from "framer-motion";
import { Chrysanthemum } from "@/components/Chrysanthemum";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SOFT_EASE, TIMELINE } from "@/lib/flowers";

type RomanticMessageProps = {
  onPlant: () => void;
  planted: number;
};

const COPY = `Her çiçek, sana olan sevgimin küçük bir parçası gibi…
Bu sayfa senin için, sadece senin için açıyor. 🌼`;

/**
 * Sayfanın cümlesi. Yazılar açılışta alttan yükselir;
 * buton her basışta bahçeye bir kasımpatı daha bırakır.
 */
export function RomanticMessage({ onPlant, planted }: RomanticMessageProps) {
  const reduced = useSafeReducedMotion();

  const enter = (order: number) =>
    reduced
      ? { duration: 0 }
      : {
          duration: TIMELINE.textDuration,
          delay: TIMELINE.textDelay + order * 0.16,
          ease: SOFT_EASE,
        };

  return (
    <section
      className="pointer-events-auto relative w-full max-w-xl text-center"
      aria-labelledby="garden-title"
    >
      <div
        aria-hidden
        className="day-veil pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[130%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <div
        aria-hidden
        className="night-veil pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[130%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      <motion.div
        className="mb-5 flex items-center justify-center gap-3"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(0)}
      >
        <span className="garden-line h-px w-8 sm:w-12" aria-hidden />
        <Chrysanthemum
          variant="rose"
          density="compact"
          settled
          className="w-11 sm:w-12"
        />
        <span className="garden-line h-px w-8 sm:w-12" aria-hidden />
      </motion.div>

      <motion.h1
        id="garden-title"
        className="garden-ink text-balance font-serif text-[clamp(1.85rem,4.8vw,3.45rem)] font-medium leading-[1.18] tracking-tight"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(1)}
      >
        Sana hiç solmayacak bir bahçe hazırladım.
      </motion.h1>

      <motion.p
        className="garden-ink-soft text-pretty mx-auto mt-5 max-w-md whitespace-pre-line text-[clamp(0.98rem,2.3vw,1.18rem)] font-light leading-relaxed"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(2)}
      >
        {COPY}
      </motion.p>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(3)}
      >
        <motion.button
          type="button"
          onClick={onPlant}
          whileHover={reduced ? undefined : { y: -2, scale: 1.03 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="mt-8 inline-flex min-h-12 max-w-full touch-manipulation items-center justify-center rounded-full bg-[#7a3e4e] px-5 py-3 text-[0.95rem] font-medium tracking-wide text-[#fffaf6] shadow-[0_12px_28px_rgba(122,62,78,0.22)] transition-colors duration-300 hover:bg-[#693444] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08948] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf6f1] sm:px-7 sm:text-[0.98rem]"
        >
          Senin için bir çiçek daha
        </motion.button>
      </motion.div>

      <p className="sr-only" aria-live="polite">
        {planted > 0 ? `Bahçeye ${planted} yeni çiçek eklendi.` : ""}
      </p>
    </section>
  );
}
