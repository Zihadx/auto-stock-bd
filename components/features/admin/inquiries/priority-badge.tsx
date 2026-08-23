import { Badge } from "@/components/ui/badge";
import type { InquiryPriority } from "@/types/inquiry";

const map: Record<InquiryPriority, { label: string; tone: "danger" | "warning" | "neutral" }> = {
  high: { label: "High", tone: "danger" },
  medium: { label: "Medium", tone: "warning" },
  low: { label: "Low", tone: "neutral" },
};

export function PriorityBadge({ priority }: { priority: InquiryPriority }) {
  const { label, tone } = map[priority];
  return <Badge tone={tone}>{label}</Badge>;
}
