import { vehicles } from "@/data/vehicles";
import type { TimeSeriesPoint } from "@/types/analytics";

/**
 * Deterministic daily series generator (no Math.random) so server and
 * client render identical values — avoids hydration mismatches while
 * still producing numbers that look like real daily variance rather than
 * a smooth synthetic curve.
 */
function generateDailySeries(days: number, base: number, amplitude: number): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  const today = new Date("2026-08-22T00:00:00.000Z");

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
    const trend = (days - i) * (amplitude * 0.015);
    const wave = Math.sin(i / 3) * amplitude * 0.4 + Math.cos(i / 7) * amplitude * 0.25;
    const weekendDip = isWeekend ? -amplitude * 0.3 : 0;

    const value = Math.max(0, Math.round(base + trend + wave + weekendDip));

    points.push({
      date: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      value,
    });
  }

  return points;
}

export function getDailyRevenue(days: number): TimeSeriesPoint[] {
  return generateDailySeries(days, 900_000, 500_000);
}

export function getDailyLeads(days: number): TimeSeriesPoint[] {
  return generateDailySeries(days, 4, 3);
}

export function getDailyUnitsSold(days: number): TimeSeriesPoint[] {
  return generateDailySeries(days, 0.6, 1.2);
}

export const inventoryAgingBuckets = [
  { bucket: "0–30 days", count: 34 },
  { bucket: "31–60 days", count: 19 },
  { bucket: "61–90 days", count: 8 },
  { bucket: "90+ days", count: 4 },
];

/** Real price buckets computed from the actual fake vehicle inventory. */
export function getPriceDistribution() {
  const buckets = [
    { range: "< ৳15L", min: 0, max: 1_500_000 },
    { range: "৳15L–25L", min: 1_500_000, max: 2_500_000 },
    { range: "৳25L–35L", min: 2_500_000, max: 3_500_000 },
    { range: "৳35L–45L", min: 3_500_000, max: 4_500_000 },
    { range: "৳45L+", min: 4_500_000, max: Infinity },
  ];

  return buckets.map((b) => ({
    range: b.range,
    count: vehicles.filter((v) => v.price >= b.min && v.price < b.max).length,
  }));
}

export const conversionFunnel = [
  { stage: "Listing views", count: 2840 },
  { stage: "Inquiries", count: 341 },
  { stage: "Test drives", count: 96 },
  { stage: "Sales", count: 19 },
];
