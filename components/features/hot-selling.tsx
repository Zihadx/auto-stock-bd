"use client";

import { useEffect, useMemo, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cinzel, Inter } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useSyncExternalStore } from "react";
import {
  ShieldCheck,
  Zap,
  Leaf,
  Car,
  Gauge,
  Fuel,
  ArrowRight,
  Flame,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "next-themes";
import { CHARCOAL, PAPER } from "../ui/tokens";

import type { Vehicle } from "@/types/vehicle";
import { getHotSellingVehicles } from "@/services/vehicle.service";

/* -------------------------------------------------------------------------- */
/* Fonts                                                                      */
/* -------------------------------------------------------------------------- */

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

/* -------------------------------------------------------------------------- */
/* Hydration-safe theme mount check                                           */
/* -------------------------------------------------------------------------- */

const subscribe = () => () => {};

const useMounted = () =>
  useSyncExternalStore(subscribe, () => true, () => false);

/* -------------------------------------------------------------------------- */
/* Headline Stats                                                             */
/* -------------------------------------------------------------------------- */

const HEADLINE_STATS = [
  { icon: TrendingUp, value: "Top 10", label: "Best Sellers" },
  { icon: ShieldCheck, value: "100%", label: "Certified" },
  { icon: Flame, value: "High", label: "Demand" },
];

const HOT_SELLING_COUNT = 3;

const INVENTORY_HREF = "/inventory";
const VEHICLE_DETAIL_BASE = "/inventory";

/* -------------------------------------------------------------------------- */
/* Cache                                                                     */
/* -------------------------------------------------------------------------- */

const HOT_SELLING_CACHE_KEY = "hot-selling-vehicles";
const HOT_SELLING_CACHE_TTL = 5 * 60 * 1000;

/* -------------------------------------------------------------------------- */
/* Card accent palette                                                        */
/* -------------------------------------------------------------------------- */

const ACCENTS = [
  {
    iconText: "text-[#E5453E]",
    badgeBg: "bg-[#E5453E]/[0.14]",
    badgeBorder: "border-[#E5453E]/40",
    ctaBg: "bg-[#E5453E]",
    ctaIcon: "text-[#F3EEE6]",
  },
  {
    iconText: "text-[#CBA36B]",
    badgeBg: "bg-[#CBA36B]/[0.14]",
    badgeBorder: "border-[#CBA36B]/40",
    ctaBg: "bg-[#CBA36B]",
    ctaIcon: "text-[#0A0806]",
  },
  {
    iconText: "text-[#33C9B0]",
    badgeBg: "bg-[#33C9B0]/[0.14]",
    badgeBorder: "border-[#33C9B0]/40",
    ctaBg: "bg-[#33C9B0]",
    ctaIcon: "text-[#0A0806]",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function fuelIcon(fuelType: string) {
  const f = fuelType.toLowerCase();

  if (f.includes("electric")) return Zap;
  if (f.includes("hybrid")) return Leaf;

  return Flame;
}

function formatMileage(km: number): string {
  return km >= 1000 ? `${(km / 1000).toFixed(1)}k km` : `${km} km`;
}

/**
 * Builds a URL-safe slug from brand/model/year/id.
 * Prefer vehicle.slug if your Vehicle type has a canonical one.
 */
function slugify(vehicle: Vehicle): string {
  const maybeSlug = (vehicle as { slug?: string }).slug;

  if (maybeSlug) return maybeSlug;

  const base = `${vehicle.brand}-${vehicle.model}-${vehicle.year}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base}-${vehicle.id}`;
}

/* -------------------------------------------------------------------------- */
/* Card data                                                                  */
/* -------------------------------------------------------------------------- */

interface HotCardData {
  id: string;
  slug: string;
  titleTop: string;
  titleBottom: string;
  copy: string;
  image: string;
  inquiryCount: number;
  stats: {
    icon: typeof Car;
    value: string;
    label: string;
  }[];
  accent: (typeof ACCENTS)[number];
  FuelIcon: ReturnType<typeof fuelIcon>;
}

function toHotCardData(
  vehicle: Vehicle,
  index: number,
): HotCardData {
  const accent = ACCENTS[index % ACCENTS.length];
  const FuelIcon = fuelIcon(vehicle.fuelType);

  return {
    id: vehicle.id,
    slug: slugify(vehicle),

    titleTop: vehicle.brand,
    titleBottom: vehicle.model,

    copy: `One of our most requested vehicles right now — ${vehicle.inquiryCount} active inquiries and counting.`,

    image: vehicle.images?.[0]?.url ?? "",

    inquiryCount: vehicle.inquiryCount,

    accent,

    FuelIcon,

    stats: [
      {
        icon: Car,
        value: String(vehicle.year),
        label: "Year",
      },
      {
        icon: Gauge,
        value: formatMileage(vehicle.mileageKm),
        label: "Mileage",
      },
      {
        icon: Fuel,
        value: vehicle.fuelType,
        label: "Fuel",
      },
    ],
  };
}

/* -------------------------------------------------------------------------- */
/* Motion Variants                                                            */
/* -------------------------------------------------------------------------- */

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_SMOOTH,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_SMOOTH,
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Theme                                                                      */
/* -------------------------------------------------------------------------- */

function buildTheme(isLight: boolean) {
  return {
    sectionBg: isLight ? "#F5F3EE" : CHARCOAL,

    heading: isLight ? "#171512" : PAPER,

    body: isLight ? "#171512" : PAPER,

    muted: isLight ? "#38342E" : PAPER,

    subtle: isLight ? "#454039" : PAPER,

    border: isLight
      ? "rgba(23,21,18,0.16)"
      : "rgba(243,238,230,0.18)",

    ambientBg: isLight
      ? "radial-gradient(circle at 75% 15%, rgba(203,163,107,0.12), transparent 30%), radial-gradient(circle at 10% 80%, rgba(229,69,62,0.045), transparent 28%)"
      : "radial-gradient(circle at 75% 15%, rgba(203,163,107,0.08), transparent 30%), radial-gradient(circle at 10% 80%, rgba(229,69,62,0.05), transparent 28%)",

    ctaBorderBg: isLight
      ? "rgba(255,255,255,0.65)"
      : "rgba(243,238,230,0.04)",

    heroShadow: isLight
      ? "0 18px 50px rgba(20,18,15,0.08)"
      : "0 18px 50px rgba(0,0,0,0.20)",

    bottomFade: isLight
      ? "linear-gradient(to top,rgba(20,18,15,0.72) 2%,rgba(20,18,15,0.12) 42%,transparent 68%)"
      : "linear-gradient(to top,#0A0806 2%,rgba(10,8,6,0.15) 40%,rgba(10,8,6,0.05) 65%)",

    statsPanelBorder: isLight
      ? "rgba(255,255,255,0.38)"
      : "rgba(243,238,230,0.18)",

    statsPanelBg: isLight
      ? "rgba(20,18,15,0.72)"
      : "rgba(10,8,6,0.80)",

    mobileStatsBg: isLight
      ? "rgba(255,255,255,0.68)"
      : "rgba(10,8,6,0.80)",

    mobileStatsShadow: isLight
      ? "0 10px 30px rgba(20,18,15,0.05)"
      : "none",

    cardBg: isLight
      ? "rgba(255,255,255,0.70)"
      : "#0D0A07",

    cardShadow: isLight
      ? "0 12px 40px rgba(20,18,15,0.06)"
      : "none",
  };
}

type Theme = ReturnType<typeof buildTheme>;

/* -------------------------------------------------------------------------- */
/* Stats List                                                                 */
/* -------------------------------------------------------------------------- */

function StatsList({
  vertical = false,
  isLight,
}: {
  vertical?: boolean;
  isLight: boolean;
}) {
  return (
    <>
      {HEADLINE_STATS.map(
        ({ icon: Icon, value, label }, index) => (
          <div
            key={label}
            className={
              vertical
                ? `flex flex-col items-center gap-2 text-center ${
                    index > 0
                      ? `mt-4 border-t ${
                          isLight
                            ? "border-black/[0.14]"
                            : "border-[#F3EEE6]/[0.16]"
                        } pt-4`
                      : ""
                  }`
                : "flex flex-1 flex-col items-center gap-2 text-center"
            }
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CBA36B]/[0.16]">
              <Icon
                size={14}
                className="text-[#CBA36B]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>

            <div
              className={`[font-family:var(--font-display)] text-[15px] font-semibold ${
                isLight
                  ? "text-[#171512]"
                  : "text-[#F3EEE6]"
              }`}
            >
              {value}
            </div>

            <div
              className={`text-[10px] font-medium uppercase tracking-[0.12em] ${
                isLight
                  ? "text-[#3E3932]"
                  : "text-[#F3EEE6]"
              }`}
            >
              {label}
            </div>
          </div>
        ),
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Hot Selling Card                                                           */
/* -------------------------------------------------------------------------- */

const HotSellingCard = memo(function HotSellingCard({
  data,
  theme,
  reducedMotion,
}: {
  data: HotCardData;
  theme: Theme;
  reducedMotion: boolean | null;
}) {
  const { FuelIcon, accent } = data;

  const href = `${VEHICLE_DETAIL_BASE}/${data.slug}`;

  return (
    <motion.div
      variants={
        reducedMotion ? undefined : cardVariants
      }
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -6,
            }
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      className="group h-full"
    >
      <Link
        href={href}
        aria-label={`View details for ${data.titleTop} ${data.titleBottom}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl outline-none transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-[#CBA36B]"
        style={{
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.cardBg,
          boxShadow: theme.cardShadow,
        }}
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          {data.image ? (
            <Image
              src={data.image}
              alt={`${data.titleTop} ${data.titleBottom}`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: theme.cardBg,
              }}
            >
              <Car
                size={42}
                strokeWidth={1}
                className="text-[#CBA36B]/50"
              />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0A0806_8%,rgba(10,8,6,0.4)_50%,transparent_85%)]" />

          {/* Fuel badge */}
          <span
            className={`absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-500 group-hover:scale-110 ${accent.badgeBg} ${accent.badgeBorder}`}
          >
            <FuelIcon
              size={16}
              strokeWidth={1.8}
              className={accent.iconText}
              aria-hidden="true"
            />
          </span>

          {/* Inquiry badge */}
          <span className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-[#0A0806]/75 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F3EEE6] backdrop-blur-md">
            {data.inquiryCount} Inquiries
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{
              color: theme.subtle,
            }}
          >
            Most wanted
          </span>

          <h3
            className="mt-1 [font-family:var(--font-display)] text-xl font-semibold uppercase leading-snug"
            style={{
              color: theme.heading,
            }}
          >
            {data.titleTop}
            <br />
            {data.titleBottom}
          </h3>

          <p
            className="mt-3 text-[14px] leading-relaxed"
            style={{
              color: theme.muted,
            }}
          >
            {data.copy}
          </p>

          {/* Bottom stats */}
          <div
            className="mt-auto flex items-center justify-between pt-5"
            style={{
              borderTop: `1px solid ${theme.border}`,
            }}
          >
            <div className="flex gap-4">
              {data.stats.map((stat) => {
                const StatIcon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="flex items-start gap-1.5"
                  >
                    <StatIcon
                      size={13}
                      strokeWidth={1.8}
                      className={`mt-0.5 ${accent.iconText}`}
                      aria-hidden="true"
                    />

                    <div className="leading-tight">
                      <div
                        className="text-[13px] font-semibold"
                        style={{
                          color: theme.heading,
                        }}
                      >
                        {stat.value}
                      </div>

                      <div
                        className="text-[9px] font-medium uppercase tracking-[0.1em]"
                        style={{
                          color: theme.subtle,
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <span
              aria-hidden="true"
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-105 ${accent.ctaBg}`}
            >
              <ArrowRight
                size={14}
                strokeWidth={1.9}
                className={accent.ctaIcon}
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

HotSellingCard.displayName = "HotSellingCard";

/* -------------------------------------------------------------------------- */
/* Skeleton                                                                    */
/* -------------------------------------------------------------------------- */

function HotSellingCardSkeleton({
  theme,
}: {
  theme: Theme;
}) {
  return (
    <div
      className="h-[420px] animate-pulse rounded-2xl"
      style={{
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.cardBg,
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function HotSelling() {
  const reducedMotion = useReducedMotion();

  const mounted = useMounted();

  const { resolvedTheme } = useTheme();

  const isLight =
    mounted && resolvedTheme === "light";

  const theme = useMemo(
    () => buildTheme(isLight),
    [isLight],
  );

  const [cards, setCards] =
    useState<HotCardData[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* ------------------------------------------------------------------------ */
  /* Load vehicles                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let cancelled = false;

    async function loadVehicles() {
      /*
       * STEP 1
       * Restore cached data immediately.
       *
       * This is what makes:
       *
       * Home → Details → Back
       *
       * feel instant instead of showing an empty section.
       */
      try {
        const cached = sessionStorage.getItem(
          HOT_SELLING_CACHE_KEY,
        );

        if (cached) {
          const parsed = JSON.parse(cached) as {
            timestamp: number;
            vehicles: Vehicle[];
          };

          const isValidCache =
            Array.isArray(parsed.vehicles) &&
            typeof parsed.timestamp === "number" &&
            Date.now() - parsed.timestamp <
              HOT_SELLING_CACHE_TTL;

          if (isValidCache && !cancelled) {
            setCards(
              parsed.vehicles.map(toHotCardData),
            );

            setLoading(false);
          }
        }
      } catch (error) {
        console.warn(
          "[HotSelling] Could not restore cache:",
          error,
        );
      }

      /*
       * STEP 2
       * Always attempt a fresh request.
       *
       * The cached cards stay visible while this happens.
       */
      try {
        const vehicles =
          await getHotSellingVehicles(
            HOT_SELLING_COUNT,
          );

        if (cancelled) return;

        const nextCards =
          vehicles.map(toHotCardData);

        setCards(nextCards);
        setLoading(false);

        /*
         * STEP 3
         * Save the successful response.
         */
        try {
          sessionStorage.setItem(
            HOT_SELLING_CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              vehicles,
            }),
          );
        } catch (error) {
          console.warn(
            "[HotSelling] Could not save cache:",
            error,
          );
        }
      } catch (error) {
        console.error(
          "[HotSelling] Failed to load vehicles:",
          error,
        );

        /*
         * IMPORTANT:
         *
         * If cached cards already exist, keep showing them.
         * Never replace them with an empty state just because
         * the fresh request failed.
         */
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVehicles();

    return () => {
      cancelled = true;
    };
  }, []);

  const heroImage = cards[0]?.image;

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <motion.section
      className={`${cinzel.variable} ${inter.variable} relative overflow-hidden py-20 sm:py-24 lg:py-28 px-4`}
      style={{
        backgroundColor: theme.sectionBg,
        color: theme.body,
      }}
      variants={
        reducedMotion
          ? undefined
          : containerVariants
      }
      initial={
        reducedMotion
          ? undefined
          : "hidden"
      }
      whileInView={
        reducedMotion
          ? undefined
          : "show"
      }
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: theme.ambientBg,
        }}
      />


      {/* ====================================== */}

<div className="container relative mx-auto px-3 sm:px-4 lg:px-0">
  {/* ================================================================
      HOT SELLING HERO
      ================================================================ */}
  <div
    className="
      relative
      isolate
      overflow-hidden
      rounded-[20px]
      sm:rounded-[24px]
      lg:rounded-[28px]
    "
    style={{
      boxShadow: theme.heroShadow,
    }}
  >
    {/* ==============================================================
        BACKGROUND
        ============================================================== */}
    <div
      className="
        absolute
        inset-0
        -z-20
        bg-cover
        bg-center
        bg-[position:67%_center]
        sm:bg-[position:66%_center]
        lg:bg-center
      "
      style={{
        backgroundImage: 'url("/images/hot-selling-bg.png")',
      }}
      aria-hidden="true"
    />

    {/* ==============================================================
        RESPONSIVE OVERLAY
        ============================================================== */}
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        -z-10
      "
      style={{
        background: `
          linear-gradient(
            180deg,
            rgba(5,4,3,0.96) 0%,
            rgba(5,4,3,0.78) 28%,
            rgba(5,4,3,0.18) 65%,
            rgba(5,4,3,0.40) 100%
          )
        `,
      }}
      aria-hidden="true"
    />

    {/* Desktop left-side darkness */}
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        hidden
        lg:block
      "
      style={{
        background: `
          linear-gradient(
            90deg,
            rgba(5,4,3,0.98) 0%,
            rgba(5,4,3,0.90) 20%,
            rgba(5,4,3,0.58) 38%,
            rgba(5,4,3,0.12) 65%,
            transparent 100%
          )
        `,
      }}
      aria-hidden="true"
    />

    {/* Mobile subtle bottom fade */}
    <div
      className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        h-32
        bg-gradient-to-t
        from-black/40
        to-transparent
        lg:hidden
      "
      aria-hidden="true"
    />

    {/* Gold border */}
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        rounded-[20px]
        sm:rounded-[24px]
        lg:rounded-[28px]
      "
      style={{
        border: `1px solid ${theme.border}`,
      }}
      aria-hidden="true"
    />

    {/* ================================================================
        CONTENT
        ================================================================ */}
    <div
      className="
        relative
        z-10
        grid
        min-h-[420px]
        grid-cols-1
        px-4
        pt-6

        sm:min-h-[450px]
        sm:px-7
        sm:pt-8

        lg:min-h-[500px]
        lg:grid-cols-12
        lg:px-10
        lg:py-10

        xl:px-12
      "
    >
      {/* ==============================================================
          CONTENT
          ============================================================== */}
      <motion.div
        variants={
          reducedMotion
            ? undefined
            : itemVariants
        }
        className="
          flex
          flex-col
          lg:col-span-5
          lg:justify-center
        "
      >
        {/* Eyebrow */}
        <span
          className="
            flex
            items-center
            gap-2
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            sm:text-[10px]
            sm:tracking-[0.2em]
            md:text-[11px]
          "
          style={{
            color: "#E5453E",
          }}
        >
          <Flame
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />

          Most wanted right now
        </span>

        {/* Heading */}
        <h2
          className="
            mt-2
            [font-family:var(--font-display)]
            text-[2rem]
            font-semibold
            uppercase
            leading-[0.98]
            tracking-[-0.025em]

            sm:mt-3
            sm:text-[2.5rem]

            md:text-[2.8rem]

            lg:text-[3rem]

            xl:text-[3.2rem]
          "
        >
          <span
            style={{
              color: theme.heading,
            }}
          >
            Hot Selling
          </span>

          <br />

          <span className="text-[#CBA36B]">
            Collection
          </span>
        </h2>

        {/* Description */}
        <p
          className="
            mt-3
            max-w-[300px]
            text-[12px]
            leading-[1.65]

            sm:mt-4
            sm:max-w-sm
            sm:text-[13px]

            md:text-[14px]

            lg:text-[15px]
          "
          style={{
            color: theme.muted,
          }}
        >
          Discover the vehicles creating the
          most attention right now — ranked by
          real buyer inquiries.
        </p>

        {/* CTA */}
        <Link
          href={INVENTORY_HREF}
          className="
            group
            mt-5
            inline-flex
            w-fit
            items-center
            gap-2.5
            rounded-full
            px-4
            py-2.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.12em]
            transition-all
            duration-300
            hover:-translate-y-0.5

            sm:mt-6
            sm:px-5
            sm:py-3
            sm:text-[10px]

            lg:text-[11px]
          "
          style={{
            border: `1px solid ${theme.border}`,
            color: theme.heading,
            backgroundColor: theme.ctaBorderBg,
            boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          }}
        >
          Explore best sellers

          <ArrowRight
            size={13}
            strokeWidth={1.8}
            className="
              shrink-0
              text-[#CBA36B]
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
            aria-hidden="true"
          />
        </Link>
      </motion.div>

      {/* ==============================================================
          VISUAL AREA

          Small on mobile because the background already contains
          the vehicle.
          ============================================================== */}
      <motion.div
        variants={
          reducedMotion
            ? undefined
            : itemVariants
        }
        className="
          relative
          min-h-[145px]

          sm:min-h-[165px]

          md:min-h-[180px]

          lg:col-span-7
          lg:min-h-0
        "
      >
        {/* High demand */}
        <div
          className="
            absolute
            left-0
            top-3
            flex
            items-center
            gap-1.5
            rounded-full
            border
            border-[#E5453E]/40
            bg-[#080604]/70
            px-2.5
            py-1.5
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[#F3EEE6]
            backdrop-blur-md

            sm:px-3
            sm:py-2
            sm:text-[9px]

            lg:left-auto
            lg:right-0
            lg:top-0
          "
        >
          <Flame
            size={10}
            strokeWidth={2}
            className="text-[#E5453E]"
            aria-hidden="true"
          />

          High Demand
        </div>

        {/* Desktop stats */}
        <div
          className="
            absolute
            right-0
            top-12
            hidden
            w-[115px]
            rounded-2xl
            px-3
            py-4
            backdrop-blur-xl
            lg:block
          "
          style={{
            border: `1px solid ${theme.statsPanelBorder}`,
            backgroundColor: theme.statsPanelBg,
            boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
          }}
        >
          <StatsList
            vertical
            isLight={isLight}
          />
        </div>
      </motion.div>
    </div>

    {/* ================================================================
        MOBILE STATS
        ============================================================== */}
    <div
      className="
        relative
        z-20
        mx-3
        mb-3
        flex
        min-h-[48px]
        items-center
        justify-between
        gap-2
        rounded-xl
        px-3
        py-2

        sm:mx-5
        sm:mb-5
        sm:min-h-[56px]
        sm:rounded-2xl
        sm:px-4
        sm:py-3

        lg:hidden
      "
      style={{
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.mobileStatsBg,
        boxShadow: theme.mobileStatsShadow,
        backdropFilter: "blur(16px)",
      }}
    >
      <StatsList isLight={isLight} />
    </div>
  </div>

  {/* ================================================================
      HOT SELLING CARDS
      ================================================================ */}
  <div
    className="
      mt-6
      grid
      grid-cols-1
      gap-4

      sm:mt-8
      sm:gap-5

      md:mt-10
      md:grid-cols-3
      md:gap-6
    "
  >
    {loading && cards.length === 0
      ? Array.from({
          length: HOT_SELLING_COUNT,
        }).map((_, index) => (
          <HotSellingCardSkeleton
            key={index}
            theme={theme}
          />
        ))
      : cards.map((data) => (
          <HotSellingCard
            key={data.id}
            data={data}
            theme={theme}
            reducedMotion={reducedMotion}
          />
        ))}
  </div>
</div>


     
    </motion.section>
  );
}