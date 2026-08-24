"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartCard } from "@/components/ui/chart-card";
import { formatBDTCompact } from "@/lib/format";
import type { TimeSeriesPoint } from "@/types/analytics";

export function AnalyticsRevenueChart({
  data,
  granularity,
}: {
  data: TimeSeriesPoint[];
  granularity: "daily" | "monthly";
}) {
  return (
    <ChartCard
      title="Revenue"
      description={granularity === "daily" ? "Daily totals for the selected range" : "Monthly totals"}
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="analyticsRevenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brass)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--color-brass)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-line)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatBDTCompact(Number(v))}
              tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }}
              width={56}
            />
            <Tooltip
              formatter={(value) => [formatBDTCompact(Number(value)), "Revenue"]}
              contentStyle={{ borderRadius: 6, borderColor: "var(--color-line)", fontSize: 13 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-brass)"
              strokeWidth={2}
              fill="url(#analyticsRevenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
