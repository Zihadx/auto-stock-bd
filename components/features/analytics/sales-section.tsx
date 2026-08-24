import { getSalesAnalytics } from "@/services/analytics.service";
import { AnalyticsRevenueChart } from "@/components/features/analytics/analytics-revenue-chart";
import { LeadsTrendChart } from "@/components/features/dashboard/leads-trend-chart";
import type { DateRangeKey } from "@/types/analytics";

export async function SalesSection({ range }: { range: DateRangeKey }) {
  const { revenue, units, granularity } = await getSalesAnalytics(range);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <AnalyticsRevenueChart data={revenue} granularity={granularity} />
      <LeadsTrendChart
        data={units}
        title="Units sold"
        description={granularity === "daily" ? "Daily totals for the selected range" : "Monthly totals"}
        tooltipLabel="Units"
        color="var(--color-brass)"
      />
    </div>
  );
}
