"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Gauge } from "lucide-react";
import { useTheme } from "next-themes";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

import {
  ACCENT,
  BURGUNDY,
  CHARCOAL,
  GOLD,
  PAPER,
  PINK,
} from "../ui/tokens";
import { getRecentlyAddedVehicles } from "@/services/vehicle.service";
import { useMounted } from "@/hooks/use-mounted";

export function RecentlyAdded() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  // Before mount: always dark, matching defaultTheme="dark" and avoiding a
  // hydration flash. After mount: the real, stable, user-selected theme.
  const isLight = mounted && resolvedTheme === "light";

  const [recentlyAdded, setRecentlyAdded] = useState<
    Awaited<ReturnType<typeof getRecentlyAddedVehicles>>
  >([]);

  useEffect(() => {
    getRecentlyAddedVehicles(4).then(setRecentlyAdded);
  }, []);

  const sectionBackground = isLight ? "#F5F3EE" : CHARCOAL;
  const primaryText = isLight ? "#171512" : PAPER;

  const mutedText = isLight
    ? "rgba(23,21,18,0.62)"
    : `${PAPER}55`;

  const eyebrowColor = isLight
    ? "#8A6A3F"
    : `${GOLD}B8`;

  const plateColor = isLight
    ? "#96703F"
    : `${GOLD}B0`;

  const intakeColor = isLight
    ? "rgba(23,21,18,0.52)"
    : `${PAPER}55`;

  const metadataColor = isLight
    ? "rgba(23,21,18,0.58)"
    : `${PAPER}52`;

  const listingColor = isLight
    ? "rgba(23,21,18,0.56)"
    : `${PAPER}45`;

  const gridBorder = isLight
    ? "rgba(23,21,18,0.12)"
    : `${PAPER}0D`;

  const cardBorder = isLight
    ? "rgba(23,21,18,0.11)"
    : `${PAPER}0D`;

  const cardBackground = isLight
    ? "rgba(255,255,255,0.68)"
    : CHARCOAL;

  const ambientBackground = isLight
    ? `
        radial-gradient(
          circle at 10% 6%,
          ${BURGUNDY}12 0%,
          transparent 32%
        ),
        radial-gradient(
          circle at 92% 90%,
          ${PINK}08 0%,
          transparent 30%
        )
      `
    : `
        radial-gradient(
          circle at 10% 6%,
          ${BURGUNDY}22 0%,
          transparent 32%
        ),
        radial-gradient(
          circle at 92% 90%,
          ${PINK}0D 0%,
          transparent 30%
        )
      `;

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:py-24 lg:py-28"
      style={{
        backgroundColor: sectionBackground,
        color: primaryText,
      }}
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: ambientBackground,
        }}
      />

      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container relative mx-auto"
      >
        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0"
                style={{
                  backgroundColor: eyebrowColor,
                }}
              />

              <span
                className="italic"
                style={{
                  fontFamily:
                    "var(--font-display, Georgia), serif",
                  fontSize: "13px",
                  color: eyebrowColor,
                }}
              >
                Recent acquisitions
              </span>
            </div>

            <h2
              className="mt-5 max-w-lg text-2xl font-normal leading-[1.2] tracking-[-0.03em] sm:text-3xl"
              style={{
                fontFamily:
                  "var(--font-display, Georgia), serif",
                color: primaryText,
              }}
            >
              New to the floor, and already inspected.
            </h2>

            <p
              className="mt-3 max-w-md text-[12px] leading-6"
              style={{
                color: mutedText,
              }}
            >
              Four of the latest arrivals — each run through our
              82-point inspection before it ever reached the floor.
            </p>
          </div>

          {/* Desktop inventory link */}
          <Link
            href="/inventory?sort=newest"
            className="group hidden shrink-0 sm:block"
          >
            <span
              className="relative text-[12px] italic transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 group-hover:after:w-full"
              style={
                {
                  fontFamily:
                    "var(--font-display, Georgia), serif",
                  color: isLight
                    ? "rgba(23,21,18,0.68)"
                    : `${PAPER}80`,
                  "--accent": GOLD,
                } as React.CSSProperties
              }
            >
              View the full inventory
            </span>
          </Link>
        </motion.div>

        {/* Vehicle grid */}
        <motion.div
          variants={staggerContainer(0.08)}
          className="mt-12 grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-4"
        >
          {recentlyAdded.map((vehicle, i) => {
            const name = `${vehicle.brand} ${vehicle.model}${
              vehicle.trim ? ` ${vehicle.trim}` : ""
            }`;

            const image = vehicle.images?.[0]?.url ?? "";

            const intake = (() => {
              const createdAt = new Date(vehicle.createdAt);
              const diff =
                Date.now() - createdAt.getTime();

              const days = Math.floor(
                diff / (1000 * 60 * 60 * 24)
              );

              if (days <= 0) return "Today";
              if (days === 1) return "1 day ago";
              if (days < 7) return `${days} days ago`;

              return "This week";
            })();

            const price = `$${vehicle.price.toLocaleString()}`;
            const mileage = `${vehicle.mileageKm.toLocaleString()} km`;

            return (
              <motion.div
                key={vehicle.slug}
                variants={fadeUp}
                className="min-w-0"
              >
                <Link
                  href={`/inventory/${vehicle.slug}`}
                  className="group block h-full overflow-hidden border-0 shadow-none outline-none"
                  style={{
                    backgroundColor: cardBackground,
                    color: primaryText,
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden px-4 pt-4 sm:px-5 sm:pt-5">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
                      />

                      {/* Cinematic hover wash */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.18) 100%)",
                        }}
                      />

                      {/* Top left corner */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-5 w-5 border-l border-t transition-all duration-500 group-hover:h-7 group-hover:w-7"
                        style={{
                          borderColor: `${GOLD}B0`,
                        }}
                      />

                      {/* Top right corner */}
                      <span
                        aria-hidden="true"
                        className="absolute right-0 top-0 h-5 w-5 border-r border-t transition-all duration-500 group-hover:h-7 group-hover:w-7"
                        style={{
                          borderColor: `${GOLD}B0`,
                        }}
                      />

                      {/* Bottom left corner */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-5 w-5 border-b border-l transition-all duration-500 group-hover:h-7 group-hover:w-7"
                        style={{
                          borderColor: `${GOLD}B0`,
                        }}
                      />

                      {/* Bottom right corner */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 right-0 h-5 w-5 border-b border-r transition-all duration-500 group-hover:h-7 group-hover:w-7"
                        style={{
                          borderColor: `${GOLD}B0`,
                        }}
                      />

                      {/* New arrival badge */}
                      <div
                        className="absolute left-3 top-3 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em]"
                        style={{
                          backgroundColor: isLight
                            ? "rgba(255,255,255,0.88)"
                            : "rgba(20,18,17,0.78)",
                          color: plateColor,
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        New arrival
                      </div>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="px-4 pb-6 pt-5 sm:px-5">
                    {/* Acquisition metadata */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="text-[9px] uppercase tracking-[0.2em]"
                        style={{
                          color: listingColor,
                        }}
                      >
                        Recently acquired
                      </span>

                      <span
                        className="text-[10px]"
                        style={{
                          color: intakeColor,
                        }}
                      >
                        {intake}
                      </span>
                    </div>

                    {/* Vehicle name */}
                    <h3
                      className="mt-3 line-clamp-2 min-h-[3.25rem] text-[19px] font-normal leading-[1.15] tracking-[-0.025em] transition-colors duration-300"
                      style={{
                        fontFamily:
                          "var(--font-display, Georgia), serif",
                        color: primaryText,
                      }}
                    >
                      {name}
                    </h3>

                    {/* Metadata */}
                    <div
                      className="mt-4 flex items-center gap-3 text-[10px]"
                      style={{
                        color: metadataColor,
                      }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays
                          size={12}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                        {vehicle.year}
                      </span>

                      <span
                        aria-hidden="true"
                        className="h-3 w-px"
                        style={{
                          backgroundColor: gridBorder,
                        }}
                      />

                      <span className="inline-flex items-center gap-1.5">
                        <Gauge
                          size={12}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                        {mileage}
                      </span>
                    </div>

                    {/* Divider */}
                    <div
                      className="mt-5 h-px w-full"
                      style={{
                        backgroundColor: cardBorder,
                      }}
                    />

                    {/* Price + CTA */}
                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <span
                          className="block text-[9px] uppercase tracking-[0.18em]"
                          style={{
                            color: listingColor,
                          }}
                        >
                          Asking
                        </span>

                        <span
                          className="mt-1 block text-[18px] font-medium tracking-[-0.02em]"
                          style={{
                            color: primaryText,
                          }}
                        >
                          {price}
                        </span>
                      </div>

                      <span
                        className="relative pb-1 text-[10px] italic transition-colors duration-300"
                        style={{
                          fontFamily:
                            "var(--font-display, Georgia), serif",
                          color: isLight
                            ? "rgba(23,21,18,0.68)"
                            : `${PAPER}80`,
                        }}
                      >
                        View listing

                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                          style={{
                            backgroundColor: GOLD,
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile inventory link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/inventory?sort=newest"
            className="group inline-block"
          >
            <span
              className="relative text-[12px] italic after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 group-hover:after:w-full"
              style={{
                fontFamily:
                  "var(--font-display, Georgia), serif",
                color: isLight
                  ? "rgba(23,21,18,0.68)"
                  : `${PAPER}80`,
              }}
            >
              View the full inventory
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}