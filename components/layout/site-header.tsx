"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, LogIn, Settings, User, UserPlus } from "lucide-react";

import { publicNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ACCENT, BURGUNDY, CHARCOAL, PAPER, PINK, GOLD, LINE } from "../ui/tokens";

const EASE_LUX = [0.16, 1, 0.3, 1] as const;

/* -----------------------------------------------------------------------
   ThemeVars — header palette as CSS custom properties scoped to
   `:root` / `.dark`. next-themes flips the `dark` class on <html> before
   first paint, so these resolve correctly on frame one — no JS
   branching, no mount gate, no flash.
----------------------------------------------------------------------- */

function ThemeVars() {
  return (
    <style>{`
      :root {
        --hdr-text: ${CHARCOAL};
        --hdr-text-muted: ${CHARCOAL}B3;
        --hdr-text-faint: ${CHARCOAL}78;
        --hdr-border: rgba(10,1,6,.14);
        --hdr-border-soft: rgba(10,1,6,.10);
        --hdr-border-faint: rgba(10,1,6,.06);
        --hdr-surface: rgba(255,255,255,.62);
        --hdr-surface-soft: rgba(10,1,6,.025);
        --hdr-panel-bg: rgba(255,255,255,.94);
        --hdr-panel-border: rgba(10,1,6,.12);
        --hdr-panel-divider: rgba(10,1,6,.08);
        --hdr-bg-idle: rgba(255,255,255,.58);
        --hdr-bg-elevated: rgba(255,255,255,.88);
        --hdr-sheet-bg: #F8F5EF;
        --hdr-sheet-glow: radial-gradient(circle at 80% 20%, ${PINK}55, transparent 34%);
        --hdr-glow-opacity: .08;
        --hdr-avatar-bg: linear-gradient(145deg, ${PINK}, #ffffff);
        --hdr-avatar-icon: ${BURGUNDY};
        --hdr-badge-bg: ${PINK}70;
        --hdr-control-shadow: inset 0 1px 0 rgba(255,255,255,.85);
        color-scheme: light;
      }
      .dark {
        --hdr-text: ${PAPER};
        --hdr-text-muted: ${PAPER}A6;
        --hdr-text-faint: ${PAPER}78;
        --hdr-border: ${PAPER}18;
        --hdr-border-soft: ${PAPER}12;
        --hdr-border-faint: ${PAPER}09;
        --hdr-surface: ${PAPER}06;
        --hdr-surface-soft: ${PAPER}05;
        --hdr-panel-bg: rgba(9,4,3,.95);
        --hdr-panel-border: ${PAPER}18;
        --hdr-panel-divider: ${PAPER}10;
        --hdr-bg-idle: linear-gradient(180deg, ${CHARCOAL}B8, ${CHARCOAL}52);
        --hdr-bg-elevated: linear-gradient(180deg, ${CHARCOAL}F5, ${CHARCOAL}E8);
        --hdr-sheet-bg: ${CHARCOAL};
        --hdr-sheet-glow: radial-gradient(circle at 80% 20%, ${BURGUNDY}30, transparent 32%);
        --hdr-glow-opacity: .07;
        --hdr-avatar-bg: linear-gradient(145deg, ${BURGUNDY}, ${CHARCOAL});
        --hdr-avatar-icon: ${PAPER};
        --hdr-badge-bg: ${BURGUNDY}70;
        --hdr-control-shadow: inset 0 1px 0 ${PAPER}08;
        color-scheme: dark;
      }
      [data-theme-fade] {
        transition:
          background-color .6s cubic-bezier(.16,1,.3,1),
          background-image .6s cubic-bezier(.16,1,.3,1),
          border-color .6s cubic-bezier(.16,1,.3,1),
          color .6s cubic-bezier(.16,1,.3,1),
          box-shadow .6s cubic-bezier(.16,1,.3,1);
      }
    `}</style>
  );
}

const T = {
  text: "var(--hdr-text)",
  textMuted: "var(--hdr-text-muted)",
  textFaint: "var(--hdr-text-faint)",
  border: "var(--hdr-border)",
  borderSoft: "var(--hdr-border-soft)",
  borderFaint: "var(--hdr-border-faint)",
  surface: "var(--hdr-surface)",
  surfaceSoft: "var(--hdr-surface-soft)",
  panelBg: "var(--hdr-panel-bg)",
  panelBorder: "var(--hdr-panel-border)",
  panelDivider: "var(--hdr-panel-divider)",
  bgIdle: "var(--hdr-bg-idle)",
  bgElevated: "var(--hdr-bg-elevated)",
  sheetBg: "var(--hdr-sheet-bg)",
  sheetGlow: "var(--hdr-sheet-glow)",
  glowOpacity: "var(--hdr-glow-opacity)",
  avatarBg: "var(--hdr-avatar-bg)",
  avatarIcon: "var(--hdr-avatar-icon)",
  badgeBg: "var(--hdr-badge-bg)",
  controlShadow: "var(--hdr-control-shadow)",
} as const;

