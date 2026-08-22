import type {
  DashboardStats,
  RecentActivityItem,
  TimeSeriesPoint,
} from "@/types/analytics";

/**
 * Fake analytics data. Monthly revenue is derived from units sold (avg. sale
 * price ~28L BDT with hand-tuned variance) rather than randomly generated,
 * so the sales chart and units chart move together the way a real
 * dealership's numbers would.
 */

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const unitsSoldByMonth = [9, 11, 8, 14, 12, 17, 15, 19];
const avgPriceByMonth = [26.5, 27.2, 28.1, 27.8, 29.4, 28.9, 30.2, 29.6]; // lakh BDT

export const monthlyUnitsSold: TimeSeriesPoint[] = months.map((m, i) => ({
  date: m,
  value: unitsSoldByMonth[i],
}));

export const monthlyRevenue: TimeSeriesPoint[] = months.map((m, i) => ({
  date: m,
  value: Math.round(unitsSoldByMonth[i] * avgPriceByMonth[i] * 100_000),
}));

export const leadsTrend: TimeSeriesPoint[] = months.map((m, i) => ({
  date: m,
  value: Math.round(unitsSoldByMonth[i] * 4.2 + [3, -2, 5, 1, -1, 4, 2, 6][i]),
}));

export const inventoryDistribution = [
  { status: "Available", count: 61 },
  { status: "Reserved", count: 8 },
  { status: "Sold", count: 17 },
];

export const brandPerformance = [
  { brand: "Toyota", unitsSold: 24, avgDaysToSell: 18 },
  { brand: "Honda", unitsSold: 17, avgDaysToSell: 21 },
  { brand: "Mitsubishi", unitsSold: 9, avgDaysToSell: 26 },
  { brand: "Hyundai", unitsSold: 8, avgDaysToSell: 24 },
  { brand: "BMW", unitsSold: 6, avgDaysToSell: 33 },
  { brand: "Others", unitsSold: 21, avgDaysToSell: 29 },
];

export const dashboardStats: DashboardStats = {
  totalVehicles: 86,
  available: 61,
  reserved: 8,
  soldThisMonth: 19,
  newInquiries: 34,
  inventoryValue: 218_000_000,
  conversionRatePct: 12.4,
  greetingSummary:
    "Your inventory is healthy — 61 vehicles available. 8 new inquiries arrived in the last 24 hours.",
};

export const recentActivity: RecentActivityItem[] = [
  { id: "a1", type: "inquiry", message: "New inquiry on Mitsubishi Outlander PHEV from Rafiq H.", timestamp: "2026-08-22T14:12:00.000Z" },
  { id: "a2", type: "sale", message: "Toyota Premio F Package marked as sold", timestamp: "2026-08-22T10:40:00.000Z" },
  { id: "a3", type: "vehicle-added", message: "Hyundai Tucson GLS 2021 added to inventory", timestamp: "2026-08-21T16:05:00.000Z" },
  { id: "a4", type: "status-change", message: "Mazda CX-5 Touring moved to Reserved", timestamp: "2026-08-21T09:22:00.000Z" },
  { id: "a5", type: "inquiry", message: "Test drive requested for Honda Vezel Z Package", timestamp: "2026-08-20T18:47:00.000Z" },
  { id: "a6", type: "inquiry", message: "New inquiry on BMW 320i M Sport from Farhana K.", timestamp: "2026-08-20T11:15:00.000Z" },
];

export interface NeedsAttentionItem {
  id: string;
  label: string;
  detail: string;
  severity: "high" | "medium";
  href: string;
}

export const needsAttention: NeedsAttentionItem[] = [
  {
    id: "n1",
    label: "3 vehicles unanswered for 48+ hours",
    detail: "Inquiries on Audi A4, Nissan X-Trail, and Suzuki Swift have no response yet.",
    severity: "high",
    href: "/admin/inquiries",
  },
  {
    id: "n2",
    label: "4 listings aging past 60 days",
    detail: "Consider a price review — these are sitting longer than your average.",
    severity: "medium",
    href: "/admin/inventory?status=available",
  },
  {
    id: "n3",
    label: "2 vehicles missing full photo sets",
    detail: "Listings with fewer than 3 photos get 40% fewer inquiries on average.",
    severity: "medium",
    href: "/admin/inventory",
  },
];
