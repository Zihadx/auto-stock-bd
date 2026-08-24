"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { ChartCard } from "@/components/ui/chart-card";

const colors = ["var(--color-success)", "var(--color-info)", "var(--color-warning)", "var(--color-danger)"];

export function InventoryAgingChart({ data }: { data: { bucket: string; count: number }[] }) {
  return (
    <ChartCard title="Inventory aging" description="How long listings have been available">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-line)" />
            <XAxis
              dataKey="bucket"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-ink-faint)" }} width={28} />
            <Tooltip
              formatter={(value) => [`${value} vehicles`, "Count"]}
              contentStyle={{ borderRadius: 6, borderColor: "var(--color-line)", fontSize: 13 }}
            />
            <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={48}>
              {data.map((entry, i) => (
                <Cell key={entry.bucket} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