type IconType = ComponentType<{ className?: string; strokeWidth?: number; style?: CSSProperties }>;

/* -----------------------------------------------------------------------
   Logo — inner path uses currentColor against --hdr-sheet-bg so it reads
   as a cutout matching the page backdrop in both themes, no JS branch.
----------------------------------------------------------------------- */

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} style={{ color: T.sheetBg }} aria-hidden="true">
      <path d="M16 3L29 28H22.3L19.2 21.2H12.8L9.7 28H3L16 3Z" fill={ACCENT} />
      <path d="M14.1 17.2H17.9L16 12.8L14.1 17.2Z" fill="currentColor" />
    </svg>
  );
}

/* -----------------------------------------------------------------------
   Menu control — bordered chrome circle holding two asymmetric hairlines
   that resolve into an X, with a letter-spaced MENU label that fades in
   on larger screens.
----------------------------------------------------------------------- */

function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  const bar = "absolute h-px bg-current transition-all duration-500";
  return (
    <div className="flex items-center gap-2.5 lg:hidden">
      <AnimatePresence>
        {!open && (
          <motion.span
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ duration: 0.3 }}
            className="hidden text-[8px] font-medium uppercase tracking-[0.3em] sm:block"
            style={{ color: T.textFaint }}
          >
            Menu
          </motion.span>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onClick}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        data-theme-fade
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 hover:scale-105"
        style={{
          borderColor: open ? `${ACCENT}70` : T.border,
          backgroundColor: T.surface,
          color: T.text,
          boxShadow: open ? `0 0 0 1px ${ACCENT}18, ${T.controlShadow}` : T.controlShadow,
        }}
      >
        <span aria-hidden className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: `0 0 0 1px ${ACCENT}25` }} />
        <span className="relative flex h-[13px] w-[17px] items-center justify-center" aria-hidden="true">
          <span className={cn(bar, open ? "w-[17px] rotate-45" : "w-[17px] -translate-y-[4.5px]")} style={{ backgroundColor: open ? ACCENT : "currentColor" }} />
          <span className={cn(bar, open ? "w-[17px] -rotate-45" : "w-[11px] translate-y-[4.5px]")} style={{ backgroundColor: open ? ACCENT : "currentColor" }} />
        </span>
      </button>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Account link config — single source of truth for both the desktop
   dropdown and the mobile grid. "Account" intentionally omitted per
   request; Settings, auth, and the dashboard highlight remain.
----------------------------------------------------------------------- */

type AccountLink = { href: string; label: string; desc: string; icon: IconType; accent: string; highlight?: boolean };

const authLinks: AccountLink[] = [
  { href: "/sign-in", label: "Sign in", desc: "Access your account", icon: LogIn, accent: ACCENT },
  { href: "/sign-up", label: "Sign up", desc: "Create your account", icon: UserPlus, accent: GOLD },
];

const navLinks: AccountLink[] = [{ href: "/settings", label: "Settings", desc: "", icon: Settings, accent: "" }];

const dashboardLink: AccountLink = {
  href: "/admin/dashboard",
  label: "Agent Dashboard",
  desc: "Manage your listings",
  icon: LayoutDashboard,
  accent: ACCENT,
  highlight: true,
};

function IconChip({ icon: Icon, color }: { icon: IconType; color: string }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-300" style={{ borderColor: T.borderSoft, backgroundColor: T.surfaceSoft }}>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color }} />
    </span>
  );
}

/* -----------------------------------------------------------------------
   Desktop profile dropdown
----------------------------------------------------------------------- */

