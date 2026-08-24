import {
  getDailyRevenue,
  getDailyLeads,
  getDailyUnitsSold,
  inventoryAgingBuckets,
  getPriceDistribution,
  conversionFunnel,
} from "@/data/analytics";
import {
  monthlyRevenue,
  monthlyUnitsSold,
  leadsTrend,
  brandPerformance,
  inventoryDistribution,
} from "@/data/dashboard";
import type { DateRangeKey } from "@/types/analytics";

const ARTIFICIAL_DELAY_MS = 250;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ARTIFICIAL_DELAY_MS));
}

const rangeDays: Record<DateRangeKey, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  "6m": 6,
  "1y": 12,
};

export async function getSalesAnalytics(range: DateRangeKey) {
  if (range === "6m" || range === "1y") {
    const months = range === "6m" ? 6 : 8; // only 8 months of monthly data exist
    return delay({
      revenue: monthlyRevenue.slice(-months),
      units: monthlyUnitsSold.slice(-months),
      granularity: "monthly" as const,
    });
  }

  const days = rangeDays[range];
  return delay({
    revenue: getDailyRevenue(days),
    units: getDailyUnitsSold(days),
    granularity: "daily" as const,
  });
}

export async function getLeadsAnalytics(range: DateRangeKey) {
  if (range === "6m" || range === "1y") {
    const months = range === "6m" ? 6 : 8;
    return delay({ trend: leadsTrend.slice(-months), funnel: conversionFunnel });
  }

  const days = rangeDays[range];
  return delay({ trend: getDailyLeads(days), funnel: conversionFunnel });
}

export async function getInventoryAnalytics() {
  return delay({
    distribution: inventoryDistribution,
    brandPerformance,
    aging: inventoryAgingBuckets,
    priceDistribution: getPriceDistribution(),
  });
}
