import type { Metadata } from "next";
import { VehicleForm } from "@/components/features/admin/vehicle-form/vehicle-form";

export const metadata: Metadata = {
  title: "Add Vehicle",
};

export default function NewVehiclePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <h1 className="font-display text-2xl font-medium md:text-3xl">Add vehicle</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Fill in the details below to add a new listing to your inventory.
      </p>
      <div className="mt-6">
        <VehicleForm />
      </div>
    </div>
  );
}
