"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { fadeUp, fadeUpLarge, staggerContainer, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function TradeInCta() {
  return (
    <motion.section
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="container-page py-16 md:py-24"
    >
      <motion.div
        variants={fadeUp}
        className="grid gap-10 rounded-md border border-line bg-paper-raised p-8 md:grid-cols-2 md:gap-8 md:p-14"
      >
        <div>
          <p className="text-label text-brass">Have a car already?</p>
          <h2 className="text-h2 mt-3 text-ink">Trade it in, or sell it outright</h2>
          <p className="text-body mt-3 max-w-md text-ink-soft">
            Get a no-obligation valuation in 24 hours. If you&apos;re buying
            your next car with us, trade-in value comes straight off the
            price.
          </p>
          <Link
            href="/sell-your-car"
            className={cn(buttonVariants({ variant: "brass" }), "mt-6")}
          >
            Get a valuation
          </Link>
        </div>
        <div>
          <p className="text-label text-brass">Financing</p>
          <h2 className="text-h2 mt-3 text-ink">Flexible bank financing</h2>
          <p className="text-body mt-3 max-w-md text-ink-soft">
            We work with partner banks for auto loans on eligible vehicles.
            Talk to us before you visit a branch — we&apos;ll tell you
            honestly if financing makes sense for your situation.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
          >
            Ask about financing
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-charcoal text-paper">
      <motion.div
        variants={fadeUpLarge}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-page py-20 text-center md:py-28"
      >
        <p className="text-label text-brass/80">Act 07 · Final word</p>
        <h2 className="text-display mt-4 text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] leading-[0.98] text-paper">
          Ready to find your next car?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-body text-paper/50">
          86 inspected vehicles, updated daily. Filter by budget and drive
          away in the one that fits.
        </p>
        <Link
          href="/inventory"
          className={cn(buttonVariants({ variant: "brass", size: "lg" }), "mt-8")}
        >
          Browse inventory
        </Link>
      </motion.div>
    </section>
  );
}
