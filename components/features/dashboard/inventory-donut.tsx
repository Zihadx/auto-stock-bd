"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartCard } from "@/components/ui/chart-card";

const colors: Record<string, string> = {
  Available: "var(--color-success)",
  Reserved: "var(--color-warning)",
  Sold: "var(--color-ink-faint)",
};

export function InventoryDonut({
  data,
}: {
  data: { status: string; count: number }[];
}) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <ChartCard title="Inventory status" description={`${total} vehicles total`}>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.status} fill={colors[entry.status] ?? "var(--color-ink-faint)"} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} vehicles`, name]}
              contentStyle={{ borderRadius: 6, borderColor: "var(--color-line)", fontSize: 13 }}
            />
            <Legend
              verticalAlign="bottom"
              height={32}
              wrapperStyle={{ fontSize: 12, color: "var(--color-ink-soft)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
