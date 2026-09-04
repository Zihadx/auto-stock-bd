
"use client";

import Image from "next/image";
import { Cinzel, Inter } from "next/font/google";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
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
} from "lucide-react";

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
    icon: Star,
    value: "50+",
    label: "Exclusive Models",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Certified",
  },
  {
    icon: Gem,
    value: "World Class",
    label: "Experience",
  },
];

/* -------------------------------------------------------------------------- */
/* Collections                                                                */
/* -------------------------------------------------------------------------- */

const COLLECTIONS = [
  {
    icon: Zap,
    title: ["Supercar", "Collection"],
    copy:
      "Unleash the extraordinary. Relentless power meets iconic design.",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80",
    stats: [
      {
        icon: Car,
        value: "12",
        label: "Models",
      },
      {
        icon: Gauge,
        value: "200+",
        label: "MPH",
      },
      {
        icon: Zap,
        value: "700+",
        label: "HP",
      },
    ],
    iconText: "text-[#E5453E]",
    badgeBg: "bg-[#E5453E]/[0.14]",
    badgeBorder: "border-[#E5453E]/40",
    ctaBg: "bg-[#E5453E]",
    ctaIcon: "text-[#F3EEE6]",
  },
  {
    icon: Crown,
    title: ["Grand Touring", "Collection"],
    copy:
      "Timeless elegance. Unmatched comfort. Endless journeys.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    stats: [
      {
        icon: Car,
        value: "14",
        label: "Models",
      },
      {
        icon: Gem,
        value: "4K+",
        label: "Miles",
      },
      {
        icon: Sofa,
        value: "Luxury",
        label: "Interiors",
      },
    ],
    iconText: "text-[#CBA36B]",
    badgeBg: "bg-[#CBA36B]/[0.14]",
    badgeBorder: "border-[#CBA36B]/40",
    ctaBg: "bg-[#CBA36B]",
    ctaIcon: "text-[#0A0806]",
  },
  {
    icon: Leaf,
    title: ["Future", "Collection"],
    copy:
      "Sustainable innovation. Electric performance redefined.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80",
    stats: [
      {
        icon: Car,
        value: "10",
        label: "Models",
      },
      {
        icon: Leaf,
        value: "Zero",
        label: "Emission",
      },
      {
        icon: Cpu,
        value: "Next Gen",
        label: "Technology",
      },
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
}: {
  vertical?: boolean;
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
                    ? "mt-4 border-t border-[#F3EEE6]/[0.12] pt-4"
                    : ""
                }`
              : "flex flex-1 flex-col items-center gap-2 text-center"
          }
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CBA36B]/[0.14]">
            <Icon
              size={14}
              className="text-[#CBA36B]"
              aria-hidden="true"
            />
          </span>

          <div className="[font-family:var(--font-display)] text-sm font-semibold text-[#F3EEE6]">
            {value}
          </div>

          <div className="text-[9px] uppercase tracking-[0.12em] text-[#F3EEE6]/40">
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

export default function FeaturedCollections() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className={`${cinzel.variable} ${inter.variable} relative overflow-hidden py-20 sm:py-24 lg:py-28`}
      style={{
        backgroundColor: CHARCOAL,
        color: PAPER,
      }}
      variants={
        reducedMotion ? undefined : containerVariants
      }
      initial={
        reducedMotion ? undefined : "hidden"
      }
      whileInView={
        reducedMotion ? undefined : "show"
      }
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      <div className="container mx-auto">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: Copy */}

          <motion.div
            variants={
              reducedMotion
                ? undefined
                : itemVariants
            }
            className="flex flex-col lg:col-span-4"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#CBA36B]">
              Curated for connoisseurs
            </span>

            <h2 className="mt-3 [font-family:var(--font-display)] text-[2.15rem] font-semibold uppercase leading-[1.15] md:text-[2.5rem]">
              <span className="text-[#F3EEE6]">
                Featured
              </span>

              <br />

              <span className="text-[#CBA36B]">
                Collections
              </span>
            </h2>

            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-[#F3EEE6]/55">
              Handpicked masterpieces of engineering and
              design. Each collection is a statement of
              performance, luxury and prestige.
            </p>

            <button
              type="button"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-[#F3EEE6]/[0.12] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#F3EEE6] transition-colors duration-300 hover:bg-white/5"
            >
              Discover all collections

              <ArrowRight
                size={14}
                className="text-[#CBA36B]"
                aria-hidden="true"
              />
            </button>
          </motion.div>

          {/* Right: Hero Image */}

          <motion.div
            variants={
              reducedMotion
                ? undefined
                : itemVariants
            }
            className="lg:col-span-8"
          >
            <div className="relative h-72 overflow-hidden rounded-2xl md:h-80">
              <Image
                src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=80"
                alt="Featured car on a lit podium"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover saturate-[1.05] contrast-[1.05]"
                priority
              />

              {/* Warm gold backdrop wash */}

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(203,163,107,0.16)_0%,transparent_22%),linear-gradient(65deg,rgba(203,163,107,0.12)_0%,transparent_18%)]" />

              {/* Bottom fade */}

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0A0806_2%,rgba(10,8,6,0.15)_40%,rgba(10,8,6,0.05)_65%)]" />

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

              {/* Desktop stats */}

              <div className="absolute right-4 top-4 hidden w-32 flex-col rounded-2xl border border-[#F3EEE6]/[0.12] bg-[#0A0806]/[0.78] px-4 py-5 backdrop-blur-md lg:flex">
                <StatsList vertical />
              </div>
            </div>

            {/* Mobile / tablet stats */}

            <div className="mt-4 flex justify-between gap-4 rounded-2xl border border-[#F3EEE6]/[0.12] bg-[#0A0806]/[0.78] px-5 py-4 lg:hidden">
              <StatsList />
            </div>
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Collection Cards                                                 */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {COLLECTIONS.map((collection) => {
            const Icon = collection.icon;

            return (
              <motion.div
                key={collection.title.join(" ")}
                variants={
                  reducedMotion
                    ? undefined
                    : itemVariants
                }
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#F3EEE6]/[0.12] bg-[#0D0A07] transition-transform duration-500 hover:-translate-y-1"
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
                      className={collection.iconText}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                {/* Content */}

                <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
                  <span className="text-[10.5px] uppercase tracking-[0.18em] text-[#F3EEE6]/40">
                    The
                  </span>

                  <h3 className="mt-1 [font-family:var(--font-display)] text-xl font-semibold uppercase leading-snug text-[#F3EEE6]">
                    {collection.title[0]}
                    <br />
                    {collection.title[1]}
                  </h3>

                  <p className="mt-3 text-[13px] leading-relaxed text-[#F3EEE6]/55">
                    {collection.copy}
                  </p>

                  {/* Card footer */}

                  <div className="mt-auto flex items-center justify-between border-t border-[#F3EEE6]/[0.12] pt-5">
                    <div className="flex gap-4">
                      {collection.stats.map((stat) => {
                        const StatIcon = stat.icon;

                        return (
                          <div
                            key={stat.label}
                            className="flex items-start gap-1.5"
                          >
                            <StatIcon
                              size={12}
                              className={`mt-0.5 ${collection.iconText}`}
                              aria-hidden="true"
                            />

                            <div className="leading-tight">
                              <div className="text-[12px] font-medium text-[#F3EEE6]">
                                {stat.value}
                              </div>

                              <div className="text-[8.5px] uppercase tracking-[0.1em] text-[#F3EEE6]/40">
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

