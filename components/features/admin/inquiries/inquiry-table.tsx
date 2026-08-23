"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { InquiryStatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/features/admin/inquiries/priority-badge";
import { InquiryDetailDrawer } from "@/components/features/admin/inquiries/inquiry-detail-drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { formatRelativeDate } from "@/lib/format";
import { updateInquiryStatus, type InquiryWithVehicle } from "@/services/inquiry.service";
import type { InquiryStatus } from "@/types/inquiry";

const typeLabel: Record<InquiryWithVehicle["type"], string> = {
  general: "General",
  "test-drive": "Test drive",
  "trade-in": "Trade-in",
  financing: "Financing",
};

export function InquiryTable({ inquiries }: { inquiries: InquiryWithVehicle[] }) {
  const [statusOverrides, setStatusOverrides] = useState<Record<string, InquiryStatus>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const items = useMemo(
    () => inquiries.map((i) => (statusOverrides[i.id] ? { ...i, status: statusOverrides[i.id] } : i)),
    [inquiries, statusOverrides],
  );

  const active = items.find((i) => i.id === activeId) ?? null;

  async function handleStatusChange(id: string, status: InquiryStatus) {
    setStatusOverrides((prev) => ({ ...prev, [id]: status }));
    await updateInquiryStatus(id, status);
    toast.success("Status updated.");
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="No inquiries match this view"
        description="Try a different status tab or clear your search."
      />
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-md border border-line bg-paper-raised">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs font-medium uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  onClick={() => setActiveId(inquiry.id)}
                  className="cursor-pointer hover:bg-ink/[0.02]"
                >
                  <td className="px-4 py-3 font-medium text-ink">{inquiry.customerName}</td>
                  <td className="px-4 py-3 text-ink-soft">{inquiry.vehicleName}</td>
                  <td className="px-4 py-3 text-ink-soft">{typeLabel[inquiry.type]}</td>
                  <td className="px-4 py-3 text-ink-soft">{formatRelativeDate(inquiry.createdAt)}</td>
                  <td className="px-4 py-3">
                    <InquiryStatusBadge status={inquiry.status} />
                  </td>
                  <td className="px-4 py-3 font-tabular text-ink-soft">{inquiry.phone}</td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={inquiry.priority} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InquiryDetailDrawer
        inquiry={active}
        open={!!active}
        onClose={() => setActiveId(null)}
        onStatusChange={(status) => active && handleStatusChange(active.id, status)}
      />
    </>
  );
}
