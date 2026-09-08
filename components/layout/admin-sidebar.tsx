"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { Suspense, useState } from "react";
import { useTheme } from "next-themes";

import { adminNav } from "@/config/admin-nav";
import { siteConfig } from "@/config/site";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleSidebarCollapsed,
  setMobileNavOpen,
} from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";

import {
  ACCENT,
  BURGUNDY,
  CHARCOAL,
  PAPER,
  PINK,
  GOLD,
  LINE,
} from "../ui/tokens";

/* ================================================================
   ACTIVE STATE
================================================================ */

function isActive(
  pathname: string,
  search: string,
  href: string,
) {
  const [hrefPath, hrefQuery] = href.split("?");

  if (pathname !== hrefPath) return false;
  if (!hrefQuery) return true;

  return search.includes(hrefQuery);
}

/* ================================================================
   SIDEBAR CONTENT
================================================================ */

function SidebarContent({
  collapsed,
  isDark,
  onNavigate,
}: {
  collapsed: boolean;
  isDark: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const [openGroup, setOpenGroup] = useState<string | null>(
    adminNav.find((item) =>
      pathname.startsWith(item.href.split("?")[0]),
    )?.label ?? null,
  );

  const colors = {
    text: isDark ? PAPER : CHARCOAL,
    muted: isDark ? `${PAPER}78` : `${CHARCOAL}78`,
    soft: isDark ? `${PAPER}A0` : `${CHARCOAL}90`,
    border: isDark ? `${PAPER}10` : "rgba(10,1,6,.09)",
    hover: isDark ? `${PAPER}06` : "rgba(10,1,6,.035)",
    active: isDark ? `${ACCENT}12` : `${ACCENT}0D`,
    activeBorder: isDark ? `${ACCENT}35` : `${ACCENT}38`,
    childBorder: isDark ? `${PAPER}12` : `${CHARCOAL}12`,
  };

  return (
    <nav
      className={cn(
        "flex flex-1 flex-col overflow-y-auto",
        "gap-1 px-2.5 py-4",
        "scrollbar-thin",
      )}
      aria-label="Admin"
    >
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
                className={cn(
                  "group relative flex min-w-0 flex-1 items-center",
                  "rounded-xl px-2.5 py-2.5",
                  "transition-all duration-300",
                  collapsed
                    ? "justify-center"
                    : "gap-3",
                )}
                style={{
                  color: active
                    ? colors.text
                    : colors.muted,
                  backgroundColor: active
                    ? colors.active
                    : "transparent",
                  boxShadow: active
                    ? `inset 0 0 0 1px ${colors.activeBorder}`
                    : "none",
                }}
              >
                {/* Active rail */}

                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-1/2",
                    "h-5 w-[2px] -translate-y-1/2",
                    "rounded-full transition-all duration-300",
                    active
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                  style={{
                    backgroundColor: ACCENT,
                    boxShadow: `0 0 12px ${ACCENT}70`,
                  }}
                />

                {/* Icon */}

                <span
                  className={cn(
                    "relative flex shrink-0 items-center justify-center",
                    "transition-transform duration-300",
                    "group-hover:scale-105",
                  )}
                >
                  <Icon
                    className="h-[17px] w-[17px]"
                    strokeWidth={active ? 1.8 : 1.5}
                    aria-hidden
                  />

                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full blur-md"
                      style={{
                        backgroundColor: `${ACCENT}30`,
                      }}
                    />
                  )}
                </span>

                {!collapsed && (
                  <span
                    className={cn(
                      "min-w-0 truncate",
                      "text-[12px]",
                      active
                        ? "font-medium"
                        : "font-normal",
                    )}
                  >
                    {item.label}
                  </span>
                )}

                {/* Collapsed active dot */}

                {collapsed && active && (
                  <span
                    aria-hidden
                    className="absolute right-1.5 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: ACCENT,
                      boxShadow: `0 0 8px ${ACCENT}`,
                    }}
                  />
                )}
              </Link>

              {!collapsed && hasChildren && (
                <button
                  type="button"
                  aria-label={
                    groupOpen
                      ? `Collapse ${item.label}`
                      : `Expand ${item.label}`
                  }
                  aria-expanded={groupOpen}
                  onClick={() =>
                    setOpenGroup(
                      groupOpen ? null : item.label,
                    )
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                  style={{
                    color: groupOpen
                      ? colors.soft
                      : colors.muted,
                  }}
                >
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      groupOpen && "rotate-180",
                    )}
                    strokeWidth={1.5}
                  />
                </button>
              )}
            </div>

            {/* ====================================================
                CHILDREN
            ==================================================== */}

            {!collapsed &&
              hasChildren &&
              groupOpen && (
                <div
                  className="ml-[21px] mt-1 flex flex-col gap-0.5 border-l pl-3"
                  style={{
                    borderColor: colors.childBorder,
                  }}
                >
                  {item.children!.map((child) => {
                    const childActive = isActive(
                      pathname,
                      search,
                      child.href,
                    );

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={cn(
                          "group relative flex items-center",
                          "rounded-lg px-2.5 py-2",
                          "text-[11px]",
                          "transition-all duration-300",
                        )}
                        style={{
                          color: childActive
                            ? colors.text
                            : colors.muted,
                          backgroundColor:
                            childActive
                              ? colors.active
                              : "transparent",
                        }}
                      >
                        <span
                          className={cn(
                            "mr-2 h-1 w-1 rounded-full",
                            "transition-all duration-300",
                            childActive
                              ? "scale-100"
                              : "scale-0 group-hover:scale-100",
                          )}
                          style={{
                            backgroundColor: ACCENT,
                          }}
                        />

                        {child.label}

                        {childActive && (
                          <span
                            className="ml-auto h-1 w-1 rounded-full"
                            style={{
                              backgroundColor: ACCENT,
                              boxShadow: `0 0 7px ${ACCENT}`,
                            }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
          </div>
        );
      })}
    </nav>
  );
}

/* ================================================================
   BRAND
================================================================ */

function Brand({
  collapsed,
  isDark,
}: {
  collapsed: boolean;
  isDark: boolean;
}) {
  const nameParts = siteConfig.name.split(" ");
  const brandRest =
    nameParts.length > 1 ? nameParts.pop() : "";
  const brandFirst = nameParts.join(" ").toUpperCase();

  return (
    <Link
      href="/"
      className={cn(
        "group flex min-w-0 items-center",
        collapsed
          ? "justify-center"
          : "gap-3",
      )}
    >
      {/* Brand mark */}

      <span
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: isDark
            ? `linear-gradient(145deg, ${BURGUNDY}70, ${CHARCOAL})`
            : `linear-gradient(145deg, ${PINK}90, #ffffff)`,
          border: `1px solid ${ACCENT}25`,
          boxShadow: isDark
            ? `inset 0 1px 0 ${PAPER}08`
            : "inset 0 1px 0 rgba(255,255,255,.9)",
        }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-[19px] w-[19px]"
          aria-hidden="true"
        >
          <path
            d="M16 3L29 28H22.3L19.2 21.2H12.8L9.7 28H3L16 3Z"
            fill={ACCENT}
          />

          <path
            d="M14.1 17.2H17.9L16 12.8L14.1 17.2Z"
            fill={isDark ? CHARCOAL : "#ffffff"}
          />
        </svg>

        <span
          aria-hidden
          className="absolute inset-0 rounded-lg opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundColor: `${ACCENT}22`,
          }}
        />
      </span>

      {!collapsed && (
        <span className="min-w-0 truncate text-[11px] font-medium uppercase tracking-[0.3em]">
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
      )}
    </Link>
  );
}

