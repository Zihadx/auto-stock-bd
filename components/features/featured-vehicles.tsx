"use client";

import Image from "next/image";
import { Cinzel, Inter } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Gem,
  Zap,
  Crown,
  Leaf,
  Car,
  Gauge,
  Sofa,
  Cpu,
  ArrowRight,
  Flame,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "next-themes";
import { CHARCOAL, PAPER } from "../ui/tokens";

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
/* Headline Stats                                                             */
/* -------------------------------------------------------------------------- */

const HEADLINE_STATS = [
  {
    icon: TrendingUp,
    value: "Top 10",
    label: "Best Sellers",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Certified",
  },
  {
    icon: Flame,
    value: "High",
    label: "Demand",
  },
];

/* -------------------------------------------------------------------------- */
/* Hot Selling Collections                                                    */
/* -------------------------------------------------------------------------- */

const COLLECTIONS = [
  {
    icon: Flame,
    title: ["Supercar", "Best Sellers"],
    copy: "The machines everyone wants. Iconic design, breathtaking performance and unmistakable presence.",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80",
    stats: [
      { icon: Car, value: "12", label: "Hot Models" },
      { icon: Gauge, value: "200+", label: "MPH" },
      { icon: Zap, value: "700+", label: "HP" },
    ],
    iconText: "text-[#E5453E]",
    badgeBg: "bg-[#E5453E]/[0.14]",
    badgeBorder: "border-[#E5453E]/40",
    ctaBg: "bg-[#E5453E]",
    ctaIcon: "text-[#F3EEE6]",
  },
  {
    icon: Crown,
    title: ["Grand Touring", "Most Wanted"],
    copy: "Our most sought-after luxury cruisers, chosen for refined comfort, timeless design and effortless performance.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    stats: [
      { icon: Car, value: "14", label: "Top Models" },
      { icon: Gem, value: "4K+", label: "Miles" },
      { icon: Sofa, value: "Luxury", label: "Interiors" },
    ],
    iconText: "text-[#CBA36B]",
    badgeBg: "bg-[#CBA36B]/[0.14]",
    badgeBorder: "border-[#CBA36B]/40",
    ctaBg: "bg-[#CBA36B]",
    ctaIcon: "text-[#0A0806]",
  },
  {
    icon: Leaf,
    title: ["Electric", "Trending Now"],
    copy: "The future is already here. Discover the electric models creating the strongest demand right now.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80",
    stats: [
      { icon: Car, value: "10", label: "Hot Models" },
      { icon: Leaf, value: "Zero", label: "Emission" },
      { icon: Cpu, value: "Next Gen", label: "Technology" },
    ],
    iconText: "text-[#33C9B0]",
    badgeBg: "bg-[#33C9B0]/[0.14]",
    badgeBorder: "border-[#33C9B0]/40",
    ctaBg: "bg-[#33C9B0]",
    ctaIcon: "text-[#0A0806]",
  },
];

