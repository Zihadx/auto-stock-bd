"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartCard } from "@/components/ui/chart-card";
import { formatBDTCompact } from "@/lib/format";
import type { TimeSeriesPoint } from "@/types/analytics";

export function SalesTrendChart({ data }: { data: TimeSeriesPoint[] }) {
  return (
    <ChartCard title="Monthly revenue" description="Last 8 months">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brass)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--color-brass)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-line)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--color-ink-faint)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => formatBDTCompact(v)}
              tick={{ fontSize: 12, fill: "var(--color-ink-faint)" }}
              width={56}
            />
            <Tooltip
              formatter={(value) => [formatBDTCompact(Number(value)), "Revenue"]}
              contentStyle={{
                borderRadius: 6,
                borderColor: "var(--color-line)",
                fontSize: 13,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-brass)"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
