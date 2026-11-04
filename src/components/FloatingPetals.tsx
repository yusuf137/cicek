"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { TIMELINE } from "@/lib/flowers";

type Drifter = {
  left: string;
  top: string;
  delay: number;
  duration: number;
  drift: number;
  size: number;
  opacity: number;
  spin: number;
  kind: "petal" | "heart";
  fill: string;
};

/**
 * Ekranda yer değiştiren yağmur değil, olduğun yerde usulca süzülen parçacıklar.
 * Konumlar sabittir; sunucu ve istemci aynı resmi çizer.
 */
const DRIFTERS: Drifter[] = [
  { left: "7%", top: "24%", delay: 0, duration: 15, drift: 16, size: 18, opacity: 0.42, spin: 16, kind: "petal", fill: "#f0c4ce" },
  { left: "16%", top: "58%", delay: 1.1, duration: 17, drift: -14, size: 14, opacity: 0.34, spin: -12, kind: "petal", fill: "#f6d7c8" },
  { left: "28%", top: "78%", delay: 0.4, duration: 16, drift: 12, size: 12, opacity: 0.3, spin: 10, kind: "heart", fill: "#e7b4c2" },
  { left: "78%", top: "22%", delay: 0.8, duration: 14.5, drift: -16, size: 16, opacity: 0.38, spin: 14, kind: "petal", fill: "#f3d3c4" },
  { left: "88%", top: "48%", delay: 1.6, duration: 16.5, drift: 13, size: 15, opacity: 0.36, spin: -15, kind: "petal", fill: "#efc2cc" },
  { left: "84%", top: "74%", delay: 0.2, duration: 15.5, drift: -11, size: 13, opacity: 0.32, spin: 11, kind: "heart", fill: "#e8b7c4" },
  { left: "12%", top: "82%", delay: 1.4, duration: 18, drift: 15, size: 17, opacity: 0.34, spin: -10, kind: "petal", fill: "#f7e0d2" },
  { left: "70%", top: "84%", delay: 0.6, duration: 16, drift: -13, size: 14, opacity: 0.3, spin: 12, kind: "petal", fill: "#f0c9d3" },
  { left: "46%", top: "12%", delay: 1.8, duration: 15, drift: 10, size: 12, opacity: 0.28, spin: -8, kind: "petal", fill: "#f6dccb" },
  { left: "62%", top: "68%", delay: 1.2, duration: 17.5, drift: 9, size: 11, opacity: 0.26, spin: 9, kind: "heart", fill: "#eab8c6" },
];

export function FloatingPetals() {
  const reduced = useSafeReducedMotion();
  if (reduced) return null;

  return (
    <div className="petal-layer pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      {DRIFTERS.map((item, index) => (
        <motion.span
          key={index}
          className="absolute"
          style={{ left: item.left, top: item.top, width: item.size, height: item.size }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, item.opacity, item.opacity * 0.85, 0],
            x: [0, item.drift, item.drift * -0.4, item.drift * 0.55, 0],
            y: [0, -12, 7, -9, 0],
            rotate: [0, item.spin, item.spin * -0.35, item.spin * 0.6, 0],
          }}
          transition={{
            duration: item.duration,
            delay: TIMELINE.driftDelay + item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.kind === "heart" ? <DriftHeart fill={item.fill} /> : <DriftPetal fill={item.fill} />}
        </motion.span>
      ))}
    </div>
  );
}

function DriftPetal({ fill }: { fill: string }) {
  return (
    <svg viewBox="-12 -28 24 34" className="h-full w-full">
      <path
        d="M0 2 C 5 0 8 -10 6 -20 Q 0 -26 -6 -20 C -8 -10 -5 0 0 2 Z"
        fill={fill}
      />
    </svg>
  );
}

function DriftHeart({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path
        d="M12 20.2s-6.4-4-8.8-7.7C1.4 9.8 2.6 6.4 5.6 6.4c1.7 0 2.8.9 3.6 2C10.1 7.3 11.2 6.4 12.9 6.4c3 0 4.2 3.4 2.6 6.1-2.4 3.7-3.5 7.7-3.5 7.7z"
        fill={fill}
      />
    </svg>
  );
}
