import type { Metadata } from "next";
import { getVehicles } from "@/services/vehicle.service";
import { parseVehicleFilters } from "@/lib/parse-filters";
import { FiltersPanel } from "@/components/features/inventory/filters-panel";
import { MobileFilterDrawer } from "@/components/features/inventory/mobile-filter-drawer";
import { SortDropdown } from "@/components/features/inventory/toolbar-controls";
import { InventoryResults } from "@/components/features/inventory/inventory-results";
import { PaginationBar } from "@/components/features/inventory/pagination-bar";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Browse inspected, verified vehicles available now in Dhaka.",
};

export default async function InventoryPage({
  searchParams,
}: PageProps<"/inventory">) {
  const resolvedParams = await searchParams;
  const filters = parseVehicleFilters(resolvedParams);
  const result = await getVehicles(filters);

  const urlSearchParams = new URLSearchParams(
    Object.entries(resolvedParams).flatMap(([key, value]) =>
      value === undefined ? [] : Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]],
    ),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-medium md:text-3xl">Inventory</h1>
        <p className="text-sm text-ink-soft">
          {result.total} vehicle{result.total === 1 ? "" : "s"} match your search
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FiltersPanel />
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <MobileFilterDrawer />
            <div className="ml-auto">
              <SortDropdown />
            </div>
          </div>

          <InventoryResults vehicles={result.items} />

          <PaginationBar
            page={result.page}
            totalPages={result.totalPages}
            searchParams={urlSearchParams}
          />
        </div>
      </div>
    </div>
  );
}
