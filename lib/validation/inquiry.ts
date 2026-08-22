import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?880|0)1[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Add a few more details (min. 10 characters)"),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
