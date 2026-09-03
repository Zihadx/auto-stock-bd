"use client";

import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const ACCENT = "#8C3A34"; // oxblood — leather, coachbuilding, not tech-teal
const HAIRLINE = "#8C7355"; // aged brass

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#080706] text-[#F5F1EA]">
      {/* =========================================================
          CINEMATIC IMAGE / VIDEO
      ========================================================= */}

      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero-loop.webm" type="video/webm" />
          <source src="/videos/hero-loop-002.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#080706] via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,transparent_0%,rgba(0,0,0,.06)_45%,rgba(0,0,0,.5)_100%)]" />

        {/* Film grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* =========================================================
          MAIN FRAME
      ========================================================= */}

      <div className="relative z-10 mx-auto flex min-h-[100svh] container flex-col px-6 py-7 sm:px-9 lg:px-14 xl:px-20">
        <div className="relative flex flex-1 items-center">
          <div className="relative w-full">
            {/* Eyebrow — one line, one job */}

            <motion.p
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-9 max-w-[280px] text-[13px] italic leading-snug text-[#F5F1EA]/55"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              For those who notice the difference before it&apos;s pointed out.
            </motion.p>

            {/* MASSIVE TYPOGRAPHY — one deliberate weight/style contrast, no color accent */}

            <motion.h1
              initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.3 : 1.15, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[880px] tracking-[-0.02em]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              <span
                className="block font-normal"
                style={{ fontSize: "clamp(3.6rem, 8.4vw, 8.4rem)", lineHeight: 0.98 }}
              >
                Precision worn
              </span>
              <span
                className="ml-[6vw] block font-normal italic text-[#F5F1EA]/80"
                style={{ fontSize: "clamp(3.6rem, 8.4vw, 8.4rem)", lineHeight: 0.98 }}
              >
                as instinct.
              </span>
            </motion.h1>

            {/* LOWER EDITORIAL INFORMATION */}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 flex flex-col gap-8 sm:ml-[6vw] sm:flex-row sm:items-end sm:gap-14"
            >
              <p className="max-w-[300px] text-[12px] leading-[1.9] text-[#F5F1EA]/50">
                Every car in the collection is inspected in person before it
                earns a listing. Nothing arrives here by algorithm.
              </p>

              <Link
                href="/inventory"
                className="group flex w-fit items-center gap-5 border-b pb-3 text-[13px] transition-colors"
                style={{ borderColor: `${HAIRLINE}55`, fontFamily: "Georgia, serif" }}
              >
                <span className="italic">Enter the collection</span>
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300"
                  style={{ borderColor: `${HAIRLINE}55` }}
                >
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM EDITORIAL BAR
        ========================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="flex items-end justify-between"
        >
          <button
            type="button"
            className="group flex items-center gap-3 text-[12px] italic text-[#F5F1EA]/45 transition-colors hover:text-[#F5F1EA]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: `${HAIRLINE}45` }}
            >
              <Play className="ml-0.5 h-2.5 w-2.5 fill-current" />
            </span>
            Watch the film
          </button>

          {/* A real number, not a decorative sequence marker */}

          <div className="hidden items-baseline gap-2 md:flex">
            <span className="text-[15px]" style={{ color: ACCENT, fontFamily: "Georgia, serif" }}>
              214
            </span>
            <span className="text-[12px] italic text-[#F5F1EA]/35" style={{ fontFamily: "Georgia, serif" }}>
              motorcars currently in inventory
            </span>
          </div>

          <div className="flex items-center gap-4">
            <motion.span
              animate={
                reducedMotion
                  ? undefined
                  : { height: [20, 34, 20], opacity: [0.25, 0.7, 0.25] }
              }
              transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
              className="block w-px bg-[#F5F1EA]/40"
            />
          </div>
        </motion.div>
      </div>

      {/* Single structural accent — the one place color is spent */}
      <div
        className="absolute left-0 top-[36%] h-20 w-px"
        style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}, transparent)` }}
      />
    </section>
  );
}