type ThemeToggleProps = {
  night: boolean;
  onToggle: () => void;
};

/** Sağ üstte, safe-area içinde duran gündüz/gece düğmesi. */
export function ThemeToggle({ night, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={night}
      aria-label={night ? "Gündüz moduna geç" : "Gece moduna geç"}
      className="theme-toggle absolute right-[max(0.7rem,env(safe-area-inset-right))] top-[max(0.7rem,env(safe-area-inset-top))] z-50 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08948] focus-visible:ring-offset-2"
    >
      <span className="relative block h-5 w-5" aria-hidden>
        <SunIcon className={night ? "theme-icon is-hidden" : "theme-icon is-shown"} />
        <MoonIcon className={night ? "theme-icon is-shown" : "theme-icon is-hidden"} />
      </span>
    </button>
  );
}

function SunIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute inset-0 h-5 w-5 ${className}`}>
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M18.4 5.6l-1.5 1.5M7.1 16.9l-1.5 1.5" />
      </g>
    </svg>
  );
}

function MoonIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute inset-0 h-5 w-5 ${className}`}>
      <path
        d="M15.2 3.6a7.2 7.2 0 1 0 5.4 11.6A6.3 6.3 0 0 1 15.2 3.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
