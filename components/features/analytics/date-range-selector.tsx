"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import type { DateRangeKey } from "@/types/analytics";

const ranges: { value: DateRangeKey; label: string }[] = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1Y" },
];

export function DateRangeSelector() {
  const { get, set } = useQueryParams();
  const active = (get("range") as DateRangeKey) ?? "30d";

  return (
    <div className="flex items-center gap-0.5 rounded-sm border border-line p-0.5">
      {ranges.map((r) => (
        <button
          key={r.value}
          type="button"
          onClick={() => set({ range: r.value })}
          className={cn(
            "rounded-[3px] px-2.5 py-1 text-xs font-medium",
            active === r.value ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
