"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

// Swap for a real fetch/config source (e.g. @/config/site or a CMS query)
// once wired up — kept local here so the section is drop-in runnable.
const recentlyAdded = [
  {
    slug: "porsche-911-gt3",
    name: "Porsche 911 GT3",
    price: "$189,500",
    addedLabel: "Added 2 days ago",
    year: "2024",
    mileage: "1,200 mi",
    transmission: "PDK",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=90",
  },
  {
    slug: "range-rover-sport-svr",
    name: "Range Rover Sport SVR",
    price: "$142,000",
    addedLabel: "Added 3 days ago",
    year: "2023",
    mileage: "8,400 mi",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=90",
  },
  {
    slug: "lexus-lc-500",
    name: "Lexus LC 500",
    price: "$98,750",
    addedLabel: "Added this week",
    year: "2023",
    mileage: "5,100 mi",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=90",
  },
  {
    slug: "bmw-m5-competition",
    name: "BMW M5 Competition",
    price: "$116,200",
    addedLabel: "Added this week",
    year: "2024",
    mileage: "2,600 mi",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90",
  },
] as const;

export function RecentlyAdded() {
  return (
    <section className="border-b border-line bg-paper">
      <motion.div
        variants={staggerContainer(0.03)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-page py-16 md:py-24"
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-label text-brass">Act 03 · Inventory</p>
            <h2 className="text-h1 mt-3 text-ink">Recently added.</h2>
            <p className="text-body mt-2 max-w-md text-ink-soft">
              Fresh to the collection — verified and ready for viewing this
              week.
            </p>
          </div>

          <Link
            href="/inventory?sort=newest"
            className="group hidden shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors duration-200 hover:text-brass sm:flex"
          >
            View full inventory
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        {/* Hairline table grid — dividers come from the container's bg-line
            showing through the gap, not from individual card borders. */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {recentlyAdded.map((vehicle) => (
            <motion.div key={vehicle.slug} variants={fadeUp}>
              <Link href={`/inventory/${vehicle.slug}`} className="group block h-full bg-paper">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 border border-brass/40 bg-paper/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-brass">
                    {vehicle.addedLabel}
                  </span>
                </div>

                <div className="px-5 py-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-medium leading-snug text-ink">
                      {vehicle.name}
                    </h3>
                    <span className="shrink-0 text-sm font-medium tabular-nums text-brass">
                      {vehicle.price}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-ink-soft">
                    {vehicle.year} · {vehicle.mileage} · {vehicle.transmission}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint transition-colors duration-200 group-hover:text-brass">
                    View listing
                    <ArrowUpRight
                      size={11}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/inventory?sort=newest"
          className="mt-8 flex items-center justify-center gap-2 border border-line py-3 text-xs font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors duration-200 hover:border-brass/40 hover:text-brass sm:hidden"
        >
          View full inventory
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </Link>
      </motion.div>
    </section>
  );
}