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

const PLATE_NUMERALS = ["I", "II", "III", "IV"] as const;

export function RecentlyAdded() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

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
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
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

      {/* Content */}
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container relative mx-auto"
      >
        {/* Section header */}
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
                  fontFamily: "var(--font-display, Georgia), serif",
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
                fontFamily: "var(--font-display, Georgia), serif",
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
              Four of the latest arrivals — each run through our 82-point
              inspection before it ever reached the floor.
            </p>
          </div>

          {/* Desktop link */}
          <Link
            href="/inventory?sort=newest"
            className="group hidden shrink-0 sm:block"
          >
            <span
              className="
                relative
                text-[12px]
                italic
                transition-colors
                duration-300
                group-hover:text-[var(--accent)]
                after:absolute
                after:-bottom-1
                after:left-0
                after:h-px
                after:w-0
                after:bg-[var(--accent)]
                after:transition-all
                after:duration-300
                group-hover:after:w-full
              "
              style={
                {
                  fontFamily: "var(--font-display, Georgia), serif",
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

        {/* Vehicle plates */}
        <motion.div
          variants={staggerContainer(0.08)}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4"
          style={{
            backgroundColor: gridBorder,
            boxShadow: isLight
              ? "0 18px 60px rgba(23,21,18,0.06)"
              : "none",
          }}
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
                  className="group block h-full"
                  style={{
                    backgroundColor: cardBackground,
                    color: primaryText,
                  }}
                >
                  {/* Photograph */}
                  <div className="relative aspect-[4/3] overflow-hidden px-4 pt-4 sm:px-5 sm:pt-5">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="
                          (max-width: 640px) 100vw,
                          (max-width: 1024px) 50vw,
                          25vw
                        "
                        className="
                          object-cover
                          transition-transform
                          duration-[900ms]
                          ease-out
                          group-hover:scale-[1.03]
                        "
                      />

                      {/* Frame corners */}
                      {[
                        "left-0 top-0 border-l border-t",
                        "right-0 top-0 border-r border-t",
                        "bottom-0 left-0 border-b border-l",
                        "bottom-0 right-0 border-b border-r",
                      ].map((pos) => (
                        <span
                          key={pos}
                          aria-hidden="true"
                          className={`
                            pointer-events-none
                            absolute
                            h-3
                            w-3
                            opacity-0
                            transition-opacity
                            duration-500
                            group-hover:opacity-100
                            ${pos}
                          `}
                          style={{
                            borderColor: GOLD,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="px-4 pb-6 pt-4 sm:px-5">
                    {/* Plate + intake */}
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className="italic"
                        style={{
                          fontFamily:
                            "var(--font-display, Georgia), serif",
                          fontSize: "12px",
                          letterSpacing: "0.04em",
                          color: plateColor,
                        }}
                      >
                        Plate {PLATE_NUMERALS[i]}
                      </span>

                      <span
                        className="italic"
                        style={{
                          fontFamily:
                            "var(--font-display, Georgia), serif",
                          fontSize: "10.5px",
                          color: intakeColor,
                        }}
                      >
                        {intake}
                      </span>
                    </div>

                    {/* Vehicle name */}
                    <h3
                      className="mt-2 text-[15px] font-normal leading-5 tracking-[-0.01em]"
                      style={{
                        fontFamily:
                          "var(--font-display, Georgia), serif",
                        color: primaryText,
                      }}
                    >
                      {name}
                    </h3>

                    {/* Vehicle metadata */}
                    <div
                      className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[10px]"
                      style={{
                        color: metadataColor,
                      }}
                    >
                      <span className="flex items-center gap-1.5">
                        <CalendarDays
                          size={11}
                          strokeWidth={1.3}
                        />
                        {vehicle.year}
                      </span>

                      <span aria-hidden="true">·</span>

                      <span className="flex items-center gap-1.5">
                        <Gauge
                          size={11}
                          strokeWidth={1.3}
                        />
                        {mileage}
                      </span>

                      <span aria-hidden="true">·</span>

                      <span>{vehicle.transmission}</span>
                    </div>

                    {/* Price + listing */}
                    <div
                      className="mt-4 flex items-baseline justify-between gap-3 border-t pt-4"
                      style={{
                        borderColor: cardBorder,
                      }}
                    >
                      <span
                        className="italic tabular-nums"
                        style={{
                          fontFamily:
                            "var(--font-display, Georgia), serif",
                          fontSize: "14px",
                          color: ACCENT,
                        }}
                      >
                        {price}
                      </span>

                      <span
                        className="
                          relative
                          text-[10px]
                          transition-colors
                          duration-300
                          group-hover:text-[var(--accent)]
                          after:absolute
                          after:-bottom-1
                          after:left-0
                          after:h-px
                          after:w-0
                          after:bg-[var(--accent)]
                          after:transition-all
                          after:duration-300
                          group-hover:after:w-full
                        "
                        style={
                          {
                            color: listingColor,
                            "--accent": GOLD,
                          } as React.CSSProperties
                        }
                      >
                        View listing
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/inventory?sort=newest"
            className="group inline-block"
          >
            <span
              className="
                relative
                italic
                transition-colors
                duration-300
                group-hover:text-[var(--accent)]
                after:absolute
                after:-bottom-1
                after:left-0
                after:h-px
                after:w-0
                after:bg-[var(--accent)]
                after:transition-all
                after:duration-300
                group-hover:after:w-full
              "
              style={
                {
                  fontFamily:
                    "var(--font-display, Georgia), serif",
                  fontSize: "13px",
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
        </div>
      </motion.div>
    </section>
  );
}