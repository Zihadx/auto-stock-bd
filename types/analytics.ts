export type DateRangeKey = "7d" | "30d" | "90d" | "6m" | "1y";

export interface KpiValue {
  label: string;
  value: number;
  displayValue: string;
  deltaPct: number;
  trend: "up" | "down" | "flat";
  context: string;
}

export interface DashboardStats {
  totalVehicles: number;
  available: number;
  reserved: number;
  soldThisMonth: number;
  newInquiries: number;
  inventoryValue: number;
  conversionRatePct: number;
  greetingSummary: string;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface SalesAnalytics {
  monthlyRevenue: TimeSeriesPoint[];
  unitsSold: TimeSeriesPoint[];
}

export interface InventoryAnalytics {
  distributionByStatus: { status: string; count: number }[];
  brandPerformance: { brand: string; unitsSold: number; avgDaysToSell: number }[];
  agingBuckets: { bucket: string; count: number }[];
  priceDistribution: { range: string; count: number }[];
}

export interface LeadAnalytics {
  leadsTrend: TimeSeriesPoint[];
  conversionFunnel: { stage: string; count: number }[];
}

export interface RecentActivityItem {
  id: string;
  type: "inquiry" | "sale" | "vehicle-added" | "status-change";
  message: string;
  timestamp: string;
}
