"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChartCard } from "@/components/ui/chart-card";
import { ACCENT, BURGUNDY, GOLD } from "@/components/ui/tokens";


type InventoryStatus = {
  status: string;
  count: number;
};

const statusColors: Record<string, string> = {
  Available: ACCENT,
  Reserved: GOLD,
  Sold: BURGUNDY,
};

export function InventoryDonut({
  data,
}: {
  data: InventoryStatus[];
}) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ChartCard
      title="Inventory status"
      description={`${total} vehicles total`}
    >
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="45%"
              innerRadius={62}
              outerRadius={88}
              paddingAngle={3}
              cornerRadius={4}
              stroke="var(--color-paper-raised)"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={
                    statusColors[entry.status] ??
                    "var(--color-ink-faint)"
                  }
                />
              ))}
            </Pie>

            <Tooltip
              cursor={false}
              formatter={(value, name) => [
                `${Number(value)} vehicles`,
                name,
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

            <Legend
              verticalAlign="bottom"
              height={32}
              iconType="circle"
              iconSize={7}
              formatter={(value) => (
                <span className="text-xs text-[var(--color-ink-soft)]">
                  {value}
                </span>
              )}
              wrapperStyle={{
                fontSize: 12,
                paddingTop: 4,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}