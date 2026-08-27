import { Suspense } from "react";
import type { Metadata } from "next";
import { AnalyticsTabs } from "@/components/features/analytics/analytics-tabs";
import { DateRangeSelector } from "@/components/features/analytics/date-range-selector";
import { SalesSection } from "@/components/features/analytics/sales-section";
import { InventorySection } from "@/components/features/analytics/inventory-section";
import { LeadsSection } from "@/components/features/analytics/leads-section";
import type { DateRangeKey } from "@/types/analytics";

export const metadata: Metadata = {
  title: "Analytics",
};

const validRanges: DateRangeKey[] = ["7d", "30d", "90d", "6m", "1y"];

export default async function AdminAnalyticsPage({
  searchParams,
}: PageProps<"/admin/analytics">) {
  const resolvedParams = await searchParams;

  const tabParam = Array.isArray(resolvedParams.tab) ? resolvedParams.tab[0] : resolvedParams.tab;
  const tab = tabParam === "inventory" || tabParam === "leads" ? tabParam : "sales";

  const rangeParam = Array.isArray(resolvedParams.range)
    ? resolvedParams.range[0]
    : resolvedParams.range;
  const range = validRanges.includes(rangeParam as DateRangeKey)
    ? (rangeParam as DateRangeKey)
    : "30d";

  const urlSearchParams = new URLSearchParams(
    Object.entries(resolvedParams).flatMap(([key, value]) =>
      value === undefined ? [] : Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]],
    ),
  );

  return (
    <div className="container-page py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-h1 text-ink">Analytics</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Business intelligence across sales, inventory, and leads.
          </p>
        </div>
        {tab !== "inventory" && (
          <Suspense fallback={null}>
            <DateRangeSelector />
          </Suspense>
        )}
      </div>

      <div className="mt-6">
        <AnalyticsTabs active={tab} searchParams={urlSearchParams} />
      </div>

      <div className="mt-5">
        {tab === "sales" && <SalesSection range={range} />}
        {tab === "inventory" && <InventorySection />}
        {tab === "leads" && <LeadsSection range={range} />}
      </div>
    </div>
  );
}
