"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Play,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import {
  ACCENT,
  BURGUNDY,
  CHARCOAL,
  PAPER,
  PINK,
  GOLD,
  LINE,
} from "@/components/ui/tokens";

const EASE = [0.16, 1, 0.3, 1] as const;
const SERIF = "Georgia, 'Times New Roman', serif";

export function Hero({ vehicleCount }: { vehicleCount: number }) {
  const reducedMotion = useReducedMotion();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("");
  const [condition, setCondition] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (budget) {
      params.set("budget", budget);
    }

    if (condition) {
      params.set("condition", condition);
    }

    router.push(
      params.toString()
        ? `/inventory?${params.toString()}`
        : "/inventory",
    );
  };

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden"
      style={{
        backgroundColor: CHARCOAL,
        color: PAPER,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-image.png"
          className="h-full w-full object-cover"
        >
          <source
            src="/videos/hero-loop-002.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/30" />

        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[65%]"
          style={{
            background: `linear-gradient(
              90deg,
              ${CHARCOAL}F0 0%,
              ${CHARCOAL}A8 45%,
              transparent 100%
            )`,
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-[48%]"
          style={{
            background: `linear-gradient(
              to top,
              ${CHARCOAL} 0%,
              ${CHARCOAL}B5 28%,
              transparent 100%
            )`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              circle at 68% 42%,
              transparent 0%,
              rgba(0,0,0,.08) 45%,
              ${CHARCOAL}8C 100%
            )`,
          }}
        />

        {/* Burgundy cinematic glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-[22%] h-64 w-64 rounded-full blur-[120px]"
          style={{
            backgroundColor: BURGUNDY,
            opacity: 0.18,
          }}
        />

        {/* Film grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Frame */}
      <div className="relative z-10 container mx-auto flex min-h-[100svh] flex-col px-5 py-16 lg:px-8">
        <div className="flex flex-1 items-center py-10 sm:py-14 lg:py-0">
          <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-20">
            {/* Editorial */}
            <div className="w-full lg:max-w-[760px]">
              <motion.p
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: EASE,
                }}
                className="mb-7 max-w-[290px] text-[12px] font-medium italic leading-[1.55] sm:mb-9 sm:text-[13px]"
                style={{
                  color: PAPER,
                  fontFamily: SERIF,
                }}
              >
                For those who notice the difference before it&apos;s
                pointed out.
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: reducedMotion ? 0 : 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: reducedMotion ? 0.3 : 1.15,
                  delay: 0.05,
                  ease: EASE,
                }}
                className="max-w-[880px] tracking-[-0.035em]"
                style={{
                  fontFamily: SERIF,
                }}
              >
                <span
                  className="block font-normal"
                  style={{
                    fontSize: "clamp(3.35rem, 13vw, 8.4rem)",
                    lineHeight: 0.92,
                  }}
                >
                  Precision worn
                </span>

                <span
                  className="ml-[8vw] block font-normal italic sm:ml-[6vw]"
                  style={{
                    fontSize: "clamp(3.35rem, 13vw, 8.4rem)",
                    lineHeight: 0.92,
                  }}
                >
                  as instinct.
                </span>
              </motion.h1>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.42,
                  ease: EASE,
                }}
                className="mt-9 flex flex-col gap-7 sm:ml-[6vw] sm:mt-14 sm:flex-row sm:items-end sm:gap-14"
              >
                <p
                  className="max-w-[310px] text-[11px] font-medium leading-[1.8] sm:text-[12px]"
                  style={{ color: PAPER }}
                >
                  Every car in the collection is inspected in person
                  before it earns a listing. Nothing arrives here by
                  algorithm.
                </p>

                <Link
                  href="/inventory"
                  className="group flex min-h-10 w-fit items-center gap-4 border-b pb-2.5 text-[12px] font-medium sm:gap-5 sm:pb-3 sm:text-[13px]"
                  style={{
                    borderColor: `${GOLD}D0`,
                    color: PAPER,
                    fontFamily: SERIF,
                  }}
                >
                  <span className="italic">
                    Enter the collection
                  </span>

                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:bg-white/10"
                    style={{
                      borderColor: `${GOLD}D0`,
                    }}
                  >
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                    />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Search Card */}
            <motion.div
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : 32,
                y: reducedMotion ? 0 : 10,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: reducedMotion ? 0.3 : 1,
                delay: 0.35,
                ease: EASE,
              }}
              className="w-full lg:max-w-[370px] xl:max-w-[390px]"
            >
              <div
                className="relative overflow-hidden rounded-2xl border p-4 sm:p-5 lg:p-6"
                style={{
                  borderColor: `${PAPER}28`,
                  background: `linear-gradient(
                    145deg,
                    ${CHARCOAL}D4,
                    ${BURGUNDY}52
                  )`,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: `
                    0 24px 80px rgba(0,0,0,.38),
                    inset 0 1px 0 ${PAPER}13
                  `,
                }}
              >
                {/* Top glass highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      transparent,
                      ${PAPER}60,
                      transparent
                    )`,
                  }}
                />

                {/* Burgundy glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-[75px]"
                  style={{
                    backgroundColor: BURGUNDY,
                    opacity: 0.55,
                  }}
                />

                {/* Pink glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-[80px]"
                  style={{
                    backgroundColor: ACCENT,
                    opacity: 0.08,
                  }}
                />

                <div className="relative">
                  {/* Header */}
                  <div className="mb-5 flex items-start justify-between sm:mb-6">
                    <div>
                      <p
                        className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: GOLD }}
                      >
                        Find your motorcar
                      </p>

                      <h2
                        className="text-[20px] font-normal tracking-[-0.02em] sm:text-[22px]"
                        style={{
                          color: PAPER,
                          fontFamily: SERIF,
                        }}
                      >
                        Search the collection
                      </h2>
                    </div>

                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border sm:h-9 sm:w-9"
                      style={{
                        borderColor: `${GOLD}90`,
                        backgroundColor: `${GOLD}15`,
                      }}
                    >
                      <Search
                        aria-hidden
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                        style={{ color: GOLD }}
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>

                  {/* Fields */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Make / Model */}
                    <label
                      className="block rounded-xl border px-3.5 py-3 sm:px-4"
                      style={{
                        borderColor: `${PAPER}24`,
                        backgroundColor: `${PAPER}09`,
                      }}
                    >
                      <span
                        className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: PAPER }}
                      >
                        Make or model
                      </span>

                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                        placeholder="e.g. Porsche 911"
                        className="w-full bg-transparent text-[12px] font-medium outline-none placeholder:opacity-60 sm:text-[13px]"
                        style={{
                          color: PAPER,
                        }}
                      />
                    </label>

                    {/* Budget + Condition */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                      {/* Budget */}
                      <label
                        className="rounded-xl border px-3.5 py-3 sm:px-4"
                        style={{
                          borderColor: `${PAPER}24`,
                          backgroundColor: `${PAPER}09`,
                        }}
                      >
                        <span
                          className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.18em]"
                          style={{ color: PAPER }}
                        >
                          Budget
                        </span>

                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full bg-transparent text-[11px] font-medium outline-none sm:text-[12px]"
                          style={{ color: PAPER }}
                        >
                          <option
                            value=""
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            Any price
                          </option>

                          <option
                            value="under-30"
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            Under $30k
                          </option>

                          <option
                            value="30-60"
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            $30k – $60k
                          </option>

                          <option
                            value="60-100"
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            $60k – $100k
                          </option>

                          <option
                            value="100-plus"
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            $100k+
                          </option>
                        </select>
                      </label>

                      {/* Condition */}
                      <label
                        className="rounded-xl border px-3.5 py-3 sm:px-4"
                        style={{
                          borderColor: `${PAPER}24`,
                          backgroundColor: `${PAPER}09`,
                        }}
                      >
                        <span
                          className="mb-1.5 block text-[8px] font-semibold uppercase tracking-[0.18em]"
                          style={{ color: PAPER }}
                        >
                          Condition
                        </span>

                        <select
                          value={condition}
                          onChange={(e) =>
                            setCondition(e.target.value)
                          }
                          className="w-full bg-transparent text-[11px] font-medium outline-none sm:text-[12px]"
                          style={{ color: PAPER }}
                        >
                          <option
                            value=""
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            Any condition
                          </option>

                          <option
                            value="excellent"
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            Excellent
                          </option>

                          <option
                            value="very-good"
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            Very good
                          </option>

                          <option
                            value="good"
                            style={{
                              backgroundColor: CHARCOAL,
                              color: PAPER,
                            }}
                          >
                            Good
                          </option>
                        </select>
                      </label>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="group mt-3 flex h-11 w-full items-center justify-between rounded-xl px-4 transition-all duration-300 hover:brightness-110 sm:mt-4 sm:h-12"
                    style={{
                      backgroundColor: ACCENT,
                      color: PAPER,
                      boxShadow: `
                        0 10px 30px ${ACCENT}45,
                        0 0 0 1px ${PAPER}10 inset
                      `,
                    }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[11px]">
                      Search inventory
                    </span>

                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full border"
                      style={{
                        borderColor: `${PAPER}65`,
                      }}
                    >
                      <ArrowUpRight
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </button>

                  {/* Advanced Search */}
                  <Link
                    href="/inventory"
                    className="mt-3 flex min-h-8 items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] transition-colors sm:mt-4 sm:text-[10px]"
                    style={{ color: PAPER }}
                  >
                    <SlidersHorizontal
                      aria-hidden
                      className="h-3 w-3"
                      strokeWidth={1.7}
                    />
                    Advanced search
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.75,
          }}
          className="flex items-end justify-between gap-4 pt-8 sm:pt-10"
        >
          {/* Watch Film */}
          <button
            type="button"
            className="group flex min-h-9 items-center gap-2.5 text-[11px] font-medium italic sm:gap-3 sm:text-[12px]"
            style={{
              color: PAPER,
              fontFamily: SERIF,
            }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors group-hover:bg-white/10"
              style={{
                borderColor: `${GOLD}C0`,
              }}
            >
              <Play
                aria-hidden
                className="ml-0.5 h-2.5 w-2.5 fill-current"
                style={{ color: PAPER }}
              />
            </span>

            Watch the film
          </button>

          {/* Inventory Count */}
          <div className="hidden items-baseline gap-2 md:flex">
            <span
              className="text-[16px] font-medium"
              style={{
                color: ACCENT,
                fontFamily: SERIF,
              }}
            >
              {vehicleCount}
            </span>

            <span
              className="text-[12px] font-medium italic"
              style={{
                color: PAPER,
                fontFamily: SERIF,
              }}
            >
              motorcars currently in inventory
            </span>
          </div>

          {/* Scroll Indicator */}
          <motion.span
            aria-hidden
            animate={
              reducedMotion
                ? undefined
                : {
                    height: [18, 32, 18],
                    opacity: [0.35, 0.85, 0.35],
                  }
            }
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="block w-px shrink-0"
            style={{
              backgroundColor: `${GOLD}99`,
            }}
          />
        </motion.div>
      </div>

      {/* Structural Accent */}
      <div
        aria-hidden
        className="absolute left-0 top-[30%] h-14 w-[2px] sm:top-[36%] sm:h-20"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent,
            ${ACCENT},
            transparent
          )`,
        }}
      />

      {/* Subtle bottom structural line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-5 bottom-0 h-px sm:inset-x-7 lg:inset-x-8"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            ${LINE},
            transparent
          )`,
        }}
      />

      {/* Soft Pink micro-accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] left-[42%] hidden h-px w-16 lg:block"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            ${PINK}55,
            transparent
          )`,
        }}
      />
    </section>
  );
}