"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useState, Suspense } from "react";
import { adminNav } from "@/config/admin-nav";
import { siteConfig } from "@/config/site";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebarCollapsed, setMobileNavOpen } from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";

function isActive(pathname: string, search: string, href: string) {
  const [hrefPath, hrefQuery] = href.split("?");
  if (pathname !== hrefPath) return false;
  if (!hrefQuery) return true;
  return search.includes(hrefQuery);
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const [openGroup, setOpenGroup] = useState<string | null>(
    adminNav.find((item) => pathname.startsWith(item.href.split("?")[0]))?.label ?? null,
  );

  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3" aria-label="Admin">
      {adminNav.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, search, item.href);
        const hasChildren = !!item.children?.length;
        const groupOpen = openGroup === item.label;

        return (
          <div key={item.href}>
            <div className="flex items-center">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-1 items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-charcoal-raised text-paper"
                    : "text-paper/60 hover:bg-charcoal-raised hover:text-paper",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {!collapsed && <span>{item.label}</span>}
              </Link>
              {!collapsed && hasChildren && (
                <button
                  type="button"
                  aria-label={groupOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                  aria-expanded={groupOpen}
                  onClick={() => setOpenGroup(groupOpen ? null : item.label)}
                  className="p-2 text-paper/40 hover:text-paper"
                >
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", groupOpen && "rotate-180")} />
                </button>
              )}
            </div>

            {!collapsed && hasChildren && groupOpen && (
              <div className="ml-6 mt-0.5 flex flex-col gap-0.5 border-l border-charcoal-line pl-3">
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "rounded-sm px-2.5 py-1.5 text-sm text-paper/60 hover:bg-charcoal-raised hover:text-paper",
                      isActive(pathname, search, child.href) && "text-paper",
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((s) => s.ui.mobileNavOpen);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-charcoal-line bg-charcoal text-paper transition-[width] duration-150 lg:flex",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-charcoal-line px-4">
          {!collapsed && (
            <span className="font-display text-sm font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          )}
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => dispatch(toggleSidebarCollapsed())}
            className="p-1 text-paper/50 hover:text-paper"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>
        <Suspense fallback={null}>
          <SidebarContent collapsed={collapsed} />
        </Suspense>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-ink/40"
            onClick={() => dispatch(setMobileNavOpen(false))}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 flex w-64 flex-col bg-charcoal text-paper">
            <div className="flex h-16 items-center justify-between border-b border-charcoal-line px-4">
              <span className="font-display text-sm font-semibold">{siteConfig.name}</span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => dispatch(setMobileNavOpen(false))}
                className="p-1 text-paper/50 hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Suspense fallback={null}>
              <SidebarContent collapsed={false} />
            </Suspense>
          </aside>
        </div>
      )}
    </>
  );
}
