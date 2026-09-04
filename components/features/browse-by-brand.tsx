"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { vehicleBrands } from "@/config/site";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import { ACCENT, CHARCOAL, PAPER, GOLD, LINE } from "../ui/tokens";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function brandSlug(brand: string) {
  return brand
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function brandLogo(brand: string) {
  return `/images/brands/${brandSlug(brand)}.png`;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function BrowseByBrand() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: CHARCOAL }}
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(
              600px circle at 0% 50%,
              ${ACCENT}0B,
              transparent 65%
            ),
            radial-gradient(
              500px circle at 100% 20%,
              ${GOLD}07,
              transparent 65%
            )
          `,
        }}
      />

      <motion.div
        variants={reducedMotion ? undefined : staggerContainer(0.045)}
        initial={reducedMotion ? undefined : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={viewport}
        className="container relative mx-auto py-16 sm:py-20 lg:py-24"
      >
        {/* ------------------------------------------------------------------ */}
        {/* Header                                                              */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          variants={reducedMotion ? undefined : fadeUp}
          className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />

              <span
                className="text-[9px] font-medium uppercase tracking-[0.22em]"
                style={{ color: `${PAPER}55` }}
              >
                Explore by manufacturer
              </span>
            </div>

            <h2
              className="text-3xl font-light tracking-[-0.045em] sm:text-4xl lg:text-[42px]"
              style={{ color: PAPER }}
            >
              Find your{" "}
              <span style={{ color: `${PAPER}65` }}>preferred marque.</span>
            </h2>

            <p
              className="mt-3 max-w-md text-sm leading-6"
              style={{ color: `${PAPER}42` }}
            >
              Explore our curated selection of vehicles from the world&apos;s
              most recognized automotive manufacturers.
            </p>
          </div>

          {/* Inventory CTA */}
          <Link
            href="/inventory"
            className="group inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:bg-white/[0.04]"
            style={{
              borderColor: `${PAPER}18`,
              color: `${PAPER}65`,
            }}
          >
            View all inventory
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
              style={{
                backgroundColor: `${ACCENT}16`,
                color: ACCENT,
              }}
            >
              <ChevronRight size={12} strokeWidth={1.6} />
            </span>
          </Link>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* Brand grid                                                          */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          variants={reducedMotion ? undefined : fadeUp}
          className="overflow-hidden rounded-2xl border"
          style={{
            borderColor: `${PAPER}10`,
            backgroundColor: `${PAPER}03`,
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {vehicleBrands.map((brand, index) => (
              <motion.div
                key={brand}
                variants={reducedMotion ? undefined : fadeUp}
                className="group relative"
              >
                <Link
                  href={`/inventory?brands=${encodeURIComponent(brand)}`}
                  aria-label={`Browse ${brand} vehicles`}
                  className="
                    relative
                    flex
                    h-[128px]
                    flex-col
                    justify-between
                    overflow-hidden
                    border-b
                    border-r
                    p-5
                    outline-none
                    transition-all
                    duration-500
                    hover:bg-white/[0.035]
                    focus-visible:ring-1
                    focus-visible:ring-inset
                    focus-visible:ring-white/30
                  "
                  style={{
                    borderColor: `${PAPER}0D`,
                  }}
                >
                  {/* Hover glow */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -left-10
                      -top-10
                      h-32
                      w-32
                      rounded-full
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                    style={{
                      backgroundColor: `${ACCENT}18`,
                    }}
                  />

                  {/* Top row */}
                  <div className="relative flex items-center justify-between">
                    <span
                      className="font-mono text-[9px] font-medium leading-none tracking-[0.18em]"
                      style={{ color: "rgba(148, 163, 184, 0.42)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.4}
                      className="
                        -translate-x-1
                        translate-y-1
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-x-0
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                      style={{ color: GOLD }}
                    />
                  </div>

                  {/* Logo */}

                  <div className="relative flex items-center gap-4">
                    <div
                      className=" flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-all duration-500 group-hover:scale-105 "
                      style={{
                        borderColor: `${ACCENT}30`,
                        backgroundColor: `${ACCENT}14`,
                      }}
                    >
                      <Image
                        src={brandLogo(brand)}
                        alt={`${brand} logo`}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="
        h-10
        w-10
        object-contain
        opacity-80
        transition-all
        duration-500
        group-hover:opacity-100
      "
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = "/images/brands/car.png";
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <span
                        className="
        block
        truncate
        text-xl
        font-medium
        tracking-[-0.02em]
        transition-colors
        duration-300
      "
                        style={{ color: `${PAPER}78` }}
                      >
                        {brand}
                      </span>

                      <span
                        className="
        mt-1
        block
        text-[8px]
        uppercase
        tracking-[0.16em]
      "
                        style={{ color: `${PAPER}32` }}
                      >
                        Explore
                      </span>
                    </div>
                  </div>

                  {/* Accent line */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-px
                      w-full
                      origin-left
                      scale-x-0
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    "
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT}, ${GOLD}, transparent)`,
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* Footer                                                              */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          variants={reducedMotion ? undefined : fadeUp}
          className="mt-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />

            <span
              className="text-[9px] uppercase tracking-[0.18em]"
              style={{ color: `${PAPER}30` }}
            >
              {String(vehicleBrands.length).padStart(2, "0")} manufacturers
            </span>
          </div>

          <span
            className="hidden text-[9px] uppercase tracking-[0.18em] sm:block"
            style={{ color: `${PAPER}24` }}
          >
            Curated automotive collection
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
