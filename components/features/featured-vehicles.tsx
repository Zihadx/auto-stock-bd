import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedGrid } from "@/components/features/featured-grid";
import { getFeaturedVehicles } from "@/services/vehicle.service";

export async function FeaturedVehicles() {
  const featured = await getFeaturedVehicles(5);

  return (
    <section className="container-page py-16 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-label text-brass">Act 04 · Handpicked</p>
          <h2 className="text-h1 mt-3 text-ink">Featured vehicles</h2>
        </div>
        <Link
          href="/inventory"
          className="hidden items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink sm:flex"
        >
          View all inventory <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <FeaturedGrid vehicles={featured} />
    </section>
  );
}
