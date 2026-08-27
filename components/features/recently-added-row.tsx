"use client";

import { motion } from "framer-motion";
import { VehicleCard } from "@/components/features/vehicle-card";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";
import type { Vehicle } from "@/types/vehicle";

/**
 * Horizontal scroll-snap strip — deliberately different composition from
 * FeaturedVehicles' grid, so the two vehicle-listing sections on the
 * homepage don't repeat the same layout pattern back to back.
 */
export function RecentlyAddedRow({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <motion.div
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pl-4 pr-4 md:pl-8 md:pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {vehicles.map((vehicle) => (
        <motion.div
          key={vehicle.id}
          variants={fadeUp}
          className="w-[78vw] shrink-0 snap-start sm:w-[45vw] lg:w-[23vw]"
        >
          <VehicleCard vehicle={vehicle} />
        </motion.div>
      ))}
    </motion.div>
  );
}
