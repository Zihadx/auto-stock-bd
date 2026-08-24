import { ChartCard } from "@/components/ui/chart-card";

export function ConversionFunnel({ data }: { data: { stage: string; count: number }[] }) {
  const max = data[0]?.count ?? 1;

  return (
    <ChartCard title="Inquiry conversion funnel" description="From listing view to sale">
      <div className="space-y-3">
        {data.map((stage, i) => {
          const widthPct = Math.max(8, Math.round((stage.count / max) * 100));
          const prevCount = i > 0 ? data[i - 1].count : null;
          const conversionPct = prevCount ? Math.round((stage.count / prevCount) * 100) : null;

          return (
            <div key={stage.stage}>
              <div className="flex items-baseline justify-between text-xs text-ink-soft">
                <span className="font-medium text-ink">{stage.stage}</span>
                <span className="font-tabular">
                  {new Intl.NumberFormat("en-BD").format(stage.count)}
                  {conversionPct !== null && (
                    <span className="ml-1.5 text-ink-faint">({conversionPct}%)</span>
                  )}
                </span>
              </div>
              <div className="mt-1.5 h-8 w-full overflow-hidden rounded-sm bg-ink/5">
                <div
                  className="h-full rounded-sm bg-brass transition-all"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
