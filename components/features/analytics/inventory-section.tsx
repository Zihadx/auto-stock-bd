import { getInventoryAnalytics } from "@/services/analytics.service";
import { InventoryDonut } from "@/components/features/dashboard/inventory-donut";
import { BrandPerformanceChart } from "@/components/features/analytics/brand-performance-chart";
import { InventoryAgingChart } from "@/components/features/analytics/inventory-aging-chart";
import { PriceDistributionChart } from "@/components/features/analytics/price-distribution-chart";

export async function InventorySection() {
  const { distribution, brandPerformance, aging, priceDistribution } = await getInventoryAnalytics();

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <InventoryDonut data={distribution} />
        <BrandPerformanceChart data={brandPerformance} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <InventoryAgingChart data={aging} />
        <PriceDistributionChart data={priceDistribution} />
      </div>
    </div>
  );
}
