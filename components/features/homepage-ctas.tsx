"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  CarFront,
  Check,
  ChevronRight,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { viewport } from "@/lib/motion";

import {
  ACCENT,
  BURGUNDY,
  CHARCOAL,
  PAPER,
  PINK,
  GOLD,
} from "../ui/tokens";

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
    </svg>`
  );

// ============================================================
// PREMIUM MOTION
// Explicit Variants typing prevents Framer Motion TS errors.
// ============================================================

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
      ease: [0.22, 1, 0.36, 1],
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================================
// EYEBROW
// ============================================================

function Eyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        aria-hidden="true"
        className="h-px w-7"
        style={{
          backgroundColor: `${GOLD}80`,
        }}
      />

      <span
        className="font-display text-[10px] uppercase tracking-[0.28em]"
        style={{
          color: `${PAPER}65`,
        }}
      >
        {children}
      </span>

      <span
        aria-hidden="true"
        className="h-px w-7"
        style={{
          backgroundColor: `${GOLD}80`,
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
}: {
  icon: typeof CarFront;
  number: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={premiumReveal}
      className="group relative"
    >
      {/* ======================================================
          TOP MARKER
      ====================================================== */}

      <div className="flex items-center gap-4">
        <span
          className="font-display text-[11px] italic"
          style={{
            color: `${GOLD}A8`,
          }}
        >
          {number}
        </span>

        <span
          aria-hidden="true"
          className="h-px w-12 transition-all duration-700 group-hover:w-20"
          style={{
            background: `linear-gradient(
              to right,
              ${GOLD}65,
              transparent
            )`,
          }}
        />
      </div>

      {/* ======================================================
          ICON
      ====================================================== */}

      <div className="mt-7">
        <Icon
          size={20}
          strokeWidth={1.15}
          style={{
            color: `${GOLD}C4`,
          }}
        />
      </div>

      {/* ======================================================
          TITLE
      ====================================================== */}

      <h3 className="mt-5 max-w-md font-display text-[clamp(1.65rem,2.5vw,2.35rem)] font-normal leading-[1.05] tracking-[-0.035em]">
        {title}
      </h3>

      {/* ======================================================
          DESCRIPTION
      ====================================================== */}

      <p
        className="mt-5 max-w-sm text-[12px] leading-6"
        style={{
          color: `${PAPER}5F`,
        }}
      >
        {description}
      </p>

      {/* ======================================================
          CTA
      ====================================================== */}

      <Link
        href={href}
        className="group/link mt-7 inline-flex items-center gap-3"
      >
        <span
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{
            color: PAPER,
          }}
        >
          {ctaLabel}
        </span>

        <span
          className="flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-500 group-hover/link:translate-x-1"
          style={{
            borderColor: `${GOLD}35`,
            backgroundColor: `${GOLD}08`,
          }}
        >
          <ArrowUpRight
            size={12}
            strokeWidth={1.4}
            style={{
              color: GOLD,
            }}
          />
        </span>
      </Link>

      {/* ======================================================
          SUBTLE HOVER GLOW
      ====================================================== */}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full blur-[90px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            backgroundColor: `${GOLD}08`,
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
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Icon
        size={13}
        strokeWidth={1.25}
        style={{
          color: `${GOLD}A0`,
        }}
      />

      <span
        className="text-[9px] uppercase tracking-[0.16em]"
        style={{
          color: `${PAPER}42`,
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: CHARCOAL,
        color: PAPER,
      }}
    >
      {/* ======================================================
          CINEMATIC BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Burgundy atmosphere */}

        <motion.div
          className="absolute -left-[20%] top-[5%] h-[520px] w-[520px] rounded-full blur-[150px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 35, 0],
                  y: [0, 20, 0],
                  opacity: [0.35, 0.5, 0.35],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundColor: `${BURGUNDY}20`,
          }}
        />

        {/* Gold atmosphere */}

        <motion.div
          className="absolute right-[-10%] top-[20%] h-[440px] w-[440px] rounded-full blur-[150px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -30, 0],
                  y: [0, 35, 0],
                  opacity: [0.05, 0.12, 0.05],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundColor: GOLD,
          }}
        />

        {/* Bottom atmosphere */}

        <div
          className="absolute bottom-[-15%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[160px]"
          style={{
            backgroundColor: `${PINK}07`,
          }}
        />

        {/* Grain */}

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${GRAIN}")`,
            backgroundSize: "180px 180px",
            opacity: 0.035,
            mixBlendMode: "overlay",
          }}
        />

        {/* ==================================================
            SIDE FRAME LINES
        ================================================== */}

        <div
          className="absolute inset-y-0 left-[7%] hidden w-px md:block"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent,
              ${PAPER}08 20%,
              ${PAPER}08 80%,
              transparent
            )`,
          }}
        />

        <div
          className="absolute inset-y-0 right-[7%] hidden w-px md:block"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent,
              ${PAPER}08 20%,
              ${PAPER}08 80%,
              transparent
            )`,
          }}
        />
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="container-page relative py-24 md:py-32 lg:py-40">
        {/* ====================================================
            INTRO
        ==================================================== */}

        <motion.div
          variants={premiumStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={premiumReveal}>
            <Eyebrow>
              Begin the next chapter
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={premiumReveal}
            className="mt-8 font-display text-[clamp(3rem,7vw,6.7rem)] font-normal leading-[0.88] tracking-[-0.055em]"
          >
            Your old car.
            <br />

            <span
              className="italic"
              style={{
                color: GOLD,
              }}
            >
              Your next one.
            </span>
          </motion.h2>

          <motion.p
            variants={premiumReveal}
            className="mx-auto mt-8 max-w-lg text-[12px] leading-6 md:text-[13px]"
            style={{
              color: `${PAPER}62`,
            }}
          >
            A considered way to change cars. We take care
            of the valuation, the numbers and the details —
            so you can concentrate on what comes next.
          </motion.p>
        </motion.div>

        {/* ====================================================
            PROCESS
        ==================================================== */}

        <div className="relative mt-24 md:mt-32">
          {/* Desktop connecting line */}

          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[5px] hidden h-px md:block"
            style={{
              background: `linear-gradient(
                90deg,
                transparent,
                ${GOLD}22 15%,
                ${GOLD}55 50%,
                ${GOLD}22 85%,
                transparent
              )`,
            }}
          />

          {/* ==================================================
              PROCESS ITEMS
          ================================================== */}

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
            />

            <Station
              icon={Landmark}
              number="02"
              title="Settle the numbers with confidence."
              description="We work with trusted finance partners on eligible vehicles and explain the options clearly before you make a decision."
              href="/contact"
              ctaLabel="Explore financing"
            />
          </motion.div>
        </div>

        {/* ====================================================
            VERTICAL DIVIDER
        ==================================================== */}

        <motion.div
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-hidden="true"
          className="mx-auto mt-24 h-24 w-px origin-top md:mt-32 md:h-32"
          style={{
            background: `linear-gradient(
              to bottom,
              ${GOLD}00,
              ${GOLD}65 50%,
              ${GOLD}00
            )`,
          }}
        />

        {/* ====================================================
            DESTINATION
        ==================================================== */}

        <motion.div
          variants={premiumStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-2 max-w-4xl text-center md:mt-4"
        >
          <motion.div variants={premiumReveal}>
            <Eyebrow>
              Your next destination
            </Eyebrow>
          </motion.div>

          <motion.h3
            variants={premiumReveal}
            className="mt-8 font-display text-[clamp(2.7rem,5.5vw,5.2rem)] font-normal leading-[0.94] tracking-[-0.05em]"
          >
            Find the car
            <br />

            <span
              className="italic"
              style={{
                color: `${PAPER}D8`,
              }}
            >
              that feels right.
            </span>
          </motion.h3>

          <motion.p
            variants={premiumReveal}
            className="mx-auto mt-7 max-w-md text-[12px] leading-6"
            style={{
              color: `${PAPER}58`,
            }}
          >
            Every vehicle inspected. Every document
            verified. Every important detail considered
            before you arrive.
          </motion.p>

          {/* ==================================================
              CTA GROUP
          ================================================== */}

          <motion.div
            variants={premiumReveal}
            className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Primary CTA */}

            <Link
              href="/inventory"
              className={cn(
                buttonVariants({
                  variant: "brass",
                  size: "lg",
                }),
                "group relative h-12 overflow-hidden rounded-full px-8 text-[10px] uppercase tracking-[0.18em]"
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

            {/* Secondary CTA */}

            <Link
              href="/contact"
              className="group flex h-12 items-center gap-2 rounded-full px-6 text-[10px] uppercase tracking-[0.18em]"
              style={{
                color: `${PAPER}A0`,
              }}
            >
              Speak with us

              <ChevronRight
                size={13}
                strokeWidth={1.3}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ====================================================
            TRUST STRIP
        ==================================================== */}

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
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-24 max-w-3xl border-t pt-8 md:mt-32"
          style={{
            borderColor: `${PAPER}0C`,
          }}
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <TrustItem
              icon={ShieldCheck}
              label="Inspected vehicles"
            />

            <TrustItem
              icon={Check}
              label="Verified documentation"
            />

            <TrustItem
              icon={Sparkles}
              label="Straightforward buying"
            />
          </div>
        </motion.div>

        {/* ====================================================
            SIGNATURE
        ==================================================== */}

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
            className="font-display text-[11px] italic"
            style={{
              color: `${PAPER}32`,
            }}
          >
            Take your time. Choose well.
          </p>
        </motion.div>
      </div>
    </section>
  );
}