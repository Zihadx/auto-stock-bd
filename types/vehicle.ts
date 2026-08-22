export type FuelType = "petrol" | "diesel" | "hybrid" | "electric" | "cng";

export type TransmissionType = "automatic" | "manual" | "cvt";

export type VehicleStatus = "available" | "reserved" | "sold" | "draft";

export type VehicleCondition = "excellent" | "good" | "fair";

export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface VehicleFeatureGroup {
  category: string;
  items: string[];
}

export interface VehicleHistoryEvent {
  id: string;
  date: string;
  label: string;
  detail: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  trim?: string;
  year: number;
  price: number;
  negotiable: boolean;
  mileageKm: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  engineCc: number;
  condition: VehicleCondition;
  bodyType: string;
  color: string;
  registrationYear: number;
  location: string;
  status: VehicleStatus;
  featured: boolean;
  description: string;
  features: VehicleFeatureGroup[];
  history: VehicleHistoryEvent[];
  images: VehicleImage[];
  ownerCount: number;
  views: number;
  inquiryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFilters {
  search?: string;
  brands?: string[];
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  fuelTypes?: FuelType[];
  transmissions?: TransmissionType[];
  mileageMax?: number;
  status?: VehicleStatus[];
  sortBy?: "newest" | "price-asc" | "price-desc" | "mileage-asc" | "year-desc";
  page?: number;
  pageSize?: number;
}

export interface VehiclePage {
  items: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateVehicleInput
  extends Omit<
    Vehicle,
    | "id"
    | "slug"
    | "views"
    | "inquiryCount"
    | "createdAt"
    | "updatedAt"
    | "images"
    | "history"
  > {
  images: Omit<VehicleImage, "id">[];
}

export type UpdateVehicleInput = Partial<CreateVehicleInput> & { id: string };
