import { FeaturedVehicles } from "@/components/features/featured-vehicles";
import { BrowseByBrand } from "@/components/features/browse-by-brand";
import { WhyChooseUs } from "@/components/features/why-choose-us";
import { RecentlyAdded } from "@/components/features/recently-added";
import { TradeInCta, FinalCta } from "@/components/features/homepage-ctas";
import { TrustSection } from "@/components/features/trust-section";
import { Hero } from "@/components/features/hero";
import { formatBDTCompact } from "@/lib/format";
import {
  totalInventoryCount,
  totalInventoryValueBDT,
  newVehiclesThisWeek,
} from "@/data/vehicles";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Signature element: live spec-strip. Echoed as the admin KPI strip. */}
      <section className="border-b border-line bg-charcoal text-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 pb-4 pt-12 font-tabular text-sm md:justify-between md:px-8 md:pt-14">
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
