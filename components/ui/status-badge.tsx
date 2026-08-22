import { Badge } from "@/components/ui/badge";
import type { VehicleStatus } from "@/types/vehicle";
import type { InquiryStatus } from "@/types/inquiry";

const vehicleStatusMap: Record<
  VehicleStatus,
  { label: string; tone: "success" | "warning" | "neutral" | "info" }
> = {
  available: { label: "Available", tone: "success" },
  reserved: { label: "Reserved", tone: "warning" },
  sold: { label: "Sold", tone: "neutral" },
  draft: { label: "Draft", tone: "info" },
};

const inquiryStatusMap: Record<
  InquiryStatus,
  { label: string; tone: "info" | "warning" | "success" | "neutral" }
> = {
  new: { label: "New", tone: "info" },
  contacted: { label: "Contacted", tone: "warning" },
  "follow-up": { label: "Follow-up", tone: "warning" },
  closed: { label: "Closed", tone: "success" },
};

export function VehicleStatusBadge({ status }: { status: VehicleStatus }) {
  const { label, tone } = vehicleStatusMap[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  const { label, tone } = inquiryStatusMap[status];
  return <Badge tone={tone}>{label}</Badge>;
}
