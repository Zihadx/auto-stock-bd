// Shared tokens across the AutoStock BD marketing components.
//
// Automotive theme:
// Deep Burgundy + Hot Pink + Soft Pink + Warm Gold

export const ACCENT = "#F51B72";       // Hot pink — primary CTA / highlights
export const BURGUNDY = "#6B102E";     // Deep burgundy — secondary brand
export const CHARCOAL = "#0A0106";     // Near-black — main background
export const PAPER = "#F5F1EA";        // Off-white — primary text
export const PINK = "#F8C3E1";         // Soft pink — light sections
export const GOLD = "#FFD86B";         // Warm gold — secondary accent

export const LINE = "rgba(245, 241, 234, 0.14)";

export function formatBDTCompact(amountBDT: number): string {
  if (amountBDT >= 10_000_000) {
    return `৳${(amountBDT / 10_000_000).toFixed(1)}Cr`;
  }

  if (amountBDT >= 100_000) {
    return `৳${(amountBDT / 100_000).toFixed(1)}L`;
  }

  if (amountBDT >= 1_000) {
    return `৳${(amountBDT / 1_000).toFixed(0)}K`;
  }

  return `৳${amountBDT}`;
}