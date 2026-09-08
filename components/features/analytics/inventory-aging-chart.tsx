"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@/components/ui/chart-card";
import { ACCENT, BURGUNDY, GOLD } from "@/components/ui/tokens";

type InventoryAgingPoint = {
  bucket: string;
  count: number;
};

const agingColors = [
  ACCENT,
  BURGUNDY,
  GOLD,
  "var(--color-chart-muted)",
];

export function InventoryAgingChart({
  data,
}: {
  data: InventoryAgingPoint[];
}) {
  return (
    <ChartCard
      title="Inventory aging"
      description="How long vehicles have been available"
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
              dataKey="bucket"
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
                color: "var(--color-ink)",
                fontWeight: 600,
              }}
            />

            <Bar
              dataKey="count"
              radius={[5, 5, 2, 2]}
              maxBarSize={44}
              animationDuration={700}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.bucket}
                  fill={agingColors[index % agingColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}