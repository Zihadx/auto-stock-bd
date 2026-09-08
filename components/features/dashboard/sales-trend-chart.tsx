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
import { formatBDTCompact } from "@/lib/format";
import type { TimeSeriesPoint } from "@/types/analytics";
import { ACCENT, BURGUNDY, LINE } from "@/components/ui/tokens";

export function SalesTrendChart({
  data,
}: {
  data: TimeSeriesPoint[];
}) {
  return (
    <ChartCard
      title="Monthly revenue"
      description="Last 8 months"
    >
      <div className="h-64 w-full">
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
              {/* Light mode */}
              <linearGradient
                id="salesRevenueGradient"
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
                  offset="55%"
                  stopColor={BURGUNDY}
                  stopOpacity={0.08}
                />
                <stop
                  offset="100%"
                  stopColor={ACCENT}
                  stopOpacity={0}
                />
              </linearGradient>

              {/* Dark mode */}
              <linearGradient
                id="salesRevenueGradientDark"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={ACCENT}
                  stopOpacity={0.28}
                />
                <stop
                  offset="55%"
                  stopColor={BURGUNDY}
                  stopOpacity={0.12}
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
              stroke={LINE}
              strokeDasharray="3 5"
              className="dark:opacity-60"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
              }}
              tickMargin={10}
              className="fill-slate-500 dark:fill-slate-400"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={58}
              tickMargin={8}
              tickFormatter={(value: number) =>
                formatBDTCompact(value)
              }
              tick={{
                fontSize: 12,
              }}
              className="fill-slate-500 dark:fill-slate-400"
            />

            <Tooltip
              cursor={{
                stroke: ACCENT,
                strokeWidth: 1,
                strokeDasharray: "4 4",
                opacity: 0.45,
              }}
              formatter={(value) => [
                formatBDTCompact(Number(value)),
                "Revenue",
              ]}
              contentStyle={{
                borderRadius: 10,
                backgroundColor: "var(--color-paper-raised)",
                border: `1px solid ${LINE}`,
                color: "var(--color-ink)",
                fontSize: 13,
                padding: "10px 12px",
                boxShadow:
                  "0 12px 32px rgba(0, 0, 0, 0.12)",
              }}
              labelStyle={{
                color: "var(--color-ink-faint)",
                marginBottom: 4,
                fontSize: 11,
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
              fill="url(#salesRevenueGradient)"
              activeDot={{
                r: 5,
                fill: ACCENT,
                stroke: "var(--color-paper-raised)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}