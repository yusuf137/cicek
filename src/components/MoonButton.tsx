type MoonButtonProps = {
  night: boolean;
  onWish: () => void;
};

/**
 * Görünen ay gece katmanında kalır.
 * Bu düğme aynı yerde, yalnızca gece tıklanabilir olan saydam alandır.
 */
export function MoonButton({ night, onWish }: MoonButtonProps) {
  return (
    <button
      type="button"
      className="moon-anchor moon-button touch-manipulation rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4ecd8]/80"
      aria-label="Bir dilek tut"
      aria-hidden={night ? undefined : true}
      tabIndex={night ? 0 : -1}
      onClick={onWish}
    />
  );
}
