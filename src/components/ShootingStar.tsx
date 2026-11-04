type ShootingStarProps = {
  /** 0 iken yıldız yoktur. Her yeni değer animasyonu baştan oynatır. */
  flight: number;
};

/** Üst bantta, sağ üstten sola doğru süzülen tek kayan yıldız. */
export function ShootingStar({ flight }: ShootingStarProps) {
  if (flight === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[24] h-[30vh] overflow-hidden"
      aria-hidden
    >
      <span key={flight} className="shooting-star">
        <span className="shooting-star-trail" />
        <span className="shooting-star-head" />
      </span>
    </div>
  );
}