function DesktopDropdownLink({ link, onClick }: { link: AccountLink; onClick: () => void }) {
  const Icon = link.icon;
  const iconColor = link.accent || T.textMuted;

  if (link.highlight) {
    return (
      <Link href={link.href} onClick={onClick} data-theme-fade className="group mt-1 flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-300" style={{ color: T.text, borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}08` }}>
        <Icon className="h-4 w-4" strokeWidth={1.5} style={{ color: ACCENT }} />
        <span className="flex-1">
          <span className="block text-[9px] font-medium uppercase tracking-[0.2em]">{link.label}</span>
          <span className="mt-0.5 block text-[7px] uppercase tracking-[0.12em]" style={{ color: T.textFaint }}>{link.desc}</span>
        </span>
        <span className="text-sm transition-transform duration-300 group-hover:translate-x-1" style={{ color: ACCENT }}>↗</span>
      </Link>
    );
  }

  if (!link.desc) {
    return (
      <Link href={link.href} onClick={onClick} data-theme-fade className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300" style={{ color: T.text }}>
        <Icon className="h-4 w-4" strokeWidth={1.5} style={{ color: iconColor }} />
        <span className="flex-1 text-[9px] font-medium uppercase tracking-[0.2em]">{link.label}</span>
        <span className="text-sm opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" style={{ color: ACCENT }}>↗</span>
      </Link>
    );
  }

  return (
    <Link href={link.href} onClick={onClick} data-theme-fade className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300" style={{ color: T.text }}>
      <IconChip icon={Icon} color={link.accent} />
      <span className="flex-1">
        <span className="block text-[10px] font-medium uppercase tracking-[0.18em]">{link.label}</span>
        <span className="mt-0.5 block text-[8px] tracking-[0.05em]" style={{ color: T.textFaint }}>{link.desc}</span>
      </span>
      <span className="text-sm transition-transform duration-300 group-hover:translate-x-1" style={{ color: link.accent }}>↗</span>
    </Link>
  );
}

function ProfileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={menuRef} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open account menu"
        aria-expanded={open}
        data-theme-fade
        className="group relative flex items-center gap-2 rounded-full border p-1 transition-all duration-500 hover:scale-[1.03]"
        style={{
          borderColor: open ? `${ACCENT}70` : T.border,
          backgroundColor: T.surface,
          boxShadow: open ? `0 0 0 1px ${ACCENT}18, ${T.controlShadow}` : T.controlShadow,
        }}
      >
        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full" style={{ background: T.avatarBg, border: `1px solid ${ACCENT}35` }}>
          <User className="h-[15px] w-[15px]" strokeWidth={1.6} style={{ color: T.avatarIcon }} />
          <span aria-hidden className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 30% 20%, ${ACCENT}28, transparent 55%)` }} />
        </span>
        <ChevronDown className={cn("mr-1 h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} strokeWidth={1.5} style={{ color: `${T.text}90` }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE_LUX }}
            data-theme-fade
            className="absolute right-0 top-[calc(100%+14px)] w-[270px] overflow-hidden rounded-2xl border shadow-2xl"
            style={{ backgroundColor: T.panelBg, borderColor: T.panelBorder, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 24px 70px rgba(10,1,6,.2)" }}
          >
            <div aria-hidden className="absolute inset-x-8 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, ${GOLD}, transparent)` }} />

            <div className="border-b px-5 py-5" style={{ borderColor: T.panelDivider }}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ backgroundColor: T.badgeBg, borderColor: `${ACCENT}30` }}>
                  <User className="h-4 w-4" strokeWidth={1.5} style={{ color: ACCENT }} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em]" style={{ color: T.text }}>My account</p>
                  <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.18em]" style={{ color: T.textMuted }}>Access your collection</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              {authLinks.map((link) => (
                <DesktopDropdownLink key={link.href} link={link} onClick={closeAndNavigate} />
              ))}
            </div>

            <div className="mx-4 h-px" style={{ backgroundColor: T.panelDivider }} />

            <div className="p-2">
              {navLinks.map((link) => (
                <DesktopDropdownLink key={link.href} link={link} onClick={closeAndNavigate} />
              ))}
              <DesktopDropdownLink link={dashboardLink} onClick={closeAndNavigate} />
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

