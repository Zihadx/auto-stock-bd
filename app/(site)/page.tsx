import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { QuickSearch } from "@/components/features/quick-search";
import { FeaturedVehicles } from "@/components/features/featured-vehicles";
import { BrowseByBrand } from "@/components/features/browse-by-brand";
import { WhyChooseUs } from "@/components/features/why-choose-us";
import { RecentlyAdded } from "@/components/features/recently-added";
import { TradeInCta, FinalCta } from "@/components/features/homepage-ctas";
import { TrustSection } from "@/components/features/trust-section";
import { formatBDTCompact } from "@/lib/format";
import {
  totalInventoryCount,
  totalInventoryValueBDT,
  newVehiclesThisWeek,
} from "@/data/vehicles";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-8 md:pt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-6xl">
              Every car,
              <br />
              inspected first.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              AutoStock BD lists only vehicles that have passed our 82-point
              inspection — with full history, honest mileage, and one fixed
              price.
            </p>
          </div>

          <div className="mt-10">
            <QuickSearch />
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/inventory"
              className={buttonVariants({ variant: "brass" })}
            >
              Browse all inventory
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/sell-your-car"
              className={buttonVariants({ variant: "secondary" })}
            >
              Sell your car
            </Link>
          </div>
        </div>
      </section>

      {/* Signature element: live spec-strip. Echoed as the admin KPI strip. */}
      <section className="border-b border-line bg-charcoal text-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 font-tabular text-sm md:justify-between md:px-8">
          <span>
            <span className="text-paper/50">In stock —</span> {totalInventoryCount} vehicles
          </span>
          <span>
            <span className="text-paper/50">Inventory value —</span>{" "}
            {formatBDTCompact(totalInventoryValueBDT)}
          </span>
          <span>
            <span className="text-paper/50">Added this week —</span>{" "}
            {newVehiclesThisWeek}
          </span>
        </div>
      </section>

      <FeaturedVehicles />
      <BrowseByBrand />
      <WhyChooseUs />
      <RecentlyAdded />
      <TradeInCta />
      <TrustSection />
      <FinalCta />
    </>
  );
}
