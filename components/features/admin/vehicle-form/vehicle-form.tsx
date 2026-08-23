"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormField, FormSelect, FormTextarea } from "@/components/ui/form-field";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/features/admin/vehicle-form/image-uploader";
import { FeatureListInput } from "@/components/features/admin/vehicle-form/feature-list-input";
import { vehicleBrands } from "@/config/site";
import {
  vehicleFormSchema,
  vehicleFormDefaults,
  type VehicleFormValues,
} from "@/lib/validation/vehicle";
import { createVehicle, updateVehicle } from "@/services/vehicle.service";
import type { Vehicle } from "@/types/vehicle";

const fuelOptions = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
  { value: "cng", label: "CNG" },
];

const transmissionOptions = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "cvt", label: "CVT" },
];

const conditionOptions = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

const statusOptions = [
  { value: "draft", label: "Draft (not visible publicly)" },
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
];

function vehicleToFormValues(vehicle: Vehicle): VehicleFormValues {
  return {
    brand: vehicle.brand,
    model: vehicle.model,
    trim: vehicle.trim ?? "",
    year: vehicle.year,
    bodyType: vehicle.bodyType,
    price: vehicle.price,
    negotiable: vehicle.negotiable,
    mileageKm: vehicle.mileageKm,
    fuelType: vehicle.fuelType,
    transmission: vehicle.transmission,
    engineCc: vehicle.engineCc,
    condition: vehicle.condition,
    color: vehicle.color,
    registrationYear: vehicle.registrationYear,
    location: vehicle.location,
    ownerCount: vehicle.ownerCount,
    description: vehicle.description,
    features: vehicle.features.flatMap((g) => g.items).map((value) => ({ value })) || [
      { value: "" },
    ],
    images: vehicle.images.map((img) => ({ url: img.url, alt: img.alt })),
    status: vehicle.status,
    featured: vehicle.featured,
  };
}

