"use client";

import { LayoutGrid, List } from "lucide-react";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
  { value: "year-desc", label: "Year: Newest" },
];

export function SortDropdown() {
  const { get, set } = useQueryParams();

  return (
    <label className="flex items-center gap-2 text-sm text-ink-soft">
      <span className="hidden sm:inline">Sort by</span>
      <select
        value={get("sort") ?? "newest"}
        onChange={(e) => set({ sort: e.target.value })}
        className="h-9 rounded-sm border border-line bg-paper-raised px-2 text-sm text-ink"
        aria-label="Sort vehicles"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ViewToggle({
  view,
  onChange,
}: {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}) {
  return (
    <div
      role="group"
      aria-label="Toggle layout"
      className="hidden items-center gap-0.5 rounded-sm border border-line p-0.5 sm:flex"
    >
      <button
        type="button"
        aria-pressed={view === "grid"}
        aria-label="Grid view"
        onClick={() => onChange("grid")}
        className={cn(
          "rounded-[3px] p-1.5",
          view === "grid" ? "bg-ink text-paper" : "text-ink-faint hover:text-ink",
        )}
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-pressed={view === "list"}
        aria-label="List view"
        onClick={() => onChange("list")}
        className={cn(
          "rounded-[3px] p-1.5",
          view === "list" ? "bg-ink text-paper" : "text-ink-faint hover:text-ink",
        )}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}
