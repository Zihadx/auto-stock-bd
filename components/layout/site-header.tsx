"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { publicNav, siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {siteConfig.phone}
          </a>
          <Link
            href="/inventory"
            className={buttonVariants({ variant: "brass", size: "sm" })}
          >
            Browse Inventory
          </Link>
        </div>

        <button
          type="button"
          className="p-2 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-line transition-[grid-template-rows] duration-200 md:hidden",
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav className="min-h-0" aria-label="Mobile">
          <ul className="flex flex-col px-4 py-2">
            {publicNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-sm text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
