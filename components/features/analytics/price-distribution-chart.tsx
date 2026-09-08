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


type PriceDistributionPoint = {
  range: string;
  count: number;
};

export function PriceDistributionChart({
  data,
}: {
  data: PriceDistributionPoint[];
}) {
  return (
    <ChartCard
      title="Price distribution"
      description="Current inventory by price band"
    >
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
            barCategoryGap="22%"
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--color-chart-line)"
              strokeDasharray="3 5"
            />

            <XAxis
              dataKey="range"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval="preserveStartEnd"
              tick={{
                fontSize: 11,
              }}
              className="fill-[var(--color-chart-text)]"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tickMargin={6}
              allowDecimals={false}
              tick={{
                fontSize: 11,
              }}
              className="fill-[var(--color-chart-text)]"
            />

            <Tooltip
              cursor={{
                fill: "var(--color-ink)",
                fillOpacity: 0.035,
              }}
              formatter={(value) => [
                `${Number(value)} vehicles`,
                "Inventory",
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

            <Bar
              dataKey="count"
              fill={ACCENT}
              radius={[5, 5, 2, 2]}
              maxBarSize={44}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}