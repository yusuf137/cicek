"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SOFT_EASE, type FlowerVariant } from "@/lib/flowers";

type Density = "full" | "compact";

/** Halka gecikmesini çiçeğin kendi süresine oranlamak için referans. */
const TIMELINE_BASE = 2.9;

type ChrysanthemumProps = {
  variant?: FlowerVariant;
  className?: string;
  /** Butonla gelen çiçeklerde piksel çapı */
  pixelSize?: number;
  delay?: number;
  openDuration?: number;
  /** Küçük arma: animasyonsuz, sade halkalar */
  settled?: boolean;
  density?: Density;
  /** Tıklamayla yeni açılan çiçek: kısa parıltı ve birkaç parçacık */
  fresh?: boolean;
  withLeaves?: boolean;
};

type Palette = {
  tip: string;
  mid: string;
  base: string;
  innerTip: string;
  innerMid: string;
  innerBase: string;
  center: string;
  centerDeep: string;
  glow: string;
};

const PALETTES: Record<FlowerVariant, Palette> = {
  blush: {
    tip: "#fff8f8",
    mid: "#f6cdd5",
    base: "#e39aab",
    innerTip: "#fff1f3",
    innerMid: "#f0b4c2",
    innerBase: "#d47890",
    center: "#f3d492",
    centerDeep: "#d9b15e",
    glow: "rgba(227, 154, 171, 0.62)",
  },
  rose: {
    tip: "#fff5f6",
    mid: "#f0b9c4",
    base: "#d9788e",
    innerTip: "#ffe8ec",
    innerMid: "#e79aab",
    innerBase: "#c45d76",
    center: "#f0cf88",
    centerDeep: "#d2aa58",
    glow: "rgba(212, 120, 140, 0.58)",
  },
  cream: {
    tip: "#fffaf6",
    mid: "#f6e3d2",
    base: "#e4c3a8",
    innerTip: "#fff8f2",
    innerMid: "#f0d2bc",
    innerBase: "#d7ae90",
    center: "#f2d592",
    centerDeep: "#dbb562",
    glow: "rgba(224, 190, 160, 0.58)",
  },
  peach: {
    tip: "#fff7f3",
    mid: "#f6d2c2",
    base: "#e7a88e",
    innerTip: "#fff1ea",
    innerMid: "#f0bea8",
    innerBase: "#d98b72",
    center: "#f1d08a",
    centerDeep: "#d7ae5c",
    glow: "rgba(230, 168, 140, 0.58)",
  },
};

type Ring = {
  count: number;
  length: number;
  width: number;
  offset: number;
  lag: number;
  tone: "outer" | "inner";
};

/** Dış halkalar daha geç açılır; tomurcuk içten dışa çözülür. */
const FULL_RINGS: Ring[] = [
  { count: 26, length: 44, width: 12.2, offset: 0, lag: 0.5, tone: "outer" },
  { count: 20, length: 34, width: 11, offset: 7, lag: 0.3, tone: "outer" },
  { count: 15, length: 24, width: 9.6, offset: 4, lag: 0.14, tone: "inner" },
  { count: 11, length: 15, width: 8.2, offset: 12, lag: 0, tone: "inner" },
];

const COMPACT_RINGS: Ring[] = [
  { count: 18, length: 42, width: 13, offset: 0, lag: 0.16, tone: "outer" },
  { count: 12, length: 26, width: 11, offset: 10, lag: 0, tone: "inner" },
];

/** Üstten bakılan, yuvarlak uçlu bir taç yaprağı. Taban nokta 0,0'dır. */
function petalPath(length: number, width: number) {
  const tip = -length;
  const shoulder = -length * 0.8;
  const mid = -length * 0.46;
  return [
    "M 0 0",
    `C ${width * 0.42} ${-length * 0.16}, ${width * 0.78} ${mid}, ${width * 0.4} ${shoulder}`,
    `Q 0 ${tip - length * 0.04}, ${-width * 0.4} ${shoulder}`,
    `C ${-width * 0.78} ${mid}, ${-width * 0.42} ${-length * 0.16}, 0 0`,
    "Z",
  ].join(" ");
}

function MumLeaves() {
  return (
    <g opacity="0.92">
      <path
        d="M0 2 C 9 0 16 -12 18 -28 C 11 -16 5 -4 0 1 Z"
        fill="#d5e4d2"
        transform="rotate(-34) translate(0 10)"
      />
      <path
        d="M0 3 C 8 1 15 -10 16 -24 C 10 -14 5 -3 0 2 Z"
        fill="#c9dbc8"
        transform="rotate(156) translate(0 8)"
      />
    </g>
  );
}

function TinyHeart() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 20.4s-6.6-4.1-9.1-8C1.1 9.6 2.4 6 5.7 6c1.8 0 3 .9 3.8 2.1C10.3 6.9 11.5 6 13.3 6c3.3 0 4.6 3.6 2.8 6.4-2.5 3.9-4.1 8-4.1 8z"
        fill="#e7a8b6"
      />
    </svg>
  );
}

