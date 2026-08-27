"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const stats = [
  { value: "1,200+", label: "Vehicles sold since 2021" },
  { value: "4.8 / 5", label: "Average customer rating" },
  { value: "90 days", label: "Mechanical coverage on every sale" },
  { value: "24 hrs", label: "Average valuation turnaround" },
];

export function TrustSection() {
  return (
    <section className="border-y border-line bg-charcoal text-paper">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-page grid grid-cols-2 md:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className={`border-line/20 py-10 pr-4 ${
              i % 2 === 0 ? "border-r" : ""
            } md:border-r md:py-14 md:pr-8 md:last:border-r-0`}
          >
            <p className="text-h1 font-tabular text-paper">{stat.value}</p>
            <p className="text-small mt-2 max-w-[10rem] text-paper/50">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