/* ================================================================
   ADMIN SIDEBAR
================================================================ */

export function AdminSidebar() {
  const dispatch = useAppDispatch();

  const collapsed = useAppSelector(
    (s) => s.ui.sidebarCollapsed,
  );

  const mobileOpen = useAppSelector(
    (s) => s.ui.mobileNavOpen,
  );

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const theme = {
    sidebarBg: isDark
      ? CHARCOAL
      : "#F8F7F4",

    surface: isDark
      ? `${PAPER}04`
      : "rgba(255,255,255,.72)",

    border: isDark
      ? `${PAPER}10`
      : "rgba(10,1,6,.10)",

    divider: isDark
      ? `${PAPER}0D`
      : "rgba(10,1,6,.08)",

    text: isDark ? PAPER : CHARCOAL,

    muted: isDark
      ? `${PAPER}72`
      : `${CHARCOAL}78`,
  };

  return (
    <>
      {/* ==========================================================
          DESKTOP SIDEBAR
      ========================================================== */}

      <aside
        className={cn(
          "hidden shrink-0 flex-col",
          "border-r",
          "transition-[width] duration-300",
          "lg:flex",
          collapsed ? "w-16" : "w-60",
        )}
        style={{
          backgroundColor: theme.sidebarBg,
          borderColor: theme.border,
          color: theme.text,
        }}
      >
        {/* ========================================================
            HEADER
        ======================================================== */}

        <div
          className={cn(
            "flex h-16 shrink-0 items-center",
            "border-b",
            collapsed
              ? "justify-center px-2"
              : "justify-between px-4",
          )}
          style={{
            borderColor: theme.divider,
          }}
        >
          <Brand
            collapsed={collapsed}
            isDark={isDark}
          />

          {!collapsed && (
            <button
              type="button"
              aria-label="Collapse sidebar"
              onClick={() =>
                dispatch(toggleSidebarCollapsed())
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                color: theme.muted,
              }}
            >
              <PanelLeftClose
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </button>
          )}

          {collapsed && (
            <button
              type="button"
              aria-label="Expand sidebar"
              onClick={() =>
                dispatch(toggleSidebarCollapsed())
              }
              className="absolute left-1/2 mt-16 flex h-8 w-8 -translate-x-1/2 translate-y-0 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                color: theme.muted,
              }}
            >
              <PanelLeftOpen
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </button>
          )}
        </div>

        {/* ========================================================
            NAV
        ======================================================== */}

        <Suspense fallback={null}>
          <SidebarContent
            collapsed={collapsed}
            isDark={isDark}
          />
        </Suspense>

        {/* ========================================================
            BOTTOM STATUS
        ======================================================== */}

        {!collapsed && (
          <div
            className="mx-3 mb-3 rounded-xl border p-3"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: ACCENT,
                  boxShadow: `0 0 9px ${ACCENT}80`,
                }}
              />

              <span
                className="text-[8px] font-medium uppercase tracking-[0.2em]"
                style={{
                  color: theme.muted,
                }}
              >
                System online
              </span>
            </div>

            <p
              className="mt-2 text-[7px] uppercase tracking-[0.15em]"
              style={{
                color: isDark
                  ? `${PAPER}42`
                  : `${CHARCOAL}55`,
              }}
            >
              AutoStock / Admin
            </p>
          </div>
        )}
      </aside>

      {/* ==========================================================
          MOBILE DRAWER
      ========================================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}

          <div
            className="fixed inset-0 backdrop-blur-sm"
            style={{
              backgroundColor: isDark
                ? "rgba(0,0,0,.62)"
                : "rgba(10,1,6,.28)",
            }}
            onClick={() =>
              dispatch(setMobileNavOpen(false))
            }
            aria-hidden="true"
          />

          {/* Drawer */}

          <aside
            className={cn(
              "fixed inset-y-0 left-0",
              "flex w-[280px] flex-col",
              "border-r",
              "shadow-2xl",
            )}
            style={{
              backgroundColor: isDark
                ? CHARCOAL
                : "#F8F7F4",

              borderColor: isDark
                ? `${PAPER}12`
                : "rgba(10,1,6,.10)",

              color: isDark
                ? PAPER
                : CHARCOAL,

              boxShadow: isDark
                ? "18px 0 60px rgba(0,0,0,.35)"
                : "18px 0 60px rgba(10,1,6,.12)",
            }}
          >
            {/* Mobile header */}

            <div
              className="flex h-16 shrink-0 items-center justify-between border-b px-4"
              style={{
                borderColor: isDark
                  ? `${PAPER}10`
                  : "rgba(10,1,6,.08)",
              }}
            >
              <Brand
                collapsed={false}
                isDark={isDark}
              />

              <button
                type="button"
                aria-label="Close navigation"
                onClick={() =>
                  dispatch(setMobileNavOpen(false))
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  color: isDark
                    ? `${PAPER}90`
                    : `${CHARCOAL}90`,
                  backgroundColor: isDark
                    ? `${PAPER}05`
                    : "rgba(10,1,6,.035)",
                }}
              >
                <X
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Mobile navigation */}

            <Suspense fallback={null}>
              <SidebarContent
                collapsed={false}
                isDark={isDark}
                onNavigate={() =>
                  dispatch(setMobileNavOpen(false))
                }
              />
            </Suspense>

            {/* Mobile footer */}

            <div
              className="border-t px-4 py-4"
              style={{
                borderColor: isDark
                  ? `${PAPER}10`
                  : "rgba(10,1,6,.08)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: ACCENT,
                    boxShadow: `0 0 9px ${ACCENT}80`,
                  }}
                />

                <span
                  className="text-[8px] font-medium uppercase tracking-[0.2em]"
                  style={{
                    color: isDark
                      ? `${PAPER}70`
                      : `${CHARCOAL}75`,
                  }}
                >
                  System online
                </span>
              </div>

              <p
                className="mt-2 text-[7px] uppercase tracking-[0.16em]"
                style={{
                  color: isDark
                    ? `${PAPER}40`
                    : `${CHARCOAL}50`,
                }}
              >
                Automotive management platform
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}