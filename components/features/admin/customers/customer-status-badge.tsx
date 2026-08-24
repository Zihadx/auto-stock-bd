import { Badge } from "@/components/ui/badge";
import type { CustomerStatus } from "@/types/customer";

const map: Record<CustomerStatus, { label: string; tone: "info" | "success" | "brass" | "neutral" }> = {
  lead: { label: "Lead", tone: "info" },
  active: { label: "Active", tone: "success" },
  customer: { label: "Customer", tone: "brass" },
  inactive: { label: "Inactive", tone: "neutral" },
};

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const { label, tone } = map[status];
  return <Badge tone={tone}>{label}</Badge>;
}
