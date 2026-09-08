
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

import {
  FormField,
  FormSelect,
  FormTextarea,
} from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { vehicleBrands } from "@/config/site";
import {
  sellCarSchema,
  type SellCarFormValues,
} from "@/lib/validation/sell-car";
import { submitTradeInRequest } from "@/services/trade-in.service";

const conditionOptions = [
  {
    value: "excellent",
    label: "Excellent — no visible wear",
  },
  {
    value: "good",
    label: "Good — normal wear for age",
  },
  {
    value: "fair",
    label: "Fair — needs some work",
  },
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-[#F51B72]/[0.07] pb-4">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F51B72]/70" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
          {eyebrow}
        </p>
      </div>

      <h2 className="mt-2 font-display text-lg font-medium tracking-[-0.01em] text-ink">
        {title}
      </h2>

      <p className="mt-1.5 max-w-xl text-xs leading-5 text-ink-soft">
        {description}
      </p>
    </div>
  );
}

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
      <div className="overflow-hidden rounded-xl border border-[#F51B72]/[0.08] bg-[#F51B72]/[0.012] backdrop-blur-xl">
        <div className="flex flex-col items-center px-6 py-16 text-center sm:px-10">
          <div className="flex size-12 items-center justify-center rounded-full border border-success/15 bg-success/5">
            <CheckCircle2
              className="size-5 text-success"
              strokeWidth={1.8}
              aria-hidden
            />
          </div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Valuation request
          </p>

          <h2 className="mt-2 font-display text-xl font-medium text-ink">
            Request received
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-ink-soft">
            We&apos;ll review your vehicle details and send a no-obligation
            valuation within 24 hours by phone or WhatsApp.
          </p>

          <div className="mt-7 flex items-center gap-2 border-t border-[#F51B72]/[0.07] pt-5 text-[11px] text-ink-faint">
            <ShieldCheck
              className="size-3.5 text-[#F51B72]/70"
              strokeWidth={1.8}
              aria-hidden
            />
            No obligation. No valuation fee.
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-xl border border-[#F51B72]/[0.08] bg-[#F51B72]/[0.012] backdrop-blur-xl"
      noValidate
    >
      <div className="p-5 sm:p-7 lg:p-8">
        <section>
          <SectionHeader
            eyebrow="01"
            title="Your contact details"
            description="Tell us how we can reach you about your vehicle valuation."
          />

          <div className="mt-5 grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <FormField
              id="sc-name"
              label="Full name"
              error={errors.name?.message}
              {...register("name")}
            />

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

        <section className="mt-9 border-t border-[#F51B72]/[0.07] pt-8">
          <SectionHeader
            eyebrow="02"
            title="Vehicle details"
            description="Accurate information helps us provide a more reliable valuation."
          />

          <div className="mt-5 grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <FormSelect
              id="sc-brand"
              label="Brand"
              placeholder="Select brand"
              options={vehicleBrands.map((brand) => ({
                value: brand,
                label: brand,
              }))}
              error={errors.brand?.message}
              {...register("brand")}
            />

            <FormField
              id="sc-model"
              label="Model"
              placeholder="e.g. Axio"
              error={errors.model?.message}
              {...register("model")}
            />

            <FormField
              id="sc-year"
              label="Registration year"
              type="number"
              error={errors.year?.message}
              {...register("year", {
                valueAsNumber: true,
              })}
            />

            <FormField
              id="sc-mileage"
              label="Mileage (km)"
              type="number"
              error={errors.mileageKm?.message}
              {...register("mileageKm", {
                valueAsNumber: true,
              })}
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
              {...register("expectedPrice", {
                valueAsNumber: true,
              })}
            />

            <FormTextarea
              id="sc-notes"
              label="Anything else we should know? (optional)"
              className="sm:col-span-2"
              rows={4}
              error={errors.notes?.message}
              {...register("notes")}
            />
          </div>
        </section>
      </div>

      <div className="border-t border-[#F51B72]/[0.07] px-5 py-5 sm:px-7 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <ShieldCheck
              className="mt-0.5 size-4 shrink-0 text-ink-faint"
              strokeWidth={1.7}
              aria-hidden
            />

            <div>
              <p className="text-xs font-medium text-ink">
                Free, no-obligation valuation
              </p>

              <p className="mt-0.5 text-[10px] leading-4 text-ink-faint">
                We&apos;ll contact you within 24 hours.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="group w-full sm:w-auto"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Get my valuation
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

