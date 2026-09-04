import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  Fuel,
  Cog,
} from "lucide-react";

import { VehicleStatusBadge } from "@/components/ui/status-badge";
import { PriceDisplay } from "@/components/ui/price-display";
import { FavoriteButton } from "@/components/features/favorite-button";
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

function SpecRow({
  vehicle,
  tone = "default",
}: {
  vehicle: Vehicle;
  tone?: "default" | "onImage";
}) {
  const toneClass =
    tone === "onImage"
      ? "text-white/65"
      : "text-ink-soft";

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] ${toneClass}`}
    >
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <Gauge
          className="h-3.5 w-3.5"
          strokeWidth={1.35}
          aria-hidden
        />
        {formatMileage(vehicle.mileageKm)}
      </span>

      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <Fuel
          className="h-3.5 w-3.5"
          strokeWidth={1.35}
          aria-hidden
        />
        {fuelLabel[vehicle.fuelType]}
      </span>

      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <Cog
          className="h-3.5 w-3.5"
          strokeWidth={1.35}
          aria-hidden
        />
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
  layout?: "grid" | "list" | "spotlight";
}) {
  const primaryImage =
    vehicle.images.find((image) => image.isPrimary) ??
    vehicle.images[0];

  const title = `${vehicle.brand} ${vehicle.model}${
    vehicle.trim ? ` ${vehicle.trim}` : ""
  }`;

  /*
   * ============================================================
   * SPOTLIGHT
   * ============================================================
   *
   * Editorial / cinematic treatment.
   * The image remains the hero.
   * Content is integrated into the lower photographic area.
   */
  if (layout === "spotlight") {
    return (
      <article
        className="
          group relative overflow-hidden
          rounded-2xl
          border border-line/70
          bg-paper-raised
          shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
          transition-transform duration-500
          hover:-translate-y-0.5
        "
      >
        <Link
          href={`/inventory/${vehicle.slug}`}
          className="
            relative block
            aspect-[4/5]
            overflow-hidden
            sm:aspect-[16/11]
          "
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="
                object-cover
                transition-transform
                duration-[900ms]
                ease-out
                group-hover:scale-[1.045]
              "
            />
          )}

          {/* Cinematic image treatment */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t
              from-black/85
              via-black/20
              to-transparent
            "
          />

          {/* Soft top reflection */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-0 top-0 h-28
              bg-gradient-to-b
              from-white/[0.055]
              to-transparent
            "
          />

          {/* Image edge vignette */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              ring-1 ring-inset ring-black/10
            "
          />

          {/* Status */}
          <div className="absolute left-4 top-4">
            <div
              className="
                rounded-full
                border border-white/15
                bg-black/30
                px-3 py-1.5
                text-[9px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-white/80
                backdrop-blur-xl
              "
            >
              {vehicle.status}
            </div>
          </div>

          {/* Favorite */}
          <div className="absolute right-4 top-4">
            <FavoriteButton vehicleId={vehicle.id} />
          </div>

          {/* Spotlight marker */}
          <div
            className="
              absolute left-5 top-16
              hidden items-center gap-2
              sm:flex
            "
          >
            <span className="h-px w-5 bg-brass/80" />

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-white/50
              "
            >
              Spotlight
            </span>
          </div>

          {/* Bottom editorial content */}
          <div
            className="
              absolute inset-x-0 bottom-0
              p-5 sm:p-6 lg:p-7
            "
          >
            <div className="flex items-end justify-between gap-5">
              <div className="min-w-0">
                <p
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-white/50
                  "
                >
                  {vehicle.year} · {vehicle.location}
                </p>

                <h3
                  className="
                    mt-2
                    max-w-[32rem]
                    font-display
                    text-xl
                    font-medium
                    leading-tight
                    tracking-[-0.025em]
                    text-white
                    sm:text-2xl
                    lg:text-[27px]
                  "
                >
                  {title}
                </h3>

                <div className="mt-3">
                  <SpecRow
                    vehicle={vehicle}
                    tone="onImage"
                  />
                </div>
              </div>

              {/* Desktop CTA */}
              <div
                className="
                  hidden
                  h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-full
                  border border-white/15
                  bg-black/25
                  text-white/65
                  backdrop-blur-xl
                  transition-all duration-300
                  group-hover:border-brass/40
                  group-hover:bg-black/35
                  group-hover:text-brass
                  sm:flex
                "
              >
                <ArrowUpRight
                  className="
                    h-4 w-4
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                  strokeWidth={1.35}
                />
              </div>
            </div>

            {/* Price */}
            <div
              className="
                mt-5
                flex items-center justify-between
                border-t border-white/10
                pt-4
              "
            >
              <PriceDisplay
                amount={vehicle.price}
                negotiable={vehicle.negotiable}
                className="
                  text-white
                  [&_*]:text-white
                "
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-white/35
                  sm:hidden
                "
              >
                View vehicle
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  /*
   * ============================================================
   * LIST
   * ============================================================
   */

  if (layout === "list") {
    return (
      <article
        className="
          group flex gap-4 overflow-hidden
          rounded-xl
          border border-line/70
          bg-paper-raised/65
          p-3
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-0.5
          hover:border-brass/25
          sm:gap-5 sm:p-4
        "
      >
        <Link
          href={`/inventory/${vehicle.slug}`}
          className="
            relative aspect-[4/3]
            w-32 shrink-0
            overflow-hidden
            rounded-lg
            bg-ink/5
            sm:w-48
          "
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="200px"
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.035]
              "
            />
          )}

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t
              from-black/25
              to-transparent
            "
          />

          <div className="absolute left-2.5 top-2.5">
            <VehicleStatusBadge status={vehicle.status} />
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/inventory/${vehicle.slug}`}
                className="min-w-0"
              >
                <h3
                  className="
                    truncate
                    font-display
                    text-base
                    font-medium
                    tracking-[-0.015em]
                    text-ink
                  "
                >
                  {title}
                </h3>
              </Link>

              <FavoriteButton vehicleId={vehicle.id} />
            </div>

            <p className="mt-1 text-xs text-ink-soft">
              {vehicle.year} · {vehicle.location}
            </p>

            <div className="mt-3">
              <SpecRow vehicle={vehicle} />
            </div>
          </div>

          <PriceDisplay
            amount={vehicle.price}
            negotiable={vehicle.negotiable}
            className="mt-3"
          />
        </div>
      </article>
    );
  }

  /*
   * ============================================================
   * GRID
   * ============================================================
   */

  return (
    <article
      className="
        group overflow-hidden
        rounded-xl
        border border-line/70
        bg-paper-raised/65
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-brass/25
        hover:shadow-[0_18px_45px_-20px_rgba(0,0,0,0.28)]
      "
    >
      <Link
        href={`/inventory/${vehicle.slug}`}
        className="block"
      >
        <div
          className="
            relative aspect-[4/3]
            overflow-hidden
            bg-ink/5
          "
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="
                (min-width: 1280px) 320px,
                (min-width: 640px) 45vw,
                90vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.035]
              "
            />
          )}

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t
              from-black/30
              via-transparent
              to-transparent
            "
          />

          <div className="absolute left-3 top-3">
            <VehicleStatusBadge status={vehicle.status} />
          </div>

          <div
            className="
              absolute bottom-3 right-3
              flex h-8 w-8
              items-center justify-center
              rounded-full
              border border-white/15
              bg-black/25
              text-white/65
              opacity-0
              backdrop-blur-xl
              transition-all duration-300
              group-hover:opacity-100
            "
          >
            <ArrowUpRight
              className="
                h-3.5 w-3.5
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
              strokeWidth={1.35}
            />
          </div>
        </div>
      </Link>

      <div className="p-4 sm:p-[18px]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/inventory/${vehicle.slug}`}>
              <h3
                className="
                  truncate
                  font-display
                  text-[15px]
                  font-medium
                  leading-5
                  tracking-[-0.015em]
                  text-ink
                "
              >
                {title}
              </h3>
            </Link>

            <p className="mt-1 text-xs text-ink-soft">
              {vehicle.year} · {vehicle.location}
            </p>
          </div>

          <FavoriteButton vehicleId={vehicle.id} />
        </div>

        <div className="mt-3">
          <SpecRow vehicle={vehicle} />
        </div>

        <div
          className="
            mt-4
            flex items-center justify-between
            border-t border-line/70
            pt-3.5
          "
        >
          <PriceDisplay
            amount={vehicle.price}
            negotiable={vehicle.negotiable}
          />
        </div>
      </div>
    </article>
  );
}