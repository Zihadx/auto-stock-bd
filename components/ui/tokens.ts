// Shared tokens across the AutoStock BD marketing components.
//
// Automotive theme:
// Deep Burgundy + Hot Pink + Soft Pink + Warm Gold

export const ACCENT = "#F51B72";       // Hot pink — primary CTA / highlights
export const BURGUNDY = "#6B102E";     // Deep burgundy — secondary brand
export const CHARCOAL = "#0A0106";     // Near-black — main background
export const PAPER = "#F5F1EA";        // Off-white — primary text
export const PINK = "#F8C3E1";         // Soft pink — light sections
export const GOLD = "#DAA428";         // Warm gold — secondary accent

export const LINE = "rgba(245, 241, 234, 0.14)";

// Several marketing sections (AutoShowcase, WhyChooseUs, RecentlyAdded,
// TrustSection, HomepageCtas, BrowseByBrand, HotSellingSection) render an
// intentionally fixed dark editorial band that falls back to a light
// surface only when the site is in light mode. These two values are that
// light-mode fallback pair — centralized here so every section stays in
// sync instead of each component re-declaring its own (slightly drifted)
// copy of the same off-white/near-black pair.
export const EDITORIAL_SURFACE_LIGHT = "#F5F3EE";
export const EDITORIAL_INK_LIGHT = "#171512";

// homepage-ctas.tsx and site-footer.tsx both render a gold-accented,
// dark-by-default band with the same light-mode fallback tones for text
// and the gold accent. Centralized here (rather than each file keeping its
// own copy) so the two stay visually consistent.
export const INK_STRONG_LIGHT = "#11100E"; // primary heading tone
export const INK_SOFT_LIGHT = "#332F29"; // secondary / description tone
export const INK_MUTED_LIGHT = "#3A3630"; // tertiary tone
export const INK_FAINT_LIGHT = "#514B41"; // faintest text tone
export const GOLD_LIGHT = "#8A6828"; // gold accent line / icon
export const GOLD_TEXT_LIGHT = "#654A19"; // gold accent text (darker, for contrast)
export const GOLD_ICON_LIGHT = "#76571F"; // gold icon / marker
export const GOLD_BORDER_LIGHT = "#96712F"; // gold border tone

// Native <option> popups are rendered by the browser/OS outside the page's
// styling — they ignore transparent or low-opacity backgrounds and fall
// back to an opaque (usually light) surface. A <select> that looks fine
// closed (e.g. light text on a transparent/dark card) can render invisible
// light-on-white text once opened. Apply this to every <option> so the
// popup stays readable regardless of the page theme.
export const NATIVE_OPTION_CLASS = "bg-white text-[#171512]";

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