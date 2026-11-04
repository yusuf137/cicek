import { STARS } from "@/lib/stars";

/**
 * Gece katmanı. Görünürlüğü yalnızca opaklıkla değişir;
 * çiçek ağacına dokunmaz, bu yüzden konumlar korunur.
 */
export function NightSky() {
  return (
    <div className="night-sky pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {STARS.map((star, index) => (
        <span
          key={`${star.left}-${star.top}`}
          className={star.desktop ? "star hidden sm:block" : "star"}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: `${((index * 0.53) % 4.6).toFixed(2)}s`,
            animationDuration: `${(3.2 + (index % 5) * 0.48).toFixed(2)}s`,
          }}
        />
      ))}
      <div className="moon-anchor moon-glyph">
        <span className="moon-halo" />
        <svg viewBox="0 0 64 64" className="relative h-full w-full">
          <defs>
            <mask id="night-crescent">
              <rect width="64" height="64" fill="black" />
              <circle cx="30" cy="32" r="16" fill="white" />
              <circle cx="39" cy="27" r="13.5" fill="black" />
            </mask>
          </defs>
          <circle cx="30" cy="32" r="16" fill="#f4ecd8" mask="url(#night-crescent)" />
        </svg>
      </div>
    </div>
  );
}
