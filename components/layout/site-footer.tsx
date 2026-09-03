"use client";

import Link from "next/link";
import { ACCENT, CHARCOAL, PAPER } from "../ui/tokens";

const COLUMNS = [
  {
    heading: "Browse",
    links: [
      { label: "Inventory", href: "/inventory" },
      { label: "Sell Your Car", href: "/sell" },
      { label: "Our Standard", href: "/standard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "+880 1XXX-XXXXXX", href: "tel:+8801XXXXXXXXX" },
      { label: "hello@autostockbd.com", href: "mailto:hello@autostockbd.com" },
      { label: "Gulshan, Dhaka", href: "/visit" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="pt-20" style={{ backgroundColor: CHARCOAL, color: PAPER }}>
      <div className="mx-auto max-w-[1920px] px-6 sm:px-9 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-[15px] tracking-[0.22em]">
              AUTOSTOCK <span style={{ color: ACCENT }}>BD</span>
            </span>
            <p className="mt-4 max-w-[220px] text-[12px] leading-[1.8]" style={{ color: `${PAPER}66` }}>
              Bangladeshs inspected pre-owned marketplace for exceptional cars.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: `${PAPER}80` }}>
                {col.heading}
              </h4>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] transition-colors hover:text-white"
                      style={{ color: `${PAPER}99` }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col gap-3 border-t py-7 text-[11px] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: `${PAPER}18`, color: `${PAPER}55` }}
        >
          <span>© {new Date().getFullYear()} AutoStock BD. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}