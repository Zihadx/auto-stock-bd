"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  siFacebook,
  siInstagram,
  siX,
  siYoutube,
} from "simple-icons";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { ACCENT, CHARCOAL, GOLD, PAPER } from "../ui/tokens";
import { useMounted } from "@/hooks/use-mounted";

/* ================================================================
   SOCIALS
================================================================ */

const SOCIALS = [
  {
    icon: siFacebook,
    label: "Facebook",
    href: "https://facebook.com",
  },
  {
    icon: siInstagram,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: siX,
    label: "X",
    href: "https://x.com",
  },
  {
    icon: siYoutube,
    label: "YouTube",
    href: "https://youtube.com",
  },
];

/* ================================================================
   NAVIGATION COLUMNS
================================================================ */

const COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Browse Inventory", href: "/inventory" },
      { label: "Sell Your Car", href: "/sell-your-car" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const PAYMENT_METHODS = [
  "VISA",
  "Mastercard",
  "Amex",
  "bKash",
  "Nagad",
];

/* ================================================================
   LOGO MARK
   Same visual language as SiteHeader
================================================================ */

function LogoMark({
  className,
  dark = true,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3L29 28H22.3L19.2 21.2H12.8L9.7 28H3L16 3Z"
        fill={ACCENT}
      />

      <path
        d="M14.1 17.2H17.9L16 12.8L14.1 17.2Z"
        fill={dark ? "#050505" : "#ffffff"}
      />
    </svg>
  );
}

/* ================================================================
   FOOTER
================================================================ */

export function SiteFooter() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme !== "light";

  /* ==============================================================
     BRAND
  ============================================================== */

  const nameParts = siteConfig.name.split(" ");

  const brandRest =
    nameParts.length > 1 ? nameParts.pop() : "";

  const brandFirst = nameParts
    .join(" ")
    .toUpperCase();

  /* ==============================================================
     THEME
  ============================================================== */

  const background = isDark
    ? CHARCOAL
    : "#F7F6F2";

  const primaryText = isDark
    ? PAPER
    : "#11100E";

  const secondaryText = isDark
    ? "rgba(255,255,255,0.72)"
    : "#332F29";

  const mutedText = isDark
    ? "rgba(255,255,255,0.62)"
    : "#3A3630";

  const linkText = isDark
    ? "rgba(255,255,255,0.72)"
    : "#2E2B26";

  const borderColor = isDark
    ? "rgba(255,255,255,0.12)"
    : "rgba(17,16,14,0.16)";

  const subtleBorder = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(17,16,14,0.10)";

  const gold = isDark
    ? ACCENT
    : "#80602A";

  const goldStrong = isDark
    ? ACCENT
    : "#654A19";

  const inputBackground = isDark
    ? "rgba(255,255,255,0.04)"
    : "rgba(255,255,255,0.72)";

  const badgeBackground = isDark
    ? "rgba(255,255,255,0.035)"
    : "rgba(17,16,14,0.035)";

  const badgeText = isDark
    ? "rgba(255,255,255,0.68)"
    : "#332F29";

  const badgeBorder = isDark
    ? "rgba(255,255,255,0.11)"
    : "rgba(17,16,14,0.14)";

  return (
    <footer
      style={{
        backgroundColor: background,
        color: primaryText,
      }}
    >
      {/* ==========================================================
          TOP ACCENT
      =========================================================== */}

      <div
        className="h-px w-full"
        style={{
          backgroundColor: isDark
            ? "rgba(255,255,255,0.10)"
            : "rgba(17,16,14,0.12)",
        }}
      />

      <div className="container mx-auto px-5 pb-10 pt-20 py-20">
        {/* ========================================================
            MAIN GRID
        ========================================================= */}

        <div
          className={cn(
            "grid grid-cols-1",
            "gap-y-14",
            "sm:grid-cols-2",
            "lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]",
            "lg:gap-x-10",
          )}
        >
          {/* ======================================================
              BRAND
          ====================================================== */}

          <div>
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="group inline-flex items-center gap-3"
            >
              {/* Logo */}
              <span
                className={cn(
                  "relative flex h-8 w-8",
                  "items-center justify-center",
                )}
              >
                <LogoMark
                  dark={isDark}
                  className={cn(
                    "h-[25px] w-[25px]",
                    "transition-transform duration-500",
                    "group-hover:-translate-y-0.5",
                  )}
                />

                {/* Header-style accent underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2",
                    "h-px w-3",
                    "-translate-x-1/2",
                    "opacity-0",
                    "transition-all duration-500",
                    "group-hover:w-5",
                    "group-hover:opacity-100",
                  )}
                  style={{
                    backgroundColor: ACCENT,
                  }}
                />
              </span>

              {/* Brand name */}
              <span
                className={cn(
                  "text-[11px]",
                  "font-medium uppercase",
                  "tracking-[0.38em]",
                  "transition-colors duration-300",
                )}
              >
                {brandFirst}

                {brandRest && (
                  <span
                    className="ml-1"
                    style={{
                      color: ACCENT,
                    }}
                  >
                    {brandRest}
                  </span>
                )}
              </span>
            </Link>

            {/* Description */}
            <p
              className="mt-5 max-w-[260px] text-[13px] leading-[1.8]"
              style={{
                color: secondaryText,
              }}
            >
              Your trusted marketplace for buying and
              selling inspected, quality cars in
              Bangladesh.
            </p>

            {/* ====================================================
                SOCIAL LINKS
            ===================================================== */}

            <div className="mt-6 flex gap-3">
              {SOCIALS.map(
                ({ icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex h-9 w-9",
                      "items-center justify-center",
                      "rounded-full border",
                      "transition-all duration-300",
                    )}
                    style={{
                      borderColor,
                      color: isDark
                        ? "rgba(255,255,255,0.72)"
                        : "#3A3630",
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.025)"
                        : "rgba(255,255,255,0.35)",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.borderColor =
                        isDark
                          ? `${ACCENT}55`
                          : "#96712F";

                      event.currentTarget.style.color =
                        goldStrong;

                      event.currentTarget.style.backgroundColor =
                        isDark
                          ? `${ACCENT}08`
                          : "rgba(128,96,42,0.07)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.borderColor =
                        borderColor;

                      event.currentTarget.style.color =
                        isDark
                          ? "rgba(255,255,255,0.72)"
                          : "#3A3630";

                      event.currentTarget.style.backgroundColor =
                        isDark
                          ? "rgba(255,255,255,0.025)"
                          : "rgba(255,255,255,0.35)";
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={cn(
                        "h-4 w-4 fill-current",
                        "transition-transform duration-300",
                        "group-hover:scale-110",
                      )}
                      aria-hidden="true"
                    >
                      <path d={icon.path} />
                    </svg>
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* ======================================================
              LINK COLUMNS
          ====================================================== */}

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-5"
                  style={{
                    backgroundColor: gold,
                  }}
                />

                <h4
                  className={cn(
                    "text-[9px]",
                    "font-medium uppercase",
                    "tracking-[0.32em]",
                  )}
                  style={{
                    color: gold,
                  }}
                >
                  {column.heading}
                </h4>
              </div>

              <ul className="mt-6 flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group inline-flex",
                        "items-center gap-2",
                        "text-[13px]",
                        "transition-colors duration-300",
                      )}
                      style={{
                        color: linkText,
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.color =
                          goldStrong;
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.color =
                          linkText;
                      }}
                    >
                      <span>{link.label}</span>

                      <span
                        className={cn(
                          "h-px w-0",
                          "transition-all duration-500",
                          "group-hover:w-4",
                        )}
                        style={{
                          backgroundColor: gold,
                        }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ======================================================
              NEWSLETTER
          ====================================================== */}

          <div>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-5"
                style={{
                  backgroundColor: gold,
                }}
              />

              <h4
                className={cn(
                  "text-[9px]",
                  "font-medium uppercase",
                  "tracking-[0.32em]",
                )}
                style={{
                  color: gold,
                }}
              >
                Subscribe to Our Newsletter
              </h4>
            </div>

            <p
              className="mt-6 max-w-[260px] text-[13px] leading-[1.8]"
              style={{
                color: mutedText,
              }}
            >
              Get the latest listings, offers, and news
              delivered to your inbox.
            </p>

            <form
              className="mt-5 flex items-stretch"
              onSubmit={(event) =>
                event.preventDefault()
              }
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className={cn(
                  "min-w-0 flex-1",
                  "border px-4 py-3",
                  "text-[13px]",
                  "outline-none",
                  "placeholder:text-[13px]",
                  "transition-colors duration-300",
                  "focus:border-current",
                )}
                style={{
                  borderColor,
                  backgroundColor: inputBackground,
                  color: primaryText,
                }}
              />

              <button
                type="submit"
                className={cn(
                  "flex shrink-0 items-center",
                  "gap-2 px-5",
                  "text-[10px]",
                  "uppercase tracking-[0.18em]",
                  "transition-all duration-300",
                  "hover:opacity-90",
                )}
                style={{
                  backgroundColor: isDark
                    ? ACCENT
                    : "#8A6828",
                  color: isDark
                    ? CHARCOAL
                    : "#FFFDF8",
                }}
              >
                Subscribe

                <ArrowRight
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </button>
            </form>
          </div>
        </div>

        {/* ========================================================
            BOTTOM BAR
        ========================================================= */}

        <div
          className={cn(
            "mt-16 flex flex-col gap-5",
            "border-t pt-7",
            "sm:flex-row sm:items-center",
            "sm:justify-between",
          )}
          style={{
            borderColor: subtleBorder,
          }}
        >
          <p
            className="text-[11px] tracking-wide"
            style={{
              color: mutedText,
            }}
          >
            © {new Date().getFullYear()}{" "}
            <span
              style={{
                color: gold,
              }}
            >
              {siteConfig.name}
            </span>
            . All rights reserved.
          </p>

          {/* ======================================================
              PAYMENT METHODS
          ====================================================== */}

          <div className="flex flex-wrap items-center gap-2.5">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className={cn(
                  "flex h-7 items-center",
                  "rounded-[4px] border",
                  "px-2.5",
                  "text-[9px]",
                  "font-medium tracking-wide",
                )}
                style={{
                  borderColor: badgeBorder,
                  backgroundColor: badgeBackground,
                  color: badgeText,
                }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================
            FOOTER SIGNATURE
        ========================================================= */}

        <div className="mt-8 flex items-center gap-3">
          <span
            className="h-px w-16"
            style={{
              backgroundColor: isDark
                ? GOLD
                : "#A9823A",
            }}
          />

          <span
            className={cn(
              "text-[7px]",
              "uppercase tracking-[0.38em]",
            )}
            style={{
              color: isDark
                ? "rgba(255,255,255,0.38)"
                : "#514B41",
            }}
          >
            Automotive Atelier
          </span>
        </div>
      </div>
    </footer>
  );
}