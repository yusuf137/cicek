/**
 * Bahçenin zamanlaması ve çiçek yerleşimi.
 * Açılışı hızlandırmak veya yavaşlatmak için yalnızca bu sabitleri değiştirmek yeterli.
 */

export const TIMELINE = {
  /** Sahnenin yumuşak belirişi */
  sceneFade: 1.05,
  /** İlk tomurcuğun gecikmesi — fade bittikten hemen sonra */
  heroDelay: 1.35,
  heroDuration: 2.95,
  /** Çevredeki çiçeklerin ilkinin gecikmesi */
  sideStart: 3.55,
  sideStagger: 0.48,
  sideDuration: 2.15,
  textDelay: 3.85,
  textDuration: 1.2,
  noteDelay: 4.9,
  footerDelay: 5.3,
  driftDelay: 5.15,
  /** Butonla eklenen çiçeğin açılış süresi */
  freshDuration: 1.5,
} as const;

export const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

export type FlowerVariant = "blush" | "rose" | "cream" | "peach";

export type GardenFlower = {
  id: string;
  /** Tailwind ile verilen konum. Butonla eklenen çiçeklerde kullanılmaz. */
  positionClass?: string;
  /** Butonla eklenen çiçeklerin yüzde konumu */
  x?: number;
  y?: number;
  sizeClass?: string;
  /** Piksel cinsinden çap. Butonla eklenen çiçekler için. */
  size?: number;
  /** Diğer çiçeklerle çakışmayı önlemek için yaklaşık merkez (yüzde) */
  anchorX: number;
  anchorY: number;
  variant: FlowerVariant;
  delay: number;
  openDuration: number;
  /** 1 civarı yakın plan; küçüldükçe parallax azalır */
  depth: number;
  sway: number;
  tilt: number;
  baseRotate: number;
  withLeaves?: boolean;
  fresh?: boolean;
  /** Alt kenardan hizala; büyük hero çiçek ekranın dışında kesilmesin. */
  pinBottom?: boolean;
};

export const MAX_BLOOMS = 18;

const VARIANTS: FlowerVariant[] = ["blush", "rose", "cream", "peach"];

/** Açılış çiçeklerinin arasında kalan boşluklar. */
const SPAWN_ZONES = [
  { x0: 3, x1: 14, y0: 42, y1: 58 },
  { x0: 86, x1: 97, y0: 40, y1: 56 },
  { x0: 18, x1: 32, y0: 10, y1: 20 },
  { x0: 68, x1: 82, y0: 10, y1: 20 },
  { x0: 24, x1: 36, y0: 72, y1: 86 },
  { x0: 64, x1: 76, y0: 70, y1: 84 },
];

