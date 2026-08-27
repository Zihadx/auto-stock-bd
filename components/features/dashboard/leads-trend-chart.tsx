"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartCard } from "@/components/ui/chart-card";
import type { TimeSeriesPoint } from "@/types/analytics";

export function LeadsTrendChart({
  data,
  title = "Inquiries received",
  description = "Last 8 months",
  tooltipLabel = "Inquiries",
  color = "var(--color-info)",
}: {
  data: TimeSeriesPoint[];
  title?: string;
  description?: string;
  tooltipLabel?: string;
  color?: string;
}) {
  return (
    <ChartCard title={title} description={description}>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
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
              tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }}
              width={28}
            />
            <Tooltip
              formatter={(value) => [`${value}`, tooltipLabel]}
              contentStyle={{
                borderRadius: 6,
                backgroundColor: "var(--color-paper-raised)",
                borderColor: "var(--color-line)",
                color: "var(--color-ink)",
                fontSize: 13,
              }}
            />
            <Bar dataKey="value" fill={color} radius={[3, 3, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
