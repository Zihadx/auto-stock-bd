"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { FormField, FormSelect, FormTextarea } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormValues } from "@/lib/validation/contact";
import { submitContactMessage } from "@/services/contact.service";

const subjectOptions = [
  { value: "general", label: "General question" },
  { value: "financing", label: "Financing" },
  { value: "partnership", label: "Partnership / bulk inquiry" },
  { value: "support", label: "Support with a recent purchase" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    try {
      await submitContactMessage(values);
      setSubmitted(true);
      toast.success("Message sent.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-md border border-line bg-paper-raised px-6 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden />
        <h2 className="mt-4 font-display text-xl font-medium">Message sent</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Thanks for reaching out — our team typically replies within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="c-name" label="Full name" error={errors.name?.message} {...register("name")} />
        <FormField
          id="c-phone"
          label="Phone number"
          placeholder="01XXXXXXXXX"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>
      <FormField
        id="c-email"
        label="Email (optional)"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <FormSelect
        id="c-subject"
        label="Topic"
        placeholder="Select a topic"
        options={subjectOptions}
        error={errors.subject?.message}
        {...register("subject")}
      />
      <FormTextarea
        id="c-message"
        label="Message"
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
