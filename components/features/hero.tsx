"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { QuickSearch } from "@/components/features/quick-search";
import { formatBDT, formatMileage } from "@/lib/format";
import { vehicles } from "@/data/vehicles";
import { fadeUp, fadeUpLarge, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const showcase = vehicles.find((v) => v.featured) ?? vehicles[0];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-page grid gap-10 pb-24 pt-14 md:grid-cols-12 md:gap-6 md:pb-32 md:pt-20">
        {/* Left: editorial headline block — asymmetric, not centered */}
        <div className="md:col-span-7 md:pt-8">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-label flex items-center gap-2 text-ink-faint"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            82-point inspection · one fixed price
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUpLarge}
            transition={{ ...transition.slow, delay: 0.05 }}
            className="text-display mt-5 text-ink"
          >
            Every car,
            <br />
            inspected first.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ ...transition.base, delay: 0.22 }}
            className="text-body-lg mt-6 max-w-md text-ink-soft"
          >
            AutoStock BD lists only vehicles that have passed our 82-point
            inspection — with full history, honest mileage, and no haggling
            over hidden faults.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ ...transition.base, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link href="/inventory" className={buttonVariants({ variant: "brass", size: "lg" })}>
              Browse all inventory
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/sell-your-car"
              className="text-sm text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Sell your car instead →
            </Link>
          </motion.div>
        </div>

        {/* Right: immersive showcase — a real inspected vehicle, not stock art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...transition.slow, delay: 0.15 }}
          className="relative md:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-paper-raised md:aspect-[3/4]">
            <Image
              src={showcase.images[0]?.url ?? ""}
              alt={showcase.images[0]?.alt ?? `${showcase.brand} ${showcase.model}`}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          {/* Floating metadata card — layered, editorial, not another box in a grid */}
          <motion.div
            initial={{ opacity: 0, x: -16, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ ...transition.slow, delay: 0.45 }}
            className={cn(
              "absolute -bottom-6 -left-6 max-w-[15rem] rounded-md border border-line bg-paper p-4 shadow-md",
              "hidden sm:block",
            )}
          >
            <p className="text-small text-ink-faint">
              {showcase.year} {showcase.brand} {showcase.model}
            </p>
            <p className="text-h3 mt-0.5 text-ink">{formatBDT(showcase.price)}</p>
            <div className="mt-2 flex items-center gap-1.5 text-small text-ink-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-brass" aria-hidden />
              {formatMileage(showcase.mileageKm)} · inspected
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Search dock — floats across the seam between hero and the next section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition.base, delay: 0.35 }}
        className="container-page relative -mb-8"
      >
        <QuickSearch />
      </motion.div>
    </section>
  );
}
