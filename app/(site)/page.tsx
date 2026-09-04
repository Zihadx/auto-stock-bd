import FeaturedCollections from "@/components/features/featured-vehicles";
import { BrowseByBrand } from "@/components/features/browse-by-brand";
import { WhyChooseUs } from "@/components/features/why-choose-us";
import { RecentlyAdded } from "@/components/features/recently-added";
import {  FinalCta, TradeInCta } from "@/components/features/homepage-ctas";
import BenefitsStrip from "@/components/features/trust-section";
import { Hero } from "@/components/features/hero";
// import { QuickSearchBar } from "@/components/features/quick-search";
// import { SpecStrip } from "@/components/features/spec-strip";
import { Testimonials } from "@/components/features/testimonials";
import AutoShowcase from "@/components/features/AutoShowcase";



export default function HomePage() {
  return (
    <>
      <Hero />

     {/* <QuickSearchBar /> */}
      <BenefitsStrip />
      {/* <SpecStrip
        totalInventoryCount={214}
        totalInventoryValueBDT={186_000_000}
        newVehiclesThisWeek={9}
      /> */}

      <AutoShowcase />

      <FeaturedCollections />
      <BrowseByBrand />
      <WhyChooseUs />
      <RecentlyAdded />
      <Testimonials />
      <TradeInCta />
      <FinalCta />
      {/* <SellCTA /> */}
    </>
  );
}
