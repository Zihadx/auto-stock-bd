export type CustomerStatus = "lead" | "active" | "customer" | "inactive";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: CustomerStatus;
  interestedVehicleIds: string[];
  purchasedVehicleIds: string[];
  inquiryIds: string[];
  lastInteractionAt: string;
  createdAt: string;
}

export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus[];
  page?: number;
  pageSize?: number;
}
