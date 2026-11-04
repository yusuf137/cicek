"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  INITIAL_FLOWERS,
  MAX_BLOOMS,
  pickBloom,
  type GardenFlower,
} from "@/lib/flowers";

/**
 * Butonun eklediği çiçekler burada durur.
 * Açılıştaki çiçekler sabit listededir; state yalnızca yenilerini tutar.
 */
export function useGarden() {
  const [blooms, setBlooms] = useState<GardenFlower[]>([]);
  const compactRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => {
      compactRef.current = media.matches;
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const plantFlower = useCallback(() => {
    setBlooms((current) => {
      if (current.length >= MAX_BLOOMS) return current;
      const occupied = [...INITIAL_FLOWERS, ...current];
      return [...current, pickBloom(occupied, compactRef.current, current.length)];
    });
  }, []);

  return { blooms, plantFlower, planted: blooms.length };
}
