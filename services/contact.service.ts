import type { ContactFormValues } from "@/lib/validation/contact";

const ARTIFICIAL_DELAY_MS = 400;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ARTIFICIAL_DELAY_MS));
}

export interface ContactMessage extends ContactFormValues {
  id: string;
  createdAt: string;
}

/** Mock submission. Becomes POST /api/contact-messages later. */
export async function submitContactMessage(values: ContactFormValues): Promise<ContactMessage> {
  return delay({ ...values, id: `cm-${Date.now()}`, createdAt: new Date().toISOString() });
}
