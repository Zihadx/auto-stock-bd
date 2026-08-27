"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { publicNav, siteConfig, vehicleBrands } from "@/config/site";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

export function SiteFooter() {
  return (
    <footer className="border-t border-charcoal-line bg-charcoal text-paper/70">
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20"
      >
        <motion.div variants={fadeUp} className="md:col-span-5">
          <p className="text-display text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] leading-[0.98] text-paper">
            {siteConfig.name}
          </p>
          <p className="mt-4 max-w-sm text-body text-paper/50">
            {siteConfig.tagline}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-2">
          <p className="text-label text-paper/40">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {publicNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-2">
          <p className="text-label text-paper/40">Popular Brands</p>
          <ul className="mt-5 space-y-3 text-sm">
            {vehicleBrands.slice(0, 5).map((brand) => (
              <li key={brand}>
                <Link
                  href={`/inventory?brands=${encodeURIComponent(brand)}`}
                  className="transition-colors hover:text-paper"
                >
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-3">
          <p className="text-label text-paper/40">Contact</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="max-w-[220px] text-paper/60">{siteConfig.address}</li>
            <li>
              <a
                href={`tel:${siteConfig.phone}`}
                className="transition-colors hover:text-paper"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-paper"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <div className="container-page flex flex-col gap-2 border-t border-charcoal-line py-5 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
        <span className="text-paper/25">Dhaka, Bangladesh</span>
      </div>
    </footer>
  );
}
