"use client";

import { useState } from "react";
import { ViewToggle } from "@/components/features/inventory/toolbar-controls";
import { VehicleCard } from "@/components/features/vehicle-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Vehicle } from "@/types/vehicle";

export function InventoryResults({ vehicles }: { vehicles: Vehicle[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  if (vehicles.length === 0) {
    return (
      <EmptyState
        title="No vehicles match those filters"
        description="Try widening your price range or clearing a filter — new inventory is added daily."
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <ViewToggle view={view} onChange={setView} />
      </div>
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
            : "flex flex-col gap-4"
        }
      >
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} layout={view} />
        ))}
      </div>
    </div>
  );
}