export function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const router = useRouter();
  const isEditMode = !!vehicle;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: vehicle ? vehicleToFormValues(vehicle) : vehicleFormDefaults,
  });

  // Warn before an accidental tab close/navigation when there are unsaved edits.
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!isDirty) return;
      e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  async function onSubmit(values: VehicleFormValues) {
    try {
      const payload = {
        brand: values.brand,
        model: values.model,
        trim: values.trim || undefined,
        year: values.year,
        price: values.price,
        negotiable: values.negotiable,
        mileageKm: values.mileageKm,
        fuelType: values.fuelType,
        transmission: values.transmission,
        engineCc: values.engineCc,
        condition: values.condition,
        bodyType: values.bodyType,
        color: values.color,
        registrationYear: values.registrationYear,
        location: values.location,
        status: values.status,
        featured: values.featured,
        description: values.description,
        ownerCount: values.ownerCount,
        features: [
          {
            category: "Features",
            items: values.features.map((f) => f.value).filter(Boolean),
          },
        ],
        images: values.images.map((img, i) => ({ ...img, isPrimary: i === 0 })),
      };

      if (isEditMode) {
        await updateVehicle({ id: vehicle.id, ...payload });
        toast.success("Vehicle updated.");
      } else {
        await createVehicle(payload);
        toast.success("Vehicle added to inventory.");
      }
      router.push("/admin/inventory");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <section className="rounded-md border border-line bg-paper-raised p-5">
        <h2 className="font-display text-base font-medium">Basic information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormSelect
            id="brand"
            label="Brand"
            placeholder="Select brand"
            options={vehicleBrands.map((b) => ({ value: b, label: b }))}
            error={errors.brand?.message}
            {...register("brand")}
          />
          <FormField id="model" label="Model" error={errors.model?.message} {...register("model")} />
          <FormField id="trim" label="Trim (optional)" error={errors.trim?.message} {...register("trim")} />
          <FormField
            id="bodyType"
            label="Body type"
            placeholder="e.g. Sedan, SUV, Hatchback"
            error={errors.bodyType?.message}
            {...register("bodyType")}
          />
          <FormField
            id="year"
            label="Model year"
            type="number"
            error={errors.year?.message}
            {...register("year", { valueAsNumber: true })}
          />
        </div>
      </section>

      <section className="rounded-md border border-line bg-paper-raised p-5">
        <h2 className="font-display text-base font-medium">Pricing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormField
            id="price"
            label="Price (৳)"
            type="number"
            error={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
          />
          <div className="flex items-end">
            <Controller
              control={control}
              name="negotiable"
              render={({ field }) => (
                <Switch
                  id="negotiable"
                  label="Negotiable"
                  description="Show a 'negotiable' tag on the listing"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </section>

      <section className="rounded-md border border-line bg-paper-raised p-5">
        <h2 className="font-display text-base font-medium">Specifications</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormField
            id="mileageKm"
            label="Mileage (km)"
            type="number"
            error={errors.mileageKm?.message}
            {...register("mileageKm", { valueAsNumber: true })}
          />
          <FormField
            id="engineCc"
            label="Engine size (cc)"
            type="number"
            error={errors.engineCc?.message}
            {...register("engineCc", { valueAsNumber: true })}
          />
          <FormSelect
            id="fuelType"
            label="Fuel type"
            options={fuelOptions}
            error={errors.fuelType?.message}
            {...register("fuelType")}
          />
          <FormSelect
            id="transmission"
            label="Transmission"
            options={transmissionOptions}
            error={errors.transmission?.message}
            {...register("transmission")}
          />
          <FormSelect
            id="condition"
            label="Condition"
            options={conditionOptions}
            error={errors.condition?.message}
            {...register("condition")}
          />
          <FormField id="color" label="Color" error={errors.color?.message} {...register("color")} />
          <FormField
            id="registrationYear"
            label="Registration year"
            type="number"
            error={errors.registrationYear?.message}
            {...register("registrationYear", { valueAsNumber: true })}
          />
          <FormField
            id="ownerCount"
            label="Number of previous owners"
            type="number"
            error={errors.ownerCount?.message}
            {...register("ownerCount", { valueAsNumber: true })}
          />
          <FormField
            id="location"
            label="Location"
            className="sm:col-span-2"
            error={errors.location?.message}
            {...register("location")}
          />
        </div>
      </section>

      <section className="rounded-md border border-line bg-paper-raised p-5">
        <h2 className="font-display text-base font-medium">Photos</h2>
        <p className="mt-1 text-xs text-ink-soft">
          Paste image URLs for now — direct upload connects to real storage later. The first photo is used as the primary image.
        </p>
        <div className="mt-4">
          <ImageUploader control={control} errors={errors} register={register} />
        </div>
      </section>

      <section className="rounded-md border border-line bg-paper-raised p-5">
        <h2 className="font-display text-base font-medium">Description</h2>
        <div className="mt-4">
          <FormTextarea
            id="description"
            label="Listing description"
            rows={5}
            error={errors.description?.message}
            {...register("description")}
          />
        </div>
      </section>

      <section className="rounded-md border border-line bg-paper-raised p-5">
        <h2 className="font-display text-base font-medium">Features</h2>
        <div className="mt-4">
          <FeatureListInput control={control} errors={errors} register={register} />
        </div>
      </section>

      <section className="rounded-md border border-line bg-paper-raised p-5">
        <h2 className="font-display text-base font-medium">Status</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormSelect
            id="status"
            label="Listing status"
            options={statusOptions}
            error={errors.status?.message}
            {...register("status")}
          />
          <div className="flex items-end">
            <Controller
              control={control}
              name="featured"
              render={({ field }) => (
                <Switch
                  id="featured"
                  label="Featured"
                  description="Show on the homepage featured section"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => router.push("/admin/inventory")}>
          Cancel
        </Button>
        <Button type="submit" variant="brass" disabled={isSubmitting}>
          {isSubmitting
            ? isEditMode
              ? "Saving..."
              : "Adding..."
            : isEditMode
              ? "Save changes"
              : "Add vehicle"}
        </Button>
      </div>
    </form>
  );
}