const SPARKS = [
  { x: -20, y: -46, delay: 0.04, heart: true },
  { x: 18, y: -54, delay: 0.12, heart: true },
  { x: -6, y: -34, delay: 0, heart: false },
  { x: 24, y: -30, delay: 0.1, heart: false },
];

function BloomBurst({ glow }: { glow: string }) {
  return (
    <>
      <span className="pointer-events-none absolute inset-[-18%] flex items-center justify-center">
        <motion.span
          className="block h-full w-full rounded-full"
          style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 68%)` }}
          initial={{ scale: 0.35, opacity: 0.8 }}
          animate={{ scale: 1.55, opacity: 0 }}
          transition={{ duration: 1.25, ease: "easeOut" }}
        />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-1/2">
        {SPARKS.map((spark, index) => (
          <motion.span
            key={index}
            className="absolute left-0 top-0"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
            animate={{
              x: spark.x,
              y: spark.y,
              opacity: [0, 0.9, 0],
              scale: 1,
            }}
            transition={{ duration: 1.3, delay: spark.delay, ease: "easeOut" }}
          >
            {spark.heart ? (
              <TinyHeart />
            ) : (
              <span className="block h-2 w-2 rounded-full bg-[#f6c9d2]" />
            )}
          </motion.span>
        ))}
      </span>
    </>
  );
}

/**
 * Kasımpatı illüstrasyonu.
 * Dış kabuk tomurcuktan çiçeğe büyür; her taç halkası biraz gecikmeyle açılır.
 */
export function Chrysanthemum({
  variant = "blush",
  className = "",
  pixelSize,
  delay = 0,
  openDuration = 2.8,
  settled = false,
  density = "full",
  fresh = false,
  withLeaves = false,
}: ChrysanthemumProps) {
  const reduced = useSafeReducedMotion();
  const quiet = settled || reduced;
  const uid = `mum${useId().replace(/:/g, "")}`;
  const palette = PALETTES[variant];
  const rings = density === "compact" ? COMPACT_RINGS : FULL_RINGS;
  const lagScale = openDuration / TIMELINE_BASE;

  return (
    <div
      className={`relative aspect-square ${className}`}
      style={pixelSize ? { width: pixelSize } : undefined}
    >
      {/* Gece modunda ay ışığı. Gündüzde opaklık 0, açılış animasyonuna karışmaz. */}
      <span className="flower-glow" aria-hidden />
      {fresh && !reduced ? <BloomBurst glow={palette.glow} /> : null}
      <motion.div
        className="h-full w-full"
        initial={quiet ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          quiet
            ? { duration: 0 }
            : {
                scale: { duration: openDuration, delay, ease: SOFT_EASE },
                opacity: {
                  duration: fresh ? 0.35 : Math.min(0.9, openDuration * 0.34),
                  delay,
                  ease: "easeOut",
                },
              }
        }
      >
        <svg
          viewBox="-54 -54 108 108"
          className="h-full w-full overflow-visible drop-shadow-[0_14px_18px_rgba(168,110,120,0.16)]"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-outer`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.tip} />
              <stop offset="46%" stopColor={palette.mid} />
              <stop offset="100%" stopColor={palette.base} />
            </linearGradient>
            <linearGradient id={`${uid}-inner`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.innerTip} />
              <stop offset="52%" stopColor={palette.innerMid} />
              <stop offset="100%" stopColor={palette.innerBase} />
            </linearGradient>
          </defs>

          {withLeaves ? (
            <motion.g
              className="mum-ring"
              initial={quiet ? false : { scale: 0.46 }}
              animate={{ scale: 1 }}
              transition={
                quiet
                  ? { duration: 0 }
                  : { duration: openDuration * 0.8, delay, ease: SOFT_EASE }
              }
            >
              <MumLeaves />
            </motion.g>
          ) : null}

          {rings.map((ring, ringIndex) => {
            const path = petalPath(ring.length, ring.width);
            const fill = `url(#${uid}-${ring.tone})`;
            return (
              <motion.g
                key={ringIndex}
                className="mum-ring"
                initial={quiet ? false : { scale: 0.3, rotate: -14 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={
                  quiet
                    ? { duration: 0 }
                    : {
                        duration: openDuration * 0.74,
                        delay: delay + ring.lag * lagScale,
                        ease: SOFT_EASE,
                      }
                }
              >
                {Array.from({ length: ring.count }, (_, petalIndex) => {
                  const angle =
                    ring.offset +
                    (360 / ring.count) * petalIndex +
                    ((petalIndex % 5) - 2) * 0.7;
                  const stretch = 0.95 + ((petalIndex * 17) % 6) * 0.012;
                  return (
                    <path
                      key={petalIndex}
                      d={path}
                      fill={fill}
                      opacity={petalIndex % 2 === 0 ? 0.98 : 0.82}
                      transform={`rotate(${angle}) scale(${stretch})`}
                    />
                  );
                })}
              </motion.g>
            );
          })}

          <circle r="8" fill={palette.innerBase} opacity="0.28" />
          <circle r="5.4" fill={palette.center} />
          <circle r="2.5" fill={palette.centerDeep} />
          <circle r="1" fill="#fff8ea" />
        </svg>
      </motion.div>
    </div>
  );
}
