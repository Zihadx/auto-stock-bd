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
