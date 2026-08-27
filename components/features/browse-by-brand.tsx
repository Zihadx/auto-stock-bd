"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { vehicleBrands } from "@/config/site";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

export function BrowseByBrand() {
  return (
    <section className="border-y border-line bg-paper-raised">
      <motion.div
        variants={staggerContainer(0.03)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-page py-16 md:py-24"
      >
        <motion.div variants={fadeUp}>
          <p className="text-label text-brass">Act 02 · Inventory</p>
          <h2 className="text-h1 mt-3 text-ink">Browse by brand</h2>
          <p className="text-body mt-2 max-w-md text-ink-soft">
            Every listing verified against manufacturer specifications.
          </p>
        </motion.div>

        {/* Editorial word-flow instead of a uniform grid of boxes */}
        <div className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-2 border-t border-line pt-10">
          {vehicleBrands.map((brand, i) => (
            <motion.div key={brand} variants={fadeUp} className="flex items-baseline">
              <Link
                href={`/inventory?brands=${encodeURIComponent(brand)}`}
                className="text-hero text-ink-faint transition-colors duration-200 hover:text-brass"
              >
                {brand}
              </Link>
              {i < vehicleBrands.length - 1 && (
                <span className="ml-3 text-hero text-line" aria-hidden>
                  /
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
