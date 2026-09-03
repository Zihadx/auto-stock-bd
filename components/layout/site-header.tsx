
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { publicNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const ACCENT = "#5FC9CF";

/* ================================================================
   MARQUE
================================================================ */

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3L29 28H22.3L19.2 21.2H12.8L9.7 28H3L16 3Z"
        fill="currentColor"
      />

      <path
        d="M14.1 17.2H17.9L16 12.8L14.1 17.2Z"
        fill="black"
      />
    </svg>
  );
}

/* ================================================================
   BESPOKE MENU
================================================================ */

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span
      className="relative flex h-5 w-7 items-center justify-center"
      aria-hidden="true"
    >
      <span
        className={cn(
          "absolute h-px w-7 bg-current transition-all duration-500",
          open ? "rotate-45" : "-translate-y-[4px]",
        )}
      />

      <span
        className={cn(
          "absolute h-px bg-current transition-all duration-300",
          open ? "w-0 opacity-0" : "w-5",
        )}
      />

      <span
        className={cn(
          "absolute h-px w-7 bg-current transition-all duration-500",
          open ? "-rotate-45" : "translate-y-[4px]",
        )}
      />
    </span>
  );
}

/* ================================================================
   HEADER
================================================================ */

export function SiteHeader() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nameParts = siteConfig.name.split(" ");
  const brandRest = nameParts.length > 1 ? nameParts.pop() : "";
  const brandFirst = nameParts.join(" ").toUpperCase();

  /* ==============================================================
     Scroll state

     This effect is valid because it subscribes to an external
     browser event and updates React state from the event callback.
  ============================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ==============================================================
     Lock page scrolling while mobile navigation is open
  ============================================================== */

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ==============================================================
     Close menu from the actual navigation interaction.

     This avoids synchronously setting state from a pathname effect.
  ============================================================== */

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* ==========================================================
          HEADER
      ========================================================== */}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-all duration-700",
          scrolled || mobileOpen
            ? "border-b border-white/[0.08] bg-black/90 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[76px] container items-center justify-between px-6 sm:px-9 lg:px-14 xl:px-20">
          {/* ======================================================
              BRAND
          ====================================================== */}

          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="group relative flex items-center gap-3 text-white"
            onClick={handleNavigation}
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <LogoMark className="h-[25px] w-[25px] transition-transform duration-500 group-hover:-translate-y-0.5" />

              <span
                className="absolute bottom-0 left-1/2 h-px w-3 -translate-x-1/2 opacity-0 transition-all duration-500 group-hover:w-5 group-hover:opacity-100"
                style={{
                  backgroundColor: ACCENT,
                }}
              />
            </span>

            <span className="hidden text-[11px] font-medium uppercase tracking-[0.38em] sm:block">
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

          {/* ======================================================
              DESKTOP NAV
          ====================================================== */}

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex"
            aria-label="Primary"
          >
            {publicNav.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative py-3 text-[9px] uppercase tracking-[0.32em] transition-colors duration-300",
                    active
                      ? "text-white"
                      : "text-white/45 hover:text-white",
                  )}
                >
                  {item.label}

                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-500",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                    style={{
                      backgroundColor: active
                        ? ACCENT
                        : "rgba(255,255,255,.5)",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ======================================================
              RIGHT SIDE
          ====================================================== */}

          <div className="flex items-center gap-7">
            <Link
              href="/contact"
              className="group hidden items-center gap-3 lg:flex"
            >
              <span className="text-[9px] uppercase tracking-[0.32em] text-white/55 transition-colors group-hover:text-white">
                Enquire
              </span>

              <span className="h-px w-5 bg-white/40 transition-all duration-500 group-hover:w-8" />
            </Link>

            {/* Mobile menu */}

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
            >
              <MenuGlyph open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================================
          FULLSCREEN MOBILE MENU
      ========================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-50 bg-[#050505] lg:hidden"
          >
            {/* Cinematic atmosphere */}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(255,255,255,.055),transparent_35%)]" />

            <div className="relative flex h-full flex-col px-7 pb-8 pt-[110px]">
              {/* Label */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.15,
                }}
                className="mb-12 flex items-center gap-3"
              >
                <span
                  className="h-px w-7"
                  style={{
                    backgroundColor: ACCENT,
                  }}
                />

                <span className="text-[8px] uppercase tracking-[0.38em] text-white/40">
                  AutoStock / Collection
                </span>
              </motion.div>

              {/* Navigation */}

              <nav className="flex flex-col" aria-label="Mobile">
                {publicNav.map((item, index) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        x: -25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 0.12 + index * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavigation}
                        className={cn(
                          "group flex items-center justify-between border-b border-white/[0.08] py-5",
                          active
                            ? "text-white"
                            : "text-white/45",
                        )}
                      >
                        <span className="text-[clamp(1.8rem,7vw,3rem)] font-light uppercase tracking-[-0.04em]">
                          {item.label}
                        </span>

                        <span
                          className={cn(
                            "text-[9px] tracking-[0.25em] transition-opacity",
                            active
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-60",
                          )}
                          style={{
                            color: ACCENT,
                          }}
                        >
                          0{index + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom information */}

              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-[7px] uppercase tracking-[0.3em] text-white/25">
                    Automotive Atelier
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/45">
                    {(siteConfig as { location?: string }).location ??
                      "Dhaka, Bangladesh"}
                  </p>
                </div>

                <Link
                  href="/contact"
                  onClick={handleNavigation}
                  className="group flex items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-white"
                >
                  Enquire

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm transition-colors group-hover:border-white/60">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

