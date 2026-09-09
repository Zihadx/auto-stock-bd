import { CHARCOAL, PAPER } from "@/components/ui/tokens";


/** Brand accent colors — constant across light/dark, cycled per card. */
export const ACCENTS = [
  { text: "#E5453E", badgeBg: "rgba(229,69,62,0.14)", badgeBorder: "rgba(229,69,62,0.4)", cta: "#E5453E", ctaIcon: PAPER },
  { text: "#CBA36B", badgeBg: "rgba(203,163,107,0.14)", badgeBorder: "rgba(203,163,107,0.4)", cta: "#CBA36B", ctaIcon: CHARCOAL },
  { text: "#33C9B0", badgeBg: "rgba(51,201,176,0.14)", badgeBorder: "rgba(51,201,176,0.4)", cta: "#33C9B0", ctaIcon: CHARCOAL },
] as const;

/**
 * Hero text sits directly on the (always-dark) photo/gradient background,
 * so it must stay light in BOTH page themes — it never gets a background
 * pill to justify switching to dark text.
 */
export const HERO_HEADING = PAPER;
export const HERO_MUTED = "rgba(243,238,230,0.74)";

/** Page-level theme: everything that actually sits on the section background. */
export function buildTheme(isLight: boolean) {
  const ink = isLight ? "23,21,18" : "243,238,230";

  return {
    isLight,
    sectionBg: isLight ? "#F5F3EE" : CHARCOAL,
    heading: isLight ? "#171512" : PAPER,
    // Real opacity-based hierarchy so muted/subtle text is actually dimmer
    // than headings in BOTH themes, not just in light mode.
    muted: `rgba(${ink},0.68)`,
    subtle: `rgba(${ink},0.48)`,
    border: `rgba(${ink},0.14)`,
    cardBg: isLight ? "rgba(255,255,255,0.70)" : "#0D0A07",
    cardShadow: isLight ? "0 12px 40px rgba(20,18,15,0.06)" : "none",
    heroShadow: isLight ? "0 18px 50px rgba(20,18,15,0.08)" : "0 18px 50px rgba(0,0,0,0.20)",
    // Frosted CTA pill: its own background flips with theme, so its text
    // (theme.heading) staying theme-aware is correct here.
    ctaBg: isLight ? "rgba(255,255,255,0.65)" : "rgba(243,238,230,0.04)",
    ambientBg: isLight
      ? "radial-gradient(circle at 75% 15%,rgba(203,163,107,0.12),transparent 30%),radial-gradient(circle at 10% 80%,rgba(229,69,62,0.045),transparent 28%)"
      : "radial-gradient(circle at 75% 15%,rgba(203,163,107,0.08),transparent 30%),radial-gradient(circle at 10% 80%,rgba(229,69,62,0.05),transparent 28%)",
    // Mobile stats bar has its own theme-following surface, so its text
    // legitimately follows the page theme too (handled via StatsList tone="auto").
    mobileStatsBg: isLight ? "rgba(255,255,255,0.68)" : "rgba(10,8,6,0.80)",
    mobileStatsShadow: isLight ? "0 10px 30px rgba(20,18,15,0.05)" : "none",
  };
}

/** Desktop stats panel always overlays the dark hero photo — never themed. */
export const STATS_PANEL_BG = "rgba(10,8,6,0.80)";
export const STATS_PANEL_BORDER = "rgba(243,238,230,0.18)";

export type Theme = ReturnType<typeof buildTheme>;