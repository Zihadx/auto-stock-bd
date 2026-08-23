import { inquiries as inquiryRecords } from "@/data/inquiries";
import { vehicles as vehicleRecords } from "@/data/vehicles";
import type { Inquiry, InquiryFilters, InquiryStatus, InquiryType } from "@/types/inquiry";
import type { InquiryFormValues } from "@/lib/validation/inquiry";

const ARTIFICIAL_DELAY_MS = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ARTIFICIAL_DELAY_MS));
}

export interface CreateInquiryInput extends InquiryFormValues {
  vehicleId: string;
  type: InquiryType;
}

export interface InquiryWithVehicle extends Inquiry {
  vehicleName: string;
  vehiclePrice: number | null;
}

export interface InquiryPage {
  items: InquiryWithVehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function withVehicle(inquiry: Inquiry): InquiryWithVehicle {
  const vehicle = vehicleRecords.find((v) => v.id === inquiry.vehicleId);
  return {
    ...inquiry,
    vehicleName: vehicle ? `${vehicle.brand} ${vehicle.model}` : "Vehicle removed",
    vehiclePrice: vehicle?.price ?? null,
  };
}

function matchesFilters(inquiry: Inquiry, filters: InquiryFilters): boolean {
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const haystack = `${inquiry.customerName} ${inquiry.phone} ${inquiry.message}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (filters.status?.length && !filters.status.includes(inquiry.status)) return false;
  if (filters.type?.length && !filters.type.includes(inquiry.type)) return false;
  if (filters.priority?.length && !filters.priority.includes(inquiry.priority)) return false;
  return true;
}

/**
 * Mock create. In production this becomes a POST to /api/inquiries.
 * Pushes into the shared in-memory array so it shows up in the admin list
 * within this server session.
 */
export async function createInquiry(input: CreateInquiryInput): Promise<Inquiry> {
  const now = new Date().toISOString();

  const inquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    vehicleId: input.vehicleId,
    customerId: `guest-${Date.now()}`,
    customerName: input.name,
    phone: input.phone,
    email: input.email || undefined,
    message: input.message,
    type: input.type,
    status: "new",
    priority: "medium",
    timeline: [{ id: "t1", date: now, actor: input.name, action: "Submitted inquiry" }],
    createdAt: now,
    updatedAt: now,
  };

  inquiryRecords.unshift(inquiry);
  return delay(inquiry);
}

export async function getInquiries(filters: InquiryFilters = {}): Promise<InquiryPage> {
  const filtered = inquiryRecords
    .filter((i) => matchesFilters(i, filters))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;
  const start = (page - 1) * pageSize;

  return delay({
    items: filtered.slice(start, start + pageSize).map(withVehicle),
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
  });
}

export async function getInquiryById(id: string): Promise<InquiryWithVehicle | null> {
  const inquiry = inquiryRecords.find((i) => i.id === id);
  return delay(inquiry ? withVehicle(inquiry) : null);
}

/** Mock status update. Becomes `PATCH /api/inquiries/:id` later. */
export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  actor = "Admin",
): Promise<Inquiry | null> {
  const index = inquiryRecords.findIndex((i) => i.id === id);
  if (index === -1) return delay(null);

  const now = new Date().toISOString();
  const updated: Inquiry = {
    ...inquiryRecords[index],
    status,
    updatedAt: now,
    timeline: [
      ...inquiryRecords[index].timeline,
      { id: `t-${Date.now()}`, date: now, actor, action: `Status changed to ${status}` },
    ],
  };

  inquiryRecords[index] = updated;
  return delay(updated);
}
