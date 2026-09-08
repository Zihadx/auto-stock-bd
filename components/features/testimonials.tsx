"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { BURGUNDY, CHARCOAL, GOLD, PAPER, PINK } from "../ui/tokens";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: "01",
    quote:
      "I'd been burned by odometer fraud once before. The inspection report here caught things I wouldn't have known to check for myself.",
    name: "Farhan Kabir",
    detail: "2021 Range Rover · Gulshan",
  },
  {
    id: "02",
    quote:
      "No back-and-forth over price. The number matched the car when it arrived, which is rarer than it should be in this market.",
    name: "Mahin Rahman",
    detail: "2020 BMW 5 Series · Chattogram",
  },
  {
    id: "03",
    quote:
      "Sold my car in eleven days at the price they quoted on day one. Handled the transfer paperwork so I didn't have to chase anyone.",
    name: "Nusrat Jahan",
    detail: "2019 Honda CR-V · Dhaka",
  },
] as const;

// Featured card is always the first entry; the rest render as the
// secondary pair. Derived instead of indexed so re-ordering the array
// above can't silently mis-map which card is "featured".
const [FEATURED_TESTIMONIAL, ...SECONDARY_TESTIMONIALS] = TESTIMONIALS;

// ============================================================
// COLOR — a single, typo-proof way to apply alpha to the hex
// tokens from ../ui/tokens. Replaces ~30 hand-written `${COLOR}XX`
// hex-alpha suffixes, one of which (`${PAPER}015`) was invalid CSS
// (hex-alpha needs exactly 2 digits) and silently failed to render.
// ============================================================

function alpha(hex: string, opacityPct: number) {
  const clamped = Math.max(0, Math.min(1, opacityPct));
  const a = Math.round(clamped * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}

// ============================================================
// MOTION — durations here are intentionally slower than the app's
// default scale (this section is meant to feel cinematic), but the
// *curve* still comes from the shared lib/motion `ease` tokens so
// every animated section eases the same way, per that file's own
// "pull from here, don't invent your own" convention.
// ============================================================

const reveal: Variants = {
  hidden: { opacity: 0, y: 35, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: ease.out },
  },
};

const glassReveal: Variants = {
  hidden: { opacity: 0, y: 45, scale: 0.97, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: ease.out },
  },
};

// Lighter version of `reveal`, for elements that shouldn't fight for
// attention with the headline/cards (trust bar, closing signature).
const softReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: ease.out },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.12 } },
};

// ============================================================
// SHARED STYLE HELPERS — the frosted-glass panel treatment and the
// architectural vertical divider were each hand-rolled twice with
// identical values; centralized so the two copies can't drift apart.
// ============================================================

function glassPanelStyle({
  borderOpacity = 0.07,
  shadowOpacity = 0.55,
}: {
  borderOpacity?: number;
  shadowOpacity?: number;
} = {}) {
  return {
    background: `linear-gradient(135deg, ${alpha(PAPER, 0.05)} 0%, ${alpha(
      PAPER,
      0.02,
    )} 38%, ${alpha(PAPER, 0.01)} 100%)`,
    border: `1px solid ${alpha(PAPER, borderOpacity)}`,
    boxShadow: `inset 0 1px 0 ${alpha(PAPER, 0.06)}, inset 0 -1px 0 ${alpha(
      CHARCOAL,
      0.25,
    )}, 0 30px 80px ${alpha(CHARCOAL, shadowOpacity)}`,
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  } as const;
}

function ArchitecturalDivider({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-y-0 hidden w-px md:block",
        side === "left" ? "left-[6%]" : "right-[6%]",
      )}
      style={{
        background: `linear-gradient(to bottom, transparent, ${alpha(
          PAPER,
          0.03,
        )} 20%, ${alpha(PAPER, 0.03)} 80%, transparent)`,
      }}
    />
  );
}

// ============================================================
// GLASS TESTIMONIAL
// ============================================================

