"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@/components/ui/chart-card";
import { ACCENT } from "@/components/ui/tokens";
import type { TimeSeriesPoint } from "@/types/analytics";

export function LeadsTrendChart({
  data,
  title = "Inquiries received",
  description = "Last 8 months",
  tooltipLabel = "Inquiries",
  color = ACCENT,
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
          <BarChart
            data={data}
            margin={{
              top: 8,
              right: 12,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap="24%"
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--color-line)"
              strokeDasharray="3 5"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tickMargin={10}
              tick={{
                fontSize: 11,
                fill: "var(--color-ink-faint)",
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tickMargin={6}
              allowDecimals={false}
              tick={{
                fontSize: 11,
                fill: "var(--color-ink-faint)",
              }}
            />

            <Tooltip
              cursor={{
                fill: "var(--color-ink)",
                fillOpacity: 0.035,
              }}
              formatter={(value) => [
                `${Number(value)}`,
                tooltipLabel,
              ]}
              contentStyle={{
                borderRadius: 10,
                backgroundColor: "var(--color-paper-raised)",
                border: "1px solid var(--color-line)",
                color: "var(--color-ink)",
                fontSize: 13,
                padding: "10px 12px",
                boxShadow:
                  "0 12px 32px rgba(0, 0, 0, 0.12)",
              }}
              labelStyle={{
                color: "var(--color-ink-faint)",
                fontSize: 11,
                marginBottom: 4,
              }}
              itemStyle={{
                color,
                fontWeight: 600,
              }}
            />

            <Bar
              dataKey="value"
              fill={color}
              radius={[5, 5, 2, 2]}
              maxBarSize={30}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}