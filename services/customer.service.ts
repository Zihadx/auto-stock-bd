import { customers as customerRecords } from "@/data/customers";
import { inquiries as inquiryRecords } from "@/data/inquiries";
import { vehicles as vehicleRecords } from "@/data/vehicles";
import type { Customer, CustomerFilters } from "@/types/customer";
import type { Inquiry } from "@/types/inquiry";
import type { Vehicle } from "@/types/vehicle";

const ARTIFICIAL_DELAY_MS = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ARTIFICIAL_DELAY_MS));
}

export interface CustomerWithStats extends Customer {
  inquiryCount: number;
}

export interface CustomerDetail extends Customer {
  inquiries: Inquiry[];
  interestedVehicles: Vehicle[];
  purchasedVehicles: Vehicle[];
}

export interface CustomerPage {
  items: CustomerWithStats[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function matchesFilters(customer: Customer, filters: CustomerFilters): boolean {
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const haystack = `${customer.name} ${customer.phone} ${customer.email ?? ""}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (filters.status?.length && !filters.status.includes(customer.status)) return false;
  return true;
}

export async function getCustomers(filters: CustomerFilters = {}): Promise<CustomerPage> {
  const filtered = customerRecords
    .filter((c) => matchesFilters(c, filters))
    .sort(
      (a, b) => new Date(b.lastInteractionAt).getTime() - new Date(a.lastInteractionAt).getTime(),
    );

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;
  const start = (page - 1) * pageSize;

  return delay({
    items: filtered.slice(start, start + pageSize).map((c) => ({
      ...c,
      inquiryCount: c.inquiryIds.length,
    })),
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
  });
}

export async function getCustomerById(id: string): Promise<CustomerDetail | null> {
  const customer = customerRecords.find((c) => c.id === id);
  if (!customer) return delay(null);

  const customerInquiries = inquiryRecords
    .filter((i) => customer.inquiryIds.includes(i.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const interestedVehicles = vehicleRecords.filter((v) =>
    customer.interestedVehicleIds.includes(v.id),
  );
  const purchasedVehicles = vehicleRecords.filter((v) =>
    customer.purchasedVehicleIds.includes(v.id),
  );

  return delay({ ...customer, inquiries: customerInquiries, interestedVehicles, purchasedVehicles });
}
