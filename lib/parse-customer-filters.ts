import type { CustomerFilters, CustomerStatus } from "@/types/customer";

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const validStatuses: CustomerStatus[] = ["lead", "active", "customer", "inactive"];

export function parseCustomerFilters(searchParams: SearchParams): CustomerFilters {
  const statusRaw = first(searchParams.status);
  return {
    search: first(searchParams.search),
    status:
      statusRaw && validStatuses.includes(statusRaw as CustomerStatus)
        ? [statusRaw as CustomerStatus]
        : undefined,
    page: Number(first(searchParams.page)) || 1,
    pageSize: 10,
  };
}
