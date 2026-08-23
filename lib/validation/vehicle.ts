import { z } from "zod";

const currentYear = new Date().getFullYear();

export const vehicleFormSchema = z.object({
  // Basic information
  brand: z.string().trim().min(1, "Select a brand"),
  model: z.string().trim().min(1, "Enter the model"),
  trim: z.string().trim().optional().or(z.literal("")),
  year: z
    .number({ message: "Enter a valid year" })
    .min(1990, "Year must be 1990 or later")
    .max(currentYear + 1, "Year looks incorrect"),
  bodyType: z.string().trim().min(1, "Enter the body type"),

  // Pricing
  price: z.number({ message: "Enter a price" }).min(1, "Enter a price"),
  negotiable: z.boolean(),

  // Specifications
  mileageKm: z.number({ message: "Enter mileage" }).min(0, "Mileage can't be negative"),
  fuelType: z.enum(["petrol", "diesel", "hybrid", "electric", "cng"], {
    message: "Select a fuel type",
  }),
  transmission: z.enum(["automatic", "manual", "cvt"], {
    message: "Select a transmission",
  }),
  engineCc: z.number({ message: "Enter engine size" }).min(100, "Enter a valid engine size"),
  condition: z.enum(["excellent", "good", "fair"], {
    message: "Select a condition",
  }),
  color: z.string().trim().min(1, "Enter the color"),
  registrationYear: z
    .number({ message: "Enter registration year" })
    .min(1990, "Year must be 1990 or later")
    .max(currentYear + 1, "Year looks incorrect"),
  location: z.string().trim().min(1, "Enter a location"),
  ownerCount: z.number({ message: "Enter number of owners" }).min(1, "Must be at least 1"),

  // Description & features
  description: z.string().trim().min(20, "Add at least 20 characters"),
  features: z
    .array(z.object({ value: z.string().trim().min(1, "Feature can't be empty") }))
    .min(1, "Add at least one feature"),

  // Images
  images: z
    .array(
      z.object({
        url: z.string().trim().url("Enter a valid image URL"),
        alt: z.string().trim().min(1, "Add a short description for this photo"),
      }),
    )
    .min(1, "Add at least one image"),

  // Status
  status: z.enum(["available", "reserved", "sold", "draft"]),
  featured: z.boolean(),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export const vehicleFormDefaults: VehicleFormValues = {
  brand: "",
  model: "",
  trim: "",
  year: currentYear,
  bodyType: "",
  price: 0,
  negotiable: true,
  mileageKm: 0,
  fuelType: "petrol",
  transmission: "automatic",
  engineCc: 1500,
  condition: "good",
  color: "",
  registrationYear: currentYear,
  location: "",
  ownerCount: 1,
  description: "",
  features: [{ value: "" }],
  images: [{ url: "", alt: "" }],
  status: "draft",
  featured: false,
};
