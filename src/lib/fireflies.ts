/**
 * Ateş böceği yolları sabittir.
 * Sunucu ve istemci aynı rotaları üretir; render sırasında rastgele sayı yok.
 * İlk 8 tanesi telefonda da görünür, son 6 tanesi yalnızca geniş ekranda.
 */

type Path = {
  x: readonly [number, number, number, number];
  y: readonly [number, number, number, number];
  duration: number;
  delay: number;
  glow: number;
  glowDelay: number;
  size: number;
  desktop?: boolean;
};

const PATHS: readonly Path[] = [
  { x: [6, 16, 5, 13], y: [34, 56, 78, 44], duration: 18, delay: -2, glow: 2.4, glowDelay: 0, size: 6 },
  { x: [14, 4, 18, 8], y: [76, 52, 30, 64], duration: 22, delay: -7, glow: 3.2, glowDelay: 0.8, size: 5 },
  { x: [8, 20, 7, 15], y: [40, 32, 62, 48], duration: 16, delay: -11, glow: 2.7, glowDelay: 1.5, size: 7 },
  { x: [90, 80, 95, 84], y: [28, 50, 74, 40], duration: 24, delay: -4, glow: 3.6, glowDelay: 0.3, size: 5 },
  { x: [84, 96, 78, 88], y: [78, 54, 32, 68], duration: 19, delay: -9, glow: 2.2, glowDelay: 1.9, size: 6 },
  { x: [93, 82, 97, 86], y: [46, 60, 34, 72], duration: 26, delay: -6, glow: 4.1, glowDelay: 0.6, size: 4 },
  { x: [24, 42, 60, 34], y: [11, 17, 9, 15], duration: 21, delay: -13, glow: 3.3, glowDelay: 2.1, size: 5 },
  { x: [76, 58, 40, 68], y: [16, 8, 18, 12], duration: 17, delay: -3, glow: 2.6, glowDelay: 1.1, size: 6 },
  { x: [10, 24, 8, 18], y: [70, 88, 76, 62], duration: 23, delay: -8, glow: 3.8, glowDelay: 0.4, size: 7, desktop: true },
  { x: [90, 74, 94, 80], y: [68, 86, 74, 60], duration: 20, delay: -15, glow: 2.9, glowDelay: 1.7, size: 5, desktop: true },
  { x: [4, 18, 9, 14], y: [22, 42, 58, 30], duration: 25, delay: -5, glow: 4.2, glowDelay: 2.4, size: 6, desktop: true },
  { x: [96, 82, 92, 76], y: [22, 40, 58, 28], duration: 15, delay: -12, glow: 2.5, glowDelay: 0.9, size: 4, desktop: true },
  { x: [32, 50, 70, 46], y: [7, 14, 6, 11], duration: 27, delay: -10, glow: 3.4, glowDelay: 1.3, size: 5, desktop: true },
  { x: [18, 28, 12, 22], y: [86, 78, 92, 82], duration: 18, delay: -16, glow: 3, glowDelay: 2, size: 6, desktop: true },
];

export type Firefly = {
  id: string;
  x0: string;
  y0: string;
  dx1: string;
  dy1: string;
  dx2: string;
  dy2: string;
  dx3: string;
  dy3: string;
  duration: string;
  delay: string;
  glow: string;
  glowDelay: string;
  size: string;
  desktop: boolean;
};

function shift(from: number, to: number, unit: "vw" | "vh") {
  const delta = Math.round((to - from) * 10) / 10;
  return `${delta}${unit}`;
}

export const FIREFLIES: readonly Firefly[] = PATHS.map((path, index) => ({
  id: `firefly-${index}`,
  x0: `${path.x[0]}vw`,
  y0: `${path.y[0]}vh`,
  dx1: shift(path.x[0], path.x[1], "vw"),
  dy1: shift(path.y[0], path.y[1], "vh"),
  dx2: shift(path.x[0], path.x[2], "vw"),
  dy2: shift(path.y[0], path.y[2], "vh"),
  dx3: shift(path.x[0], path.x[3], "vw"),
  dy3: shift(path.y[0], path.y[3], "vh"),
  duration: `${path.duration}s`,
  delay: `${path.delay}s`,
  glow: `${path.glow}s`,
  glowDelay: `${path.glowDelay}s`,
  size: `${path.size}px`,
  desktop: path.desktop === true,
}));
