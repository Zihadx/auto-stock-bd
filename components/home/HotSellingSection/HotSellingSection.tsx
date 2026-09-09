"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cinzel, Inter } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight, Flame } from "lucide-react";

import { getHotSellingVehicles } from "@/services/vehicle.service";
import { buildTheme, HERO_HEADING, HERO_MUTED, STATS_PANEL_BG, STATS_PANEL_BORDER } from "./theme";
import { containerVariants, itemVariants } from "./animations";
import { StatsList } from "./StatsList";
import { HotSellingCard, HotSellingCardSkeleton } from "./HotSellingCard";
import {
  HOT_SELLING_COUNT,
  INVENTORY_HREF,
  getCachedVehicleSnapshot,
  noopSubscribe,
  toHotCardData,
  writeVehicleCache,
  type HotCardData,
} from "./utils";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

export default function HotSellingSection() {
  const reducedMotion = useReducedMotion();
  const motionOn = !reducedMotion;

  // Same external-store pattern for both: hydration-safe, no effect+setState.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const { resolvedTheme } = useTheme();
  const isLight = mounted && resolvedTheme === "light";
  const theme = useMemo(() => buildTheme(isLight), [isLight]);

  // Cached vehicles from sessionStorage, read as external state rather than
  // set from inside an effect — this is what removes the synchronous
  // setState-in-effect warning for the "instant back-nav" cache display.
  const cachedVehicles = useSyncExternalStore(noopSubscribe, getCachedVehicleSnapshot, () => null);
  const cachedCards = useMemo(() => (cachedVehicles ? cachedVehicles.map(toHotCardData) : null), [cachedVehicles]);

  const [freshCards, setFreshCards] = useState<HotCardData[] | null>(null);
  const [loading, setLoading] = useState(() => cachedVehicles === null);

  const cards = freshCards ?? cachedCards ?? [];

  // The only thing this effect does is subscribe to an external async
  // source (the network) and update state from its callback — exactly the
  // pattern React recommends, not a synchronous body call.
  useEffect(() => {
    let cancelled = false;

    getHotSellingVehicles(HOT_SELLING_COUNT)
      .then((vehicles) => {
        if (cancelled) return;
        setFreshCards(vehicles.map(toHotCardData));
        setLoading(false);
        writeVehicleCache(vehicles);
      })
      .catch((error) => {
        console.error("[HotSelling] Failed to load vehicles:", error);
        // Keep any cached cards visible rather than clearing to an empty state.
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.section
      className={`${cinzel.variable} ${inter.variable} relative overflow-hidden px-4 py-20 sm:py-24 lg:py-28`}
      style={{ backgroundColor: theme.sectionBg, color: theme.heading }}
      variants={motionOn ? containerVariants : undefined}
      initial={motionOn ? "hidden" : undefined}
      whileInView={motionOn ? "show" : undefined}
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: theme.ambientBg }} />

      <div className="container relative mx-auto">
        {/* ---------------------------------------------------------------- */}
        {/* Hero — always sits on a dark photo, so its text is always light  */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative isolate overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[28px]" style={{ boxShadow: theme.heroShadow }}>
          <div
            className="absolute inset-0 -z-20 bg-cover bg-[position:67%_center] sm:bg-[position:66%_center] lg:bg-center"
            style={{ backgroundImage: 'url("/images/hot-selling-bg.png")' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: "linear-gradient(180deg,rgba(5,4,3,0.96) 0%,rgba(5,4,3,0.78) 28%,rgba(5,4,3,0.18) 65%,rgba(5,4,3,0.40) 100%)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
            style={{ background: "linear-gradient(90deg,rgba(5,4,3,0.98) 0%,rgba(5,4,3,0.90) 20%,rgba(5,4,3,0.58) 38%,rgba(5,4,3,0.12) 65%,transparent 100%)" }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent lg:hidden" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 rounded-[20px] sm:rounded-[24px] lg:rounded-[28px]"
            style={{ border: `1px solid ${theme.border}` }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid min-h-[420px] grid-cols-1 px-4 pt-6 sm:min-h-[450px] sm:px-7 sm:pt-8 lg:min-h-[500px] lg:grid-cols-12 lg:px-10 lg:py-10 xl:px-12">
            <motion.div variants={motionOn ? itemVariants : undefined} className="flex flex-col lg:col-span-5 lg:justify-center">
              <span
                className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.2em] md:text-[11px]"
                style={{ color: "#E5453E" }}
              >
                <Flame size={12} strokeWidth={2} aria-hidden="true" />
                Most wanted right now
              </span>

              <h2 className="mt-2 [font-family:var(--font-display)] text-[2rem] font-semibold uppercase leading-[0.98] tracking-[-0.025em] sm:mt-3 sm:text-[2.5rem] md:text-[2.8rem] lg:text-[3rem] xl:text-[3.2rem]">
                <span style={{ color: HERO_HEADING }}>Hot Selling</span>
                <br />
                <span className="text-[#CBA36B]">Collection</span>
              </h2>

              <p className="mt-3 max-w-[300px] text-[12px] leading-[1.65] sm:mt-4 sm:max-w-sm sm:text-[13px] md:text-[14px] lg:text-[15px]" style={{ color: HERO_MUTED }}>
                Discover the vehicles creating the most attention right now — ranked by real buyer inquiries.
              </p>

              <Link
                href={INVENTORY_HREF}
                className="group mt-5 inline-flex w-fit items-center gap-2.5 rounded-full px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 sm:mt-6 sm:px-5 sm:py-3 sm:text-[10px] lg:text-[11px]"
                style={{ border: `1px solid ${theme.border}`, color: theme.heading, backgroundColor: theme.ctaBg, boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}
              >
                Explore best sellers
                <ArrowRight size={13} strokeWidth={1.8} className="shrink-0 text-[#CBA36B] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div variants={motionOn ? itemVariants : undefined} className="relative min-h-[145px] sm:min-h-[165px] md:min-h-[180px] lg:col-span-7 lg:min-h-0">
              <div className="absolute left-0 top-3 flex items-center gap-1.5 rounded-full border border-[#E5453E]/40 bg-[#080604]/70 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#F3EEE6] backdrop-blur-md sm:px-3 sm:py-2 sm:text-[9px] lg:left-auto lg:right-0 lg:top-0">
                <Flame size={10} strokeWidth={2} className="text-[#E5453E]" aria-hidden="true" />
                High Demand
              </div>

              <div
                className="absolute right-0 top-12 hidden w-[115px] rounded-2xl px-3 py-4 backdrop-blur-xl lg:block"
                style={{ border: `1px solid ${STATS_PANEL_BORDER}`, backgroundColor: STATS_PANEL_BG, boxShadow: "0 18px 40px rgba(0,0,0,0.22)" }}
              >
                <StatsList vertical tone="light" isLight={isLight} />
              </div>
            </motion.div>
          </div>

          {/* Mobile stats bar has its own theme-following surface — text follows page theme */}
          <div
            className="relative z-20 mx-3 mb-3 flex min-h-[48px] items-center justify-between gap-2 rounded-xl px-3 py-2 sm:mx-5 sm:mb-5 sm:min-h-[56px] sm:rounded-2xl sm:px-4 sm:py-3 lg:hidden"
            style={{ border: `1px solid ${theme.border}`, backgroundColor: theme.mobileStatsBg, boxShadow: theme.mobileStatsShadow, backdropFilter: "blur(16px)" }}
          >
            <StatsList tone="auto" isLight={isLight} />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Cards                                                            */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:mt-10 md:grid-cols-3 md:gap-6">
          {loading && cards.length === 0
            ? Array.from({ length: HOT_SELLING_COUNT }).map((_, i) => <HotSellingCardSkeleton key={i} theme={theme} />)
            : cards.map((data) => <HotSellingCard key={data.id} data={data} theme={theme} motionOn={motionOn} />)}
        </div>
      </div>
    </motion.section>
  );
}