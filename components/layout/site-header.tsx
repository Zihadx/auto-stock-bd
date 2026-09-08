"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ComponentType } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  Moon,
  Settings,
  Sun,
  User,
  UserPlus,
} from "lucide-react";
import { useTheme } from "next-themes";

import { publicNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ACCENT, BURGUNDY, CHARCOAL, PAPER, PINK, GOLD, LINE } from "../ui/tokens";

/* -----------------------------------------------------------------------
   Hydration-safe mount detection
----------------------------------------------------------------------- */

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/* -----------------------------------------------------------------------
   Theme tokens — every color decision lives here, computed once per
   render, instead of being re-derived with ternaries in every subtree.
----------------------------------------------------------------------- */

function useThemeTokens(isDark: boolean) {
  return useMemo(
    () => ({
      text: isDark ? PAPER : CHARCOAL,
      textMuted: isDark ? `${PAPER}A6` : `${CHARCOAL}B3`,
      textFaint: isDark ? `${PAPER}78` : `${CHARCOAL}78`,
      border: isDark ? `${PAPER}18` : "rgba(10,1,6,.14)",
      borderSoft: isDark ? `${PAPER}12` : "rgba(10,1,6,.10)",
      surface: isDark ? `${PAPER}06` : "rgba(255,255,255,.62)",
      surfaceSoft: isDark ? `${PAPER}05` : "rgba(10,1,6,.025)",
      panelBg: isDark ? "rgba(12,4,9,.94)" : "rgba(255,255,255,.94)",
      panelBorder: isDark ? `${PAPER}18` : "rgba(10,1,6,.12)",
      panelDivider: isDark ? `${PAPER}10` : "rgba(10,1,6,.08)",
      avatarBg: isDark
        ? `linear-gradient(145deg, ${BURGUNDY}, ${CHARCOAL})`
        : `linear-gradient(145deg, ${PINK}, #ffffff)`,
      avatarIcon: isDark ? PAPER : BURGUNDY,
      badgeBg: isDark ? `${BURGUNDY}70` : `${PINK}70`,
    }),
    [isDark],
  );
}

type Tokens = ReturnType<typeof useThemeTokens>;

/* -----------------------------------------------------------------------
   Logo
----------------------------------------------------------------------- */

function LogoMark({ className, dark = true }: { className?: string; dark?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 3L29 28H22.3L19.2 21.2H12.8L9.7 28H3L16 3Z" fill={ACCENT} />
      <path d="M14.1 17.2H17.9L16 12.8L14.1 17.2Z" fill={dark ? CHARCOAL : "#ffffff"} />
    </svg>
  );
}

/* -----------------------------------------------------------------------
   Mobile menu glyph (burger <-> ×)
----------------------------------------------------------------------- */

function MenuGlyph({ open, className }: { open: boolean; className?: string }) {
  const bar = "absolute h-px bg-current transition-all";
  return (
    <span className={cn("relative flex h-5 w-7 items-center justify-center", className)} aria-hidden="true">
      <span className={cn(bar, "w-7 duration-500", open ? "rotate-45" : "-translate-y-[4px]")} />
      <span className={cn(bar, "duration-300", open ? "w-0 opacity-0" : "w-5")} />
      <span className={cn(bar, "w-7 duration-500", open ? "-rotate-45" : "translate-y-[4px]")} />
    </span>
  );
}

