import type { Metadata } from "next";
import { getCustomers } from "@/services/customer.service";
import { parseCustomerFilters } from "@/lib/parse-customer-filters";
import { CustomerStatusTabs } from "@/components/features/admin/customers/customer-status-tabs";
import { CustomerSearch } from "@/components/features/admin/customers/customer-search";
import { CustomerTable } from "@/components/features/admin/customers/customer-table";
import { PaginationBar } from "@/components/features/inventory/pagination-bar";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function AdminCustomersPage({
  searchParams,
}: PageProps<"/admin/customers">) {
  const resolvedParams = await searchParams;
  const filters = parseCustomerFilters(resolvedParams);
  const result = await getCustomers(filters);

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
      <div>
        <h1 className="font-display text-2xl font-medium md:text-3xl">Customers</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {result.total} customer{result.total === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-6">
        <CustomerStatusTabs active={statusParam} searchParams={urlSearchParams} />
      </div>

      <div className="mt-4">
        <CustomerSearch />
      </div>

      <div className="mt-4">
        <CustomerTable customers={result.items} />
      </div>

      <PaginationBar
        page={result.page}
        totalPages={result.totalPages}
        searchParams={urlSearchParams}
      />
    </div>
  );
}
