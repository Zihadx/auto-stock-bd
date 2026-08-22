import Link from "next/link";
import { vehicleBrands } from "@/config/site";

export function BrowseByBrand() {
  return (
    <section className="border-y border-line bg-paper-raised">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-medium md:text-3xl">Browse by brand</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Every listing verified against manufacturer specifications.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {vehicleBrands.map((brand) => (
            <Link
              key={brand}
              href={`/inventory?brands=${encodeURIComponent(brand)}`}
              className="flex h-20 items-center justify-center rounded-md border border-line px-3 text-center text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