function MobileAccountActions({ onNavigate }: { onNavigate: () => void }) {
  const gridLinks = [...authLinks, ...navLinks];

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center gap-3" style={{ color: T.textFaint }}>
        <span className="h-px w-5" style={{ backgroundColor: ACCENT }} />
        <span className="text-[7px] font-medium uppercase tracking-[0.3em]">Account</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {gridLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} onClick={onNavigate} data-theme-fade className="flex items-center gap-2 rounded-xl border px-3 py-3 transition-all duration-300" style={{ borderColor: T.borderSoft, color: T.text, backgroundColor: link.desc ? T.surfaceSoft : "transparent" }}>
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: link.accent || T.textFaint }} />
              <span className="text-[8px] font-medium uppercase tracking-[0.18em]">{link.label}</span>
            </Link>
          );
        })}

        <Link href={dashboardLink.href} onClick={onNavigate} data-theme-fade className="col-span-2 flex items-center gap-3 rounded-xl border px-3 py-3" style={{ borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}08`, color: T.text }}>
          <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} style={{ color: ACCENT }} />
          <span className="flex-1">
            <span className="block text-[8px] font-medium uppercase tracking-[0.2em]">{dashboardLink.label}</span>
            <span className="mt-1 block text-[7px] uppercase tracking-[0.14em]" style={{ color: T.textFaint }}>{dashboardLink.desc}</span>
          </span>
          <span className="text-sm" style={{ color: ACCENT }}>↗</span>
        </Link>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Desktop nav link
----------------------------------------------------------------------- */

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} data-theme-fade className="group relative flex items-center py-3 text-[9px] font-medium uppercase tracking-[0.32em] transition-colors duration-300" style={{ color: active ? T.text : T.textMuted }}>
      {label}
      <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-full origin-left transition-transform duration-500", active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} style={{ backgroundColor: active ? ACCENT : T.textMuted }} />
      <span aria-hidden className="pointer-events-none absolute -bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundColor: ACCENT }} />
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
      <ThemeVars />

      <header
        data-theme-fade
        className="fixed inset-x-0 top-0 z-[60] transition-[background,box-shadow] duration-700"
        style={{
          color: T.text,
          borderBottomColor: elevated ? T.border : T.borderFaint,
          background: elevated ? T.bgElevated : T.bgIdle,
          backdropFilter: elevated ? "blur(22px)" : "blur(14px)",
          WebkitBackdropFilter: elevated ? "blur(22px)" : "blur(14px)",
          boxShadow: elevated ? "0 12px 45px rgba(10,1,6,.12)" : "none",
        }}
      >
        <div className="container mx-auto flex h-[76px] items-center justify-between">
          {/* Brand */}
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="group relative flex shrink-0 items-center gap-3" onClick={handleNavigation}>
            <span className="relative flex h-8 w-8 items-center justify-center">
              <LogoMark className="h-[25px] w-[25px] transition-transform duration-500 group-hover:-translate-y-0.5" />
              <span className="absolute bottom-0 left-1/2 h-px w-3 -translate-x-1/2 opacity-0 transition-all duration-500 group-hover:w-5 group-hover:opacity-100" style={{ backgroundColor: ACCENT }} />
            </span>
            <span className="hidden items-center text-[11px] font-medium uppercase leading-none tracking-[0.38em] sm:flex">
              {brandFirst}
              {brandRest && <span className="ml-1" style={{ color: ACCENT }}>{brandRest}</span>}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex" aria-label="Primary">
            {publicNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <NavLink key={item.href} href={item.href} label={item.label} active={active} />;
            })}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">
            <ProfileMenu onNavigate={handleNavigation} />
            <MenuToggle open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.7, ease: EASE_LUX }}
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
            transition={{ duration: 0.5, ease: EASE_LUX }}
            data-theme-fade
            className="fixed inset-0 z-50 lg:hidden"
            style={{ backgroundColor: T.sheetBg, color: T.text }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: T.sheetGlow }} />
            <div aria-hidden className="pointer-events-none absolute right-[-80px] top-[35%] h-64 w-64 rounded-full blur-[100px]" style={{ backgroundColor: ACCENT, opacity: T.glowOpacity }} />
            <div aria-hidden className="pointer-events-none absolute inset-x-7 top-[108px] h-px" style={{ backgroundColor: T.borderSoft }} />

            <div className="relative flex h-full flex-col px-7 pb-8 pt-[110px]">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="mb-8 flex items-center gap-3 sm:mb-10">
                <span className="h-[2px] w-7" style={{ backgroundColor: ACCENT }} />
                <span className="text-[8px] font-medium uppercase tracking-[0.38em]" style={{ color: T.textFaint }}>AutoStock / Collection</span>
              </motion.div>

              <nav className="flex flex-col" aria-label="Mobile">
                {publicNav.map((item, index) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.div key={item.href} initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.12 + index * 0.06, ease: EASE_LUX }}>
                      <Link href={item.href} onClick={handleNavigation} className="group flex items-center justify-between border-b py-[18px] sm:py-5" style={{ borderColor: T.borderSoft, color: active ? T.text : T.textFaint }}>
                        <span className="text-[clamp(1.8rem,7vw,3rem)] font-light uppercase leading-none tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1">{item.label}</span>
                        <span className={cn("text-[9px] font-medium tracking-[0.25em] transition-all duration-300", active ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")} style={{ color: ACCENT }}>
                          0{index + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <MobileAccountActions onNavigate={handleNavigation} />

              <div className="mt-auto flex items-end justify-between gap-6 pt-6">
                <div>
                  <p className="text-[7px] font-medium uppercase tracking-[0.3em]" style={{ color: `${T.text}55` }}>Automotive Atelier</p>
                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.22em]" style={{ color: T.textFaint }}>
                    {(siteConfig as { location?: string }).location ?? "Dhaka, Bangladesh"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.22em]" style={{ color: T.textFaint }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}70` }} />
                  Member access
                </div>
              </div>

              <div aria-hidden className="absolute inset-x-7 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${LINE}, transparent)` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}