export const INITIAL_FLOWERS: GardenFlower[] = [
  {
    id: "hero",
    positionClass: "left-1/2 bottom-[4.5rem] sm:bottom-[5rem]",
    sizeClass: "w-[220px] sm:w-[300px] md:w-[360px]",
    anchorX: 50,
    anchorY: 78,
    pinBottom: true,
    variant: "blush",
    delay: TIMELINE.heroDelay,
    openDuration: TIMELINE.heroDuration,
    depth: 0.22,
    sway: 9.5,
    tilt: 1.15,
    baseRotate: -7,
    withLeaves: true,
  },
  {
    id: "upper-left",
    positionClass: "left-[7%] top-[18%] sm:left-[12%] sm:top-[27%]",
    sizeClass: "w-[92px] sm:w-[128px] md:w-[154px]",
    anchorX: 12,
    anchorY: 27,
    variant: "cream",
    delay: TIMELINE.sideStart,
    openDuration: TIMELINE.sideDuration,
    depth: 1.1,
    sway: 8.1,
    tilt: 2,
    baseRotate: 13,
  },
  {
    id: "upper-right",
    positionClass: "left-[93%] top-[16%] sm:left-[88%] sm:top-[23%]",
    sizeClass: "w-[84px] sm:w-[120px] md:w-[142px]",
    anchorX: 88,
    anchorY: 23,
    variant: "peach",
    delay: TIMELINE.sideStart + TIMELINE.sideStagger,
    openDuration: TIMELINE.sideDuration,
    depth: 0.92,
    sway: 7.6,
    tilt: 1.8,
    baseRotate: -12,
  },
  {
    id: "lower-left",
    positionClass: "left-[5%] top-[84%] sm:left-[14%] sm:top-[81%]",
    sizeClass: "w-[100px] sm:w-[146px] md:w-[176px]",
    anchorX: 14,
    anchorY: 81,
    variant: "rose",
    delay: TIMELINE.sideStart + TIMELINE.sideStagger * 2,
    openDuration: TIMELINE.sideDuration,
    depth: 0.74,
    sway: 8.7,
    tilt: 1.6,
    baseRotate: 11,
    withLeaves: true,
  },
  {
    id: "lower-right",
    positionClass: "left-[95%] top-[78%] sm:left-[86%] sm:top-[76%]",
    sizeClass: "w-[96px] sm:w-[140px] md:w-[168px]",
    anchorX: 86,
    anchorY: 76,
    variant: "blush",
    delay: TIMELINE.sideStart + TIMELINE.sideStagger * 3,
    openDuration: TIMELINE.sideDuration,
    depth: 1,
    sway: 8,
    tilt: 2.1,
    baseRotate: -9,
  },
  {
    id: "canopy",
    positionClass: "left-1/2 top-[8%] hidden sm:block",
    sizeClass: "sm:w-[108px] md:w-[128px]",
    anchorX: 50,
    anchorY: 8,
    variant: "cream",
    delay: TIMELINE.sideStart + TIMELINE.sideStagger * 4,
    openDuration: TIMELINE.sideDuration,
    depth: 1.28,
    sway: 9.2,
    tilt: 1.4,
    baseRotate: 6,
  },
];

function overlapsMessage(x: number, y: number, compact: boolean) {
  if (compact) return x > 16 && x < 84 && y > 30 && y < 74;
  return x > 27 && x < 73 && y > 34 && y < 70;
}

function distanceToNearest(
  x: number,
  y: number,
  occupied: Pick<GardenFlower, "anchorX" | "anchorY">[],
) {
  if (occupied.length === 0) return 100;
  return Math.min(
    ...occupied.map((flower) => Math.hypot(flower.anchorX - x, flower.anchorY - y)),
  );
}

/**
 * Buton her basıldığında metnin dışındaki bir bölgeye,
 * mevcut çiçeklerden olabildiğince uzağa yeni bir kasımpatı seçer.
 */
export function pickBloom(
  occupied: Pick<GardenFlower, "anchorX" | "anchorY">[],
  compact: boolean,
  index: number,
): GardenFlower {
  const zones = compact
    ? SPAWN_ZONES.filter((zone) => zone.y0 >= 18 && zone.y1 <= 86)
    : SPAWN_ZONES;
  const side = index % 2 === 0 ? "left" : "right";
  const sided = zones.filter((zone) => (side === "left" ? zone.x1 < 50 : zone.x0 > 50));
  const pool = sided.length > 0 ? sided : zones;

  let best = { x: pool[0].x0, y: pool[0].y0, dist: -1 };

  for (let attempt = 0; attempt < 28; attempt += 1) {
    const zone = pool[attempt % pool.length];
    const x = zone.x0 + Math.random() * (zone.x1 - zone.x0);
    const y = zone.y0 + Math.random() * (zone.y1 - zone.y0);
    if (overlapsMessage(x, y, compact)) continue;

    const dist = distanceToNearest(x, y, occupied);
    if (dist > best.dist) best = { x, y, dist };
    if (dist > 18) break;
  }

  return {
    id: `bloom-${index}-${Date.now()}`,
    x: best.x,
    y: best.y,
    anchorX: best.x,
    anchorY: best.y,
    size: compact ? 92 + Math.random() * 26 : 124 + Math.random() * 36,
    variant: VARIANTS[index % VARIANTS.length],
    delay: 0,
    openDuration: TIMELINE.freshDuration,
    depth: 0.7 + Math.random() * 0.5,
    sway: 7.2 + Math.random() * 2.6,
    tilt: 1.3 + Math.random() * 1,
    baseRotate: -16 + Math.random() * 32,
    withLeaves: index % 3 === 0,
    fresh: true,
  };
}
