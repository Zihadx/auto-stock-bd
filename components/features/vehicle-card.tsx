"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Gauge, Fuel, Cog } from "lucide-react";
import { VehicleStatusBadge } from "@/components/ui/status-badge";
import { PriceDisplay } from "@/components/ui/price-display";
import { formatMileage } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { cn } from "@/lib/utils";
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

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((s) => s.favorites.vehicleIds.includes(vehicle.id));
  const primaryImage = vehicle.images.find((i) => i.isPrimary) ?? vehicle.images[0];

  return (
    <article className="group overflow-hidden rounded-md border border-line bg-paper-raised transition-shadow hover:shadow-md">
      <Link href={`/inventory/${vehicle.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute left-3 top-3">
            <VehicleStatusBadge status={vehicle.status} />
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/inventory/${vehicle.slug}`}>
          <h3 className="font-display text-base font-medium text-ink">
            {vehicle.brand} {vehicle.model}
            {vehicle.trim ? ` ${vehicle.trim}` : ""}
          </h3>
        </Link>
        <p className="mt-0.5 text-sm text-ink-soft">{vehicle.year} · {vehicle.location}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" aria-hidden />
            {formatMileage(vehicle.mileageKm)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" aria-hidden />
            {fuelLabel[vehicle.fuelType]}
          </span>
          <span className="flex items-center gap-1">
            <Cog className="h-3.5 w-3.5" aria-hidden />
            {transmissionLabel[vehicle.transmission]}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <PriceDisplay amount={vehicle.price} negotiable={vehicle.negotiable} />
          <button
            type="button"
            onClick={() => dispatch(toggleFavorite(vehicle.id))}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
            className="rounded-full p-1.5 text-ink-faint transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <Heart
              className={cn("h-4 w-4", isFavorite && "fill-brass text-brass")}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </article>
  );
}
