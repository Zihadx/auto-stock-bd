"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { FormField, FormTextarea } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { inquirySchema, type InquiryFormValues } from "@/lib/validation/inquiry";
import { createInquiry } from "@/services/inquiry.service";
import type { InquiryType } from "@/types/inquiry";

const dialogCopy: Record<InquiryType, { title: string; description: string; defaultMessage: string }> = {
  general: {
    title: "Ask about this vehicle",
    description: "We typically reply within a few hours during business days.",
    defaultMessage: "",
  },
  "test-drive": {
    title: "Book a test drive",
    description: "Tell us a convenient time and we'll confirm availability.",
    defaultMessage: "I'd like to book a test drive, preferably on ",
  },
  "trade-in": {
    title: "Trade in your current car",
    description: "Share a few details and we'll follow up with a valuation.",
    defaultMessage: "",
  },
  financing: {
    title: "Ask about financing",
    description: "We'll let you know honestly whether financing fits your case.",
    defaultMessage: "",
  },
};

export function InquiryDialog({
  vehicleId,
  vehicleName,
  type,
  open,
  onClose,
}: {
  vehicleId: string;
  vehicleName: string;
  type: InquiryType;
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const copy = dialogCopy[type];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", phone: "", email: "", message: copy.defaultMessage },
  });

  async function onSubmit(values: InquiryFormValues) {
    try {
      await createInquiry({ ...values, vehicleId, type });
      setSubmitted(true);
      toast.success("Inquiry sent — we'll be in touch shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  function handleClose() {
    onClose();
    // Reset after the close animation would run, so content doesn't flash.
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 200);
  }

  return (
    <Dialog open={open} onClose={handleClose} title={copy.title} description={copy.description}>
      {submitted ? (
        <div className="py-4 text-center">
          <p className="text-sm text-ink">
            Thanks — your message about the <strong>{vehicleName}</strong> has been sent.
          </p>
          <Button className="mt-5" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField
            id="inquiry-name"
            label="Full name"
            placeholder="Your name"
            error={errors.name?.message}
            {...register("name")}
          />
          <FormField
            id="inquiry-phone"
            label="Phone number"
            placeholder="01XXXXXXXXX"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <FormField
            id="inquiry-email"
            label="Email (optional)"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <FormTextarea
            id="inquiry-message"
            label="Message"
            rows={4}
            placeholder={`I'm interested in the ${vehicleName}...`}
            error={errors.message?.message}
            {...register("message")}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send inquiry"}
          </Button>
        </form>
      )}
    </Dialog>
  );
}
