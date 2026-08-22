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

function FavoriteButton({ vehicleId }: { vehicleId: string }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((s) => s.favorites.vehicleIds.includes(vehicleId));

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleFavorite(vehicleId))}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
      className="rounded-full p-1.5 text-ink-faint transition-colors hover:bg-ink/5 hover:text-ink"
    >
      <Heart className={cn("h-4 w-4", isFavorite && "fill-brass text-brass")} aria-hidden />
    </button>
  );
}

function SpecRow({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-soft">
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
  );
}

export function VehicleCard({
  vehicle,
  layout = "grid",
}: {
  vehicle: Vehicle;
  layout?: "grid" | "list";
}) {
  const primaryImage = vehicle.images.find((i) => i.isPrimary) ?? vehicle.images[0];

  if (layout === "list") {
    return (
      <article className="group flex gap-4 overflow-hidden rounded-md border border-line bg-paper-raised p-3 transition-shadow hover:shadow-md sm:gap-5 sm:p-4">
        <Link
          href={`/inventory/${vehicle.slug}`}
          className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-sm bg-ink/5 sm:w-48"
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="200px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute left-2 top-2">
            <VehicleStatusBadge status={vehicle.status} />
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <Link href={`/inventory/${vehicle.slug}`}>
                <h3 className="font-display text-base font-medium text-ink">
                  {vehicle.brand} {vehicle.model}
                  {vehicle.trim ? ` ${vehicle.trim}` : ""}
                </h3>
              </Link>
              <FavoriteButton vehicleId={vehicle.id} />
            </div>
            <p className="mt-0.5 text-sm text-ink-soft">
              {vehicle.year} · {vehicle.location}
            </p>
            <div className="mt-2">
              <SpecRow vehicle={vehicle} />
            </div>
          </div>
          <PriceDisplay amount={vehicle.price} negotiable={vehicle.negotiable} className="mt-2" />
        </div>
      </article>
    );
  }

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
        <p className="mt-0.5 text-sm text-ink-soft">
          {vehicle.year} · {vehicle.location}
        </p>

        <div className="mt-3">
          <SpecRow vehicle={vehicle} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <PriceDisplay amount={vehicle.price} negotiable={vehicle.negotiable} />
          <FavoriteButton vehicleId={vehicle.id} />
        </div>
      </div>
    </article>
  );
}
