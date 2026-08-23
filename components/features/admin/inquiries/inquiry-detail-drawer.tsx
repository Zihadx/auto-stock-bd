"use client";

import { Drawer } from "vaul";
import { X, Phone, Mail, Car } from "lucide-react";
import { InquiryStatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/features/admin/inquiries/priority-badge";
import { Button } from "@/components/ui/button";
import { formatFullDate, formatRelativeDate } from "@/lib/format";
import type { InquiryWithVehicle } from "@/services/inquiry.service";
import type { InquiryStatus } from "@/types/inquiry";

const statusFlow: InquiryStatus[] = ["new", "contacted", "follow-up", "closed"];

export function InquiryDetailDrawer({
  inquiry,
  open,
  onClose,
  onStatusChange,
}: {
  inquiry: InquiryWithVehicle | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (status: InquiryStatus) => void;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={(next) => !next && onClose()} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper-raised"
        >
          {inquiry && (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
                <div>
                  <Drawer.Title className="font-display text-lg font-medium">
                    {inquiry.customerName}
                  </Drawer.Title>
                  <p className="mt-0.5 text-xs text-ink-faint">
                    Inquiry received {formatFullDate(inquiry.createdAt)}
                  </p>
                </div>
                <Drawer.Close asChild>
                  <button type="button" aria-label="Close" className="p-1 text-ink-faint hover:text-ink">
                    <X className="h-5 w-5" />
                  </button>
                </Drawer.Close>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  <InquiryStatusBadge status={inquiry.status} />
                  <PriorityBadge priority={inquiry.priority} />
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
                  <Car className="h-4 w-4 text-ink-faint" aria-hidden />
                  {inquiry.vehicleName}
                  {inquiry.vehiclePrice && (
                    <span className="text-ink-faint">
                      · ৳{new Intl.NumberFormat("en-BD").format(inquiry.vehiclePrice)}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                  <Phone className="h-4 w-4 text-ink-faint" aria-hidden />
                  <a href={`tel:${inquiry.phone}`} className="hover:text-ink">
                    {inquiry.phone}
                  </a>
                </div>
                {inquiry.email && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                    <Mail className="h-4 w-4 text-ink-faint" aria-hidden />
                    <a href={`mailto:${inquiry.email}`} className="hover:text-ink">
                      {inquiry.email}
                    </a>
                  </div>
                )}

                <div className="mt-5 rounded-sm border border-line bg-paper p-3">
                  <p className="text-sm text-ink">{inquiry.message}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                    Update status
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {statusFlow.map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={inquiry.status === status ? "primary" : "secondary"}
                        onClick={() => onStatusChange(status)}
                      >
                        {status === "follow-up" ? "Follow-up" : status[0].toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                    Timeline
                  </h3>
                  <ol className="mt-3 space-y-4">
                    {inquiry.timeline.map((event) => (
                      <li key={event.id} className="border-l-2 border-line pl-3">
                        <p className="text-sm font-medium text-ink">{event.action}</p>
                        <p className="text-xs text-ink-faint">
                          {event.actor} · {formatRelativeDate(event.date)}
                        </p>
                        {event.note && <p className="mt-1 text-sm text-ink-soft">{event.note}</p>}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
