import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VehicleCard } from "@/components/features/vehicle-card";
import { getFeaturedVehicles } from "@/services/vehicle.service";

export async function FeaturedVehicles() {
  const featured = await getFeaturedVehicles(6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brass">
            Handpicked
          </p>
          <h2 className="mt-1 font-display text-2xl font-medium md:text-3xl">
            Featured vehicles
          </h2>
        </div>
        <Link
          href="/inventory"
          className="hidden items-center gap-1 text-sm text-ink-soft hover:text-ink sm:flex"
        >
          View all inventory <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
