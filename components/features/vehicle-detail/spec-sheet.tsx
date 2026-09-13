
import {
  Calendar,
  Cog,
  Cpu,
  Fuel,
  Gauge,
  MapPin,
  Palette,
  Users,
} from "lucide-react";

import { formatMileage } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

const fuelLabel: Record<Vehicle["fuelType"], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Electric",
  cng: "CNG",
};

const transmissionLabel: Record<Vehicle["transmission"], string> = {
  automatic: "Automatic",
  manual: "Manual",
  cvt: "CVT",
};

export function SpecSheet({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { icon: Calendar, label: "Year", value: `${vehicle.year}` },
    {
      icon: Gauge,
      label: "Mileage",
      value: formatMileage(vehicle.mileageKm),
    },
    {
      icon: Fuel,
      label: "Fuel type",
      value: fuelLabel[vehicle.fuelType],
    },
    {
      icon: Cog,
      label: "Transmission",
      value: transmissionLabel[vehicle.transmission],
    },
    {
      icon: Cpu,
      label: "Engine",
      value: `${vehicle.engineCc} cc`,
    },
    {
      icon: Palette,
      label: "Color",
      value: vehicle.color,
    },
    {
      icon: MapPin,
      label: "Location",
      value: vehicle.location,
    },
    {
      icon: Users,
      label: "Owners",
      value: `${vehicle.ownerCount}`,
    },
  ];

  return (
    <div
      className="
        grid grid-cols-2 overflow-hidden rounded-2xl
        border border-[#F51B72]/[0.08]
        bg-[#F51B72]/[0.025]
        shadow-[0_18px_50px_rgba(10,1,6,0.07)]
        backdrop-blur-2xl
        sm:grid-cols-4
      "
    >
      {specs.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="
            group relative overflow-hidden
            border-b border-r border-[#F51B72]/[0.055]
            bg-white/[0.012]
            p-4
            transition-all duration-500
            hover:bg-[#F51B72]/[0.028]
            hover:backdrop-blur-3xl
          "
        >
          {/* Extremely subtle glass reflection */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-0 top-0 h-px
              bg-gradient-to-r
              from-transparent
              via-[#F8C3E1]/[0.16]
              to-transparent
            "
          />

          {/* Soft ambient pink glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-10 -top-10 size-20
              rounded-full
              bg-[#F51B72]/[0.025]
              opacity-0 blur-3xl
              transition-opacity duration-500
              group-hover:opacity-100
            "
          />

          <div className="relative">
            {/* Icon glass tile */}
            <div
              className="
                flex size-8 items-center justify-center
                rounded-[10px]
                border border-[#F51B72]/[0.08]
                bg-[#F51B72]/[0.018]
                shadow-[inset_0_1px_0_rgba(248,195,225,0.06)]
                backdrop-blur-xl
                transition-all duration-400
                group-hover:border-[#F51B72]/[0.16]
                group-hover:bg-[#F51B72]/[0.04]
              "
            >
              <Icon
                className="
                  size-[14px]
                  text-[#F51B72]/[0.58]
                  transition-all duration-300
                  group-hover:text-[#F51B72]/[0.85]
                "
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>

            <p
              className="
                mt-3
                text-[9px]
                font-medium
                uppercase
                tracking-[0.15em]
                text-ink-faint
              "
            >
              {label}
            </p>

            <p
              className="
                mt-1
                truncate
                font-tabular
                text-[13px]
                font-semibold
                tracking-[-0.012em]
                text-ink
              "
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

