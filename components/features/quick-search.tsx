"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { vehicleBrands } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuickSearch() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set("brands", brand);
    if (query) params.set("search", query);
    router.push(`/inventory?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-3xl flex-col gap-2 rounded-md border border-line bg-paper-raised p-2 shadow-sm sm:flex-row"
      role="search"
      aria-label="Search inventory"
    >
      <label className="sr-only" htmlFor="quick-search-brand">
        Brand
      </label>
      <select
        id="quick-search-brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="h-11 rounded-sm border border-line bg-paper px-3 text-sm text-ink sm:w-44"
      >
        <option value="">All brands</option>
        {vehicleBrands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="quick-search-query">
        Search model
      </label>
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          aria-hidden
        />
        <input
          id="quick-search-query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by model — e.g. Axio, Vezel, CX-5"
          className="h-11 w-full rounded-sm border border-line bg-paper pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint"
        />
      </div>

      <button type="submit" className={cn(buttonVariants({ variant: "primary" }), "h-11")}>
        Search
      </button>
    </form>
  );
}
