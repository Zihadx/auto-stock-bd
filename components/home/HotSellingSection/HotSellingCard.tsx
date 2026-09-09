import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Car } from "lucide-react";

import { ACCENTS, type Theme } from "./theme";
import { cardHover, cardVariants } from "./animations";
import { VEHICLE_DETAIL_BASE, type HotCardData } from "./utils";

interface HotSellingCardProps {
  data: HotCardData;
  theme: Theme;
  motionOn: boolean;
}

export const HotSellingCard = memo(function HotSellingCard({ data, theme, motionOn }: HotSellingCardProps) {
  const { FuelIcon } = data;
  const accent = ACCENTS[data.accentIndex];
  const href = `${VEHICLE_DETAIL_BASE}/${data.slug}`;

  return (
    <motion.div variants={motionOn ? cardVariants : undefined} whileHover={motionOn ? cardHover : undefined} className="group h-full">
      <Link
        href={href}
        aria-label={`View details for ${data.brand} ${data.model}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl outline-none transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-[#CBA36B]"
        style={{ border: `1px solid ${theme.border}`, backgroundColor: theme.cardBg, boxShadow: theme.cardShadow }}
      >
        <div className="relative h-48 w-full overflow-hidden">
          {data.image ? (
            <Image
              src={data.image}
              alt={`${data.brand} ${data.model}`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: theme.cardBg }}>
              <Car size={42} strokeWidth={1} className="text-[#CBA36B]/50" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0A0806_8%,rgba(10,8,6,0.4)_50%,transparent_85%)]" />

          <span
            className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            style={{ backgroundColor: accent.badgeBg, borderColor: accent.badgeBorder }}
          >
            <FuelIcon size={16} strokeWidth={1.8} style={{ color: accent.text }} aria-hidden="true" />
          </span>

          <span className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-[#0A0806]/75 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F3EEE6] backdrop-blur-md">
            {data.inquiryCount} Inquiries
          </span>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: theme.subtle }}>
            Most wanted
          </span>

          <h3 className="mt-1 [font-family:var(--font-display)] text-xl font-semibold uppercase leading-snug" style={{ color: theme.heading }}>
            {data.brand}
            <br />
            {data.model}
          </h3>

          <p className="mt-3 text-[14px] leading-relaxed" style={{ color: theme.muted }}>
            {data.copy}
          </p>

          <div className="mt-auto flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${theme.border}` }}>
            <div className="flex gap-4">
              {data.stats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-start gap-1.5">
                    <StatIcon size={13} strokeWidth={1.8} className="mt-0.5" style={{ color: accent.text }} aria-hidden="true" />
                    <div className="leading-tight">
                      <div className="text-[13px] font-semibold" style={{ color: theme.heading }}>
                        {stat.value}
                      </div>
                      <div className="text-[9px] font-medium uppercase tracking-[0.1em]" style={{ color: theme.subtle }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:scale-105"
              style={{ backgroundColor: accent.cta }}
            >
              <ArrowRight size={14} strokeWidth={1.9} style={{ color: accent.ctaIcon }} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

HotSellingCard.displayName = "HotSellingCard";

export function HotSellingCardSkeleton({ theme }: { theme: Theme }) {
  return (
    <div
      className="h-[420px] animate-pulse rounded-2xl"
      style={{ border: `1px solid ${theme.border}`, backgroundColor: theme.cardBg }}
    />
  );
}