"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";
import { Chrysanthemum } from "@/components/Chrysanthemum";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { INITIAL_FLOWERS, type GardenFlower } from "@/lib/flowers";

type FlowerGardenProps = {
  extra: GardenFlower[];
};

/**
 * Açılış bahçesi ve butonla eklenen çiçekler.
 * İnce imleçte hafif bir parallax vardır; dokunmatikte yalnızca salınım kalır.
 */
export function FlowerGarden({ extra }: FlowerGardenProps) {
  const reduced = useSafeReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        pointerX.set((event.clientX / window.innerWidth - 0.5) * 20);
        pointerY.set((event.clientY / window.innerHeight - 0.5) * 14);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [pointerX, pointerY, reduced]);

  const flowers = [...INITIAL_FLOWERS, ...extra];

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
      {flowers.map((flower) => (
        <FlowerSprite
          key={flower.id}
          flower={flower}
          pointerX={pointerX}
          pointerY={pointerY}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

function FlowerSprite({
  flower,
  pointerX,
  pointerY,
  reduced,
}: {
  flower: GardenFlower;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduced: boolean;
}) {
  const shiftX = useTransform(pointerX, (value) => value * flower.depth);
  const shiftY = useTransform(pointerY, (value) => value * flower.depth);
  const position =
    flower.x != null && flower.y != null
      ? { left: `${flower.x}%`, top: `${flower.y}%` }
      : undefined;

  return (
    <div
      className={`pointer-events-auto absolute -translate-x-1/2 touch-manipulation ${flower.pinBottom ? "" : "-translate-y-1/2"} ${flower.fresh ? "z-20" : "z-10"} ${flower.positionClass ?? ""}`}
      style={position}
    >
      <motion.div style={{ x: shiftX, y: shiftY }}>
        <motion.div
          animate={
            reduced
              ? undefined
              : { rotate: [-flower.tilt, flower.tilt, -flower.tilt] }
          }
          transition={{
            duration: flower.sway,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="relative"
            tabIndex={-1}
            whileHover={reduced ? undefined : { scale: 1.06 }}
            whileTap={reduced ? undefined : { scale: 1.04 }}
            transition={{ type: "spring", stiffness: 170, damping: 16 }}
          >
            <span className="flower-spark flower-spark-a hidden sm:block" aria-hidden />
            <span className="flower-spark flower-spark-b hidden sm:block" aria-hidden />
            <div style={{ transform: `rotate(${flower.baseRotate}deg)` }}>
              <Chrysanthemum
                variant={flower.variant}
                className={flower.sizeClass ?? ""}
                pixelSize={flower.size}
                delay={flower.delay}
                openDuration={flower.openDuration}
                fresh={flower.fresh}
                withLeaves={flower.withLeaves}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
