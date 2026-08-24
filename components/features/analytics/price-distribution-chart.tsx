"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartCard } from "@/components/ui/chart-card";

export function PriceDistributionChart({ data }: { data: { range: string; count: number }[] }) {
  return (
    <ChartCard title="Price distribution" description="Current inventory by price band">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-line)" />
            <XAxis
              dataKey="range"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} width={28} />
            <Tooltip
              formatter={(value) => [`${value} vehicles`, "Count"]}
              contentStyle={{ borderRadius: 6, borderColor: "var(--color-line)", fontSize: 13 }}
            />
            <Bar dataKey="count" fill="var(--color-info)" radius={[3, 3, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
