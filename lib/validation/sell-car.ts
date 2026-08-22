import { z } from "zod";

export const sellCarSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?880|0)1[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  brand: z.string().trim().min(1, "Select a brand"),
  model: z.string().trim().min(1, "Enter the model"),
  year: z
    .number({ message: "Enter a valid year" })
    .min(1990, "Year must be 1990 or later")
    .max(new Date().getFullYear(), "Year can't be in the future"),
  mileageKm: z.number({ message: "Enter mileage in km" }).min(0, "Mileage can't be negative"),
  condition: z.enum(["excellent", "good", "fair"], {
    message: "Select the vehicle's condition",
  }),
  expectedPrice: z
    .number({ message: "Enter your expected price in BDT" })
    .min(1, "Enter your expected price"),
  notes: z.string().trim().max(500, "Keep notes under 500 characters").optional().or(z.literal("")),
});

export type SellCarFormValues = z.infer<typeof sellCarSchema>;
