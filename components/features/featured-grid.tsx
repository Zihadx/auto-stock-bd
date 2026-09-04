"use client";

import { motion } from "framer-motion";
import { VehicleCard } from "@/components/features/vehicle-card";
import {
  fadeUp,
  fadeUpLarge,
  staggerContainer,
  viewport,
} from "@/lib/motion";

import type { Vehicle } from "@/types/vehicle";

export function FeaturedGrid({ vehicles }: { vehicles: Vehicle[] }) {
  const [spotlight, ...rest] = vehicles;

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="
        relative mt-12
        grid gap-5
        lg:grid-cols-12
        lg:gap-6
      "
    >
      {/* Main editorial vehicle */}
      {spotlight && (
        <motion.div
          variants={fadeUpLarge}
          className="min-w-0 lg:col-span-7"
        >
          <VehicleCard
            vehicle={spotlight}
            layout="spotlight"
          />
        </motion.div>
      )}

      {/* Supporting collection */}
      {rest.length > 0 && (
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {rest.slice(0, 4).map((vehicle) => (
            <motion.div
              key={vehicle.id}
              variants={fadeUp}
              className="min-w-0"
            >
              <VehicleCard
                vehicle={vehicle}
                layout="grid"
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}