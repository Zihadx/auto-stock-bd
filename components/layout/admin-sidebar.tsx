"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { Suspense, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

import { adminNav } from "@/config/admin-nav";
import { siteConfig } from "@/config/site";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebarCollapsed, setMobileNavOpen } from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";

import { ACCENT, BURGUNDY, CHARCOAL, GOLD, PAPER, PINK } from "../ui/tokens";

/* -----------------------------------------------------------------------
   Active-route matching
----------------------------------------------------------------------- */

function isActive(pathname: string, search: string, href: string) {
  const [hrefPath, hrefQuery] = href.split("?");
  if (pathname !== hrefPath) return false;
  if (!hrefQuery) return true;
  return search.includes(hrefQuery);
}

/* -----------------------------------------------------------------------
   Shared theme tokens — one derivation, used by desktop rail, mobile
   drawer, nav, and footer alike so light/dark values never drift apart.
----------------------------------------------------------------------- */

function useSidebarTokens(isDark: boolean) {
  return useMemo(
    () => ({
      sidebarBg: isDark ? CHARCOAL : "#F8F7F4",
      surface: isDark ? `${PAPER}04` : "rgba(255,255,255,.72)",
      border: isDark ? `${PAPER}10` : "rgba(10,1,6,.10)",
      divider: isDark ? `${PAPER}0D` : "rgba(10,1,6,.08)",
      text: isDark ? PAPER : CHARCOAL,
      muted: isDark ? `${PAPER}78` : `${CHARCOAL}78`,
      faint: isDark ? `${PAPER}70` : `${CHARCOAL}70`,
      soft: isDark ? `${PAPER}A0` : `${CHARCOAL}90`,
      active: isDark ? `${ACCENT}12` : `${ACCENT}0D`,
      activeBorder: isDark ? `${ACCENT}35` : `${ACCENT}38`,
      childBorder: isDark ? `${PAPER}12` : `${CHARCOAL}12`,
      backdrop: isDark ? "rgba(0,0,0,.62)" : "rgba(10,1,6,.28)",
      drawerShadow: isDark ? "18px 0 60px rgba(0,0,0,.35)" : "18px 0 60px rgba(10,1,6,.12)",
      toggleBg: isDark ? "#170810" : "#FFFFFF",
      toggleInnerBg: isDark ? `${PAPER}07` : "rgba(10,1,6,.035)",
      toggleInnerBorder: isDark ? `${PAPER}10` : "rgba(10,1,6,.07)",
    }),
    [isDark],
  );
}

type Tokens = ReturnType<typeof useSidebarTokens>;

/* -----------------------------------------------------------------------
   System-status footer — shared between the desktop rail and the mobile
   drawer instead of two copies of the same markup.
----------------------------------------------------------------------- */

function SystemStatus({ tokens, boxed, caption }: { tokens: Tokens; boxed: boolean; caption: string }) {
  return (
    <div
      className={cn("shrink-0", boxed ? "mx-3 mb-3 rounded-xl border p-3" : "border-t px-4 py-4")}
      style={{
        backgroundColor: boxed ? tokens.surface : "transparent",
        borderColor: boxed ? tokens.border : tokens.divider,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: ACCENT }}
            animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.35, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT, boxShadow: `0 0 9px ${ACCENT}80` }} />
        </span>
        <span className="text-[8px] font-medium uppercase tracking-[0.2em]" style={{ color: tokens.muted }}>
          System online
        </span>
      </div>
      <p className="mt-2 text-[7px] uppercase tracking-[0.15em]" style={{ color: tokens.faint }}>
        {caption}
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Collapse / expand toggle — anchored to the header's vertical center,
   half-in / half-out of the rail edge so it reads clearly against both
   the sidebar and the page content beside it.
----------------------------------------------------------------------- */

