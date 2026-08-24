import { getLeadsAnalytics } from "@/services/analytics.service";
import { LeadsTrendChart } from "@/components/features/dashboard/leads-trend-chart";
import { ConversionFunnel } from "@/components/features/analytics/conversion-funnel";
import type { DateRangeKey } from "@/types/analytics";

export async function LeadsSection({ range }: { range: DateRangeKey }) {
  const { trend, funnel } = await getLeadsAnalytics(range);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <LeadsTrendChart data={trend} />
      <ConversionFunnel data={funnel} />
    </div>
  );
}
