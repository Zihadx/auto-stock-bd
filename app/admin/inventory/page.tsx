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
  filters.pageSize = 10;
  const result = await getVehicles(filters);

  const urlSearchParams = new URLSearchParams(
    Object.entries(resolvedParams).flatMap(([key, value]) =>
      value === undefined ? [] : Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]],
    ),
  );

  const statusParam = Array.isArray(resolvedParams.status)
    ? resolvedParams.status[0]
    : resolvedParams.status ?? "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-medium md:text-3xl">Inventory</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {result.total} vehicle{result.total === 1 ? "" : "s"}
          </p>
        </div>
        <Link href="/admin/inventory/new" className={buttonVariants({ variant: "brass" })}>
          <PlusCircle className="h-4 w-4" aria-hidden />
          Add vehicle
        </Link>
      </div>

      <div className="mt-6">
        <StatusTabs active={statusParam} searchParams={urlSearchParams} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <InventorySearch />
      </div>

      <div className="mt-4">
        <InventoryTable vehicles={result.items} />
      </div>

      <PaginationBar
        page={result.page}
        totalPages={result.totalPages}
        searchParams={urlSearchParams}
      />
    </div>
  );
}
