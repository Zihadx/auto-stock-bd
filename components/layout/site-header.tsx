"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { publicNav, siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-paper/0",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-h3 shrink-0 tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {publicNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1.5 text-sm transition-colors",
                  active ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute inset-x-0 -bottom-[1px] h-px bg-brass"
                    transition={transition.base}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {siteConfig.phone}
          </a>
          <ThemeToggle />
          <Link
            href="/inventory"
            className={buttonVariants({ variant: "brass", size: "sm" })}
          >
            Browse Inventory
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={transition.fast}
                  className="flex"
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={transition.fast}
                  className="flex"
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition.base}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <nav className="container-page flex flex-col py-2" aria-label="Mobile">
              {publicNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition.fast, delay: i * 0.03 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-3 text-body-lg",
                      pathname === item.href ? "text-ink" : "text-ink-soft",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1.5 py-3 text-sm text-ink-soft"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {siteConfig.phone}
              </a>
              <Link
                href="/inventory"
                className={cn(buttonVariants({ variant: "brass", size: "md" }), "mt-2 mb-4 w-full")}
              >
                Browse Inventory
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
