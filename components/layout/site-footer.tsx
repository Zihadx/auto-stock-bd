"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siFacebook, siInstagram, siX, siYoutube } from "simple-icons";

import { ACCENT, CHARCOAL, PAPER } from "../ui/tokens";

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

const COLUMNS = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "New Cars", href: "/inventory?condition=new" },
      { label: "Used Cars", href: "/inventory?condition=used" },
      { label: "Sell Your Car", href: "/sell" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Our Services",
    links: [
      { label: "Car Inspection", href: "/standard" },
      { label: "Financing", href: "/financing" },
      { label: "Insurance", href: "/insurance" },
      { label: "Warranty", href: "/warranty" },
      { label: "After Sales", href: "/after-sales" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Journal", href: "/journal" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const PAYMENT_METHODS = ["VISA", "Mastercard", "Amex", "bKash", "Nagad"];

export function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: CHARCOAL,
        color: PAPER,
      }}
    >
      <div className="mx-auto max-w-[1920px] px-6 pb-10 pt-20 sm:px-9 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] lg:gap-x-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M12 2 2 20h20L12 2Z" fill={PAPER} />
              </svg>

              <span className="text-[15px] tracking-[0.22em]">
                AUTOSTOCK <span style={{ color: ACCENT }}>BD</span>
              </span>
            </Link>

            <p
              className="mt-5 max-w-[260px] text-[13px] leading-[1.8]"
              style={{
                color: `${PAPER}70`,
              }}
            >
              Your trusted marketplace for buying and selling inspected, quality
              cars in Bangladesh.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:border-white/40 hover:bg-white/[0.04]"
                  style={{
                    borderColor: `${PAPER}25`,
                    color: `${PAPER}A6`,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <path d={icon.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{
                  color: ACCENT,
                }}
              >
                {column.heading}
              </h4>

              <ul className="mt-6 flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] transition-colors hover:text-white"
                      style={{
                        color: `${PAPER}99`,
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[0.22em]"
              style={{
                color: ACCENT,
              }}
            >
              Subscribe to Our Newsletter
            </h4>

            <p
              className="mt-6 max-w-[260px] text-[13px] leading-[1.8]"
              style={{
                color: `${PAPER}70`,
              }}
            >
              Get the latest listings, offers, and news delivered to your inbox.
            </p>

            <form
              className="mt-5 flex items-stretch"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 border px-4 py-3 text-[13px] outline-none placeholder:text-[13px]"
                style={{
                  borderColor: `${PAPER}20`,
                  backgroundColor: `${PAPER}08`,
                  color: PAPER,
                }}
              />

              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 px-5 text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: ACCENT,
                  color: CHARCOAL,
                }}
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 flex flex-col gap-5 border-t pt-7 sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: `${PAPER}14`,
          }}
        >
          <p
            className="text-[12px]"
            style={{
              color: `${PAPER}70`,
            }}
          >
            © {new Date().getFullYear()}{" "}
            <span style={{ color: ACCENT }}>AutoStock BD</span>. All rights
            reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center gap-2.5">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="flex h-7 items-center rounded-[4px] border px-2.5 text-[10px] font-medium tracking-wide"
                style={{
                  borderColor: `${PAPER}18`,
                  backgroundColor: `${PAPER}0A`,
                  color: `${PAPER}90`,
                }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