/* -------------------------------------------------------------------------- */
/* Motion Variants                                                            */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

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
      {HEADLINE_STATS.map(({ icon: Icon, value, label }, index) => (
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
          {" "}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CBA36B]/[0.16]">
            {" "}
            <Icon
              size={14}
              className="text-[#CBA36B]"
              strokeWidth={1.8}
              aria-hidden="true"
            />{" "}
          </span>
          <div
            className={`[font-family:var(--font-display)] text-[15px] font-semibold ${
              isLight ? "text-[#171512]" : "text-[#F3EEE6]"
            }`}
          >
            {value}
          </div>
          <div
            className={`text-[10px] font-medium uppercase tracking-[0.12em] ${
              isLight ? "text-[#3E3932]" : "text-[#F3EEE6]"
            }`}
          >
            {label}
          </div>
        </div>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function HotSelling() {
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const sectionBackground = isLight ? "#F5F3EE" : CHARCOAL;
  const headingColor = isLight ? "#171512" : PAPER;
  const bodyColor = isLight ? "#171512" : PAPER;

  /* Stronger, more visible text */
  const mutedColor = isLight ? "#38342E" : PAPER;
  const subtleColor = isLight ? "#454039" : PAPER;

  /* Stronger borders */
  const borderColor = isLight
    ? "rgba(23,21,18,0.16)"
    : "rgba(243,238,230,0.18)";

  return (
    <motion.section
      className={`${cinzel.variable} ${inter.variable} relative overflow-hidden py-20 sm:py-24 lg:py-28`}
      style={{
        backgroundColor: sectionBackground,
        color: bodyColor,
      }}
      variants={reducedMotion ? undefined : containerVariants}
      initial={reducedMotion ? undefined : "hidden"}
      whileInView={reducedMotion ? undefined : "show"}
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isLight
            ? "radial-gradient(circle at 75% 15%, rgba(203,163,107,0.12), transparent 30%), radial-gradient(circle at 10% 80%, rgba(229,69,62,0.045), transparent 28%)"
            : "radial-gradient(circle at 75% 15%, rgba(203,163,107,0.08), transparent 30%), radial-gradient(circle at 10% 80%, rgba(229,69,62,0.05), transparent 28%)",
        }}
      />

      <div className="container relative mx-auto">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: Copy */}
          <motion.div
            variants={reducedMotion ? undefined : itemVariants}
            className="flex flex-col lg:col-span-4"
          >
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E5453E]">
              <Flame size={13} strokeWidth={2} aria-hidden="true" />
              Most wanted right now
            </span>

            <h2 className="mt-3 [font-family:var(--font-display)] text-[2.15rem] font-semibold uppercase leading-[1.15] md:text-[2.5rem]">
              <span style={{ color: headingColor }}>Hot Selling</span>

              <br />

              <span className="text-[#CBA36B]">Collection</span>
            </h2>

            <p
              className="mt-5 max-w-xs text-[14px] leading-relaxed sm:text-[15px]"
              style={{ color: mutedColor }}
            >
              Discover the vehicles creating the most attention right now. From
              high-performance icons to refined luxury and next-generation
              electric machines.
            </p>

            <button
              type="button"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                border: `1px solid ${borderColor}`,
                color: headingColor,
                backgroundColor: isLight
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(243,238,230,0.04)",
              }}
            >
              Explore best sellers
              <ArrowRight
                size={14}
                strokeWidth={1.8}
                className="text-[#CBA36B]"
                aria-hidden="true"
              />
            </button>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            variants={reducedMotion ? undefined : itemVariants}
            className="lg:col-span-8"
          >
            <div
              className="relative h-72 overflow-hidden rounded-2xl md:h-80"
              style={{
                boxShadow: isLight
                  ? "0 18px 50px rgba(20,18,15,0.08)"
                  : "0 18px 50px rgba(0,0,0,0.20)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=80"
                alt="Best selling luxury performance car"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover saturate-[1.05] contrast-[1.05]"
                priority
              />

              {/* Warm backdrop wash */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(203,163,107,0.16)_0%,transparent_22%),linear-gradient(65deg,rgba(229,69,62,0.10)_0%,transparent_18%)]" />

              {/* Bottom fade */}
              <div
                className={`pointer-events-none absolute inset-0 ${
                  isLight
                    ? "bg-[linear-gradient(to_top,rgba(20,18,15,0.72)_2%,rgba(20,18,15,0.12)_42%,transparent_68%)]"
                    : "bg-[linear-gradient(to_top,#0A0806_2%,rgba(10,8,6,0.15)_40%,rgba(10,8,6,0.05)_65%)]"
                }`}
              />

              {/* Podium arc */}
              <svg
                className="pointer-events-none absolute -bottom-10 left-1/2 h-[60px] w-[92%] -translate-x-1/2"
                viewBox="0 0 800 60"
                fill="none"
                aria-hidden="true"
              >
                <ellipse
                  cx="400"
                  cy="10"
                  rx="380"
                  ry="10"
                  fill="none"
                  stroke="#CBA36B"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Hot badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[#E5453E]/40 bg-[#0A0806]/[0.76] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F3EEE6] backdrop-blur-md">
                <Flame
                  size={12}
                  strokeWidth={2}
                  className="text-[#E5453E]"
                  aria-hidden="true"
                />
                High Demand
              </div>

              {/* Desktop stats */}
              <div
                className="absolute right-4 top-4 hidden w-32 flex-col rounded-2xl px-4 py-5 backdrop-blur-md lg:flex"
                style={{
                  border: `1px solid ${
                    isLight
                      ? "rgba(255,255,255,0.38)"
                      : "rgba(243,238,230,0.18)"
                  }`,
                  backgroundColor: isLight
                    ? "rgba(20,18,15,0.72)"
                    : "rgba(10,8,6,0.80)",
                }}
              >
                <StatsList vertical isLight={isLight} />
              </div>
            </div>

            {/* Mobile / tablet stats */}
            <div
              className="mt-4 flex justify-between gap-4 rounded-2xl px-5 py-4 lg:hidden"
              style={{
                border: `1px solid ${borderColor}`,
                backgroundColor: isLight
                  ? "rgba(255,255,255,0.68)"
                  : "rgba(10,8,6,0.80)",
                boxShadow: isLight ? "0 10px 30px rgba(20,18,15,0.05)" : "none",
              }}
            >
              <StatsList isLight={isLight} />
            </div>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Hot Selling Cards                                                 */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {COLLECTIONS.map((collection) => {
            const Icon = collection.icon;

            return (
              <motion.div
                key={collection.title.join(" ")}
                variants={reducedMotion ? undefined : itemVariants}
                className="group flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1"
                style={{
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight
                    ? "rgba(255,255,255,0.70)"
                    : "#0D0A07",
                  boxShadow: isLight
                    ? "0 12px 40px rgba(20,18,15,0.06)"
                    : "none",
                }}
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title.join(" ")}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0A0806_8%,rgba(10,8,6,0.4)_50%,transparent_85%)]" />

                  {/* Collection icon */}
                  <span
                    className={`absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border ${collection.badgeBg} ${collection.badgeBorder}`}
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.8}
                      className={collection.iconText}
                      aria-hidden="true"
                    />
                  </span>

                  {/* Trending label */}
                  <span className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-[#0A0806]/75 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F3EEE6] backdrop-blur-md">
                    Trending
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.18em]"
                    style={{ color: subtleColor }}
                  >
                    Most wanted
                  </span>

                  <h3
                    className="mt-1 [font-family:var(--font-display)] text-xl font-semibold uppercase leading-snug"
                    style={{ color: headingColor }}
                  >
                    {collection.title[0]}
                    <br />
                    {collection.title[1]}
                  </h3>

                  <p
                    className="mt-3 text-[14px] leading-relaxed"
                    style={{ color: mutedColor }}
                  >
                    {collection.copy}
                  </p>

                  {/* Card footer */}
                  <div
                    className="mt-auto flex items-center justify-between pt-5"
                    style={{
                      borderTop: `1px solid ${borderColor}`,
                    }}
                  >
                    <div className="flex gap-4">
                      {collection.stats.map((stat) => {
                        const StatIcon = stat.icon;

                        return (
                          <div
                            key={stat.label}
                            className="flex items-start gap-1.5"
                          >
                            <StatIcon
                              size={13}
                              strokeWidth={1.8}
                              className={`mt-0.5 ${collection.iconText}`}
                              aria-hidden="true"
                            />

                            <div className="leading-tight">
                              <div
                                className="text-[13px] font-semibold"
                                style={{
                                  color: headingColor,
                                }}
                              >
                                {stat.value}
                              </div>

                              <div
                                className="text-[9px] font-medium uppercase tracking-[0.1em]"
                                style={{
                                  color: subtleColor,
                                }}
                              >
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      aria-label={`Explore ${collection.title.join(" ")}`}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${collection.ctaBg}`}
                    >
                      <ArrowRight
                        size={14}
                        strokeWidth={1.9}
                        className={collection.ctaIcon}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
