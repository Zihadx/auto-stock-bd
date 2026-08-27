"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartCard } from "@/components/ui/chart-card";

export function BrandPerformanceChart({
  data,
}: {
  data: { brand: string; unitsSold: number; avgDaysToSell: number }[];
}) {
  return (
    <ChartCard title="Brand performance" description="Units sold, last 8 months">
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} stroke="var(--color-line)" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }}
            />
            <YAxis
              type="category"
              dataKey="brand"
              tickLine={false}
              axisLine={false}
              width={80}
              tick={{ fontSize: 12, fill: "var(--color-ink-soft)" }}
            />
            <Tooltip
              formatter={(value, name) =>
                name === "unitsSold" ? [`${value} units`, "Sold"] : [`${value} days`, "Avg. to sell"]
              }
              contentStyle={{
                borderRadius: 6,
                backgroundColor: "var(--color-paper-raised)",
                borderColor: "var(--color-line)",
                color: "var(--color-ink)",
                fontSize: 13,
              }}
            />
            <Bar dataKey="unitsSold" fill="var(--color-brass)" radius={[0, 3, 3, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
