"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { FormField, FormSelect, FormTextarea } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { vehicleBrands } from "@/config/site";
import { sellCarSchema, type SellCarFormValues } from "@/lib/validation/sell-car";
import { submitTradeInRequest } from "@/services/trade-in.service";

const conditionOptions = [
  { value: "excellent", label: "Excellent — no visible wear" },
  { value: "good", label: "Good — normal wear for age" },
  { value: "fair", label: "Fair — needs some work" },
];

export function SellCarForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SellCarFormValues>({
    resolver: zodResolver(sellCarSchema),
  });

  async function onSubmit(values: SellCarFormValues) {
    try {
      await submitTradeInRequest(values);
      setSubmitted(true);
      toast.success("Valuation request sent.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-md border border-line bg-paper-raised px-6 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden />
        <h2 className="mt-4 font-display text-xl font-medium">Request received</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          We&apos;ll review your vehicle details and send a no-obligation valuation
          within 24 hours by phone or WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <section>
        <h2 className="font-display text-base font-medium">Your contact details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormField id="sc-name" label="Full name" error={errors.name?.message} {...register("name")} />
          <FormField
            id="sc-phone"
            label="Phone number"
            placeholder="01XXXXXXXXX"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <FormField
            id="sc-email"
            label="Email (optional)"
            type="email"
            className="sm:col-span-2"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
      </section>

      <section>
        <h2 className="font-display text-base font-medium">Vehicle details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormSelect
            id="sc-brand"
            label="Brand"
            placeholder="Select brand"
            options={vehicleBrands.map((b) => ({ value: b, label: b }))}
            error={errors.brand?.message}
            {...register("brand")}
          />
          <FormField id="sc-model" label="Model" placeholder="e.g. Axio" error={errors.model?.message} {...register("model")} />
          <FormField
            id="sc-year"
            label="Registration year"
            type="number"
            error={errors.year?.message}
            {...register("year", { valueAsNumber: true })}
          />
          <FormField
            id="sc-mileage"
            label="Mileage (km)"
            type="number"
            error={errors.mileageKm?.message}
            {...register("mileageKm", { valueAsNumber: true })}
          />
          <FormSelect
            id="sc-condition"
            label="Overall condition"
            placeholder="Select condition"
            options={conditionOptions}
            error={errors.condition?.message}
            {...register("condition")}
          />
          <FormField
            id="sc-price"
            label="Your expected price (৳)"
            type="number"
            error={errors.expectedPrice?.message}
            {...register("expectedPrice", { valueAsNumber: true })}
          />
          <FormTextarea
            id="sc-notes"
            label="Anything else we should know? (optional)"
            className="sm:col-span-2"
            rows={3}
            error={errors.notes?.message}
            {...register("notes")}
          />
        </div>
      </section>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Submitting..." : "Get my valuation"}
      </Button>
    </form>
  );
}