function TestimonialCard({
  testimonial,
  featured = false,
  reduceMotion,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  featured?: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.figure
      variants={glassReveal}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -8, transition: { duration: 0.45, ease: ease.out } }
      }
      className={cn(
        "group relative overflow-hidden rounded-[28px]",
        featured
          ? "min-h-[390px] md:min-h-[470px]"
          : "min-h-[310px] md:min-h-[350px]",
      )}
      style={glassPanelStyle()}
    >
      {/* ======================================================
          GLASS REFLECTION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${alpha(
            PAPER,
            0.21,
          )}, transparent)`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-28 h-56 w-56 rounded-full blur-[80px] opacity-30 transition-opacity duration-700 group-hover:opacity-60"
        style={{ backgroundColor: GOLD }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-32 w-full opacity-40"
        style={{
          background: `linear-gradient(to top, ${alpha(CHARCOAL, 0.21)}, transparent)`,
        }}
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="relative flex h-full flex-col p-7 md:p-9">
        {/* Top metadata */}
        <div className="flex items-center justify-between">
          <span
            className="font-display text-[11px] italic"
            style={{ color: alpha(GOLD, 0.65) }}
          >
            {testimonial.id}
          </span>

          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              backgroundColor: alpha(PAPER, 0.02),
              border: `1px solid ${alpha(PAPER, 0.06)}`,
            }}
          >
            <Quote size={14} strokeWidth={1} style={{ color: alpha(GOLD, 0.63) }} />
          </div>
        </div>

        {/* Quote */}
        <blockquote
          className={cn(
            "mt-10 font-display font-normal leading-[1.2] tracking-[-0.025em]",
            featured
              ? "text-[clamp(1.5rem,2.6vw,2.15rem)]"
              : "text-[clamp(1.25rem,2vw,1.65rem)]",
          )}
        >
          <span style={{ color: alpha(PAPER, 0.84) }}>&ldquo;</span>
          <span
            className="transition-colors duration-500 group-hover:text-white"
            style={{ color: alpha(PAPER, 0.72) }}
          >
            {testimonial.quote}
          </span>
          <span style={{ color: alpha(GOLD, 0.69) }}>&rdquo;</span>
        </blockquote>

        {/* Bottom author */}
        <figcaption className="mt-auto pt-10">
          <div className="flex items-center gap-3">
            <div
              className="h-px w-8"
              style={{
                background: `linear-gradient(to right, ${alpha(GOLD, 0.56)}, transparent)`,
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: PAPER }}
            >
              {testimonial.name}
            </span>
          </div>
          <p
            className="mt-2 pl-11 text-[9px] uppercase tracking-[0.12em]"
            style={{ color: alpha(PAPER, 0.26) }}
          >
            {testimonial.detail}
          </p>
        </figcaption>
      </div>

      {/* ======================================================
          HOVER BORDER
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${alpha(GOLD, 0.15)}` }}
      />
    </motion.figure>
  );
}

// ============================================================
// MAIN
// ============================================================

export function Testimonials() {
  // Computed once here and threaded down as a prop, rather than each
  // TestimonialCard calling useReducedMotion() independently.
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: CHARCOAL, color: PAPER }}
    >
      {/* ======================================================
          CINEMATIC BACKGROUND
      ====================================================== */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Main burgundy light */}
        <motion.div
          className="absolute -left-[15%] top-[10%] h-[600px] w-[600px] rounded-full blur-[170px]"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 50, 0], y: [0, 25, 0], opacity: [0.3, 0.45, 0.3] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: alpha(BURGUNDY, 0.14) }}
        />

        {/* Gold light */}
        <motion.div
          className="absolute right-[-10%] top-[25%] h-[520px] w-[520px] rounded-full blur-[170px]"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -40, 0], y: [0, 40, 0], opacity: [0.05, 0.1, 0.05] }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: GOLD }}
        />

        {/* Pink lower glow */}
        <div
          className="absolute bottom-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[180px]"
          style={{ backgroundColor: alpha(PINK, 0.03) }}
        />

        {/* Giant typography — fixed: was an invalid 3-digit hex-alpha
            suffix (`${PAPER}015`) that the browser silently dropped. */}
        <span
          className="absolute -left-4 top-[18%] select-none font-display text-[20vw] font-normal leading-none tracking-[-0.08em]"
          style={{ color: alpha(PAPER, 0.02) }}
        >
          &ldquo;
        </span>

        <ArchitecturalDivider side="left" />
        <ArchitecturalDivider side="right" />
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-9 lg:px-14 xl:px-20">
        {/* ==================== HEADER ==================== */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={reveal} className="flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: alpha(GOLD, 0.46) }} />
            <span
              className="text-[9px] uppercase tracking-[0.32em]"
              style={{ color: alpha(PAPER, 0.33) }}
            >
              Owners&apos; journal
            </span>
            <span className="h-px w-8" style={{ backgroundColor: alpha(GOLD, 0.46) }} />
          </motion.div>

          <motion.h2
            variants={reveal}
            className="mt-8 font-display text-[clamp(3rem,6vw,6rem)] font-normal leading-[0.88] tracking-[-0.06em]"
          >
            <span style={{ color: PAPER }}>Chosen by people</span>
            <br />
            <span className="italic" style={{ color: GOLD }}>
              who know cars.
            </span>
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mx-auto mt-8 max-w-md text-[11px] leading-6"
            style={{ color: alpha(PAPER, 0.3) }}
          >
            Real experiences from people who trusted us with one of the
            biggest decisions behind the wheel.
          </motion.p>
        </motion.div>

        {/* ==================== FEATURED TESTIMONIAL ==================== */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mx-auto mt-20 max-w-5xl md:mt-28"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[40px] blur-[70px]"
            style={{
              background: `radial-gradient(circle, ${alpha(GOLD, 0.03)} 0%, transparent 65%)`,
            }}
          />

          <div className="relative">
            <TestimonialCard testimonial={FEATURED_TESTIMONIAL} featured reduceMotion={reduceMotion} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ duration: 0.8, delay: 0.35, ease: ease.out }}
              className="absolute -right-3 -top-4 hidden rounded-full px-4 py-2.5 md:flex md:items-center md:gap-2"
              style={{
                backgroundColor: alpha(CHARCOAL, 0.8),
                border: `1px solid ${alpha(GOLD, 0.13)}`,
                boxShadow: `0 15px 40px ${alpha(CHARCOAL, 0.44)}`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <ShieldCheck size={12} strokeWidth={1.3} style={{ color: GOLD }} />
              <span
                className="text-[8px] uppercase tracking-[0.18em]"
                style={{ color: alpha(PAPER, 0.44) }}
              >
                Verified owner
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* ==================== SECONDARY TESTIMONIALS ==================== */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-6 grid max-w-5xl gap-6 md:grid-cols-2"
        >
          {SECONDARY_TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        {/* ==================== TRUST / BOTTOM GLASS BAR ==================== */}
        <motion.div
          variants={softReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-16 max-w-5xl rounded-[24px] p-[1px] md:mt-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${alpha(GOLD, 0.13)}, ${alpha(
              PAPER,
              0.06,
            )}, ${alpha(GOLD, 0.13)}, transparent)`,
          }}
        >
          <div
            className="rounded-[23px] px-6 py-6 md:px-9"
            style={{
              background: alpha(CHARCOAL, 0.8),
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Trust statement */}
              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: alpha(GOLD, 0.04),
                    border: `1px solid ${alpha(GOLD, 0.13)}`,
                  }}
                >
                  <Sparkles size={15} strokeWidth={1.15} style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="font-display text-[13px]" style={{ color: alpha(PAPER, 0.71) }}>
                    The difference is in the details.
                  </p>
                  <p
                    className="mt-1 text-[9px] uppercase tracking-[0.12em]"
                    style={{ color: alpha(PAPER, 0.22) }}
                  >
                    Inspected · verified · considered
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/inventory"
                className="group inline-flex items-center gap-3 self-start md:self-auto"
              >
                <span
                  className="text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: PAPER }}
                >
                  Explore inventory
                </span>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 group-hover:translate-x-1"
                  style={{
                    backgroundColor: alpha(GOLD, 0.05),
                    border: `1px solid ${alpha(GOLD, 0.16)}`,
                  }}
                >
                  <ArrowUpRight size={13} strokeWidth={1.25} style={{ color: GOLD }} />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ==================== SIGNATURE ==================== */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 1, delay: 0.35, ease: ease.out }}
          className="mt-14 text-center font-display text-[11px] italic md:mt-16"
          style={{ color: alpha(PAPER, 0.16) }}
        >
          Every journey leaves a story.
        </motion.p>
      </div>
    </section>
  );
}