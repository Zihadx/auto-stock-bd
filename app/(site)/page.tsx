import FeaturedCollections from "@/components/features/hot-selling";
import { BrowseByBrand } from "@/components/features/browse-by-brand";

import { RecentlyAdded } from "@/components/features/recently-added";
import {  FinalCta } from "@/components/features/homepage-ctas";
import BenefitsStrip from "@/components/features/trust-section";
import { Hero } from "@/components/features/hero";
// import { QuickSearchBar } from "@/components/features/quick-search";
// import { SpecStrip } from "@/components/features/spec-strip";
// Testimonials intentionally not rendered yet — the component currently
// ships with fabricated names/quotes. Re-enable once real customer
// testimonials are collected; see components/features/testimonials.tsx.
// import { Testimonials } from "@/components/features/testimonials";
import AutoShowcase from "@/components/features/AutoShowcase";
import WhyChooseUs from "@/components/features/why-choose-us";
import { getBrandCounts, getInventoryStats } from "@/services/vehicle.service";

export default async function HomePage() {
  const [brandCounts, inventoryStats] = await Promise.all([
    getBrandCounts(),
    getInventoryStats(),
  ]);

  return (
    <>
      <Hero vehicleCount={inventoryStats.totalAvailable} />

     {/* <QuickSearchBar /> */}
      <BenefitsStrip />
      {/* <SpecStrip
        totalInventoryCount={214}
        totalInventoryValueBDT={186_000_000}
        newVehiclesThisWeek={9}
      /> */}

      <AutoShowcase />

      <FeaturedCollections />
      <BrowseByBrand brands={brandCounts} />
      <WhyChooseUs stats={inventoryStats} />
      <RecentlyAdded />
      <FinalCta />

      {/* <SellCTA /> */}
    </>
  );
}
