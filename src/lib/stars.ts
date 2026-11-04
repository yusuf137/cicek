/**
 * Yıldız konumları sabittir.
 * Sunucu ve istemci aynı gökyüzünü çizer; render sırasında Math.random() yok.
 * `desktop` olanlar yalnızca sm ve üzerinde görünür.
 */
export type Star = {
  left: string;
  top: string;
  size: number;
  desktop?: boolean;
};

export const STARS: Star[] = [
  { left: "7%", top: "9%", size: 2 },
  { left: "18%", top: "15%", size: 1.5 },
  { left: "31%", top: "7%", size: 2.5 },
  { left: "44%", top: "13%", size: 1.5 },
  { left: "62%", top: "8%", size: 2 },
  { left: "76%", top: "16%", size: 3 },
  { left: "89%", top: "10%", size: 2 },
  { left: "11%", top: "30%", size: 2 },
  { left: "84%", top: "33%", size: 1.5 },
  { left: "6%", top: "47%", size: 2.5 },
  { left: "92%", top: "51%", size: 2 },
  { left: "16%", top: "68%", size: 1.5 },
  { left: "73%", top: "74%", size: 2 },
  { left: "48%", top: "90%", size: 2.5 },
  { left: "27%", top: "22%", size: 2, desktop: true },
  { left: "53%", top: "11%", size: 1.5, desktop: true },
  { left: "36%", top: "38%", size: 2, desktop: true },
  { left: "68%", top: "28%", size: 1.5, desktop: true },
  { left: "21%", top: "54%", size: 2.5, desktop: true },
  { left: "58%", top: "48%", size: 1.5, desktop: true },
  { left: "81%", top: "62%", size: 3, desktop: true },
  { left: "39%", top: "66%", size: 2, desktop: true },
  { left: "94%", top: "27%", size: 2, desktop: true },
  { left: "4%", top: "78%", size: 1.5, desktop: true },
  { left: "64%", top: "84%", size: 2, desktop: true },
  { left: "28%", top: "86%", size: 1.5, desktop: true },
  { left: "87%", top: "82%", size: 2.5, desktop: true },
  { left: "51%", top: "34%", size: 1.5, desktop: true },
];
