/**
 * Centralized formatting helpers. Currency, distance, and date formatting
 * live here so every screen renders BDT/mileage/dates identically.
 */

const bdtFormatter = new Intl.NumberFormat("en-BD", {
  maximumFractionDigits: 0,
});

/** Formats a whole-taka amount as "৳12,50,000" (South Asian digit grouping). */
export function formatBDT(amount: number): string {
  return `৳${bdtFormatter.format(amount)}`;
}

/** Compact form for dashboard KPIs: "৳4.2Cr", "৳86L" */
export function formatBDTCompact(amount: number): string {
  const crore = 10_000_000;
  const lakh = 100_000;

  if (amount >= crore) {
    return `৳${trimZero(amount / crore)}Cr`;
  }
  if (amount >= lakh) {
    return `৳${trimZero(amount / lakh)}L`;
  }
  return formatBDT(amount);
}

function trimZero(value: number): string {
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
}

export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("en-BD").format(km)} km`;
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: diffDays > 365 ? "numeric" : undefined,
  }).format(date);
}

export function formatFullDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
