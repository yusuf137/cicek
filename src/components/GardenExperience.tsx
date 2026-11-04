"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Fireflies } from "@/components/Fireflies";
import { FlowerGarden } from "@/components/FlowerGarden";
import { FloatingPetals } from "@/components/FloatingPetals";
import { LoveNote } from "@/components/LoveNote";
import { MoonButton } from "@/components/MoonButton";
import { MoonWish } from "@/components/MoonWish";
import { NightSky } from "@/components/NightSky";
import { NightWhisper } from "@/components/NightWhisper";
import { RomanticMessage } from "@/components/RomanticMessage";
import { ShootingStar } from "@/components/ShootingStar";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useGarden } from "@/hooks/useGarden";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { TIMELINE } from "@/lib/flowers";

type Theme = "day" | "night";

/**
 * Tek sayfalık sahne.
 * Tema state'i çiçek listesinden ayrıdır; geceye geçmek
 * ne açılış animasyonunu ne de kullanıcının ektiği çiçekleri sıfırlar.
 */
export function GardenExperience() {
  const reduced = useSafeReducedMotion();
  const { blooms, plantFlower, planted } = useGarden();
  const [theme, setTheme] = useState<Theme>("day");
  const [whisper, setWhisper] = useState(false);
  const [wish, setWish] = useState(false);
  const [flight, setFlight] = useState(0);
  const whisperTimer = useRef<number | null>(null);
  const wishTimer = useRef<number | null>(null);
  const flightTimer = useRef<number | null>(null);
  const cooling = useRef(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      (nav.deviceMemory ?? 8) <= 2 ||
      nav.connection?.saveData === true;
    if (lowPower) document.documentElement.dataset.lite = "true";

    return () => {
      if (whisperTimer.current !== null) window.clearTimeout(whisperTimer.current);
      if (wishTimer.current !== null) window.clearTimeout(wishTimer.current);
      if (flightTimer.current !== null) window.clearTimeout(flightTimer.current);
      delete document.documentElement.dataset.lite;
    };
  }, []);

  const clearWish = () => {
    setWish(false);
    setFlight(0);
    cooling.current = false;
    if (wishTimer.current !== null) window.clearTimeout(wishTimer.current);
    if (flightTimer.current !== null) window.clearTimeout(flightTimer.current);
    wishTimer.current = null;
    flightTimer.current = null;
  };

  const toggleTheme = () => {
    if (whisperTimer.current !== null) window.clearTimeout(whisperTimer.current);
    clearWish();

    if (theme === "day") {
      setTheme("night");
      setWhisper(true);
      whisperTimer.current = window.setTimeout(() => setWhisper(false), reduced ? 2200 : 3400);
      return;
    }

    setTheme("day");
    setWhisper(false);
  };

  const makeWish = () => {
    if (theme !== "night" || cooling.current) return;

    cooling.current = true;
    if (whisperTimer.current !== null) window.clearTimeout(whisperTimer.current);
    whisperTimer.current = null;
    setWhisper(false);
    setFlight((current) => current + 1);
    setWish(true);

    if (wishTimer.current !== null) window.clearTimeout(wishTimer.current);
    if (flightTimer.current !== null) window.clearTimeout(flightTimer.current);

    const flightMs = reduced ? 1100 : 1450;
    wishTimer.current = window.setTimeout(() => {
      setWish(false);
      wishTimer.current = null;
    }, reduced ? 2400 : 3800);
    flightTimer.current = window.setTimeout(() => {
      setFlight(0);
      cooling.current = false;
      flightTimer.current = null;
    }, flightMs);
  };

  return (
    <motion.main
      data-theme={theme}
      className="garden-screen relative overflow-x-hidden"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.01 : TIMELINE.sceneFade, ease: "easeOut" }}
    >
      <Atmosphere />
      <NightSky />
      <MoonButton night={theme === "night"} onWish={makeWish} />
      <FlowerGarden extra={blooms} />
      <Fireflies />
      <ShootingStar flight={theme === "night" ? flight : 0} />
      <FloatingPetals />
      <div className="garden-screen pointer-events-none relative z-30 flex items-center justify-center px-4 pb-20 pt-24 sm:px-5">
        <RomanticMessage onPlant={plantFlower} planted={planted} />
      </div>
      <LoveNote />
      <SiteFooter />
      <ThemeToggle night={theme === "night"} onToggle={toggleTheme} />
      <NightWhisper show={whisper} />
      <MoonWish show={wish && theme === "night"} />
    </motion.main>
  );
}

function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute -left-20 top-[20%] h-56 w-56 rounded-full bg-[#f3c6d0]/40 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute -right-16 top-[4%] h-48 w-48 rounded-full bg-[#ead6b6]/45 blur-3xl sm:h-64 sm:w-64" />
      <div className="absolute bottom-[6%] left-[16%] h-48 w-64 rounded-full bg-[#d5e6d6]/40 blur-3xl sm:h-64 sm:w-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(90,60,68,0.05)_100%)]" />
    </div>
  );
}
