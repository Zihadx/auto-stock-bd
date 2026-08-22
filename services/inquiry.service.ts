import type { Inquiry, InquiryType } from "@/types/inquiry";
import type { InquiryFormValues } from "@/lib/validation/inquiry";

const ARTIFICIAL_DELAY_MS = 400;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ARTIFICIAL_DELAY_MS));
}

export interface CreateInquiryInput extends InquiryFormValues {
  vehicleId: string;
  type: InquiryType;
}

/**
 * Mock create. In production this becomes a POST to /api/inquiries.
 * Returns the created record so the UI can show a confirmation without
 * re-fetching.
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

  return delay(inquiry);
}
