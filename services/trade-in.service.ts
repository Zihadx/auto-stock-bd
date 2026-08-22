import type { SellCarFormValues } from "@/lib/validation/sell-car";

const ARTIFICIAL_DELAY_MS = 500;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ARTIFICIAL_DELAY_MS));
}

export interface TradeInSubmission extends SellCarFormValues {
  id: string;
  createdAt: string;
}

/** Mock submission. Becomes POST /api/trade-in-requests later. */
export async function submitTradeInRequest(
  values: SellCarFormValues,
): Promise<TradeInSubmission> {
  return delay({ ...values, id: `tr-${Date.now()}`, createdAt: new Date().toISOString() });
}