function CollapseToggle({ collapsed, tokens, onToggle }: { collapsed: boolean; tokens: Tokens; onToggle: () => void }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="absolute right-0 top-1/2 z-[100] flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border transition-transform duration-300 hover:scale-110 active:scale-95"
      style={{
        backgroundColor: tokens.toggleBg,
        borderColor: hover ? `${ACCENT}55` : tokens.border,
        boxShadow: hover
          ? `0 10px 32px rgba(0,0,0,.38), 0 0 0 3px ${ACCENT}15, 0 0 24px ${ACCENT}25`
          : `0 8px 24px rgba(0,0,0,.28), 0 0 16px ${ACCENT}10`,
      }}
    >
      {/* Thin gold hairline ring — the one deliberate luxury accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
        style={{ boxShadow: `0 0 0 1px ${GOLD}45`, opacity: hover ? 1 : 0 }}
      />

      <span
        className="flex h-[30px] w-[30px] items-center justify-center rounded-full"
        style={{
          backgroundColor: tokens.toggleInnerBg,
          border: `1px solid ${tokens.toggleInnerBorder}`,
          color: tokens.text,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={collapsed ? "open" : "close"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            className="flex"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" strokeWidth={1.8} /> : <PanelLeftClose className="h-4 w-4" strokeWidth={1.8} />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

/* -----------------------------------------------------------------------
   Sidebar navigation
----------------------------------------------------------------------- */

function SidebarContent({ collapsed, tokens, onNavigate }: { collapsed: boolean; tokens: Tokens; onNavigate?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const [openGroup, setOpenGroup] = useState<string | null>(
    adminNav.find((item) => pathname.startsWith(item.href.split("?")[0]))?.label ?? null,
  );

  return (
    <nav className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2.5 py-4" aria-label="Admin">
      {adminNav.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, search, item.href);
        const hasChildren = !!item.children?.length;
        const groupOpen = openGroup === item.label;

        return (
          <div key={item.href}>
            <div className="flex items-center gap-1">
              <Link
                href={item.href}
                onClick={onNavigate}
                title={collapsed ? item.label : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex min-w-0 flex-1 items-center rounded-xl transition-all duration-300",
                  collapsed ? "h-10 w-10 justify-center px-0" : "gap-3 px-2.5 py-2.5",
                )}
                style={{
                  color: active ? tokens.text : tokens.muted,
                  backgroundColor: active ? tokens.active : "transparent",
                  boxShadow: active
                    ? `inset 0 0 0 1px ${tokens.activeBorder}, inset 0 0 0 2px ${GOLD}00`
                    : "none",
                }}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                    active ? "h-5 w-[2px] opacity-100" : "h-0 w-[2px] opacity-0",
                  )}
                  style={{ backgroundColor: ACCENT, boxShadow: `0 0 12px ${ACCENT}70` }}
                />

                <span className={cn("relative flex shrink-0 items-center justify-center transition-all duration-300 group-hover:scale-105", collapsed ? "h-8 w-8" : "h-5 w-5")}>
                  <Icon className={collapsed ? "h-[18px] w-[18px]" : "h-[17px] w-[17px]"} strokeWidth={active ? 1.9 : 1.55} aria-hidden />
                  {active && <span aria-hidden className="absolute inset-0 -z-10 rounded-full blur-md" style={{ backgroundColor: `${ACCENT}30` }} />}
                </span>

                {!collapsed && (
                  <span className={cn("min-w-0 truncate text-[12px]", active ? "font-medium" : "font-normal")}>{item.label}</span>
                )}

                {collapsed && active && (
                  <span aria-hidden className="absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
                )}
              </Link>

              {!collapsed && hasChildren && (
                <button
                  type="button"
                  aria-label={groupOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                  aria-expanded={groupOpen}
                  onClick={() => setOpenGroup(groupOpen ? null : item.label)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
                  style={{ color: groupOpen ? tokens.soft : tokens.muted }}
                >
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", groupOpen && "rotate-180")} strokeWidth={1.6} />
                </button>
              )}
            </div>

            {!collapsed && hasChildren && (
              <AnimatePresence initial={false}>
                {groupOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="ml-[21px] mt-1 flex flex-col gap-0.5 border-l pl-3" style={{ borderColor: tokens.childBorder }}>
                      {item.children!.map((child) => {
                        const childActive = isActive(pathname, search, child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onNavigate}
                            className="group relative flex items-center rounded-lg px-2.5 py-2 text-[11px] transition-all duration-300"
                            style={{ color: childActive ? tokens.text : tokens.muted, backgroundColor: childActive ? tokens.active : "transparent" }}
                          >
                            <span
                              className={cn("mr-2 h-1 w-1 rounded-full transition-all duration-300", childActive ? "scale-100" : "scale-0 group-hover:scale-100")}
                              style={{ backgroundColor: ACCENT }}
                            />
                            {child.label}
                            {childActive && <span className="ml-auto h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT, boxShadow: `0 0 7px ${ACCENT}` }} />}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* -----------------------------------------------------------------------
   Brand
----------------------------------------------------------------------- */

function Brand({ collapsed, isDark }: { collapsed: boolean; isDark: boolean }) {
  const nameParts = siteConfig.name.split(" ");
  const brandRest = nameParts.length > 1 ? nameParts.pop() : "";
  const brandFirst = nameParts.join(" ").toUpperCase();

  return (
    <Link href="/" className={cn("group flex min-w-0 items-center", collapsed ? "justify-center" : "gap-3")}>
      <span
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: isDark ? `linear-gradient(145deg, ${BURGUNDY}70, ${CHARCOAL})` : `linear-gradient(145deg, ${PINK}90, #ffffff)`,
          border: `1px solid ${ACCENT}25`,
          boxShadow: isDark ? `inset 0 1px 0 ${PAPER}08, 0 0 14px ${GOLD}0F` : "inset 0 1px 0 rgba(255,255,255,.9)",
        }}
      >
        <svg viewBox="0 0 32 32" fill="none" className="h-[19px] w-[19px]" aria-hidden="true">
          <path d="M16 3L29 28H22.3L19.2 21.2H12.8L9.7 28H3L16 3Z" fill={ACCENT} />
          <path d="M14.1 17.2H17.9L16 12.8L14.1 17.2Z" fill={isDark ? CHARCOAL : "#ffffff"} />
        </svg>
        <span aria-hidden className="absolute inset-0 rounded-lg opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundColor: `${ACCENT}22` }} />
      </span>

      {!collapsed && (
        <span className="min-w-0 truncate text-[11px] font-medium uppercase tracking-[0.3em]">
          {brandFirst}
          {brandRest && (
            <span className="ml-1" style={{ color: ACCENT }}>
              {brandRest}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}

/* -----------------------------------------------------------------------
   Admin sidebar
----------------------------------------------------------------------- */

export function AdminSidebar() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((s) => s.ui.mobileNavOpen);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const tokens = useSidebarTokens(isDark);

  const closeMobile = () => dispatch(setMobileNavOpen(false));

  return (
    <>
      {/* Desktop rail */}
      <aside
        className={cn(
          "sticky top-0 z-[70] hidden h-screen shrink-0 flex-col overflow-visible border-r transition-[width] duration-300 lg:flex",
          collapsed ? "w-16" : "w-60",
        )}
        style={{ backgroundColor: tokens.sidebarBg, borderColor: tokens.border, color: tokens.text }}
      >
        <div
          className={cn("relative flex h-16 shrink-0 items-center overflow-visible border-b", collapsed ? "justify-center px-2" : "justify-between px-4")}
          style={{ borderColor: tokens.divider }}
        >
          <Brand collapsed={collapsed} isDark={isDark} />

          {/* Hairline gradient under the header — echoes the site header's accent line */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}45, ${GOLD}35, transparent)` }}
          />

          <CollapseToggle collapsed={collapsed} tokens={tokens} onToggle={() => dispatch(toggleSidebarCollapsed())} />
        </div>

        <Suspense fallback={null}>
          <SidebarContent collapsed={collapsed} tokens={tokens} />
        </Suspense>

        {!collapsed && <SystemStatus tokens={tokens} boxed caption="AutoStock / Admin" />}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 backdrop-blur-sm"
              style={{ backgroundColor: tokens.backdrop }}
              onClick={closeMobile}
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 flex w-[280px] flex-col border-r shadow-2xl"
              style={{ backgroundColor: tokens.sidebarBg, borderColor: tokens.border, color: tokens.text, boxShadow: tokens.drawerShadow }}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b px-4" style={{ borderColor: tokens.divider }}>
                <Brand collapsed={false} isDark={isDark} />
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={closeMobile}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ color: tokens.text, backgroundColor: tokens.toggleInnerBg, border: `1px solid ${tokens.divider}` }}
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>

              <Suspense fallback={null}>
                <SidebarContent collapsed={false} tokens={tokens} onNavigate={closeMobile} />
              </Suspense>

              <SystemStatus tokens={tokens} boxed={false} caption="Automotive management platform" />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}