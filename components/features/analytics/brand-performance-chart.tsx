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


type BrandPerformancePoint = {
  brand: string;
  unitsSold: number;
  avgDaysToSell: number;
};

export function BrandPerformanceChart({
  data,
}: {
  data: BrandPerformancePoint[];
}) {
  return (
    <ChartCard
      title="Brand performance"
      description="Units sold, last 8 months"
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 8,
              right: 16,
              left: 4,
              bottom: 0,
            }}
            barCategoryGap="28%"
          >
            <CartesianGrid
              horizontal={false}
              stroke="var(--color-chart-line)"
              strokeDasharray="3 5"
            />

            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              tick={{
                fontSize: 11,
              }}
              className="fill-[var(--color-chart-text)]"
            />

            <YAxis
              type="category"
              dataKey="brand"
              tickLine={false}
              axisLine={false}
              width={82}
              tickMargin={8}
              tick={{
                fontSize: 12,
              }}
              className="fill-[var(--color-ink-soft)]"
            />

            <Tooltip
              cursor={{
                fill: "var(--color-ink)",
                fillOpacity: 0.035,
              }}
              formatter={(value, name) =>
                name === "unitsSold"
                  ? [`${Number(value)} units`, "Sold"]
                  : [`${Number(value)} days`, "Avg. to sell"]
              }
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
                marginBottom: 5,
              }}
              itemStyle={{
                color: ACCENT,
                fontWeight: 600,
              }}
            />

            <Bar
              dataKey="unitsSold"
              fill={ACCENT}
              radius={[0, 5, 5, 0]}
              maxBarSize={20}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}