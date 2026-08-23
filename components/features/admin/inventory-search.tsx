"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useQueryParams } from "@/hooks/use-query-params";

export function InventorySearch() {
  const { get, set } = useQueryParams();
  const [value, setValue] = useState(get("search") ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== (get("search") ?? "")) {
        set({ search: value || null });
      }
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search vehicles..."
        className="h-9 w-full rounded-sm border border-line bg-paper pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint"
      />
    </div>
  );
}
