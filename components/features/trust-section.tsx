
"use client";

import {
  BadgeCheck,
  Headphones,
  HandCoins,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import {
  ACCENT,
  CHARCOAL,
  PAPER,
} from "../ui/tokens";

/* ================================================================
   HYDRATION-SAFE THEME DETECTION
================================================================ */

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/* ================================================================
   TYPES
================================================================ */

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

/* ================================================================
   BENEFITS
================================================================ */

const BENEFITS: Benefit[] = [
  {
    title: "Best Price Guarantee",
    description:
      "Get the best offers on every car.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted Dealers",
    description:
      "Verified dealers, 100% reliable.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description:
      "We are here to help you anytime.",
    icon: Headphones,
  },
  {
    title: "Easy Financing",
    description:
      "Flexible finance options that fit your budget.",
    icon: HandCoins,
  },
];

/* ================================================================
   MOTION
================================================================ */

const EASE = [
  0.16,
  1,
  0.3,
  1,
] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

/* ================================================================
   COMPONENT
================================================================ */

export default function BenefitsStrip() {
  const reducedMotion = useReducedMotion();

  const { resolvedTheme } = useTheme();

  const mounted = useMounted();

  /*
   * Dark is used as the SSR fallback so the initial render
   * remains stable during hydration.
   */
  const isDark =
    !mounted ||
    resolvedTheme === "dark";

  /* ================================================================
     THEME TOKENS
  ================================================================ */

  const sectionBackground = isDark
    ? CHARCOAL
    : "#F5F4F0";

  const surfaceBackground = isDark
    ? `${ACCENT}14`
    : "rgba(255,255,255,0.68)";

  const surfaceBorder = isDark
    ? `${ACCENT}30`
    : "rgba(0,0,0,0.09)";

  const dividerColor = isDark
    ? `${PAPER}12`
    : "rgba(0,0,0,0.08)";

  const titleColor = isDark
    ? PAPER
    : "#111111";

  const descriptionColor = isDark
    ? `${PAPER}75`
    : "rgba(17,17,17,0.58)";

  const iconBackground = isDark
    ? `${ACCENT}14`
    : `${ACCENT}0D`;

  const iconBorder = isDark
    ? `${ACCENT}30`
    : `${ACCENT}35`;

  const hoverBackground = isDark
    ? "rgba(255,255,255,0.03)"
    : "rgba(0,0,0,0.025)";

  const highlightColor = isDark
    ? `${PAPER}20`
    : "rgba(255,255,255,0.85)";

  /* ================================================================
     RENDER
  ================================================================ */

  return (
    <section
      className="w-full px-4 py-16"
      style={{
        backgroundColor:
          sectionBackground,
      }}
    >
      <motion.div
        className="
          relative mx-auto w-full
          overflow-hidden rounded-2xl
          border px-6
          sm:px-9
          lg:px-14
          xl:px-20
          container
        "
        style={{
          borderColor: surfaceBorder,
          backgroundColor:
            surfaceBackground,

          backdropFilter:
            "blur(20px)",

          WebkitBackdropFilter:
            "blur(20px)",

          boxShadow: isDark
            ? `inset 0 1px 0 ${PAPER}0B`
            : "inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
        variants={
          reducedMotion
            ? undefined
            : container
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
          amount: 0.3,
        }}
      >
        {/* ========================================================
            GLASS TOP HIGHLIGHT
        ======================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            h-px
          "
          style={{
            background: `linear-gradient(
              90deg,
              transparent,
              ${highlightColor},
              transparent
            )`,
          }}
        />

        {/* ========================================================
            AMBIENT ACCENT GLOW
        ======================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-16 -top-16
            h-56 w-56
            rounded-full
            opacity-[0.12]
            blur-[90px]
          "
          style={{
            backgroundColor: ACCENT,
          }}
        />

        {/* ========================================================
            BENEFITS GRID
        ======================================================== */}

        <div
          className="
            relative grid
            grid-cols-1
            divide-y
            sm:grid-cols-2
            sm:divide-y-0
            lg:grid-cols-4
            lg:divide-x
            lg:divide-y-0
          "
          style={{
            borderColor: dividerColor,
          }}
        >
          {BENEFITS.map(
            (benefit) => {
              const Icon =
                benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  variants={item}
                  className="
                    group flex min-h-[112px]
                    items-center gap-4
                    px-6 py-7
                    transition-colors
                    duration-300
                    sm:px-7
                    lg:px-6
                    xl:px-8
                  "
                  style={{
                    borderColor:
                      dividerColor,
                  }}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          backgroundColor:
                            hoverBackground,
                        }
                  }
                >
                  {/* ==================================================
                      ICON
                  ================================================== */}

                  <div
                    className="
                      flex h-11 w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      transition-all
                      duration-300
                      group-hover:scale-105
                    "
                    style={{
                      borderColor:
                        iconBorder,

                      backgroundColor:
                        iconBackground,

                      color: ACCENT,

                      boxShadow: isDark
                        ? "none"
                        : `0 4px 18px ${ACCENT}08`,
                    }}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>

                  {/* ==================================================
                      CONTENT
                  ================================================== */}

                  <div className="min-w-0">
                    <h3
                      className="
                        text-[13px]
                        font-medium
                        leading-tight
                        tracking-[-0.01em]
                      "
                      style={{
                        color:
                          titleColor,
                      }}
                    >
                      {benefit.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        max-w-[180px]
                        text-[11px]
                        font-normal
                        leading-[1.5]
                      "
                      style={{
                        color:
                          descriptionColor,
                      }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            },
          )}
        </div>
      </motion.div>
    </section>
  );
}
