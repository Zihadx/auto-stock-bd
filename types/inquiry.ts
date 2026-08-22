export type InquiryType = "general" | "test-drive" | "trade-in" | "financing";

export type InquiryStatus = "new" | "contacted" | "follow-up" | "closed";

export type InquiryPriority = "low" | "medium" | "high";

export interface InquiryTimelineEvent {
  id: string;
  date: string;
  actor: string;
  action: string;
  note?: string;
}

export interface Inquiry {
  id: string;
  vehicleId: string;
  customerId: string;
  customerName: string;
  phone: string;
  email?: string;
  message: string;
  type: InquiryType;
  status: InquiryStatus;
  priority: InquiryPriority;
  timeline: InquiryTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface InquiryFilters {
  search?: string;
  status?: InquiryStatus[];
  type?: InquiryType[];
  priority?: InquiryPriority[];
  page?: number;
  pageSize?: number;
}
