import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicleById } from "@/services/vehicle.service";
import { VehicleForm } from "@/components/features/admin/vehicle-form/vehicle-form";

export const metadata: Metadata = {
  title: "Edit Vehicle",
};

export default async function EditVehiclePage({
  params,
}: PageProps<"/admin/inventory/[id]/edit">) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <h1 className="font-display text-2xl font-medium md:text-3xl">
        Edit {vehicle.brand} {vehicle.model}
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        Update the listing details below and save your changes.
      </p>
      <div className="mt-6">
        <VehicleForm vehicle={vehicle} />
      </div>
    </div>
  );
}
