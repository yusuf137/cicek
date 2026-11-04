import type { CSSProperties } from "react";
import { FIREFLIES } from "@/lib/fireflies";

/**
 * Geceleyin çiçeklerin arasında dolaşan sıcak ışık noktaları.
 * Katman yazının altında durur ve tıklamaları geçirir.
 */
export function Fireflies() {
  return (
    <div className="firefly-layer pointer-events-none absolute inset-0 z-[15] overflow-hidden" aria-hidden>
      {FIREFLIES.map((firefly) => (
        <span
          key={firefly.id}
          className={firefly.desktop ? "firefly firefly-desktop hidden sm:block" : "firefly"}
          style={
            {
              left: firefly.x0,
              top: firefly.y0,
              animationDuration: firefly.duration,
              animationDelay: firefly.delay,
              "--dx1": firefly.dx1,
              "--dy1": firefly.dy1,
              "--dx2": firefly.dx2,
              "--dy2": firefly.dy2,
              "--dx3": firefly.dx3,
              "--dy3": firefly.dy3,
              "--size": firefly.size,
            } as CSSProperties
          }
        >
          <span
            className="firefly-glow"
            style={{
              animationDuration: firefly.glow,
              animationDelay: firefly.glowDelay,
            }}
          />
        </span>
      ))}
    </div>
  );
}
