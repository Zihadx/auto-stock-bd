"use client";

import {
  BadgeCheck,
  Headphones,
  HandCoins,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ACCENT, CHARCOAL, PAPER } from "../ui/tokens";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

const BENEFITS: Benefit[] = [
  {
    title: "Best Price Guarantee",
    description: "Get the best offers on every car.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted Dealers",
    description: "Verified dealers, 100% reliable.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "We are here to help you anytime.",
    icon: Headphones,
  },
  {
    title: "Easy Financing",
    description: "Flexible finance options that fit your budget.",
    icon: HandCoins,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function BenefitsStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="w-full py-16" style={{ backgroundColor: CHARCOAL }}>
      <motion.div
        className="relative mx-auto w-full overflow-hidden rounded-2xl px-6 sm:px-9 lg:px-14 xl:px-20 container border"
        style={{
          borderColor: `${ACCENT}30`,
                    backgroundColor: `${ACCENT}14`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: `inset 0 1px 0 ${PAPER}0B`,
        }}
        variants={reducedMotion ? undefined : container}
        initial={reducedMotion ? undefined : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Glass top highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${PAPER}20, transparent)` }}
        />
        {/* Ambient accent glow — one, quiet, not a decoration on every card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-[0.12] blur-[90px]"
          style={{ backgroundColor: ACCENT }}
        />

        <div className="relative grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0 " style={{ borderColor: `${PAPER}12` }}>
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                variants={item}
                className="group flex min-h-[112px] items-center gap-4 px-6 py-7 transition-colors duration-300 hover:bg-white/[0.03] sm:px-7 lg:px-6 xl:px-8"
                style={{ borderColor: `${PAPER}12` }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
                  style={{
                    borderColor: `${ACCENT}30`,
                    backgroundColor: `${ACCENT}14`,
                    color: ACCENT,
                  }}
                >
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h3
                    className="text-[13px] font-medium leading-tight tracking-[-0.01em]"
                    style={{ color: PAPER }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="mt-1 max-w-[180px] text-[11px] font-normal leading-[1.5]"
                    style={{ color: `${PAPER}75` }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}