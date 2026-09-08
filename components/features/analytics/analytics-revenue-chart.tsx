"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@/components/ui/chart-card";
import { ACCENT } from "@/components/ui/tokens";
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
      description={
        granularity === "daily"
          ? "Daily totals for the selected range"
          : "Monthly totals"
      }
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 8,
              right: 12,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="analyticsRevenueFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={ACCENT}
                  stopOpacity={0.24}
                />
                <stop
                  offset="65%"
                  stopColor={ACCENT}
                  stopOpacity={0.08}
                />
                <stop
                  offset="100%"
                  stopColor={ACCENT}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="var(--color-chart-line, var(--color-line))"
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
              width={58}
              tickMargin={6}
              tickFormatter={(value) =>
                formatBDTCompact(Number(value))
              }
              tick={{
                fontSize: 11,
                fill: "var(--color-ink-faint)",
              }}
            />

            <Tooltip
              cursor={{
                stroke: ACCENT,
                strokeWidth: 1,
                strokeOpacity: 0.18,
              }}
              formatter={(value) => [
                formatBDTCompact(Number(value)),
                "Revenue",
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
                color: ACCENT,
                fontWeight: 600,
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={ACCENT}
              strokeWidth={2.5}
              fill="url(#analyticsRevenueFill)"
              activeDot={{
                r: 5,
                fill: ACCENT,
                stroke: "var(--color-paper-raised)",
                strokeWidth: 2,
              }}
              dot={false}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}