"use client";

import { formatBDTCompact } from "../ui/tokens";

interface SpecStripProps {
  totalInventoryCount: number;
  totalInventoryValueBDT: number;
  newVehiclesThisWeek: number;
}

/**
 * Signature element: live spec-strip.
 * Echoed as the admin KPI strip — keep the field names and shape in sync
 * with whatever renders on /admin so the two never drift apart.
 */
export function SpecStrip({
  totalInventoryCount,
  totalInventoryValueBDT,
  newVehiclesThisWeek,
}: SpecStripProps) {
  return (
    <section className="border-b border-line bg-charcoal text-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 pb-4 pt-12 font-tabular text-sm md:justify-between md:px-8 md:pt-14">
        <span>
          <span className="text-paper/50">In stock —</span> {totalInventoryCount} vehicles
        </span>
        <span>
          <span className="text-paper/50">Inventory value —</span>{" "}
          {formatBDTCompact(totalInventoryValueBDT)}
        </span>
        <span>
          <span className="text-paper/50">Added this week —</span>{" "}
          {newVehiclesThisWeek}
        </span>
      </div>
    </section>
  );
}