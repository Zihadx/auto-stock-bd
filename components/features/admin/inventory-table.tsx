"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { VehicleStatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatBDT, formatMileage, formatRelativeDate } from "@/lib/format";
import type { Vehicle, VehicleStatus } from "@/types/vehicle";

const fuelLabel: Record<Vehicle["fuelType"], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Electric",
  cng: "CNG",
};

export function InventoryTable({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  // Optimistic overrides layered on top of the server-fetched page, rather
  // than copying `vehicles` into state — avoids syncing state from props
  // and the stale-data bugs that come with it.
  const [statusOverrides, setStatusOverrides] = useState<Record<string, VehicleStatus>>({});
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  const items = useMemo(
    () =>
      vehicles
        .filter((v) => !deletedIds.has(v.id))
        .map((v) => (statusOverrides[v.id] ? { ...v, status: statusOverrides[v.id] } : v)),
    [vehicles, statusOverrides, deletedIds],
  );

  function markSold(vehicle: Vehicle) {
    setStatusOverrides((prev) => ({ ...prev, [vehicle.id]: "sold" }));
    toast.success(`${vehicle.brand} ${vehicle.model} marked as sold.`);
  }

  function duplicate(vehicle: Vehicle) {
    toast.success(`Duplicated ${vehicle.brand} ${vehicle.model} as a draft.`);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setDeletedIds((prev) => new Set(prev).add(deleteTarget.id));
    toast.success(`${deleteTarget.brand} ${deleteTarget.model} deleted.`);
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="No vehicles match this view"
        description="Try a different status tab or clear your search."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper-raised">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-medium uppercase tracking-wide text-ink-faint">
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Mileage</th>
              <th className="px-4 py-3">Fuel</th>
              <th className="px-4 py-3">Transmission</th>
              <th className="px-4 py-3">Added</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.map((vehicle) => {
              const primaryImage = vehicle.images.find((i) => i.isPrimary) ?? vehicle.images[0];
              return (
                <tr key={vehicle.id} className="hover:bg-ink/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-sm bg-ink/5">
                        {primaryImage && (
                          <Image
                            src={primaryImage.url}
                            alt={primaryImage.alt}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">
                          {vehicle.brand} {vehicle.model}
                        </p>
                        <p className="truncate text-xs text-ink-faint">{vehicle.trim}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <VehicleStatusBadge status={vehicle.status} />
                  </td>
                  <td className="px-4 py-3 font-tabular text-ink">{formatBDT(vehicle.price)}</td>
                  <td className="px-4 py-3 font-tabular text-ink-soft">{vehicle.year}</td>
                  <td className="px-4 py-3 font-tabular text-ink-soft">
                    {formatMileage(vehicle.mileageKm)}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{fuelLabel[vehicle.fuelType]}</td>
                  <td className="px-4 py-3 text-ink-soft capitalize">{vehicle.transmission}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {formatRelativeDate(vehicle.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu
                      triggerLabel={`Actions for ${vehicle.brand} ${vehicle.model}`}
                      trigger={
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-ink-faint hover:bg-ink/5 hover:text-ink">
                          <MoreHorizontal className="h-4 w-4" />
                        </span>
                      }
                      items={[
                        {
                          label: "View",
                          icon: <Eye className="h-4 w-4" />,
                          onSelect: () => window.open(`/inventory/${vehicle.slug}`, "_blank"),
                        },
                        {
                          label: "Edit",
                          icon: <Pencil className="h-4 w-4" />,
                          onSelect: () => router.push(`/admin/inventory/${vehicle.id}/edit`),
                        },
                        {
                          label: "Duplicate",
                          icon: <Copy className="h-4 w-4" />,
                          onSelect: () => duplicate(vehicle),
                        },
                        {
                          label: "Mark sold",
                          icon: <CheckCircle2 className="h-4 w-4" />,
                          onSelect: () => markSold(vehicle),
                        },
                        {
                          label: "Delete",
                          icon: <Trash2 className="h-4 w-4" />,
                          destructive: true,
                          onSelect: () => setDeleteTarget(vehicle),
                        },
                      ]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete this vehicle?"
        description={
          deleteTarget
            ? `This removes ${deleteTarget.brand} ${deleteTarget.model} from your inventory. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
}
