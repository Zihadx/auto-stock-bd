"use client";

import { useState } from "react";
import { Search, Car, Wallet, CalendarDays, Gauge, ChevronDown } from "lucide-react";
import { PAPER, ACCENT, CHARCOAL } from "../ui/tokens";


const TABS = [
  { id: "quick", label: "Quick Search", icon: Search },
  { id: "body", label: "Body Type", icon: Car },
  { id: "price", label: "Price Range", icon: Wallet },
  { id: "year", label: "Year", icon: CalendarDays },
  { id: "mileage", label: "Mileage", icon: Gauge },
] as const;

type TabId = (typeof TABS)[number]["id"];

function FilterSelect({ placeholder }: { placeholder: string }) {
  return (
    <button
      type="button"
      className="flex flex-1 items-center justify-between border px-4 py-3.5 text-left text-[13px] transition-colors hover:border-white/30"
      style={{ borderColor: `${PAPER}20`, color: `${PAPER}CC` }}
    >
      {placeholder}
      <ChevronDown className="h-4 w-4 opacity-50" aria-hidden />
    </button>
  );
}

export function QuickSearchBar() {
  const [activeTab, setActiveTab] = useState<TabId>("quick");

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-[1920px] px-6 sm:px-9 lg:px-14 xl:px-20">
      <div className="border" style={{ borderColor: `${PAPER}18`, backgroundColor: `${CHARCOAL}F2` }}>
        {/* Tabs */}
        <div className="flex flex-wrap border-b" style={{ borderColor: `${PAPER}18` }}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-colors"
                style={{
                  color: isActive ? PAPER : `${PAPER}66`,
                  borderBottom: isActive ? `2px solid ${ACCENT}` : "2px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 p-5 md:flex-row md:items-stretch">
          <FilterSelect placeholder="All Brands" />
          <FilterSelect placeholder="All Models" />
          <FilterSelect placeholder="Min Price" />
          <FilterSelect placeholder="Max Price" />
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-90"
            style={{ backgroundColor: ACCENT, color: CHARCOAL }}
          >
            <Search className="h-4 w-4" aria-hidden />
            Search Inventory
          </button>
        </div>
      </div>
    </div>
  );
}