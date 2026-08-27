"use client";

import { motion } from "framer-motion";
import { VehicleCard } from "@/components/features/vehicle-card";
import { fadeUp, fadeUpLarge, staggerContainer, viewport } from "@/lib/motion";
import type { Vehicle } from "@/types/vehicle";

/**
 * Asymmetric spotlight layout: the first featured vehicle gets a larger,
 * editorial treatment; the rest form a tighter supporting grid alongside it.
 * Keeps this section visually distinct from RecentlyAdded's uniform grid.
 */
export function FeaturedGrid({ vehicles }: { vehicles: Vehicle[] }) {
  const [spotlight, ...rest] = vehicles;

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="mt-10 grid gap-5 lg:grid-cols-12"
    >
      {spotlight && (
        <motion.div variants={fadeUpLarge} className="lg:col-span-6">
          <VehicleCard vehicle={spotlight} />
        </motion.div>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-6">
        {rest.map((vehicle) => (
          <motion.div key={vehicle.id} variants={fadeUp}>
            <VehicleCard vehicle={vehicle} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
