import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { getVehicles } from "@/services/vehicle.service";
import { parseVehicleFilters } from "@/lib/parse-filters";
import { buttonVariants } from "@/components/ui/button";
import { StatusTabs } from "@/components/features/admin/status-tabs";
import { InventorySearch } from "@/components/features/admin/inventory-search";
import { InventoryTable } from "@/components/features/admin/inventory-table";
import { PaginationBar } from "@/components/features/inventory/pagination-bar";

export const metadata: Metadata = {
  title: "Inventory",
};

export default async function AdminInventoryPage({
  searchParams,
}: PageProps<"/admin/inventory">) {
  const resolvedParams = await searchParams;

  const filters = parseVehicleFilters(resolvedParams);

  // Keep inventory pagination intentionally compact.
  filters.pageSize = 10;

  const result = await getVehicles(filters);

  const urlSearchParams = new URLSearchParams(
    Object.entries(resolvedParams).flatMap(([key, value]) =>
      value === undefined
        ? []
        : Array.isArray(value)
          ? value.map((v) => [key, v])
          : [[key, value]],
    ),
  );

  const statusParam = Array.isArray(resolvedParams.status)
    ? resolvedParams.status[0]
    : resolvedParams.status ?? "";

  return (
    <main className="container mx-auto px-6 py-8 lg:py-10">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F51B72]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Vehicle management
            </span>
          </div>

          <h1 className="mt-2 text-h1 text-ink">
            Inventory
          </h1>

          <p className="mt-1.5 text-sm text-ink-soft">
            {result.total} vehicle
            {result.total === 1 ? "" : "s"} in your inventory
          </p>
        </div>

        <Link
          href="/admin/inventory/new"
          className={buttonVariants({
            variant: "brass",
          })}
        >
          <PlusCircle
            className="h-4 w-4"
            aria-hidden
          />
          Add vehicle
        </Link>
      </section>

      {/* Status navigation */}
      <section className="mt-7">
        <StatusTabs
          active={statusParam}
          searchParams={urlSearchParams}
        />
      </section>

      {/* Search / filters */}
      <section className="mt-4 rounded-xl border border-line bg-paper-raised/80 p-3 shadow-sm backdrop-blur-sm">
        <InventorySearch />
      </section>

      {/* Inventory table */}
      <section className="mt-4 overflow-hidden rounded-xl border border-line bg-paper-raised shadow-sm">
        <InventoryTable vehicles={result.items} />
      </section>

      {/* Pagination */}
      <div className="mt-4">
        <PaginationBar
          page={result.page}
          totalPages={result.totalPages}
          searchParams={urlSearchParams}
        />
      </div>
    </main>
  );
}