"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  CarFront,
  Check,
  ChevronRight,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { viewport } from "@/lib/motion";
import { BURGUNDY, CHARCOAL, PAPER, PINK, GOLD } from "../ui/tokens";

// ============================================================
// GRAIN
// ============================================================

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
      <filter id='noise'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency='0.72'
          numOctaves='3'
          stitchTiles='stitch'
        />
      </filter>
      <rect
        width='100%'
        height='100%'
        filter='url(#noise)'
        opacity='.55'
      />
    </svg>`,
  );

// ============================================================
// PREMIUM MOTION
// ============================================================

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const premiumReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: EASE_OUT,
    },
  },
};

const premiumStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const lineReveal: Variants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: EASE_OUT,
    },
  },
};

// ============================================================
// THEME TOKENS
// ============================================================

function buildTheme(isLight: boolean) {
  const frame = isLight ? "rgba(23,21,18,0.14)" : `${PAPER}08`;

  return {
    background: isLight ? "#F5F3EE" : CHARCOAL,

    // Main typography
    text: isLight ? "#11100E" : PAPER,

    // 100% visible small/body text
    textSecondary: isLight ? "#2B2823" : PAPER,
    textTertiary: isLight ? "#3A3630" : PAPER,
    textSoft: isLight ? "#27241F" : PAPER,

    // Destination italic
    destinationAccent: isLight ? "#514B41" : PAPER,

    // Frame lines
    frameGradient: `linear-gradient(
      to bottom,
      transparent,
      ${frame} 20%,
      ${frame} 80%,
      transparent
    )`,

    // Trust divider
    trustBorder: isLight ? "rgba(23,21,18,0.20)" : `${PAPER}30`,

    // Signature
    signature: isLight ? "#5C554A" : PAPER,

    grainOpacity: isLight ? 0.018 : 0.035,

    // Eyebrow — 100% visible
    eyebrowLine: isLight ? "#8A6828" : GOLD,
    eyebrowText: isLight ? "#654A19" : PAPER,

    // Station — 100% visible
    stationDescription: isLight ? "#332F29" : PAPER,
    stationCta: isLight ? "#211E19" : PAPER,
    stationMarker: isLight ? "#76571F" : GOLD,
    stationIcon: isLight ? "#76571F" : GOLD,
    stationCtaBorder: isLight ? "#96712F" : GOLD,
    stationCtaBg: isLight
      ? "rgba(138,104,40,0.10)"
      : `${GOLD}14`,
    stationGlow: isLight
      ? "rgba(138,104,40,0.08)"
      : `${GOLD}10`,

    // Trust — 100% visible
    trustIcon: isLight ? "#76571F" : GOLD,
    trustLabel: isLight ? "#332F29" : PAPER,

    burgundyBg: isLight ? `${BURGUNDY}0C` : `${BURGUNDY}20`,
    burgundyOpacity: isLight ? [0.12, 0.18, 0.12] : [0.35, 0.5, 0.35],
    goldOpacity: isLight ? [0.06, 0.11, 0.06] : [0.05, 0.12, 0.05],
    pinkBg: isLight ? `${PINK}04` : `${PINK}07`,
  };
}

type Theme = ReturnType<typeof buildTheme>;

// ============================================================
// ATMOSPHERE BLOB
// ============================================================

function AtmosphereBlob({
  className,
  color,
  opacityRange,
  moveX,
  moveY,
  duration,
  reduceMotion,
}: {
  className: string;
  color: string;
  opacityRange: number[];
  moveX: number[];
  moveY: number[];
  duration: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className={className}
      animate={
        reduceMotion
          ? undefined
          : {
              x: moveX,
              y: moveY,
              opacity: opacityRange,
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        backgroundColor: color,
      }}
    />
  );
}

// ============================================================
// EYEBROW
// ============================================================

function Eyebrow({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span
        aria-hidden="true"
        className="h-[2px] w-10"
        style={{
          backgroundColor: theme.eyebrowLine,
        }}
      />

      <span
        className="font-display text-[11px] font-medium uppercase tracking-[0.28em]"
        style={{
          color: theme.eyebrowText,
        }}
      >
        {children}
      </span>

      <span
        aria-hidden="true"
        className="h-[2px] w-10"
        style={{
          backgroundColor: theme.eyebrowLine,
        }}
      />
    </div>
  );
}

// ============================================================
// STATION
// ============================================================

function Station({
  icon: Icon,
  number,
  title,
  description,
  href,
  ctaLabel,
  theme,
}: {
  icon: typeof CarFront;
  number: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  theme: Theme;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div variants={premiumReveal} className="group relative">
      {/* Top marker */}
      <div className="flex items-center gap-5">
        <span
          className="font-display text-[13px] font-medium italic"
          style={{
            color: theme.stationMarker,
          }}
        >
          {number}
        </span>

        <span
          aria-hidden="true"
          className="h-[2px] w-14 transition-all duration-700 group-hover:w-24"
          style={{
            background:
              "linear-gradient(to right, #8A6828, rgba(138,104,40,0.18), transparent)",
          }}
        />
      </div>

      <div className="mt-8">
        <Icon
          size={23}
          strokeWidth={1.45}
          style={{
            color: theme.stationIcon,
          }}
        />
      </div>

      <h3
        className="mt-6 max-w-md font-display text-[clamp(1.85rem,2.7vw,2.55rem)] font-normal leading-[1.05] tracking-[-0.035em]"
        style={{
          color: theme.text,
        }}
      >
        {title}
      </h3>

      <p
        className="mt-6 max-w-sm text-[13px] leading-7"
        style={{
          color: theme.stationDescription,
        }}
      >
        {description}
      </p>

      <Link
        href={href}
        className="group/link mt-8 inline-flex items-center gap-3"
      >
        <span
          className="text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{
            color: theme.stationCta,
          }}
        >
          {ctaLabel}
        </span>

        <span
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-500 group-hover/link:translate-x-1"
          style={{
            borderColor: theme.stationCtaBorder,
            backgroundColor: theme.stationCtaBg,
          }}
        >
          <ArrowUpRight
            size={15}
            strokeWidth={2.2}
            style={{
              color: theme.stationIcon,
            }}
          />
        </span>
      </Link>

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full blur-[90px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            backgroundColor: theme.stationGlow,
          }}
        />
      )}
    </motion.div>
  );
}

// ============================================================
// TRUST ITEM
// ============================================================

function TrustItem({
  icon: Icon,
  label,
  theme,
}: {
  icon: typeof ShieldCheck;
  label: string;
  theme: Theme;
}) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <Icon
        size={15}
        strokeWidth={1.35}
        style={{
          color: theme.trustIcon,
        }}
      />

      <span
        className="text-[10px] font-medium uppercase tracking-[0.16em]"
        style={{
          color: theme.trustLabel,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

export function FinalCta() {
  const shouldReduceMotion = !!useReducedMotion();
  const { resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

  const theme = useMemo(() => buildTheme(isLight), [isLight]);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Cinematic background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <AtmosphereBlob
          className="absolute -left-[20%] top-[5%] h-[520px] w-[520px] rounded-full blur-[150px]"
          color={theme.burgundyBg}
          opacityRange={theme.burgundyOpacity}
          moveX={[0, 35, 0]}
          moveY={[0, 20, 0]}
          duration={14}
          reduceMotion={shouldReduceMotion}
        />

        <AtmosphereBlob
          className="absolute right-[-10%] top-[20%] h-[440px] w-[440px] rounded-full blur-[150px]"
          color={GOLD}
          opacityRange={theme.goldOpacity}
          moveX={[0, -30, 0]}
          moveY={[0, 35, 0]}
          duration={16}
          reduceMotion={shouldReduceMotion}
        />

        <div
          className="absolute bottom-[-15%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[160px]"
          style={{
            backgroundColor: theme.pinkBg,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${GRAIN}")`,
            backgroundSize: "180px 180px",
            opacity: theme.grainOpacity,
            mixBlendMode: "overlay",
          }}
        />

        {/* Side frames */}
        <div
          className="absolute inset-y-0 left-[7%] hidden w-[2px] md:block"
          style={{
            background: theme.frameGradient,
          }}
        />

        <div
          className="absolute inset-y-0 right-[7%] hidden w-[2px] md:block"
          style={{
            background: theme.frameGradient,
          }}
        />
      </div>

      <div className="container-page relative py-24 md:py-32 lg:py-40">
        {/* Intro */}
        <motion.div
          variants={premiumStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={premiumReveal}>
            <Eyebrow theme={theme}>Begin the next chapter</Eyebrow>
          </motion.div>

          <motion.h2
            variants={premiumReveal}
            className="mt-9 font-display text-[clamp(3.2rem,7.2vw,7rem)] font-normal leading-[0.88] tracking-[-0.055em]"
            style={{
              color: theme.text,
            }}
          >
            Your old car.
            <br />
            <span
              className="italic"
              style={{
                color: isLight ? "#8A6828" : GOLD,
              }}
            >
              Your next one.
            </span>
          </motion.h2>

          <motion.p
            variants={premiumReveal}
            className="mx-auto mt-9 max-w-xl text-[13px] leading-7 md:text-[14px]"
            style={{
              color: theme.textSecondary,
            }}
          >
            A considered way to change cars. We take care of the valuation, the
            numbers and the details — so you can concentrate on what comes next.
          </motion.p>
        </motion.div>

        {/* Process */}
        <div className="relative mt-24 md:mt-32">
          <motion.div
            variants={premiumStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-16 md:grid-cols-2 md:gap-28"
          >
            <Station
              icon={CarFront}
              number="01"
              title="Hand in what you're driving now."
              description="Receive a considered valuation within 24 hours. If you choose your next car with us, the value moves directly into the new purchase."
              href="/sell-your-car"
              ctaLabel="Get your valuation"
              theme={theme}
            />

            <Station
              icon={Landmark}
              number="02"
              title="Settle the numbers with confidence."
              description="We work with trusted finance partners on eligible vehicles and explain the options clearly before you make a decision."
              href="/contact"
              ctaLabel="Explore financing"
              theme={theme}
            />
          </motion.div>
        </div>

        {/* Vertical divider */}
        <motion.div
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-hidden="true"
          className="mx-auto mt-24 h-24 w-[2px] origin-top md:mt-32 md:h-32"
          style={{
            background: isLight
              ? "linear-gradient(to bottom, transparent, #A9823A 25%, #8A6828 50%, #A9823A 75%, transparent)"
              : `linear-gradient(to bottom, ${GOLD}00, ${GOLD}65 50%, ${GOLD}00)`,
          }}
        />

        {/* Destination */}
        <motion.div
          variants={premiumStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-2 max-w-4xl text-center md:mt-4"
        >
          <motion.div variants={premiumReveal}>
            <Eyebrow theme={theme}>Your next destination</Eyebrow>
          </motion.div>

          <motion.h3
            variants={premiumReveal}
            className="mt-9 font-display text-[clamp(2.9rem,5.7vw,5.4rem)] font-normal leading-[0.94] tracking-[-0.05em]"
            style={{
              color: theme.text,
            }}
          >
            Find the car
            <br />
            <span
              className="italic"
              style={{
                color: theme.destinationAccent,
              }}
            >
              that feels right.
            </span>
          </motion.h3>

          <motion.p
            variants={premiumReveal}
            className="mx-auto mt-8 max-w-md text-[13px] leading-7"
            style={{
              color: theme.textTertiary,
            }}
          >
            Every vehicle inspected. Every document verified. Every important
            detail considered before you arrive.
          </motion.p>

          {/* CTA group */}
          <motion.div
            variants={premiumReveal}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/inventory"
              className={cn(
                buttonVariants({
                  variant: "brass",
                  size: "lg",
                }),
                "group relative h-12 overflow-hidden rounded-full px-8 text-[10px] uppercase tracking-[0.18em]",
              )}
            >
              <span className="relative z-10 flex items-center gap-3">
                Browse inventory
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>

            <Link
              href="/contact"
              className="group flex h-12 items-center gap-2 rounded-full px-6 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{
                color: theme.textSoft,
              }}
            >
              Speak with us
              <ChevronRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-500 group-hover:translate-x-1"
                style={{
                  color: isLight ? "#8A6828" : GOLD,
                }}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={viewport}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: EASE_OUT,
          }}
          className="mx-auto mt-24 max-w-3xl border-t pt-9 md:mt-32"
          style={{
            borderColor: theme.trustBorder,
          }}
        >
          <div className="grid gap-7 sm:grid-cols-3">
            <TrustItem
              icon={ShieldCheck}
              label="Inspected vehicles"
              theme={theme}
            />

            <TrustItem
              icon={Check}
              label="Verified documentation"
              theme={theme}
            />

            <TrustItem
              icon={Sparkles}
              label="Straightforward buying"
              theme={theme}
            />
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={viewport}
          transition={{
            duration: 1,
            delay: 0.25,
          }}
          className="mt-16 text-center md:mt-20"
        >
          <p
            className="font-display text-[15px] italic"
            style={{
              color: theme.signature,
            }}
          >
            Take your time. Choose well.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