/* -----------------------------------------------------------------------
   Theme toggle
----------------------------------------------------------------------- */

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <span
        className="h-9 w-9 rounded-full border"
        style={{ borderColor: `${PAPER}18`, backgroundColor: `${PAPER}05` }}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 hover:scale-105"
      style={{
        borderColor: isDark ? `${PAPER}18` : "rgba(10,1,6,.14)",
        backgroundColor: isDark ? `${PAPER}06` : "rgba(255,255,255,.62)",
        color: isDark ? PAPER : CHARCOAL,
        boxShadow: isDark ? `inset 0 1px 0 ${PAPER}08` : "inset 0 1px 0 rgba(255,255,255,.8)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}25` }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: isDark ? -90 : 90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 90 : -90, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {isDark ? <Sun className="h-[15px] w-[15px]" strokeWidth={1.5} /> : <Moon className="h-[15px] w-[15px]" strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* -----------------------------------------------------------------------
   Account link config — single source of truth for both the desktop
   dropdown and the mobile grid, so the two never drift out of sync.
----------------------------------------------------------------------- */

type AccountLink = {
  href: string;
  label: string;
  desc: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  accent: string;
  highlight?: boolean;
};

function useAccountLinks(): AccountLink[] {
  return [
    { href: "/sign-in", label: "Sign in", desc: "Access your account", icon: LogIn, accent: ACCENT },
    { href: "/sign-up", label: "Sign up", desc: "Create your account", icon: UserPlus, accent: GOLD },
    { href: "/account", label: "Account", desc: "", icon: User, accent: "" },
    { href: "/settings", label: "Settings", desc: "", icon: Settings, accent: "" },
    {
      href: "/agent-dashboard",
      label: "Agent Dashboard",
      desc: "Manage your listings",
      icon: LayoutDashboard,
      accent: ACCENT,
      highlight: true,
    },
  ];
}

/* -----------------------------------------------------------------------
   Desktop profile dropdown
----------------------------------------------------------------------- */

function DesktopDropdownLink({
  link,
  tokens,
  onClick,
}: {
  link: AccountLink;
  tokens: Tokens;
  onClick: () => void;
}) {
  const Icon = link.icon;
  const iconColor = link.accent || tokens.textMuted;

  if (link.highlight) {
    return (
      <Link
        href={link.href}
        onClick={onClick}
        className="group mt-1 flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-300"
        style={{ color: tokens.text, borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}08` }}
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} style={{ color: ACCENT }} />
        <span className="flex-1">
          <span className="block text-[9px] font-medium uppercase tracking-[0.2em]">{link.label}</span>
          <span className="mt-0.5 block text-[7px] uppercase tracking-[0.12em]" style={{ color: tokens.textFaint }}>
            {link.desc}
          </span>
        </span>
        <span className="text-sm transition-transform duration-300 group-hover:translate-x-1" style={{ color: ACCENT }}>
          ↗
        </span>
      </Link>
    );
  }

  if (!link.desc) {
    // Plain nav row (Account / Settings)
    return (
      <Link
        href={link.href}
        onClick={onClick}
        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300"
        style={{ color: tokens.text }}
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} style={{ color: iconColor }} />
        <span className="flex-1 text-[9px] font-medium uppercase tracking-[0.2em]">{link.label}</span>
        <span
          className="text-sm opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          style={{ color: ACCENT }}
        >
          ↗
        </span>
      </Link>
    );
  }

  // Auth row (Sign in / Sign up) — icon in a bordered chip, with description
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300"
      style={{ color: tokens.text }}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-300"
        style={{ borderColor: tokens.borderSoft, backgroundColor: tokens.surfaceSoft }}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: link.accent }} />
      </span>
      <span className="flex-1">
        <span className="block text-[10px] font-medium uppercase tracking-[0.18em]">{link.label}</span>
        <span className="mt-0.5 block text-[8px] tracking-[0.05em]" style={{ color: tokens.textFaint }}>
          {link.desc}
        </span>
      </span>
      <span className="text-sm transition-transform duration-300 group-hover:translate-x-1" style={{ color: link.accent }}>
        ↗
      </span>
    </Link>
  );
}

function ProfileMenu({ tokens, isDark, onNavigate }: { tokens: Tokens; isDark: boolean; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const links = useAccountLinks();

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeAndNavigate = () => {
    setOpen(false);
    onNavigate();
  };

  const [authLinks, navLinks, dashboardLink] = [links.slice(0, 2), links.slice(2, 4), links[4]];

  return (
    <div ref={menuRef} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open account menu"
        aria-expanded={open}
        className="group relative flex items-center gap-2 rounded-full border p-1 transition-all duration-500 hover:scale-[1.03]"
        style={{
          borderColor: open ? `${ACCENT}70` : tokens.border,
          backgroundColor: tokens.surface,
          boxShadow: open
            ? `0 0 0 1px ${ACCENT}18, inset 0 1px 0 ${PAPER}08`
            : isDark
              ? `inset 0 1px 0 ${PAPER}08`
              : "inset 0 1px 0 rgba(255,255,255,.8)",
        }}
      >
        <span
          className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
          style={{ background: tokens.avatarBg, border: `1px solid ${ACCENT}35` }}
        >
          <User className="h-[15px] w-[15px]" strokeWidth={1.6} style={{ color: tokens.avatarIcon }} />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle at 30% 20%, ${ACCENT}28, transparent 55%)` }}
          />
        </span>
        <ChevronDown
          className={cn("mr-1 h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
          strokeWidth={1.5}
          style={{ color: `${tokens.text}90` }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+14px)] w-[270px] overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              backgroundColor: tokens.panelBg,
              borderColor: tokens.panelBorder,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: isDark ? "0 24px 70px rgba(0,0,0,.42)" : "0 24px 70px rgba(10,1,6,.14)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-8 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, ${GOLD}, transparent)` }}
            />

            <div className="border-b px-5 py-5" style={{ borderColor: tokens.panelDivider }}>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border"
                  style={{ backgroundColor: tokens.badgeBg, borderColor: `${ACCENT}30` }}
                >
                  <User className="h-4 w-4" strokeWidth={1.5} style={{ color: ACCENT }} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em]" style={{ color: tokens.text }}>
                    My account
                  </p>
                  <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.18em]" style={{ color: tokens.textMuted }}>
                    Access your collection
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2">
              {authLinks.map((link) => (
                <DesktopDropdownLink key={link.href} link={link} tokens={tokens} onClick={closeAndNavigate} />
              ))}
            </div>

            <div className="mx-4 h-px" style={{ backgroundColor: tokens.panelDivider }} />

            <div className="p-2">
              {navLinks.map((link) => (
                <DesktopDropdownLink key={link.href} link={link} tokens={tokens} onClick={closeAndNavigate} />
              ))}
              <DesktopDropdownLink link={dashboardLink} tokens={tokens} onClick={closeAndNavigate} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Mobile account actions
----------------------------------------------------------------------- */

function MobileAccountActions({ tokens, onNavigate }: { tokens: Tokens; onNavigate: () => void }) {
  const links = useAccountLinks();
  const gridLinks = links.slice(0, 4); // sign-in, sign-up, account, settings
  const dashboardLink = links[4];

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center gap-3" style={{ color: tokens.textFaint }}>
        <span className="h-px w-5" style={{ backgroundColor: ACCENT }} />
        <span className="text-[7px] font-medium uppercase tracking-[0.3em]">Account</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {gridLinks.map((link) => {
          const Icon = link.icon;
          const iconColor = link.accent || tokens.textFaint;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="flex items-center gap-2 rounded-xl border px-3 py-3 transition-all duration-300"
              style={{ borderColor: tokens.borderSoft, color: tokens.text, backgroundColor: link.desc ? tokens.surfaceSoft : "transparent" }}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: iconColor }} />
              <span className="text-[8px] font-medium uppercase tracking-[0.18em]">{link.label}</span>
            </Link>
          );
        })}

        <Link
          href={dashboardLink.href}
          onClick={onNavigate}
          className="col-span-2 flex items-center gap-3 rounded-xl border px-3 py-3"
          style={{ borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}08`, color: tokens.text }}
        >
          <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} style={{ color: ACCENT }} />
          <span className="flex-1">
            <span className="block text-[8px] font-medium uppercase tracking-[0.2em]">{dashboardLink.label}</span>
            <span className="mt-1 block text-[7px] uppercase tracking-[0.14em]" style={{ color: tokens.textFaint }}>
              {dashboardLink.desc}
            </span>
          </span>
          <span className="text-sm" style={{ color: ACCENT }}>
            ↗
          </span>
        </Link>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Desktop nav link
----------------------------------------------------------------------- */

function NavLink({ href, label, active, tokens }: { href: string; label: string; active: boolean; tokens: Tokens }) {
  return (
    <Link
      href={href}
      className="group relative py-3 text-[9px] font-medium uppercase tracking-[0.32em] transition-colors duration-300"
      style={{ color: active ? tokens.text : tokens.textMuted }}
    >
      {label}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[1.5px] w-full origin-left transition-transform duration-500",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
        style={{ backgroundColor: active ? ACCENT : tokens.textMuted }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: ACCENT }}
      />
    </Link>
  );
}

/* -----------------------------------------------------------------------
   Header
----------------------------------------------------------------------- */

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = !mounted || resolvedTheme === "dark"; // keep dark as SSR fallback
  const tokens = useThemeTokens(isDark);

  const nameParts = siteConfig.name.split(" ");
  const brandRest = nameParts.length > 1 ? nameParts.pop() : "";
  const brandFirst = nameParts.join(" ").toUpperCase();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavigation = () => setMobileOpen(false);
  const elevated = scrolled || mobileOpen;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60] transition-all duration-700"
        style={{
          color: tokens.text,
          borderBottomColor: elevated ? tokens.border : isDark ? `${PAPER}09` : "rgba(10,1,6,.06)",
          background: elevated
            ? isDark
              ? `linear-gradient(180deg, ${CHARCOAL}F5, ${CHARCOAL}E8)`
              : "rgba(255,255,255,.88)"
            : isDark
              ? `linear-gradient(180deg, ${CHARCOAL}B8, ${CHARCOAL}52)`
              : "rgba(255,255,255,.58)",
          backdropFilter: elevated ? "blur(22px)" : "blur(14px)",
          WebkitBackdropFilter: elevated ? "blur(22px)" : "blur(14px)",
          boxShadow: elevated ? (isDark ? "0 12px 45px rgba(0,0,0,.22)" : "0 12px 45px rgba(10,1,6,.07)") : "none",
        }}
      >
        <div className="container mx-auto flex h-[76px] items-center justify-between">
          {/* Brand */}
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="group relative flex shrink-0 items-center gap-3" onClick={handleNavigation}>
            <span className="relative flex h-8 w-8 items-center justify-center">
              <LogoMark dark={isDark} className="h-[25px] w-[25px] transition-transform duration-500 group-hover:-translate-y-0.5" />
              <span
                className="absolute bottom-0 left-1/2 h-px w-3 -translate-x-1/2 opacity-0 transition-all duration-500 group-hover:w-5 group-hover:opacity-100"
                style={{ backgroundColor: ACCENT }}
              />
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.38em] sm:block">
              {brandFirst}
              {brandRest && (
                <span className="ml-1" style={{ color: ACCENT }}>
                  {brandRest}
                </span>
              )}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex" aria-label="Primary">
            {publicNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <NavLink key={item.href} href={item.href} label={item.label} active={active} tokens={tokens} />;
            })}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            <ThemeToggle />
            <ProfileMenu tokens={tokens} isDark={isDark} onNavigate={handleNavigation} />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              style={{ color: tokens.text }}
            >
              <MenuGlyph open={mobileOpen} />
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 h-px origin-center"
          style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, ${GOLD}, transparent)` }}
        />
      </header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ backgroundColor: isDark ? CHARCOAL : "#F7F5F1", color: tokens.text }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: isDark
                  ? `radial-gradient(circle at 80% 20%, ${BURGUNDY}28, transparent 32%)`
                  : `radial-gradient(circle at 80% 20%, ${PINK}55, transparent 34%)`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-80px] top-[35%] h-64 w-64 rounded-full blur-[100px]"
              style={{ backgroundColor: ACCENT, opacity: isDark ? 0.07 : 0.08 }}
            />
            <div aria-hidden className="pointer-events-none absolute inset-x-7 top-[108px] h-px" style={{ backgroundColor: tokens.borderSoft }} />

            <div className="relative flex h-full flex-col px-7 pb-8 pt-[110px]">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-8 flex items-center gap-3 sm:mb-10"
              >
                <span className="h-[2px] w-7" style={{ backgroundColor: ACCENT }} />
                <span className="text-[8px] font-medium uppercase tracking-[0.38em]" style={{ color: tokens.textFaint }}>
                  AutoStock / Collection
                </span>
              </motion.div>

              <nav className="flex flex-col" aria-label="Mobile">
                {publicNav.map((item, index) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.55, delay: 0.12 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavigation}
                        className="group flex items-center justify-between border-b py-4.5 sm:py-5"
                        style={{ borderColor: tokens.borderSoft, color: active ? tokens.text : tokens.textFaint }}
                      >
                        <span className="text-[clamp(1.8rem,7vw,3rem)] font-light uppercase tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1">
                          {item.label}
                        </span>
                        <span
                          className={cn(
                            "text-[9px] font-medium tracking-[0.25em] transition-all duration-300",
                            active ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                          )}
                          style={{ color: ACCENT }}
                        >
                          0{index + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <MobileAccountActions tokens={tokens} onNavigate={handleNavigation} />

              <div className="mt-auto flex items-end justify-between gap-6 pt-6">
                <div>
                  <p className="text-[7px] font-medium uppercase tracking-[0.3em]" style={{ color: `${tokens.text}55` }}>
                    Automotive Atelier
                  </p>
                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.22em]" style={{ color: tokens.textFaint }}>
                    {(siteConfig as { location?: string }).location ?? "Dhaka, Bangladesh"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.22em]" style={{ color: tokens.textFaint }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}70` }} />
                  Member access
                </div>
              </div>

              <div
                aria-hidden
                className="absolute inset-x-7 bottom-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${LINE}, transparent)` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}